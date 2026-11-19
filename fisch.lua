--!strict
--!optimize 2
-- ENV: Roblox Luau Client

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local VirtualUser = game:GetService("VirtualUser")

local LocalPlayer = Players.LocalPlayer

-- Type definitions for strict mode
type Config = {
	AutoFish: boolean,
	AutoShake: boolean,
	AutoReel: boolean,
	AntiAFK: boolean,
}

type RemotesType = {
	RodCast: RemoteEvent?,
	ReelFinished: RemoteEvent?,
	Shake: RemoteEvent?,
}

-- Constants
local CONFIG: Config = {
	AutoFish = false,
	AutoShake = true,
	AutoReel = true,
	AntiAFK = true,
}

local Remotes: RemotesType = {
	RodCast = nil,
	ReelFinished = nil,
	Shake = nil,
}

-- FIX(B1): Guard clause untuk mencegah double-inject, reset state di unload
if getgenv().LoadedGodFisch then
	warn("[K] Script already running.")
	return
end
getgenv().LoadedGodFisch = true

local connections: {RBXScriptConnection} = {}
local cachedShakeButton: (TextButton | ImageButton)? = nil
local isFishing: boolean = true

-- Error logger (FIX(B6): jangan telan error mentah-mentah)
local function logError(context: string, err: any)
	warn(string.format("[K] Error in %s: %s", context, tostring(err)))
end

local function safeDisconnect(conn: RBXScriptConnection)
	local success, err = pcall(function()
		conn:Disconnect()
	end)
	if not success then logError("safeDisconnect", err) end
end

local function unload()
	isFishing = false
	for _, conn in ipairs(connections) do
		safeDisconnect(conn)
	end
	table.clear(connections) -- FIX(B7): clear tabel koneksi
	getgenv().LoadedGodFisch = false
end

-- Fetch Remotes
task.spawn(function()
	local events = ReplicatedStorage:WaitForChild("events", 10)
	if events then
		Remotes.RodCast = events:WaitForChild("rod_cast", 5) :: RemoteEvent?
		Remotes.ReelFinished = events:WaitForChild("reelfinished", 5) :: RemoteEvent?
	end
	
	local resources = ReplicatedStorage:FindFirstChild("resources")
	if resources then
		local replicated = resources:FindFirstChild("replicated")
		if replicated then
			local fishing = replicated:FindFirstChild("fishing")
			if fishing then
				local shakeui = fishing:FindFirstChild("shakeui")
				if shakeui then
					local safezone = shakeui:FindFirstChild("safezone")
					if safezone then
						local shakeui2 = safezone:FindFirstChild("shakeui")
						if shakeui2 then
							local button = shakeui2:FindFirstChild("button")
							if button then
								Remotes.Shake = button:FindFirstChild("shake") :: RemoteEvent?
							end
						end
					end
				end
			end
		end
	end
end)

-- FIX(B2): Guard clause ketat pada status karakter
local function onHeartbeat()
	local char = LocalPlayer.Character
	if not char then return end
	
	local hrp = char:FindFirstChild("HumanoidRootPart") :: BasePart?
	local hum = char:FindFirstChildOfClass("Humanoid")
	
	if hrp and hrp.Anchored then
		hrp.Anchored = false
	end
	
	if hum and hum.PlatformStand then
		hum.PlatformStand = false
	end
end
table.insert(connections, RunService.Heartbeat:Connect(onHeartbeat))

-- Anti-AFK
local function onIdled()
	if CONFIG.AntiAFK then
		VirtualUser:CaptureController()
		VirtualUser:ClickButton2(Vector2.new())
	end
end
table.insert(connections, LocalPlayer.Idled:Connect(onIdled))

-- FIX(B3): Cache hasil GetDescendants untuk mencari tombol UI
local function getShakeButton(): (TextButton | ImageButton)?
	if cachedShakeButton and cachedShakeButton.Parent then
		return cachedShakeButton
	end
	local pg = LocalPlayer:FindFirstChild("PlayerGui")
	if not pg then return nil end
	
	local shakeui = pg:FindFirstChild("shakeui")
	if not shakeui then return nil end
	
	for _, d in ipairs(shakeui:GetDescendants()) do
		if (d:IsA("TextButton") or d:IsA("ImageButton")) and d.Visible then
			cachedShakeButton = d
			return d
		end
	end
	return nil
end

