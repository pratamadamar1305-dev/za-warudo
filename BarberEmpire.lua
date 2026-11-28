-- Check for table that is shared between executions.
if not shared then
	return warn("No shared, no script.")
end

-- Initialize Luraph globals if they do not exist.
loadstring("getfenv().LPH_NO_VIRTUALIZE = function(...) return ... end")()

getfenv().PP_SCRAMBLE_NUM = function(...) return ... end
getfenv().PP_SCRAMBLE_STR = function(...) return ... end
getfenv().PP_SCRAMBLE_RE_NUM = function(...) return ... end

local BarberEmpire = {
	enabled = true,
	autoCut = false,
	autoServe = false,
	autoCollect = false,
	autoPostVideo = false,
	autoUpgrade = false,
	autoClaimRewards = false,
	antiAfk = true,
	infiniteJump = false,
	noclip = false,
	walkSpeed = 16
}

-- Constants.
local LOOP_INTERVAL = 0.2
local SLOW_LOOP_INTERVAL = 2.0
local RAYFIELD_URL = "https://sirius.menu/rayfield"
local CUT_KEYWORDS = { "cut", "trim", "shave", "clip", "scissor", "barber", "hair", "style", "finish" }
local SERVE_KEYWORDS = { "serve", "seat", "chair", "clean", "sweep", "restock", "refill", "customer" }
local COLLECT_KEYWORDS = { "cash", "tip", "money", "coin", "drop" }
local VIDEO_KEYWORDS = { "video", "cliptok", "post", "upload", "record" }
local UPGRADE_KEYWORDS = { "upgrade", "buy", "hire", "build", "tool", "chair", "skill" }
local REWARD_KEYWORDS = { "claim", "reward", "daily", "quest", "playtime", "gift", "index" }

-- Services.
local playersService = game:GetService("Players")
local replicatedStorage = game:GetService("ReplicatedStorage")
local runService = game:GetService("RunService")
local userInputService = game:GetService("UserInputService")
local virtualUser = game:GetService("VirtualUser")
local workspaceService = game:GetService("Workspace")

-- State.
local localPlayer = playersService.LocalPlayer
local heartbeatConnection = nil
local jumpConnection = nil
local noclipConnection = nil
local idledConnection = nil
local rayfieldWindow = nil

---Check if a string matches any keyword in a list.
---@param text string
---@param keywords table
---@return boolean
local function matchesKeyword(text, keywords)
	local lowerText = text:lower()
	for _, keyword in ipairs(keywords) do
		if lowerText:find(keyword, 1, true) then
			return true
		end
	end
	return false
end

---Fire RemoteEvents in ReplicatedStorage matching any keyword.
---@param keywords table
local function fireMatchingRemotes(keywords)
	for _, descendant in ipairs(replicatedStorage:GetDescendants()) do
		if descendant:IsA("RemoteEvent") and matchesKeyword(descendant.Name, keywords) then
			pcall(function()
				descendant:FireServer()
			end)
		end
	end
end

---Trigger nearby ProximityPrompts matching keywords (or all if keywords is nil).
---@param keywords table?
---@param extraRange number?
local function triggerMatchingPrompts(keywords, extraRange)
	local character = localPlayer.Character
	if not character then return end

	local hrp = character:FindFirstChild("HumanoidRootPart")
	if not hrp then return end

	local rangeBonus = extraRange or 12

	for _, descendant in ipairs(workspaceService:GetDescendants()) do
		if descendant:IsA("ProximityPrompt") and descendant.Enabled then
			local shouldTrigger = true
			if keywords then
				local promptText = (descendant.ActionText or "") .. " " .. (descendant.ObjectText or "") .. " " .. descendant.Name
				shouldTrigger = matchesKeyword(promptText, keywords)
			end

			if shouldTrigger then
				local parent = descendant.Parent
				if parent and parent:IsA("BasePart") then
					local dist = (parent.Position - hrp.Position).Magnitude
					if dist <= descendant.MaxActivationDistance + rangeBonus then
						fireproximityprompt(descendant)
					end
				end
			end
		end
	end
end

