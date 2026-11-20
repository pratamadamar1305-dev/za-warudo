-- Check for shared table.
if not shared then
	return warn("No shared, no script.")
end

-- Prevent double execution.
if shared.FischByteLoaded then
	return warn("[Fisch] Already running.")
end
shared.FischByteLoaded = true

-- ============================================================
-- DELTA EXECUTOR OPTIMIZATION
-- Delta sUNC: 98% | Mobile-first executor
-- Confirmed support: getsenv, getcallbackvalue, gethui,
-- hookmetamethod, newcclosure, setupvalue, getupvalue,
-- firesignal, getgc, cloneref, setthreadidentity, getconnections
-- ============================================================

-- Thread identity: only set if needed for Net module require.
-- Disabled by default — "invalid client" kick risk.
-- Uncomment if Net module fails to load:
-- pcall(function() setthreadidentity(8) end)

-- Delta compatibility check: verify critical functions exist.
local DELTA_COMPAT = {
	hookmetamethod = type(hookmetamethod) == "function",
	newcclosure = type(newcclosure) == "function",
	getrawmetatable = type(getrawmetatable) == "function",
	setreadonly = type(setreadonly) == "function",
	checkcaller = type(checkcaller) == "function",
	getnamecallmethod = type(getnamecallmethod) == "function",
	getcallbackvalue = type(getcallbackvalue) == "function",
	getsenv = type(getsenv) == "function",
	setupvalue = type(setupvalue) == "function",
	getupvalue = type(getupvalue) == "function",
	firesignal = type(firesignal) == "function",
	gethui = type(gethui) == "function",
	cloneref = type(cloneref) == "function",
	getgc = type(getgc) == "function",
	hookfunction = type(hookfunction) == "function",
}

-- Fallback wrappers for missing functions.
if not DELTA_COMPAT.newcclosure then
	getfenv().newcclosure = function(f) return f end
end
if not DELTA_COMPAT.cloneref then
	getfenv().cloneref = function(inst) return inst end
end
if not DELTA_COMPAT.firesignal then
	getfenv().firesignal = function(signal, ...)
		if signal and type(signal.Fire) == "function" then
			signal:Fire(...)
		end
	end
end
if not DELTA_COMPAT.gethui then
	getfenv().gethui = function() return nil end
end

-- Services (normal references — cloneref can trigger "invalid client").
local playersService = game:GetService("Players")
local replicatedStorage = game:GetService("ReplicatedStorage")
local runService = game:GetService("RunService")
local virtualInputManager = game:GetService("VirtualInputManager")
local virtualUser = game:GetService("VirtualUser")
local collectionService = game:GetService("CollectionService")
local guiService = game:GetService("GuiService")
local userInputService = game:GetService("UserInputService")

-- Constants.
local LOCAL_PLAYER = playersService.LocalPlayer
local PLAYER_GUI = LOCAL_PLAYER:WaitForChild("PlayerGui")
local DEFAULT_WALK_SPEED = 16
local DEFAULT_JUMP_POWER = 50
local MERCHANT_NAME = "Marc Merchant"
local MAX_SESSION_HOURS = 4

-- Platform detection.
local IS_MOBILE = userInputService.TouchEnabled

-- Humanized random.
local function rng(min, max)
	return min + math.random() * (max - min)
end

-- ============================================================
-- CONFIG — each feature is independent
-- ============================================================
local config = {
	-- Fishing (separate toggles).
	autoCast = false,
	autoShake = false,
	autoReel = false,

	-- Cast settings.
	castPower = 100,
	perfectCast = false,

	-- Reel settings.
	reelMode = "legit", -- "legit" or "instant"

	-- Shake settings.
	shakeSpeed = 0.05,

	-- Selling.
	autoSell = false,
	sellInterval = 10,
	autoAppraise = false,

	-- Safety.
	antiAFK = true,
	antiKick = true,
	spoofProperties = true,
	humanizeDelays = true,
	freezeWhileFishing = false,
	fishESP = false,

	-- Mobile.
	shakeMethod = "auto",
}

-- ============================================================
-- STATE
-- ============================================================
local state = {
	running = true,
	connections = {},
	espObjects = {},
	sellCounter = 0,
	lastESPUpdate = 0,
	biteEnded = false,
	frozenCFrame = nil,
	oldNamecall = nil,
	oldIndex = nil,
	oldNewindex = nil,
	sessionStart = os.clock(),

	-- Net module refs (Nexus Hub v4 pattern).
	netCast = nil,
	netReset = nil,
	netShake = nil,
	shakeStartRF = nil,
	shakeArgs = nil,
	reelController = nil,
}

local ESP_UPDATE_INTERVAL = 2

-- ============================================================
-- UTILITY
-- ============================================================
local function logError(ctx, err)
	warn(string.format("[Fisch] %s: %s", ctx, tostring(err)))