local function doCast(): boolean
	local char = LocalPlayer.Character
	if not char then return false end
	
	local rod = char:FindFirstChildWhichIsA("Tool")
	if not rod then
		local bp = LocalPlayer:FindFirstChild("Backpack")
		if bp then
			for _, item in ipairs(bp:GetChildren()) do
				if item:IsA("Tool") and string.find(item.Name:lower(), "rod", 1, true) then
					item.Parent = char
					task.wait(0.3)
					rod = item
					break
				end
			end
		end
	end
	
	if rod then
		local success, err = pcall(function()
			rod:Activate()
		end)
		if success then return true end
		logError("doCast:Activate", err)
	end
	
	if Remotes.RodCast then
		local success, err = pcall(function()
			Remotes.RodCast:FireServer()
		end)
		if success then return true end
		logError("doCast:FireServer", err)
	end
	
	return false
end

local function doShake(btn: Instance)
	if Remotes.Shake then
		local success, err = pcall(function()
			Remotes.Shake:FireServer()
		end)
		if not success then logError("doShake:FireServer", err) end
	end
	
	if btn then
		local success, err = pcall(function()
			btn:Click()
		end)
		if not success then logError("doShake:Click", err) end
	end
end

local function doReel()
	if not Remotes.ReelFinished then return end
	local success, err = pcall(function()
		Remotes.ReelFinished:FireServer(true)
	end)
	if not success then logError("doReel:true", err) end
	
	task.wait(0.1) -- FIX(B4): jeda antar remote fire agar tidak di-flag spam
	
	local success2, err2 = pcall(function()
		Remotes.ReelFinished:FireServer()
	end)
	if not success2 then logError("doReel:nil", err2) end
end

-- Fishing Loop
task.spawn(function()
	while isFishing do
		if CONFIG.AutoFish then
			local casted = doCast()
			if casted then
				task.wait(1.5)
				
				-- FIX(B5): os.clock() ganti tick() yang deprecated
				local deadline = os.clock() + 15
				local hadBite = false
				
				while isFishing and os.clock() < deadline and CONFIG.AutoFish do
					local btn = getShakeButton()
					if btn then
						hadBite = true
						if CONFIG.AutoShake then
							doShake(btn)
							task.wait(0.08)
						end
					else
						if hadBite then break end
						task.wait(0.1)
					end
				end
				
				if isFishing and CONFIG.AutoReel then
					doReel()
				end
				task.wait(2)
			else
				task.wait(1)
			end
		else
			task.wait(0.5)
		end
	end
end)

-- UI
local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()
local Window = Rayfield:CreateWindow({
	Name = "Fisch | [K] God-Tier",
	LoadingTitle = "Injecting [K] Engine...",
	LoadingSubtitle = "bypassing freeze, fixing casts",
	ConfigurationSaving = { Enabled = true, FolderName = "K_Fisch", FileName = "GodTier" },
	KeySystem = false,
})

local MainTab = Window:CreateTab("Automation", 4483362458)
MainTab:CreateSection("The Ultimate Loop")
MainTab:CreateToggle({
	Name = "Auto Fish (All-in-One)",
	CurrentValue = false,
	Flag = "AutoFish",
	Callback = function(v: boolean) CONFIG.AutoFish = v end,
})
MainTab:CreateToggle({
	Name = "Auto Shake",
	CurrentValue = true,
	Flag = "AutoShake",
	Callback = function(v: boolean) CONFIG.AutoShake = v end,
})
MainTab:CreateToggle({
	Name = "Auto Reel",
	CurrentValue = true,
	Flag = "AutoReel",
	Callback = function(v: boolean) CONFIG.AutoReel = v end,
})

local FixTab = Window:CreateTab("Fixer", 4483362458)
FixTab:CreateSection("If stuck, tap here")
FixTab:CreateButton({
	Name = "FORCE UNFREEZE",
	Callback = function()
		local char = LocalPlayer.Character
		if char then
			local hum = char:FindFirstChildOfClass("Humanoid")
			local hrp = char:FindFirstChild("HumanoidRootPart") :: BasePart?
			if hrp then hrp.Anchored = false end
			if hum then
				hum.PlatformStand = false
				hum.WalkSpeed = 16
			end
			Rayfield:Notify({ Title = "Unfrozen", Content = "Bisa gerak lagi.", Duration = 3 })
		end
	end,
})

FixTab:CreateButton({
	Name = "UNLOAD SCRIPT",
	Callback = function()
		unload()
		if Rayfield then
			Rayfield:Destroy()
		end
	end,
})

Rayfield:Notify({ Title = "[K] God-Tier Ready", Content = "Cast, Shake, Reel 100% rewritten.", Duration = 5, Image = 4483362458 })
