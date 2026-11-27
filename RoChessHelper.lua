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
local STOCKFISH_ONLINE_URL = "https://stockfish.online/api/s/v2.php"
local CHESS_API_URL = "https://chess-api.com/v1"
local RAYFIELD_URL = "https://sirius.menu/rayfield"
local FEN_PATTERN = "^[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+%s+[wb]%s+"
local BLUE_FILL_COLOR = Color3.fromRGB(0, 120, 255)
local BLUE_OUTLINE_COLOR = Color3.fromRGB(80, 190, 255)

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

---Check if an Instance represents a specific algebraic chess square (e.g. "e2").
---@param obj Instance
---@param lowerName string
---@return boolean
local function isMatchingSquare(obj, lowerName)
	local nameLower = string.lower(obj.Name)
	if nameLower == lowerName
		or nameLower == ("square_" .. lowerName)
		or nameLower == ("tile_" .. lowerName)
		or nameLower == (lowerName .. "_tile")
		or nameLower == (lowerName .. "_square")
	then
		return true
	end

	local attrSquare = obj:GetAttribute("Square") or obj:GetAttribute("Tile") or obj:GetAttribute("Coord")
	if typeof(attrSquare) == "string" and string.lower(attrSquare) == lowerName then
		return true
	end

	return false
end

---Highlight a 3D BasePart/Model or 2D GuiObject square in blue.
---@param squareName string
local function highlightSquare(squareName)
	local lowerName = string.lower(squareName)

	-- Highlight 3D board tiles in workspace.
	for _, obj in ipairs(workspace:GetDescendants()) do
		if (obj:IsA("BasePart") or obj:IsA("Model")) and isMatchingSquare(obj, lowerName) then
			local box = Instance.new("SelectionBox")
			box.Name = "RoChessBlueBox"
			box.Color3 = BLUE_OUTLINE_COLOR
			box.SurfaceColor3 = BLUE_FILL_COLOR
			box.SurfaceTransparency = 0.4
			box.LineThickness = 0.06
			box.Adornee = obj
			box.Parent = obj
			table.insert(RoChessHelper.highlights, box)
		end
	end

	-- Highlight 2D board tiles in PlayerGui.
	local playerGui = localPlayer and localPlayer:FindFirstChildOfClass("PlayerGui")
	if playerGui then
		for _, obj in ipairs(playerGui:GetDescendants()) do
			if obj:IsA("GuiObject") and isMatchingSquare(obj, lowerName) then
				local overlay = Instance.new("Frame")
				overlay.Name = "RoChessBlueOverlay"
				overlay.Size = UDim2.fromScale(1, 1)
				overlay.BackgroundColor3 = BLUE_FILL_COLOR
				overlay.BackgroundTransparency = 0.45
				overlay.BorderSizePixel = 0
				overlay.ZIndex = obj.ZIndex + 10
				overlay.Parent = obj

				local stroke = Instance.new("UIStroke")
				stroke.Color = BLUE_OUTLINE_COLOR
				stroke.Thickness = 2
				stroke.Parent = overlay

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

		if obj:IsA("TextLabel") and string.match(obj.Text, FEN_PATTERN) then
			return obj.Text
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

---Extract clean UCI move (e.g. "e2e4") from engine output.
---@param rawMove string?
---@return string?
local function parseUciMove(rawMove)
	if typeof(rawMove) ~= "string" then
		return nil
	end
	return string.match(rawMove, "([a-h][1-8][a-h][1-8][qrbn]?)")
end

---Query Stockfish API (with chess-api.com fallback) for the best move.
---@param fen string
---@return string?, string?
local function getBestMove(fen)
	if not httpRequest then
		return nil, "HTTP request tidak tersedia"
	end

	-- Primary: stockfish.online
	local encodedFen = httpService:UrlEncode(fen)
	local okReq, response = pcall(httpRequest, {
		Url = string.format("%s?fen=%s&depth=%d", STOCKFISH_ONLINE_URL, encodedFen, RoChessHelper.depth),
		Method = "GET",
	})

	if okReq and response and response.Success and response.Body then
		local okJson, data = pcall(httpService.JSONDecode, httpService, response.Body)
		if okJson and data and data.success and data.bestmove then
			local move = parseUciMove(data.bestmove)
			if move then
				return move, nil
			end
		end
	end

	-- Fallback: chess-api.com
	local okFb, fbResponse = pcall(httpRequest, {
		Url = CHESS_API_URL,
		Method = "POST",
		Headers = { ["Content-Type"] = "application/json" },
		Body = httpService:JSONEncode({ fen = fen, depth = 12 }),
	})

	if okFb and fbResponse and fbResponse.Success and fbResponse.Body then
		local okJson, data = pcall(httpService.JSONDecode, httpService, fbResponse.Body)
		if okJson and data and data.move then
			local move = parseUciMove(data.move)
			if move then
				return move, nil
			end
		end
	end

	return nil, "Gagal mengambil langkah dari engine"
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
				statusLabel:Set("Best Move: FEN tidak ditemukan")
				return
			end

			local bestMove, err = getBestMove(fen)
			RoChessHelper.isAnalyzing = false

			if bestMove then
				statusLabel:Set("Best Move: " .. bestMove)
				highlightMove(bestMove)
				Rayfield:Notify({
					Title = "Best Move",
					Content = bestMove,
					Duration = 3,
				})
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