end

local function safeDisconnect(conn)
	pcall(function() conn:Disconnect() end)
end

local function unload()
	state.running = false
	config.autoCast = false
	config.autoShake = false
	config.autoReel = false
	for _, conn in ipairs(state.connections) do
		safeDisconnect(conn)
	end
	table.clear(state.connections)
	for _, obj in ipairs(state.espObjects) do
		pcall(function() obj:Destroy() end)
	end
	table.clear(state.espObjects)
	pcall(function()
		local meta = getrawmetatable(game)
		if not meta then return end
		setreadonly(meta, false)
		if state.oldNamecall then meta.__namecall = state.oldNamecall end
		if state.oldIndex then meta.__index = state.oldIndex end
		if state.oldNewindex then meta.__newindex = state.oldNewindex end
		setreadonly(meta, true)
	end)
	shared.FischByteLoaded = nil
	-- Restore thread identity on unload.
	pcall(function() setthreadidentity(8) end)
end

-- ============================================================
-- NET MODULE LOADING (Nexus Hub v4 pattern)
-- ============================================================
local function loadNetRemotes()
	local ok, err = pcall(function()
		local packages = replicatedStorage:FindFirstChild("packages")
		if not packages then return end
		local netModule = packages:FindFirstChild("Net")
		if not netModule then return end
		local Net = require(netModule)
		if not Net then return end

		state.netCast = Net:RemoteFunction("FishingRod/Cast")
		state.netReset = Net:RemoteEvent("FishingRod/Reset")
		state.netShake = Net:RemoteEvent("LureShake/Shake")
		state.shakeStartRF = Net:RemoteFunction("LureShake/Start")

		-- Intercept ShakeStart to get seed args for humanized shake timing.
		-- Wrapped safely — if this fails or causes issues, shake falls back to other methods.
		if state.shakeStartRF and type(getcallbackvalue) == "function" then
			pcall(function()
				local orig = getcallbackvalue(state.shakeStartRF, "OnClientInvoke")
				if type(orig) == "function" then
					state.shakeStartRF.OnClientInvoke = function(args)
						state.shakeArgs = args
						return orig(args)
					end
				end
			end)
		end

		-- Load ReelController.
		local client = replicatedStorage:FindFirstChild("client")
		if client then
			local controllers = client:FindFirstChild("legacyControllers")
			if controllers then
				local reelMod = controllers:FindFirstChild("ReelController")
				if reelMod then
					state.reelController = require(reelMod)
				end
			end
		end
	end)
	if not ok then logError("loadNetRemotes", err) end
end

-- ============================================================
-- ROD HELPERS
-- ============================================================
local function isRod(tool)
	return tool and tool:IsA("Tool") and tool:FindFirstChild("events") ~= nil
end

local function getEquippedRod()
	local char = LOCAL_PLAYER.Character
	if not char then return nil end
	local tool = char:FindFirstChildOfClass("Tool")
	return isRod(tool) and tool or nil
end

local function getLureValue(rod)
	local values = rod:FindFirstChild("values")
	if not values then return nil end
	return values:FindFirstChild("lure")
end

local function resetRod(rod)
	if state.netReset then
		pcall(function() state.netReset:FireServer() end)
		return
	end
	local resetEvent = rod:FindFirstChild("events") and rod.events:FindFirstChild("reset")
	if resetEvent then
		pcall(function() resetEvent:FireServer() end)
	end
end

-- ============================================================
-- FREEZE / UNFREEZE
-- ============================================================
local function setCharacterFrozen(freeze)
	local character = LOCAL_PLAYER.Character
	if not character then return end
	local hum = character:FindFirstChildOfClass("Humanoid")
	if not hum then return end
	if freeze then
		hum.WalkSpeed = 0
		hum.JumpPower = 0
		local hrp = character:FindFirstChild("HumanoidRootPart")
		if hrp then state.frozenCFrame = hrp.CFrame end
	else
		hum.WalkSpeed = DEFAULT_WALK_SPEED
		hum.JumpPower = DEFAULT_JUMP_POWER
		state.frozenCFrame = nil
	end
end

local function forceUnfreeze()
	local character = LOCAL_PLAYER.Character
	if not character then return end
	local hrp = character:FindFirstChild("HumanoidRootPart")
	local hum = character:FindFirstChildOfClass("Humanoid")
	if hrp then hrp.Anchored = false end
	if hum then
		hum.PlatformStand = false
		hum.WalkSpeed = DEFAULT_WALK_SPEED
		hum.JumpPower = DEFAULT_JUMP_POWER
	end
	state.frozenCFrame = nil
end

-- ============================================================
-- AUTO CAST (independent loop)
-- ============================================================
local castThread = nil

