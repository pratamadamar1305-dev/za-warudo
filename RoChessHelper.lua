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
	autoDetect = true,
	depth = 14,
	pollInterval = 0.75,
	lastFen = "",
	lastBestMove = "",
	lastEval = "",
}

-- Constants.
local ENGINE_URL = "https://stockfish.online/api/s/v2.php"
local RAYFIELD_URL = "https://sirius.menu/rayfield"
local FEN_PATTERN = "^[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+/[rnbqkpRNBQKP1-8]+%s+[wb]%s+"

-- Services.
local playersService = game:GetService("Players")
local httpService = game:GetService("HttpService")

local localPlayer = playersService.LocalPlayer

---Load Rayfield UI library using the executor's request function.
---@return table
local function loadRayfield()
	local response = request({
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
		return nil, "HTTP request gagal"
	end

	local ok, data = pcall(httpService.JSONDecode, httpService, response.Body)
	if not ok or not data or not data.success then
		return nil, "Response engine tidak valid"
	end

	return data.bestmove, data.evaluation
end

---Attempt to locate a valid FEN string in PlayerGui attributes, StringValues, or TextLabels.
---@return string?
local function findBoardFen()
	local playerGui = localPlayer:FindFirstChildOfClass("PlayerGui")
	if not playerGui then
		return nil
	end

	for _, obj in ipairs(playerGui:GetDescendants()) do
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

---Build and initialize the Rayfield interface.
local function createRayfieldUI()
	local Rayfield = loadRayfield()
	RoChessHelper.rayfield = Rayfield

	local Window = Rayfield:CreateWindow({
		Name = "RoChess! Engine Helper",
		LoadingTitle = "RoChess! Helper",
		LoadingSubtitle = "Powered by Stockfish",
		ConfigurationSaving = {
			Enabled = false,
		},
		KeySystem = false,
	})

	local mainTab = Window:CreateTab("Engine", 4483362458)

	local statusParagraph = mainTab:CreateParagraph({
		Title = "Hasil Analisa",
		Content = "Best Move: --\nEvaluasi: --\nFEN: --",
	})

	local function updateResult(fen, bestMove, eval)
		RoChessHelper.lastBestMove = bestMove or ""
		RoChessHelper.lastEval = tostring(eval or "?")
		statusParagraph:Set({
			Title = "Hasil Analisa",
			Content = string.format(
				"Best Move: %s\nEvaluasi: %s\nFEN: %s",
				tostring(bestMove or "--"),
				tostring(eval or "--"),
				fen
			),
		})
	end

	local function analyzeFen(fen)
		if not fen or fen == "" then
			return
		end

		statusParagraph:Set({
			Title = "Hasil Analisa",
			Content = "Menghitung langkah terbaik...",
		})

		local bestMove, eval = getBestMove(fen)
		if bestMove then
			updateResult(fen, bestMove, eval)
		else
			statusParagraph:Set({
				Title = "Error",
				Content = tostring(eval),
			})
		end
	end

	mainTab:CreateToggle({
		Name = "Auto-Detect FEN",
		CurrentValue = RoChessHelper.autoDetect,
		Flag = "AutoDetectFEN",
		Callback = function(value)
			RoChessHelper.autoDetect = value
		end,
	})

	mainTab:CreateSlider({
		Name = "Stockfish Depth",
		Range = { 5, 18 },
		Increment = 1,
		Suffix = " depth",
		CurrentValue = RoChessHelper.depth,
		Flag = "EngineDepth",
		Callback = function(value)
			RoChessHelper.depth = value
		end,
	})

	mainTab:CreateInput({
		Name = "Manual FEN",
		PlaceholderText = "Paste FEN di sini lalu Enter...",
		RemoveTextAfterFocusLost = false,
		Callback = function(text)
			if text ~= "" then
				RoChessHelper.lastFen = text
				analyzeFen(text)
			end
		end,
	})

	mainTab:CreateButton({
		Name = "Analisa Ulang FEN Terakhir",
		Callback = function()
			if RoChessHelper.lastFen ~= "" then
				analyzeFen(RoChessHelper.lastFen)
			end
		end,
	})

	mainTab:CreateButton({
		Name = "Copy Best Move",
		Callback = function()
			if setclipboard and RoChessHelper.lastBestMove ~= "" then
				setclipboard(RoChessHelper.lastBestMove)
				Rayfield:Notify({
					Title = "Disalin",
					Content = "Best Move: " .. RoChessHelper.lastBestMove,
					Duration = 3,
				})
			end
		end,
	})

	-- Poll for auto-detected FEN changes.
	task.spawn(function()
		while RoChessHelper.enabled do
			if RoChessHelper.autoDetect then
				local detectedFen = findBoardFen()
				if detectedFen and detectedFen ~= RoChessHelper.lastFen then
					RoChessHelper.lastFen = detectedFen
					analyzeFen(detectedFen)
				end
			end
			task.wait(RoChessHelper.pollInterval)
		end
	end)
end

---Main entry point.
local function initializeScript()
	if shared.RoChessHelper then
		shared.RoChessHelper.enabled = false
		if shared.RoChessHelper.rayfield and shared.RoChessHelper.rayfield.Destroy then
			pcall(shared.RoChessHelper.rayfield.Destroy, shared.RoChessHelper.rayfield)
		end
	end

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