---Attempt to cut hair using equipped tools, nearby prompts, and cut remotes.
local function performAutoCut()
	local character = localPlayer.Character
	if not character then return end

	local equippedTool = character:FindFirstChildOfClass("Tool")
	if equippedTool then
		equippedTool:Activate()
	end

	triggerMatchingPrompts(CUT_KEYWORDS, 12)
	fireMatchingRemotes(CUT_KEYWORDS)
end

---Serve customers, clean stations, and restock supplies.
local function performAutoServe()
	triggerMatchingPrompts(SERVE_KEYWORDS, 12)
	fireMatchingRemotes(SERVE_KEYWORDS)
end

---Collect cash, tips, coins, and drops in the workspace.
local function performAutoCollect()
	local character = localPlayer.Character
	if not character then return end

	local hrp = character:FindFirstChild("HumanoidRootPart")
	if not hrp then return end

	for _, descendant in ipairs(workspaceService:GetDescendants()) do
		if descendant:IsA("BasePart") and matchesKeyword(descendant.Name, COLLECT_KEYWORDS) then
			if descendant:FindFirstChildOfClass("TouchTransmitter") then
				firetouchinterest(hrp, descendant, 0)
				firetouchinterest(hrp, descendant, 1)
			end
		end
	end

	fireMatchingRemotes(COLLECT_KEYWORDS)
end

---Apply configured walk speed to the local humanoid.
local function updateMovement()
	local character = localPlayer.Character
	if not character then return end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if humanoid and humanoid.WalkSpeed ~= BarberEmpire.walkSpeed then
		humanoid.WalkSpeed = BarberEmpire.walkSpeed
	end
end

---Clean up active connections, UI, and state.
function BarberEmpire.detach()
	BarberEmpire.enabled = false

	if heartbeatConnection then
		heartbeatConnection:Disconnect()
		heartbeatConnection = nil
	end
	if jumpConnection then
		jumpConnection:Disconnect()
		jumpConnection = nil
	end
	if noclipConnection then
		noclipConnection:Disconnect()
		noclipConnection = nil
	end
	if idledConnection then
		idledConnection:Disconnect()
		idledConnection = nil
	end
	if rayfieldWindow then
		pcall(function()
			rayfieldWindow:Destroy()
		end)
		rayfieldWindow = nil
	end
end

---Build and configure the Rayfield user interface.
local function createRayfieldUI()
	local rayfield = loadstring(game:HttpGet(RAYFIELD_URL))()

	rayfieldWindow = rayfield:CreateWindow({
		Name = "Barber Empire",
		LoadingTitle = "Barber Empire",
		LoadingSubtitle = "by Byte",
		ConfigurationSaving = {
			Enabled = false
		}
	})

	local mainTab = rayfieldWindow:CreateTab("Main", 4483362458)

	mainTab:CreateSection("Auto Farm")

	mainTab:CreateToggle({
		Name = "Auto Cut",
		CurrentValue = BarberEmpire.autoCut,
		Flag = "AutoCut",
		Callback = function(value)
			BarberEmpire.autoCut = value
		end
	})

	mainTab:CreateToggle({
		Name = "Auto Serve & Clean",
		CurrentValue = BarberEmpire.autoServe,
		Flag = "AutoServe",
		Callback = function(value)
			BarberEmpire.autoServe = value
		end
	})

	mainTab:CreateToggle({
		Name = "Auto Collect Tips & Cash",
		CurrentValue = BarberEmpire.autoCollect,
		Flag = "AutoCollect",
		Callback = function(value)
			BarberEmpire.autoCollect = value
		end
	})

	mainTab:CreateToggle({
		Name = "Auto Post Videos (ClipTok)",
		CurrentValue = BarberEmpire.autoPostVideo,
		Flag = "AutoPostVideo",
		Callback = function(value)
			BarberEmpire.autoPostVideo = value
		end
	})

	local shopTab = rayfieldWindow:CreateTab("Shop & Rewards", 4483362458)

	shopTab:CreateSection("Automation")

	shopTab:CreateToggle({
		Name = "Auto Upgrade & Buy",
		CurrentValue = BarberEmpire.autoUpgrade,
		Flag = "AutoUpgrade",
		Callback = function(value)
			BarberEmpire.autoUpgrade = value
		end
	})

	shopTab:CreateToggle({
		Name = "Auto Claim Rewards",
		CurrentValue = BarberEmpire.autoClaimRewards,
		Flag = "AutoClaimRewards",
		Callback = function(value)
			BarberEmpire.autoClaimRewards = value
		end
	})

	local playerTab = rayfieldWindow:CreateTab("Player", 4483362458)

	playerTab:CreateSection("Movement")

	playerTab:CreateSlider({
		Name = "Walk Speed",
		Range = { 16, 120 },
		Increment = 1,
		Suffix = "studs",
		CurrentValue = BarberEmpire.walkSpeed,
		Flag = "WalkSpeed",
		Callback = function(value)
			BarberEmpire.walkSpeed = value
		end
	})

	playerTab:CreateToggle({
		Name = "Infinite Jump",
		CurrentValue = BarberEmpire.infiniteJump,
		Flag = "InfiniteJump",
		Callback = function(value)
			BarberEmpire.infiniteJump = value
		end
	})

	playerTab:CreateToggle({
		Name = "Noclip",
		CurrentValue = BarberEmpire.noclip,
		Flag = "Noclip",
		Callback = function(value)
			BarberEmpire.noclip = value
		end
	})

	playerTab:CreateSection("Misc")

	playerTab:CreateToggle({
		Name = "Anti AFK",
		CurrentValue = BarberEmpire.antiAfk,
		Flag = "AntiAfk",
		Callback = function(value)
			BarberEmpire.antiAfk = value
		end
	})

	playerTab:CreateButton({
		Name = "Unload Script",
		Callback = function()
			BarberEmpire.detach()
		end
	})