local function autoCastLoop()
	while state.running and config.autoCast do
		local rod = getEquippedRod()
		if not rod then
			task.wait(1)
			continue
		end

		-- If bobber is out or already casted, reset first.
		if rod:FindFirstChild("bobber") or (rod.values and rod.values.casted and rod.values.casted.Value) then
			resetRod(rod)
			if config.humanizeDelays then
				task.wait(rng(0.2, 0.5))
			else
				task.wait(0.3)
			end
		end

		-- Check lure value.
		local lure = getLureValue(rod)
		if lure and lure.Value > 0.001 then
			task.wait(0.1)
			continue
		end

		-- Cast via Net module or fallback.
		local casted = false
		if state.netCast then
			local ok, result = pcall(function()
				return state.netCast:InvokeServer(
					math.clamp(config.castPower, 0, 100),
					config.perfectCast
				)
			end)
			if ok and result == true then
				casted = true
			end
		end

		if not casted then
			local castEvent = rod:FindFirstChild("events") and rod.events:FindFirstChild("cast")
			if castEvent then
				local ok = pcall(function() castEvent:FireServer(100, 1) end)
				if ok then casted = true end
			end
		end

		if casted then
			if config.freezeWhileFishing then
				setCharacterFrozen(true)
			end
			if config.humanizeDelays then
				task.wait(rng(0.4, 0.8))
			else
				task.wait(0.5)
			end
		else
			task.wait(1)
		end
	end
end

local function startAutoCast()
	if castThread and coroutine.status(castThread) ~= "dead" then return end
	castThread = task.spawn(autoCastLoop)
end

-- ============================================================
-- AUTO SHAKE (independent loop — works alongside manual casting)
-- ============================================================
local shakeThread = nil

---Shake via firesignal (mobile-safe).
local function doShakeFiresignal()
	local shakeui = PLAYER_GUI:FindFirstChild("shakeui")
	if not shakeui then return false end
	if shakeui:IsA("ScreenGui") and not shakeui.Enabled then return false end
	local safezone = shakeui:FindFirstChild("safezone")
	if not safezone then return false end
	local button = safezone:FindFirstChild("button")
	if not button or not button.Visible then return false end
	return pcall(function() firesignal(button.MouseButton1Click) end)
end

---Shake via mouse click (mobile-safe).
local function doShakeMouse()
	local shakeui = PLAYER_GUI:FindFirstChild("shakeui")
	if not shakeui then return false end
	if shakeui:IsA("ScreenGui") and not shakeui.Enabled then return false end
	local safezone = shakeui:FindFirstChild("safezone")
	if not safezone then return false end
	local button = safezone:FindFirstChild("button")
	if not button or not button.Visible then return false end
	if button.Size ~= UDim2.new(2, 0, 2, 0) then
		button.Size = UDim2.new(2, 0, 2, 0)
	end
	local posX = button.AbsolutePosition.X + button.AbsoluteSize.X / 2
	local posY = button.AbsolutePosition.Y + button.AbsoluteSize.Y / 2
	if posX <= 0 and posY <= 0 then return false end
	virtualInputManager:SendMouseButtonEvent(posX, posY, 0, true, game, 1)
	virtualInputManager:SendMouseButtonEvent(posX, posY, 0, false, game, 1)
	return true
end

---Shake via Net module remote (mobile-safe).
local function doShakeRemote()
	if state.netShake then
		local ok = pcall(function() state.netShake:FireServer() end)
		if ok then return true end
	end
	local shakeui = PLAYER_GUI:FindFirstChild("shakeui")
	if not shakeui then return false end
	local safezone = shakeui:FindFirstChild("safezone")
	if not safezone then return false end
	local button = safezone:FindFirstChild("button")
	if not button then return false end
	local shakeRemote = button:FindFirstChild("shake")
	if shakeRemote and shakeRemote:IsA("RemoteEvent") then
		return pcall(function() shakeRemote:FireServer() end)
	end
	return false
end

---Shake via keyboard (PC ONLY).
local function doShakeKeyboard()
	if IS_MOBILE then return false end
	local shakeui = PLAYER_GUI:FindFirstChild("shakeui")
	if not shakeui then return false end
	local safezone = shakeui:FindFirstChild("safezone")
	if not safezone then return false end
	local button = safezone:FindFirstChild("button")
	if not button or not button.Visible then return false end
	guiService.SelectedObject = button
	if guiService.SelectedObject == button then
		virtualInputManager:SendKeyEvent(true, Enum.KeyCode.Return, false, game)
		virtualInputManager:SendKeyEvent(false, Enum.KeyCode.Return, false, game)
		return true
	end
	return false
end

