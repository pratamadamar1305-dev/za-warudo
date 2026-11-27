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
	isAnalyzing = false,
	depth = 14,
	highlights = {},
}

-- Constants.
local ENGINE_URL = "https://stockfish.online/api/s/v2.php"
local RAYFIELD_URL = "https://sirius.menu/rayfield"
local FEN_PATTERN = "^[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+%s+[wb]%s+"
local BLUE_HIGHLIGHT_COLOR = Color3.fromRGB(0, 120, 255)

-- Services.
local playersService = game:GetService("Players")
local httpService = game:GetService("HttpService")
local replicatedStorage = game:GetService("ReplicatedStorage")

local localPlayer = playersService.LocalPlayer
local httpRequest = request or http_request or (syn and syn.request)

---Clear all active blue square highlights.
local function clearHighlights()
	for _, item in ipairs(RoChessHelper.highlights) do
		if typeof(item) == "Instance" and item.Parent then
			pcall(item.Destroy, item)
		end
	end
	table.clear(RoChessHelper.highlights)
end

---Highlight a 3D BasePart or 2D GuiObject square in blue.
---@param squareName string
local function highlightSquare(squareName)
	local lowerName = string.lower(squareName)
	local upperName = string.upper(squareName)

	-- Check 3D board tiles in workspace.
	for _, obj in ipairs(workspace:GetDescendants()) do
		if obj:IsA("BasePart") and (obj.Name == lowerName or obj.Name == upperName) then
			local box = Instance.new("SelectionBox")
			box.Name = "RoChessBlueHighlight"
			box.Color3 = BLUE_HIGHLIGHT_COLOR
			box.SurfaceColor3 = BLUE_HIGHLIGHT_COLOR
			box.SurfaceTransparency = 0.45
			box.LineThickness = 0.06
			box.Adornee = obj
			box.Parent = obj
			table.insert(RoChessHelper.highlights, box)
		end
	end

	-- Check 2D board tiles in PlayerGui.
	local playerGui = localPlayer and localPlayer:FindFirstChildOfClass("PlayerGui")
	if playerGui then
		for _, obj in ipairs(playerGui:GetDescendants()) do
			if obj:IsA("GuiObject") and (obj.Name == lowerName or obj.Name == upperName) then
				local overlay = Instance.new("Frame")
				overlay.Name = "RoChessBlueHighlight"
				overlay.Size = UDim2.fromScale(1, 1)
				overlay.BackgroundColor3 = BLUE_HIGHLIGHT_COLOR
				overlay.BackgroundTransparency = 0.45
				overlay.BorderSizePixel = 0
				overlay.ZIndex = obj.ZIndex + 10
				overlay.Parent = obj
				table.insert(RoChessHelper.highlights, overlay)
			end
		end
	end
end

---Highlight both source and target squares of a UCI move (e.g. "e2e4") in blue.
---@param uciMove string
local function highlightMove(uciMove)
	clearHighlights()
	if not uciMove or #uciMove < 4 then
		return
	end

	local fromSquare = string.sub(uciMove, 1, 2)
	local toSquare = string.sub(uciMove, 3, 4)
	highlightSquare(fromSquare)
	highlightSquare(toSquare)
end

---Scan an Instance container for a valid FEN string.
---@param container Instance?
---@return string?
local function scanContainerForFen(container)
	if not container then
		return nil
	end

	for _, obj in ipairs(container:GetDescendants()) do
		local fenAttr = obj:GetAttribute("FEN") or obj:GetAttribute("Fen") or obj:GetAttribute("fen")
		if typeof(fenAttr) == "string" and string.match(fenAttr, FEN_PATTERN) then
			return fenAttr
		end

		if obj:IsA("StringValue") and string.match(obj.Value, FEN_PATTERN) then
			return obj.Value
		end
	end

	return nil
end