end

---Initialize the main automation loops, movement helpers, and UI.
local function initializeScript()
	createRayfieldUI()

	local lastFastTick = 0
	local lastSlowTick = 0

	heartbeatConnection = runService.Heartbeat:Connect(function()
		if not BarberEmpire.enabled then return end

		updateMovement()

		local now = os.clock()
		if now - lastFastTick >= LOOP_INTERVAL then
			lastFastTick = now

			if BarberEmpire.autoCut then
				performAutoCut()
			end
			if BarberEmpire.autoServe then
				performAutoServe()
			end
			if BarberEmpire.autoCollect then
				performAutoCollect()
			end
		end

		if now - lastSlowTick >= SLOW_LOOP_INTERVAL then
			lastSlowTick = now

			if BarberEmpire.autoPostVideo then
				fireMatchingRemotes(VIDEO_KEYWORDS)
			end
			if BarberEmpire.autoUpgrade then
				fireMatchingRemotes(UPGRADE_KEYWORDS)
			end
			if BarberEmpire.autoClaimRewards then
				fireMatchingRemotes(REWARD_KEYWORDS)
			end
		end
	end)

	jumpConnection = userInputService.JumpRequest:Connect(function()
		if not BarberEmpire.enabled or not BarberEmpire.infiniteJump then return end

		local character = localPlayer.Character
		local humanoid = character and character:FindFirstChildOfClass("Humanoid")
		if humanoid then
			humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
		end
	end)

	noclipConnection = runService.Stepped:Connect(function()
		if not BarberEmpire.enabled or not BarberEmpire.noclip then return end

		local character = localPlayer.Character
		if not character then return end

		for _, part in ipairs(character:GetDescendants()) do
			if part:IsA("BasePart") and part.CanCollide then
				part.CanCollide = false
			end
		end
	end)

	idledConnection = localPlayer.Idled:Connect(function()
		if not BarberEmpire.enabled or not BarberEmpire.antiAfk then return end

		virtualUser:CaptureController()
		virtualUser:ClickButton2(Vector2.new())
	end)
end

---This is called when initialization errors.
---@param err string
local function onInitializeError(err)
	warn("Failed to initialize BarberEmpire.")
	warn(err)
	warn(debug.traceback())
	BarberEmpire.detach()
end

if shared.BarberEmpire then
	shared.BarberEmpire.detach()
end

shared.BarberEmpire = BarberEmpire

-- Safely initialize the script and handle errors.
xpcall(initializeScript, onInitializeError)

return BarberEmpire