---Nexus Hub v4 seed-based shake (most humanized).
local function doShakeSeedBased()
	if not state.shakeArgs then return false end
	local args = state.shakeArgs
	state.shakeArgs = nil

	local ok = pcall(function()
		local rngObj = Random.new(args.seed)
		local scale = args.ShakeScale or 1
		local cooldown = 0.25 / scale
		local acc = args.initialTimer
		local needed = 0
		while acc > 0 and needed < 60 do
			acc = acc - rngObj:NextNumber(0.5, 1.5)
			needed = needed + 1
		end
		-- Humanized initial delay.
		task.wait(math.random(35, 60) / 100)
		for i = 1, needed do
			if not config.autoShake then break end
			if state.netShake then
				pcall(function() state.netShake:FireServer() end)
			else
				doShakeRemote()
			end
			task.wait(cooldown + math.random(30, 80) / 1000)
		end
	end)
	return ok
end

---Perform shake with best method for platform.
local function doShake()
	-- Try seed-based shake first (most humanized, from Nexus Hub v4).
	if doShakeSeedBased() then return true end

	local method = config.shakeMethod
	if method == "auto" then
		if IS_MOBILE then
			if doShakeFiresignal() then return true end
			if doShakeMouse() then return true end
			return doShakeRemote()
		else
			if doShakeKeyboard() then return true end
			if doShakeMouse() then return true end
			if doShakeFiresignal() then return true end
			return doShakeRemote()
		end
	end
	if method == "firesignal" then return doShakeFiresignal() end
	if method == "mouse" then return doShakeMouse() end
	if method == "remote" then return doShakeRemote() end
	if method == "keyboard" then return doShakeKeyboard() end
	return false
end

local function autoShakeLoop()
	while state.running and config.autoShake do
		local shakeui = PLAYER_GUI:FindFirstChild("shakeui")
		if shakeui then
			local shook = doShake()
			if shook then
				if config.humanizeDelays then
					task.wait(rng(config.shakeSpeed * 0.7, config.shakeSpeed * 1.3))
				else
					task.wait(config.shakeSpeed)
				end
			else
				task.wait(0.05)
			end
		else
			task.wait(0.1)
		end
	end
end

local function startAutoShake()
	if shakeThread and coroutine.status(shakeThread) ~= "dead" then return end
	shakeThread = task.spawn(autoShakeLoop)
end

-- ============================================================
-- AUTO REEL (independent — works alongside manual fishing)
-- ============================================================
local reelThread = nil

local function findReelFinishedRemote()
	local events = replicatedStorage:FindFirstChild("events")
	if not events then return nil end
	return events:FindFirstChild("reelfinished") or events:FindFirstChild("reelfinished ")
end

---Solve reel using ReelController (Nexus Hub v4 pattern).
local function solveReelController(reel)
	if not reel then return false end

	if config.reelMode == "instant" then
		-- Wait for ready then end minigame.
		local t0 = os.clock()
		while not reel.ready and os.clock() - t0 < 15 do
			task.wait(0.05)
		end
		if state.reelController.ActiveReel == reel then
			local ok = pcall(function() reel:EndMinigame(true) end)
			return ok
		end
	else
		-- Legit mode: bar lock runs in RenderStepped, just wait.
		local t0 = os.clock()
		while state.reelController.ActiveReel == reel and os.clock() - t0 < 180 do
			task.wait(0.1)
		end
		return true
	end
	return false
end

---Solve reel via upvalue manipulation.
local function solveReelUpvalue()
	local reelGui = PLAYER_GUI:FindFirstChild("reel")
	if not reelGui then return false end
	local bar = reelGui:FindFirstChild("bar")
	if not bar then return false end
	local reelClient = bar:FindFirstChild("reel")
	if not reelClient then return false end
	if reelClient.Disabled then reelClient.Disabled = false end

	return pcall(function()
		local env = getsenv(reelClient)
		if not env then return end
		local updateColors = env.UpdateColors
		if not updateColors then return end
		setupvalue(updateColors, 1, 100)
		local reelfinished = findReelFinishedRemote()
		if reelfinished then
			reelfinished:FireServer(getupvalue(updateColors, 1), true)
		end
	end)
end

---Solve reel via simple remote fire.
local function solveReelSimple()
	local reelfinished = findReelFinishedRemote()
	if not reelfinished then return false end
	return pcall(function() reelfinished:FireServer(100, true) end)
end