---Automatically locate the live board FEN via GC tables, PlayerGui, or ReplicatedStorage.
---@return string?
local function findBoardFen()
	if getgc then
		for _, val in ipairs(getgc(true)) do
			if typeof(val) == "table" then
				local fen = rawget(val, "fen") or rawget(val, "FEN") or rawget(val, "Fen")
				if typeof(fen) == "string" and string.match(fen, FEN_PATTERN) then
					return fen
				end
			end
		end
	end

	local playerGui = localPlayer and localPlayer:FindFirstChildOfClass("PlayerGui")
	return scanContainerForFen(playerGui) or scanContainerForFen(replicatedStorage)
end

---Query Stockfish API for the best move given a FEN string.
---@param fen string
---@return string?, string?
local function getBestMove(fen)
	if not httpRequest then
		return nil, "HTTP request tidak tersedia"
	end

	local encodedFen = httpService:UrlEncode(fen)
	local okReq, response = pcall(httpRequest, {
		Url = string.format("%s?fen=%s&depth=%d", ENGINE_URL, encodedFen, RoChessHelper.depth),
		Method = "GET",
	})

	if not okReq or not response or not response.Success then
		return nil, "HTTP request gagal"
	end

	local okJson, data = pcall(httpService.JSONDecode, httpService, response.Body)
	if not okJson or not data or not data.success then
		return nil, "Response engine tidak valid"
	end

	return data.bestmove, nil
end

---Load Rayfield UI library using the executor's request function.
---@return table
local function loadRayfield()
	if not httpRequest then
		error("Executor tidak mendukung HTTP request.")
	end

	local response = httpRequest({
		Url = RAYFIELD_URL,
		Method = "GET",
	})

	if not response or not response.Success or not response.Body then
		error("Gagal memuat Rayfield UI.")
	end

	local chunk, err = loadstring(response.Body)
	if not chunk then
		error("Gagal compile Rayfield: " .. tostring(err))
	end

	return chunk()
end

---Build and initialize the minimal Rayfield UI with only the Best Move button.
local function createRayfieldUI()
	local Rayfield = loadRayfield()
	RoChessHelper.rayfield = Rayfield

	local Window = Rayfield:CreateWindow({
		Name = "RoChess! Best Move",
		LoadingTitle = "RoChess!",
		LoadingSubtitle = "Auto Stockfish",
		ConfigurationSaving = {
			Enabled = false,
		},
		KeySystem = false,
	})

	local mainTab = Window:CreateTab("Main", 4483362458)

	local statusLabel = mainTab:CreateLabel("Best Move: --")

	mainTab:CreateButton({
		Name = "Best Move",
		Callback = function()
			if RoChessHelper.isAnalyzing then
				return
			end

			RoChessHelper.isAnalyzing = true
			statusLabel:Set("Best Move: Menghitung...")

			local fen = findBoardFen()
			if not fen then
				RoChessHelper.isAnalyzing = false
				statusLabel:Set("Best Move: FEN papan tidak ditemukan")
				return
			end

			local bestMove, err = getBestMove(fen)
			RoChessHelper.isAnalyzing = false

			if bestMove then
				statusLabel:Set("Best Move: " .. tostring(bestMove))
				highlightMove(bestMove)
			else
				statusLabel:Set("Error: " .. tostring(err))
			end
		end,
	})
end

---Main entry point.
local function initializeScript()
	if shared.RoChessHelper then
		shared.RoChessHelper.enabled = false
		if shared.RoChessHelper.rayfield and shared.RoChessHelper.rayfield.Destroy then
			pcall(shared.RoChessHelper.rayfield.Destroy, shared.RoChessHelper.rayfield)
		end
	end

	clearHighlights()
	shared.RoChessHelper = RoChessHelper
	createRayfieldUI()
end

---Error handler for initialization.
---@param err string
local function onInitializeError(err)
	warn("RoChessHelper failed to initialize.")
	warn(err)
	warn(debug.traceback())
end

xpcall(initializeScript, onInitializeError)
