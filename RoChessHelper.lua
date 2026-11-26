-- Check for table that is shared between executions.
if not shared then
	return warn("No shared, no script.")
end

-- Initialize Luraph globals if they do not exist.
loadstring("getfenv().LPH_NO_VIRTUALIZE = function(...) return ... end")()

getfenv().PP_SCRAMBLE_NUM = function(...) return ... end
getfenv().PP_SCRAMBLE_STR = function(...) return ... end
getfenv().PP_SCRAMBLE_RE_NUM = function(...) return ... end

local RoChessHelper = {
	enabled = true,
	depth = 12,
	lastFen = "",
}

-- Constants.
local ENGINE_URL = "https://stockfish.online/api/s/v2.php"

-- Services.
local playersService = game:GetService("Players")
local httpService = game:GetService("HttpService")
local coreGui = game:GetService("CoreGui")

local localPlayer = playersService.LocalPlayer

---Query Stockfish API for the best move given a FEN string.
---@param fen string
---@return string?, string?
local function getBestMove(fen)
	local encodedFen = httpService:UrlEncode(fen)
	local response = request({
		Url = string.format("%s?fen=%s&depth=%d", ENGINE_URL, encodedFen, RoChessHelper.depth),
		Method = "GET",
	})

	if not response or not response.Success then
		return nil, "HTTP request failed"
	end

	local ok, data = pcall(httpService.JSONDecode, httpService, response.Body)
	if not ok or not data or not data.success then
		return nil, "Invalid engine response"
	end

	return data.bestmove, data.evaluation
end

---Attempt to locate a FEN string in PlayerGui attributes.
---@return string?
local function findBoardFen()
	local playerGui = localPlayer:FindFirstChildOfClass("PlayerGui")
	if not playerGui then
		return nil
	end

	for _, obj in ipairs(playerGui:GetDescendants()) do
		local fenAttr = obj:GetAttribute("FEN") or obj:GetAttribute("Fen")
		if typeof(fenAttr) == "string" and #fenAttr > 10 then
			return fenAttr
		end
	end

	return nil
end

---Create the minimal overlay UI in gethui or CoreGui.
local function createOverlay()
	local parent = (gethui and gethui()) or coreGui
	local existing = parent:FindFirstChild("RoChessHelperUI")
	if existing then
		existing:Destroy()
	end

	local screenGui = Instance.new("ScreenGui")
	screenGui.Name = "RoChessHelperUI"
	screenGui.ResetOnSpawn = false
	screenGui.Parent = parent

	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(0, 260, 0, 110)
	frame.Position = UDim2.new(0, 20, 0, 200)
	frame.BackgroundColor3 = Color3.fromRGB(24, 24, 28)
	frame.BorderSizePixel = 0
	frame.Active = true
	frame.Draggable = true
	frame.Parent = screenGui

	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 6)
	corner.Parent = frame

	local title = Instance.new("TextLabel")
	title.Size = UDim2.new(1, -16, 0, 24)
	title.Position = UDim2.new(0, 8, 0, 6)
	title.BackgroundTransparency = 1
	title.Text = "RoChess! Engine Helper"
	title.TextColor3 = Color3.fromRGB(235, 235, 240)
	title.TextSize = 14
	title.Font = Enum.Font.GothamBold
	title.TextXAlignment = Enum.TextXAlignment.Left
	title.Parent = frame

	local fenBox = Instance.new("TextBox")
	fenBox.Size = UDim2.new(1, -16, 0, 28)
	fenBox.Position = UDim2.new(0, 8, 0, 34)
	fenBox.BackgroundColor3 = Color3.fromRGB(36, 36, 42)
	fenBox.TextColor3 = Color3.fromRGB(220, 220, 225)
	fenBox.PlaceholderText = "Paste FEN or auto-detect..."
	fenBox.Text = ""
	fenBox.TextSize = 12
	fenBox.Font = Enum.Font.Gotham
	fenBox.ClearTextOnFocus = false
	fenBox.Parent = frame

	local resultLabel = Instance.new("TextLabel")
	resultLabel.Size = UDim2.new(1, -16, 0, 28)
	resultLabel.Position = UDim2.new(0, 8, 0, 70)
	resultLabel.BackgroundTransparency = 1
	resultLabel.Text = "Best Move: --"
	resultLabel.TextColor3 = Color3.fromRGB(120, 220, 150)
	resultLabel.TextSize = 13
	resultLabel.Font = Enum.Font.GothamSemibold
	resultLabel.TextXAlignment = Enum.TextXAlignment.Left
	resultLabel.Parent = frame

	fenBox.FocusLost:Connect(function(enterPressed)
		if not enterPressed or fenBox.Text == "" then
			return
		end
		resultLabel.Text = "Calculating..."
		local bestMove, eval = getBestMove(fenBox.Text)
		if bestMove then
			resultLabel.Text = string.format("Best: %s (Eval: %s)", bestMove, tostring(eval or "?"))
		else
			resultLabel.Text = "Error: " .. tostring(eval)
		end
	end)

	-- Poll for auto-detected FEN changes.
	task.spawn(function()
		while screenGui.Parent and RoChessHelper.enabled do
			local detectedFen = findBoardFen()
			if detectedFen and detectedFen ~= RoChessHelper.lastFen then
				RoChessHelper.lastFen = detectedFen
				fenBox.Text = detectedFen
				local bestMove, eval = getBestMove(detectedFen)
				if bestMove then
					resultLabel.Text = string.format("Best: %s (Eval: %s)", bestMove, tostring(eval or "?"))
				end
			end
			task.wait(0.75)
		end
	end)
end

---Main entry point.
local function initializeScript()
	if shared.RoChessHelper then
		shared.RoChessHelper.enabled = false
	end
	shared.RoChessHelper = RoChessHelper
	createOverlay()
end

---Error handler for initialization.
---@param err string
local function onInitializeError(err)
	warn("RoChessHelper failed to initialize.")
	warn(err)
	warn(debug.traceback())
end

xpcall(initializeScript, onInitializeError)