local function autoReelLoop()
	while state.running and config.autoReel do
		-- Check for active reel via ReelController.
		if state.reelController and state.reelController.ActiveReel then
			local reel = state.reelController.ActiveReel
			solveReelController(reel)

			-- Post-reel actions.
			state.sellCounter = state.sellCounter + 1
			if config.autoSell and state.sellCounter >= config.sellInterval then
				task.wait(0.3)
				pcall(function()
					local world = workspace:FindFirstChild("world")
					if not world then return end
					local npcs = world:FindFirstChild("npcs")
					if not npcs then return end
					local merchant = npcs:FindFirstChild(MERCHANT_NAME)
					if not merchant then return end
					local sellall = merchant:FindFirstChild("merchant") and merchant.merchant:FindFirstChild("sellall")
					if sellall and sellall:IsA("RemoteFunction") then
						sellall:InvokeServer()
					end
				end)
				state.sellCounter = 0
			end

			if config.autoAppraise then
				task.wait(0.2)
				pcall(function()
					local events = replicatedStorage:FindFirstChild("events")
					if not events then return end
					local appraise = events:FindFirstChild("appraise") or events:FindFirstChild("appraiseall")
					if not appraise then return end
					if appraise:IsA("RemoteFunction") then appraise:InvokeServer()
					elseif appraise:IsA("RemoteEvent") then appraise:FireServer() end
				end)
			end

			if config.humanizeDelays then
				task.wait(rng(0.3, 0.8))
			else
				task.wait(0.5)
			end
		else
			task.wait(0.1)
		end
	end
end

local function startAutoReel()
	if reelThread and coroutine.status(reelThread) ~= "dead" then return end
	reelThread = task.spawn(autoReelLoop)
end

-- ============================================================
-- SELL / ESP / TELEPORT / SPEAR
-- ============================================================
local function sellAll()
	pcall(function()
		local world = workspace:FindFirstChild("world")
		if not world then return end
		local npcs = world:FindFirstChild("npcs")
		if not npcs then return end
		local merchant = npcs:FindFirstChild(MERCHANT_NAME)
		if not merchant then return end
		local sellall = merchant:FindFirstChild("merchant") and merchant.merchant:FindFirstChild("sellall")
		if sellall and sellall:IsA("RemoteFunction") then sellall:InvokeServer() end
	end)
end

local function clearESP()
	for _, obj in ipairs(state.espObjects) do pcall(function() obj:Destroy() end) end
	table.clear(state.espObjects)
end

local function updateFishESP()
	clearESP()
	if not config.fishESP then return end
	pcall(function()
		for _, zone in ipairs(collectionService:GetTagged("SpearfishingZone")) do
			local h = Instance.new("Highlight")
			h.Adornee = zone; h.FillColor = Color3.fromRGB(0, 200, 255)
			h.OutlineColor = Color3.fromRGB(255, 255, 0); h.FillTransparency = 0.6
			h.Parent = zone; table.insert(state.espObjects, h)
		end
		for _, d in ipairs(workspace:GetDescendants()) do
			if d:IsA("BasePart") and d.Name:lower():find("fish") then
				local h = Instance.new("Highlight")
				h.Adornee = d; h.FillColor = Color3.fromRGB(0, 255, 100)
				h.OutlineColor = Color3.fromRGB(255, 255, 255); h.FillTransparency = 0.5
				h.Parent = d; table.insert(state.espObjects, h)
			end
		end
	end)
end

local function teleportToNearestBobber()
	local character = LOCAL_PLAYER.Character
	if not character then return end
	local hrp = character:FindFirstChild("HumanoidRootPart")
	if not hrp then return end
	local closest, closestDist = nil, math.huge
	for _, d in ipairs(workspace:GetDescendants()) do
		if d:IsA("BasePart") and d.Name:lower():find("bobber") then
			local dist = (d.Position - hrp.Position).Magnitude
			if dist < closestDist then closestDist = dist; closest = d end
		end
	end
	if closest then hrp.CFrame = closest.CFrame + Vector3.new(0, 5, 0) end
end

local function spearFishAutoFarm()
	pcall(function()
		local net = replicatedStorage:FindFirstChild("packages") and replicatedStorage.packages:FindFirstChild("Net")
		if not net then return end
		local spearRemote = net:FindFirstChild("RE/SpearFishing/Minigame")
		if not spearRemote then return end
		for _, zone in ipairs(collectionService:GetTagged("SpearfishingZone")) do
			local zoneFish = zone:FindFirstChild("ZoneFish")
			if not zoneFish then continue end
			for _, fish in ipairs(zoneFish:GetChildren()) do
				local uid = fish:GetAttribute("UID")
				if uid then
					task.spawn(function()
						spearRemote:FireServer(uid)
						task.wait()
						spearRemote:FireServer(uid, true)
					end)
					task.wait()
				end
			end
		end
	end)
end

-- ============================================================
-- SAFETY HOOKS
-- ============================================================
local function watchBobbers()
	table.insert(state.connections, workspace.DescendantAdded:Connect(function(d)
		if not state.running then return end
		if d:IsA("BasePart") and d.Name:lower():find("bobber") then
			task.defer(function()
				if d.Parent then
					for _, desc in ipairs(d:GetDescendants()) do
						if desc:IsA("Attachment") and (desc.Name == "bob" or desc.Name == "bodyweld") then
							desc:Destroy()
						end
					end
				end
			end)
		end
	end))
end

