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
	autoServe = true,
	autoCollect = true,
	autoUpgrade = false,
	walkSpeed = 32
}

-- Constants.
local LOOP_INTERVAL = 0.25

-- Services.
local playersService = game:GetService("Players")
local replicatedStorage = game:GetService("ReplicatedStorage")
local runService = game:GetService("RunService")
local workspaceService = game:GetService("Workspace")

-- State.
local localPlayer = playersService.LocalPlayer
local activeConnection = nil

---Find and trigger nearby proximity prompts for serving customers.
local function serveCustomers()
	local character = localPlayer.Character
	if not character then return end

	local hrp = character:FindFirstChild("HumanoidRootPart")
	if not hrp then return end

	for _, descendant in ipairs(workspaceService:GetDescendants()) do
		if descendant:IsA("ProximityPrompt") and descendant.Enabled then
			local parent = descendant.Parent
			if parent and parent:IsA("BasePart") then
				local dist = (parent.Position - hrp.Position).Magnitude
				if dist <= descendant.MaxActivationDistance + 10 then
					fireproximityprompt(descendant)
				end
			end
		end
	end
end

---Collect cash or tips dropped in the workspace.
local function collectCash()
	local character = localPlayer.Character
	if not character then return end

	local hrp = character:FindFirstChild("HumanoidRootPart")
	if not hrp then return end

	for _, descendant in ipairs(workspaceService:GetDescendants()) do
		if descendant:IsA("BasePart") and (descendant.Name:lower():find("cash") or descendant.Name:lower():find("tip") or descendant.Name:lower():find("money")) then
			if descendant:FindFirstChildOfClass("TouchTransmitter") then
				firetouchinterest(hrp, descendant, 0)
				firetouchinterest(hrp, descendant, 1)
			end
		end
	end
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

---Clean up active connections and state.
function BarberEmpire.detach()
	BarberEmpire.enabled = false
	if activeConnection then
		activeConnection:Disconnect()
		activeConnection = nil
	end
end

---Initialize the main automation loop.
local function initializeScript()
	local lastTick = 0

	activeConnection = runService.Heartbeat:Connect(function()
		if not BarberEmpire.enabled then return end

		updateMovement()

		local now = os.clock()
		if now - lastTick < LOOP_INTERVAL then return end
		lastTick = now

		if BarberEmpire.autoServe then
			serveCustomers()
		end

		if BarberEmpire.autoCollect then
			collectCash()
		end
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
