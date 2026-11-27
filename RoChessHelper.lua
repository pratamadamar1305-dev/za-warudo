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
local replicatedStorage = game:GetService("ReplicatedStorage")

local localPlayer = playersService.LocalPlayer
local httpRequest = request or http_request or (syn and syn.request)

---Load Rayfield UI library using the executor's request function.
---@return table
local function loadRayfield()
	if not httpRequest then
		error("Executor tidak mendukung fungsi HTTP request.")
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

---Query Stockfish API for the best move given a FEN string.
---@param fen string
---@return string?, any?, number?, string?
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

	local ok, data = pcall(httpService.JSONDecode, httpService, response.Body)
	if not ok or not data or not data.success then
		return nil, "Response engine tidak valid"
	end

	return data.bestmove, data.evaluation, data.mate, data.continuation
end

---Format evaluation or mate score into a readable Indonesian summary.
---@param eval number?
---@param mate number?
---@return string
local function formatEvaluation(eval, mate)
	if mate ~= nil then
		local side = mate > 0 and "Putih" or "Hitam"
		return string.format("Mate dalam %d (%s)", math.abs(mate), side)
	end

	if typeof(eval) == "number" then
		local side = eval > 0 and "Putih unggul" or (eval < 0 and "Hitam unggul" or "Seimbang")
		return string.format("%+.2f (%s)", eval, side)
	end

	return tostring(eval or "?")
end

---Scan a container for a valid FEN string in attributes or StringValues.
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

---Attempt to locate a valid FEN string in PlayerGui or ReplicatedStorage.
---@return string?
local function findBoardFen()
	local playerGui = localPlayer and localPlayer:FindFirstChildOfClass("PlayerGui")
	return scanContainerForFen(playerGui) or scanContainerForFen(replicatedStorage)
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

	local function updateResult(fen, bestMove, eval, mate, continuation)
		local evalText = formatEvaluation(eval, mate)
		RoChessHelper.lastBestMove = bestMove or ""
		RoChessHelper.lastEval = evalText

		statusParagraph:Set({
			Title = "Rekomendasi Stockfish",
			Content = string.format(
				"Best Move: %s\nEvaluasi: %s\nLanjutan: %s\nFEN: %s",
				tostring(bestMove or "--"),
				evalText,
				tostring(continuation or "--"),
				fen
			),
		})

		if RoChessHelper.notifyOnMove and bestMove then
			Rayfield:Notify({
				Title = "Rekomendasi: " .. tostring(bestMove),
				Content = evalText,
				Duration = 3,
			})
		end
	end

	local function analyzeFen(fen)
		if not fen or fen == "" or RoChessHelper.isAnalyzing then
			return
		end

		RoChessHelper.isAnalyzing = true
		statusParagraph:Set({
			Title = "Rekomendasi Stockfish",
			Content = "Menghitung langkah terbaik...",
		})

		local bestMove, eval, mate, continuation = getBestMove(fen)
		RoChessHelper.isAnalyzing = false

		if bestMove then
			updateResult(fen, bestMove, eval, mate, continuation)
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

	mainTab:CreateToggle({
		Name = "Notifikasi Best Move",
		CurrentValue = RoChessHelper.notifyOnMove,
		Flag = "NotifyBestMove",
		Callback = function(value)
			RoChessHelper.notifyOnMove = value
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
			local clipFn = setclipboard or toclipboard
			if clipFn and RoChessHelper.lastBestMove ~= "" then
				pcall(clipFn, RoChessHelper.lastBestMove)
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