local function installSafetyHooks()
	local ok, err = pcall(function()
		local meta = getrawmetatable(game)
		if not meta then return end
		setreadonly(meta, false)

		state.oldNamecall = meta.__namecall
		state.oldIndex = meta.__index
		state.oldNewindex = meta.__newindex

		-- __namecall: anti-kick, anti-AFK, spoof property signals.
		meta.__namecall = newcclosure(function(self, ...)
			local method = getnamecallmethod()
			local args = {...}

			if config.antiKick and not checkcaller() then
				if method == "Kick" or method == "kick" then return end
			end

			if config.antiAFK and method == "FireServer" and self.Name == "afk" then
				args[1] = false
				return state.oldNamecall(self, unpack(args))
			end

			if config.spoofProperties and not checkcaller() then
				if method == "GetPropertyChangedSignal" then
					local prop = args[1]
					if prop == "WalkSpeed" or prop == "JumpPower" or prop == "JumpHeight" then
						args[1] = "ClassName"
						return state.oldNamecall(self, unpack(args))
					end
				end
			end

			return state.oldNamecall(self, ...)
		end)

		-- __index: spoof WalkSpeed/JumpPower reads (local player only).
		if config.spoofProperties then
			meta.__index = newcclosure(function(self, index)
				if not checkcaller() and self and index then
					if typeof(self) == "Instance" and self:IsA("Humanoid") then
						-- Only spoof our own humanoid to avoid breaking other systems.
						local char = LOCAL_PLAYER.Character
						if char and self:IsDescendantOf(char) then
							if index == "WalkSpeed" then return DEFAULT_WALK_SPEED end
							if index == "JumpPower" then return DEFAULT_JUMP_POWER end
							if index == "JumpHeight" then return 7.2 end
						end
					end
				end
				return state.oldIndex(self, index)
			end)
		end

		-- __newindex: DISABLED by default — blocking WalkSpeed/JumpPower writes
		-- causes "invalid client" because server verifies the values changed.
		-- Set SPOOF_NEWINDEX = true to enable at your own risk.
		local SPOOF_NEWINDEX = false
		if SPOOF_NEWINDEX and config.spoofProperties then
			meta.__newindex = newcclosure(function(self, index, value)
				if not checkcaller() and self and index then
					if typeof(self) == "Instance" and self:IsA("Humanoid") then
						if index == "WalkSpeed" or index == "JumpPower" or index == "JumpHeight" then
							return
						end
					end
				end
				return state.oldNewindex(self, index, value)
			end)
		end

		setreadonly(meta, true)
	end)
	if not ok then logError("installSafetyHooks", err) end
end

-- ============================================================
-- HEARTBEAT
-- ============================================================
local function onHeartbeat()
	if not state.running then return end
	local character = LOCAL_PLAYER.Character
	if not character then return end
	local hrp = character:FindFirstChild("HumanoidRootPart")
	local hum = character:FindFirstChildOfClass("Humanoid")

	if hrp and hrp.Anchored then hrp.Anchored = false end
	if hum and hum.PlatformStand then hum.PlatformStand = false end

	-- CFrame lock while casting.
	if state.frozenCFrame and hrp and config.freezeWhileFishing and config.autoCast then
		hrp.CFrame = state.frozenCFrame
	end

	-- ReelController bar lock (Nexus Hub v4 pattern).
	if state.reelController and config.autoReel then
		local reel = state.reelController.ActiveReel
		if reel then
			pcall(function()
				reel.frozenUntil = math.max(reel.frozenUntil, tick() + 0.25)
				reel.barPosition = reel.fishPosition
				reel.onbar = true
			end)
		end
	end
end

-- ============================================================
-- ENTRY POINT
-- ============================================================
local function onMainError(error)
	warn("[Fisch] Fatal:", error, debug.traceback())
	unload()
end

---Anti-cheat scan: DISABLED by default — too aggressive, causes "invalid client".
---Only enable if you know what you're doing and accept the risk.
local AC_SCANNER_ENABLED = false

local function scanForAntiCheat()
	if not AC_SCANNER_ENABLED then return end
	if type(getgc) ~= "function" then return end
	pcall(function()
		for _, v in ipairs(getgc(true)) do
			if typeof(v) == "table" then
				local detected = rawget(v, "Detected")
				local kill = rawget(v, "Kill")
				if type(detected) == "function" then
					hookfunction(detected, function() end)
				end
				if type(kill) == "function" then
					hookfunction(kill, function() end)
				end
			end
		end
	end)
end

local function initializeScript()
	-- Delta supports setfpscap for FPS unlock on mobile.
	pcall(function() setfpscap(9999) end)

	-- Scan and neutralize anti-cheat functions via getgc (Delta supports this).
	task.spawn(scanForAntiCheat)

	task.spawn(loadNetRemotes)

	-- Heartbeat.
	table.insert(state.connections, runService.Heartbeat:Connect(function()
		onHeartbeat()
		if config.fishESP then
			local now = os.clock()
			if now - state.lastESPUpdate >= ESP_UPDATE_INTERVAL then
				state.lastESPUpdate = now
				updateFishESP()
			end
		end
	end))

	-- Anti-AFK.
	table.insert(state.connections, LOCAL_PLAYER.Idled:Connect(function()
		if config.antiAFK then
			virtualUser:CaptureController()
			virtualUser:ClickButton2(Vector2.new())
		end
	end))

	-- Re-enable reel script.
	table.insert(state.connections, PLAYER_GUI.DescendantAdded:Connect(function(d)
		if d.Name == "reel" and d:IsA("LocalScript") and d.Disabled then d.Disabled = false end
	end))

	-- Bite end detection.
	table.insert(state.connections, PLAYER_GUI.DescendantRemoving:Connect(function(d)
		if d.Name == "playerbar" and d.Parent and d.Parent.Name == "bar" then state.biteEnded = true end
		if d.Name == "reel" and d:IsA("ScreenGui") then state.biteEnded = true end
	end))

	watchBobbers()
	installSafetyHooks()

	LOCAL_PLAYER.CharacterAdded:Connect(function()
		state.sellCounter = 0
		state.biteEnded = false
		state.frozenCFrame = nil
		if config.freezeWhileFishing then task.wait(1); setCharacterFrozen(false) end
	end)

	-- Session watchdog.
	task.spawn(function()
		while state.running do
			task.wait(60)
			local hours = (os.clock() - state.sessionStart) / 3600
			if hours >= MAX_SESSION_HOURS then
				warn("[Fisch] Session limit (" .. MAX_SESSION_HOURS .. "h). Auto-stopping.")
				config.autoCast = false
				config.autoShake = false
				config.autoReel = false
				setCharacterFrozen(false)
				break
			end
		end
	end)

	-- ============================================================
	-- GUI (Rayfield)
	-- ============================================================
	local Rayfield = loadstring(game:HttpGet("https://sirius.menu/rayfield"))()

	local compatCount = 0
	for _, v in pairs(DELTA_COMPAT) do if v then compatCount = compatCount + 1 end end
	local platformLabel = IS_MOBILE and "Delta Mobile" or "Delta PC"

	local Window = Rayfield:CreateWindow({
		Name = "Fisch v5.0 | " .. platformLabel,
		LoadingTitle = "Fisch Byte",
		LoadingSubtitle = "Δ " .. compatCount .. "/15 compatible",
		ConfigurationSaving = {
			Enabled = true,
			FolderName = "FischByte",
			FileName = "Config_v5",
		},
		KeySystem = false,
	})

	-- ==================== FISHING TAB ====================
	local FishingTab = Window:CreateTab("Fishing", 4483362458)

	FishingTab:CreateSection("Auto Cast")

	FishingTab:CreateToggle({
		Name = "Enable Auto Cast",
		CurrentValue = false,
		Flag = "AutoCast",
		Callback = function(v)
			config.autoCast = v
			if v then startAutoCast() end
		end,
	})

	FishingTab:CreateToggle({
		Name = "Perfect Cast (hook)",
		CurrentValue = false,
		Flag = "PerfectCast",
		Callback = function(v) config.perfectCast = v end,
	})

	FishingTab:CreateSlider({
		Name = "Cast Power",
		Range = {10, 100},
		Increment = 5,
		Suffix = "%",
		CurrentValue = 100,
		Flag = "CastPower",
		Callback = function(v) config.castPower = v end,
	})

	FishingTab:CreateToggle({
		Name = "Freeze While Casting",
		CurrentValue = false,
		Flag = "FreezeCast",
		Callback = function(v)
			config.freezeWhileFishing = v
			if not v then setCharacterFrozen(false) end
		end,
	})

	FishingTab:CreateSection("Auto Shake")

	FishingTab:CreateToggle({
		Name = "Enable Auto Shake",
		CurrentValue = false,
		Flag = "AutoShake",
		Callback = function(v)
			config.autoShake = v
			if v then startAutoShake() end
		end,
	})

	local shakeOptions = IS_MOBILE
		and {"auto", "firesignal", "mouse", "remote"}
		or {"auto", "firesignal", "mouse", "remote", "keyboard"}

	FishingTab:CreateDropdown({
		Name = "Shake Method",
		Options = shakeOptions,
		CurrentOption = {"auto"},
		Flag = "ShakeMethod",
		Callback = function(opt)
			config.shakeMethod = opt[1] or opt
		end,
	})

	FishingTab:CreateSlider({
		Name = "Shake Speed (ms)",
		Range = {1, 20},
		Increment = 1,
		Suffix = "ms",
		CurrentValue = 5,
		Flag = "ShakeSpeed",
		Callback = function(v) config.shakeSpeed = v / 100 end,
	})

	FishingTab:CreateSection("Auto Reel")

	FishingTab:CreateToggle({
		Name = "Enable Auto Reel",
		CurrentValue = false,
		Flag = "AutoReel",
		Callback = function(v)
			config.autoReel = v
			if v then startAutoReel() end
		end,
	})

	FishingTab:CreateDropdown({
		Name = "Reel Mode",
		Options = {"legit", "instant"},
		CurrentOption = {"legit"},
		Flag = "ReelMode",
		Callback = function(opt)
			config.reelMode = opt[1] or opt
		end,
	})

	-- ==================== SELLING TAB ====================
	local SellTab = Window:CreateTab("Selling", 4335470520)

	SellTab:CreateSection("Auto Sell")

	SellTab:CreateToggle({
		Name = "Auto Sell",
		CurrentValue = false,
		Flag = "AutoSell",
		Callback = function(v) config.autoSell = v end,
	})

	SellTab:CreateSlider({
		Name = "Sell Every N Catches",
		Range = {1, 50},
		Increment = 1,
		Suffix = " fish",
		CurrentValue = 10,
		Flag = "SellInterval",
		Callback = function(v) config.sellInterval = v end,
	})

	SellTab:CreateToggle({
		Name = "Auto Appraise",
		CurrentValue = false,
		Flag = "AutoAppraise",
		Callback = function(v) config.autoAppraise = v end,
	})

	SellTab:CreateButton({
		Name = "Sell All Fish Now",
		Callback = function()
			sellAll()
			Rayfield:Notify({
				Title = "Fisch Byte",
				Content = "Sold all fish!",
				Duration = 3,
				Image = 4483362458,
			})
		end,
	})

	-- ==================== SAFETY TAB ====================
	local SafetyTab = Window:CreateTab("Safety", 4370318776)

	SafetyTab:CreateSection("Protection")

	SafetyTab:CreateToggle({
		Name = "Anti Kick",
		CurrentValue = true,
		Flag = "AntiKick",
		Callback = function(v) config.antiKick = v end,
	})

	SafetyTab:CreateToggle({
		Name = "Anti AFK",
		CurrentValue = true,
		Flag = "AntiAFK",
		Callback = function(v) config.antiAFK = v end,
	})

	SafetyTab:CreateToggle({
		Name = "Spoof WalkSpeed / JumpPower",
		CurrentValue = true,
		Flag = "SpoofProps",
		Callback = function(v) config.spoofProperties = v end,
	})

	SafetyTab:CreateToggle({
		Name = "Humanize Delays",
		CurrentValue = true,
		Flag = "Humanize",
		Callback = function(v) config.humanizeDelays = v end,
	})

	SafetyTab:CreateSection("Status")

	SafetyTab:CreateParagraph({
		Title = "Delta Compatibility",
		Content = compatCount .. "/15 functions supported\nPlatform: " .. platformLabel,
	})

	-- ==================== UTILITY TAB ====================
	local UtilTab = Window:CreateTab("Utility", 4370345189)

	UtilTab:CreateSection("Visual")

	UtilTab:CreateToggle({
		Name = "Fish ESP",
		CurrentValue = false,
		Flag = "FishESP",
		Callback = function(v)
			config.fishESP = v
			if not v then clearESP() end
		end,
	})

	UtilTab:CreateSection("Teleport")

	UtilTab:CreateButton({
		Name = "Teleport to Nearest Bobber",
		Callback = function()
			teleportToNearestBobber()
			Rayfield:Notify({
				Title = "Fisch Byte",
				Content = "Teleported to nearest bobber!",
				Duration = 3,
				Image = 4483362458,
			})
		end,
	})

	UtilTab:CreateButton({
		Name = "Spear Fish Auto Farm",
		Callback = function()
			spearFishAutoFarm()
			Rayfield:Notify({
				Title = "Fisch Byte",
				Content = "Spear fishing triggered!",
				Duration = 3,
				Image = 4483362458,
			})
		end,
	})

	UtilTab:CreateSection("Character")

	UtilTab:CreateButton({
		Name = "Force Unfreeze",
		Callback = function()
			forceUnfreeze()
			Rayfield:Notify({
				Title = "Fisch Byte",
				Content = "Character unfrozen!",
				Duration = 3,
				Image = 4483362458,
			})
		end,
	})

	-- ==================== SCRIPT TAB ====================
	local ScriptTab = Window:CreateTab("Script", 4483362458)

	ScriptTab:CreateSection("Script")

	ScriptTab:CreateButton({
		Name = "Unload Script",
		Callback = function()
			Rayfield:Destroy()
			unload()
		end,
	})

	-- Startup notification.
	Rayfield:Notify({
		Title = "Fisch Byte v5.0",
		Content = "Delta optimized | " .. compatCount .. "/15 compat | " .. platformLabel,
		Duration = 5,
		Image = 4483362458,
	})
end

xpcall(initializeScript, onMainError)
