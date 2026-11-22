--[[
    Fisch Byte v7.2 — Ultimate Edition
    Auto Cast | Auto Shake | Auto Reel | Safety Hooks
    
    Optimized for Delta (sUNC 98%, mobile-first)
    UI: Rayfield Library
    
    ⚠️⚠️⚠️ CRITICAL WARNING ⚠️⚠️⚠️
    NO SCRIPT IS 100% UNDETECTABLE IN 2026!
    Roblox uses Hyperion/Byfron kernel-level anti-cheat with:
    - AI-driven behavioral analysis
    - Process injection detection
    - Hardware fingerprinting (HWID bans)
    - Ban waves (delayed bans)
    
    BEST PRACTICES TO MINIMIZE RISK:
    ✅ Use ALT accounts ONLY (never main account!)
    ✅ Farm max 1-2 hours per session (shorter = safer)
    ✅ Take 15-20 min breaks every 45-60 minutes
    ✅ Vary fishing spots (don't stay in one place)
    ✅ Keep ALL humanization ON (delays, variance, etc)
    ✅ NEVER enable hooks (anti-kick, spoof, etc)
    ✅ Use private servers if possible
    ✅ Don't be greedy (quit while ahead)
    ✅ Manual control: turn off auto reel to "pretend noob"
    
    REALITY CHECK:
    - Even with all precautions, you CAN still get banned
    - Detection can be immediate OR delayed (ban waves)
    - Hardware bans block ALL accounts on that PC
    - No script can guarantee safety
    
    Changelog:
    v7.2 - Enhanced error handling, logging system, validation, code cleanup
    v7.1 - Removed auto-fail feature (user controls mistakes manually)
    v7.0 - Maximum anti-detection: advanced behavior mimicry
    v6.4 - CRITICAL FIX: findShakeUI() return statement bug
    v6.3 - Simplified auto shake using Nexus Hub v4 seed-based pattern
    v6.2 - CRITICAL FIX: auto cast no longer resets rod during fish bite
    v6.1 - Enhanced shake detection, better debug mode, improved error recovery
    v6.0 - Total overhaul: smart rod detection, advanced shake, robust reel, comprehensive error handling
    v5.3 - Bug fixes: shake coord, seed race, lure check, reel counter
    v5.2 - All hooks OFF by default (prevents kick), optional enable
    v5.1 - Fixed "invalid client" kick (removed aggressive hooks)
    v5.0 - Split features, Rayfield UI, Delta optimization
    v4.0 - Safety hooks, Net module, humanize
    v3.0 - Triple shake/reel methods, mobile fix
    v2.0 - Research-based remote paths
    v1.0 - Initial script
]]

-- Guard: shared table check
if not shared then
	return warn("[Fisch] No shared table, script cannot run")
end

-- Guard: double execution
if shared.FischByteLoaded then
	return warn("[Fisch] Already running, execute unload() first")
end
shared.FischByteLoaded = true

-- ============================================================
-- DELTA EXECUTOR COMPATIBILITY
-- ============================================================

-- Thread identity: disabled by default to prevent "invalid client"
-- Uncomment ONLY if Net module require fails:
-- pcall(function() setthreadidentity(8) end)

-- Check which executor functions are available
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
	getgc = type(getgc) == "function",
	hookfunction = type(hookfunction) == "function",
}

-- Fallback wrappers for missing functions
if not DELTA_COMPAT.newcclosure then
	getfenv().newcclosure = function(f) return f end
end
if not DELTA_COMPAT.firesignal then
	getfenv().firesignal = function(signal, ...)
		if signal and type(signal.Fire) == "function" then signal:Fire(...) end
	end
end
if not DELTA_COMPAT.gethui then
	getfenv().gethui = function() return nil end
end

-- ============================================================
-- LOGGING SYSTEM (Enhanced for v7.2)
-- ============================================================

local LogLevel = {
	DEBUG = 1,
	INFO = 2,
	WARN = 3,
	ERROR = 4,
}

local LOG_PREFIX = "[Fisch v7.2]"
local MIN_LOG_LEVEL = LogLevel.INFO -- Change to DEBUG for verbose logging

local function log(level, message, ...)
	if level < MIN_LOG_LEVEL then return end
	
	local levelStr = "UNKNOWN"
	if level == LogLevel.DEBUG then levelStr = "DEBUG"
	elseif level == LogLevel.INFO then levelStr = "INFO"
	elseif level == LogLevel.WARN then levelStr = "WARN"
	elseif level == LogLevel.ERROR then levelStr = "ERROR"
	end
	
	local formattedMsg = string.format("[%s] %s", levelStr, message)
	if select("#", ...) > 0 then
		formattedMsg = string.format(formattedMsg, ...)
	end
	
	print(LOG_PREFIX .. " " .. formattedMsg)
	
	if level == LogLevel.ERROR then
		warn(LOG_PREFIX .. " " .. formattedMsg)
	end
end

local function logDebug(msg, ...) log(LogLevel.DEBUG, msg, ...) end
local function logInfo(msg, ...) log(LogLevel.INFO, msg, ...) end
local function logWarn(msg, ...) log(LogLevel.WARN, msg, ...) end
local function logError(msg, ...) log(LogLevel.ERROR, msg, ...) end

-- ============================================================
-- VALIDATION SYSTEM (Enhanced for v7.2)
-- ============================================================

local function validateInstance(instance, expectedType, name)
	if not instance then
		logError("Validation failed: %s is nil", name or "instance")
		return false
	end
	
	if expectedType and not instance:IsA(expectedType) then
		logError("Validation failed: %s is not a %s (got %s)", name or "instance", expectedType, instance.ClassName)
		return false
	end
	
	return true
end

local function validateTable(t, name)
	if type(t) ~= "table" then
		logError("Validation failed: %s is not a table (got %s)", name or "value", type(t))
		return false
	end
	return true
end

local function validateFunction(f, name)
	if type(f) ~= "function" then
		logError("Validation failed: %s is not a function (got %s)", name or "value", type(f))
		return false
	end
	return true
end

-- ============================================================
-- ERROR HANDLING SYSTEM (Enhanced for v7.2)
-- ============================================================

local ErrorHandler = {}

function ErrorHandler.safeCall(funcName, func, ...)
	if not validateFunction(func, funcName) then
		return false, "Invalid function"
	end
	
	local success, result = pcall(func, ...)
	
	if not success then
		logError("%s failed: %s", funcName, tostring(result))
		return false, result
	end
	
	return true, result
end

function ErrorHandler.tryCatch(tryFunc, catchFunc, finallyFunc)
	local success, result = pcall(tryFunc)
	
	if not success and catchFunc then
		pcall(catchFunc, result)
	elseif success and catchFunc then
		-- No error, but call catch with nil if needed
	end
	
	if finallyFunc then
		pcall(finallyFunc)
	end
	
	return success, result
end

-- Statistics tracker for debugging
local Stats = {
	totalCasts = 0,
	successfulCasts = 0,
	failedCasts = 0,
	totalShakes = 0,
	totalReels = 0,
	successfulReels = 0,
	failedReels = 0,
	sessionStartTime = os.clock(),
}

function Stats.increment(statName)
	if Stats[statName] then
		Stats[statName] = Stats[statName] + 1
	end
end

function Stats.getSessionDuration()
	return os.clock() - Stats.sessionStartTime
end

function Stats.getSuccessRate(statType)
	if statType == "cast" then
		return Stats.totalCasts > 0 and (Stats.successfulCasts / Stats.totalCasts * 100) or 0
	elseif statType == "reel" then
		return Stats.totalReels > 0 and (Stats.successfulReels / Stats.totalReels * 100) or 0
	end
	return 0
end

function Stats.printSummary()
	logInfo("=== SESSION STATISTICS ===")
	logInfo("Session Duration: %.2f minutes", Stats.getSessionDuration() / 60)
	logInfo("Casts: %d total, %d success, %d failed (%.1f%% success rate)", 
		Stats.totalCasts, Stats.successfulCasts, Stats.failedCasts, Stats.getSuccessRate("cast"))
	logInfo("Shakes: %d total", Stats.totalShakes)
	logInfo("Reels: %d total, %d success, %d failed (%.1f%% success rate)", 
		Stats.totalReels, Stats.successfulReels, Stats.failedReels, Stats.getSuccessRate("reel"))
	logInfo("========================")
end

-- ============================================================
-- SERVICES (normal references — no cloneref to avoid detection)
-- ============================================================
local playersService = game:GetService("Players")
local replicatedStorage = game:GetService("ReplicatedStorage")
local runService = game:GetService("RunService")
local virtualInputManager = game:GetService("VirtualInputManager")
local virtualUser = game:GetService("VirtualUser")
local collectionService = game:GetService("CollectionService")
local guiService = game:GetService("GuiService")
local userInputService = game:GetService("UserInputService")

-- ============================================================
-- CONSTANTS
-- ============================================================
local LOCAL_PLAYER = playersService.LocalPlayer
local PLAYER_GUI = LOCAL_PLAYER:WaitForChild("PlayerGui")
local DEFAULT_WALK_SPEED = 16
local DEFAULT_JUMP_POWER = 50
local MERCHANT_NAME = "Marc Merchant"
local MAX_SESSION_HOURS = 2 -- Reduced from 4 to 2 for safety
local IS_MOBILE = userInputService.TouchEnabled
local ESP_UPDATE_INTERVAL = 2

-- Anti-detection: Random session time (60-120 minutes)
local SESSION_MINUTES_MIN = 60
local SESSION_MINUTES_MAX = 120
local SESSION_RANDOM_STOP = math.random(SESSION_MINUTES_MIN, SESSION_MINUTES_MAX) * 60

-- Timeout constants (seconds)
local CAST_TIMEOUT = 5
local REEL_LEGIT_TIMEOUT = 180
local REEL_INSTANT_TIMEOUT = 15
local SHAKE_COOLDOWN_BASE = 0.25
local ROD_EQUIP_TIMEOUT = 3

-- Humanized random delay
local function rng(min, max)
	return min + math.random() * (max - min)
end

-- Safe pcall wrapper with logging
local function safeCall(context, func, ...)
	local success, result = pcall(func, ...)
	if not success then
		warn(string.format("[Fisch] %s failed: %s", context, tostring(result)))
	end
	return success, result
end

-- ============================================================
-- CONFIG (each feature is independent)
-- ============================================================
local config = {
	-- Fishing toggles
	autoCast = false,
	autoShake = false,
	autoReel = false,
	
	-- Cast settings
	castPower = 100,
	perfectCast = true,
	reelMode = "legit",
	
	-- Sell settings
	autoSell = false,
	sellInterval = 10,
	autoAppraise = false,
	
	-- Safety
	antiAFK = false,
	antiKick = false,
	spoofProperties = false,
	humanizeDelays = true,
	freezeWhileFishing = false,
	fishESP = false,
	
	-- Debug
	debugMode = false,
	bobberFix = false, -- DISABLED: destroying bobber attachments can break shake UI
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
	sessionStart = os.clock(),
	
	-- Net module references
	netModule = nil,
	castRemote = nil,
	resetRemote = nil,
	shakeRemote = nil,
	shakeStartRF = nil,
	reelController = nil,
	
	-- Shake state
	shakeArgs = nil,
	
	-- Statistics
	totalCasts = 0,
	totalShakes = 0,
	totalReels = 0,
	totalSells = 0,
	failedCasts = 0,
}

-- ============================================================
-- UTILITY FUNCTIONS
-- ============================================================
local function logError(ctx, err)
	warn(string.format("[Fisch] %s: %s", ctx, tostring(err)))
end

local function logDebug(msg)
	if config.debugMode then
		print(string.format("[Fisch] %s", msg))
	end
end

local function safeDisconnect(conn)
	if conn and type(conn.Disconnect) == "function" then
		pcall(function() conn:Disconnect() end)
	end
end

local function unload()
	state.running = false
	config.autoCast = false
	config.autoShake = false
	config.autoReel = false
	
	-- Disconnect all connections
	for _, conn in ipairs(state.connections) do
		safeDisconnect(conn)
	end
	table.clear(state.connections)
	
	-- Cleanup ESP
	for _, obj in ipairs(state.espObjects) do
		pcall(function() obj:Destroy() end)
	end
	table.clear(state.espObjects)
	
	-- Restore hooks
	pcall(function()
		local meta = getrawmetatable(game)
		if not meta then return end
		setreadonly(meta, false)
		if state.oldNamecall then meta.__namecall = state.oldNamecall end
		if state.oldIndex then meta.__index = state.oldIndex end
		setreadonly(meta, true)
	end)
	
	-- Unfreeze character
	setCharacterFrozen(false)
	
	-- Print session statistics
	Stats.printSummary()
	
	shared.FischByteLoaded = nil
	logInfo("Script unloaded successfully")
end

-- ============================================================
-- NET MODULE LOADING (Nexus Hub v4 pattern)
-- ============================================================
local function loadNetModule()
	-- Retry up to 3 times
	for attempt = 1, 3 do
		local success, result = safeCall(string.format("Load Net Module (attempt %d/3)", attempt), function()
			local packages = replicatedStorage:WaitForChild("packages", 10)
			local netModule = packages:WaitForChild("Net", 10)
			state.netModule = require(netModule)
			
			if not state.netModule then
				error("Net module is nil")
			end
			
			-- Load remotes with validation
			local ok1, castRemote = pcall(function() return state.netModule:RemoteFunction("FishingRod/Cast") end)
			local ok2, resetRemote = pcall(function() return state.netModule:RemoteEvent("FishingRod/Reset") end)
			local ok3, shakeRemote = pcall(function() return state.netModule:RemoteEvent("LureShake/Shake") end)
			local ok4, shakeStartRF = pcall(function() return state.netModule:RemoteFunction("LureShake/Start") end)
			
			state.castRemote = ok1 and castRemote or nil
			state.resetRemote = ok2 and resetRemote or nil
			state.shakeRemote = ok3 and shakeRemote or nil
			state.shakeStartRF = ok4 and shakeStartRF or nil
			
			if not state.castRemote then
				logError("Net Module", "Failed to load Cast remote")
			end
			if not state.shakeRemote then
				logError("Net Module", "Failed to load Shake remote - shake may not work")
			end
			
			-- Intercept ShakeStart for seed-based humanized shake
			if state.shakeStartRF and DELTA_COMPAT.getcallbackvalue then
				local ok, orig = pcall(getcallbackvalue, state.shakeStartRF, "OnClientInvoke")
				if ok and type(orig) == "function" then
					pcall(function()
						state.shakeStartRF.OnClientInvoke = function(args)
							state.shakeArgs = args
							if config.debugMode then
								logDebug("Seed-based shake args captured")
							end
							return orig(args)
						end
					end)
				else
					logError("Net Module", "Failed to intercept ShakeStart - seed shake disabled")
				end
			end
			
			-- Load ReelController
			local client = replicatedStorage:FindFirstChild("client")
			if client then
				local controllers = client:FindFirstChild("legacyControllers")
				if controllers then
					local reelMod = controllers:FindFirstChild("ReelController")
					if reelMod then
						local ok5, reelController = pcall(require, reelMod)
						state.reelController = ok5 and reelController or nil
					end
				end
			end
			
			if config.debugMode then
				logDebug(string.format("Net module loaded: cast=%s, shake=%s, reel=%s", 
					tostring(state.castRemote ~= nil),
					tostring(state.shakeRemote ~= nil),
					tostring(state.reelController ~= nil)))
			end
			
			return true
		end)
		
		if success then
			return true
		end
		
		-- Wait before retry
		if attempt < 3 then
			task.wait(2)
		end
	end
	
	logError("Net Module", "Failed to load after 3 attempts - using fallback methods")
	return false
end

-- ============================================================
-- ROD HELPERS (Smart detection: equipped + backpack)
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

-- Smart rod detection: check equipped first, then backpack
local function getAnyRod()
	-- Check equipped first
	local rod = getEquippedRod()
	if rod then return rod end
	
	-- Check backpack
	local bp = LOCAL_PLAYER:FindFirstChildOfClass("Backpack")
	if not bp then return nil end
	
	for _, tool in ipairs(bp:GetChildren()) do
		if isRod(tool) then
			-- Try to equip
			local hum = LOCAL_PLAYER.Character and LOCAL_PLAYER.Character:FindFirstChildOfClass("Humanoid")
			if hum then
				pcall(function() hum:EquipTool(tool) end)
				-- Wait for equip with timeout
				local t0 = os.clock()
				while os.clock() - t0 < ROD_EQUIP_TIMEOUT do
					rod = getEquippedRod()
					if rod then return rod end
					task.wait(0.05)
				end
			end
		end
	end
	
	return nil
end

local function getLureValue(rod)
	local values = rod:FindFirstChild("values")
	if not values then return nil end
	return values:FindFirstChild("lure")
end

local function resetRod(rod)
	if state.resetRemote then
		safeCall("Reset Rod (Net)", function()
			state.resetRemote:FireServer()
		end)
		return
	end
	
	-- Fallback: direct remote
	local resetEvent = rod:FindFirstChild("events") and rod.events:FindFirstChild("reset")
	if resetEvent then
		safeCall("Reset Rod (Direct)", function()
			resetEvent:FireServer()
		end)
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
-- AUTO CAST (Optimized with retry mechanism)
-- ============================================================
local castThread = nil

local function autoCastLoop()
	while state.running and config.autoCast do
		-- CRITICAL: Don't cast if fish is currently biting (shakeui exists)
		if findShakeUI() then
			if config.debugMode then
				logDebug("Auto Cast paused: fish is biting (shakeui active)")
			end
			task.wait(0.5)
			continue
		end
		
		-- CRITICAL: Don't cast if reel minigame is active
		if state.reelController and state.reelController.ActiveReel then
			if config.debugMode then
				logDebug("Auto Cast paused: reel minigame active")
			end
			task.wait(0.5)
			continue
		end
		
		-- Don't cast if reel UI is showing
		if PLAYER_GUI:FindFirstChild("reel") then
			if config.debugMode then
				logDebug("Auto Cast paused: reel UI active")
			end
			task.wait(0.5)
			continue
		end
		
		local rod = getAnyRod()
		if not rod then
			task.wait(2)
			continue
		end
		
		-- Only reset if bobber is stuck (no shakeui, no reel, bobber still out)
		local hasBobber = rod:FindFirstChild("bobber")
		local isCasted = rod.values and rod.values.casted and rod.values.casted.Value
		
		if hasBobber or isCasted then
			-- Wait for fish to bite or timeout before resetting
			local waitTime = 0
			while (hasBobber or isCasted) and waitTime < 60 do
				-- If fish starts biting, STOP resetting!
				if findShakeUI() then break end
				if state.reelController and state.reelController.ActiveReel then break end
				if PLAYER_GUI:FindFirstChild("reel") then break end
				
				task.wait(0.5)
				waitTime = waitTime + 0.5
				
				-- Re-check bobber/casted state
				hasBobber = rod:FindFirstChild("bobber")
				isCasted = rod.values and rod.values.casted and rod.values.casted.Value
			end
			
			-- Only reset if still stuck after waiting (and no fish biting)
			if (hasBobber or isCasted) and not findShakeUI() then
				if config.debugMode then
					logDebug("Rod stuck for too long, resetting...")
				end
				resetRod(rod)
				task.wait(config.humanizeDelays and rng(0.5, 1.0) or 0.5)
			end
			
			continue -- Don't cast right after reset, wait for next cycle
		end
		
		-- Check lure value before casting
		local lure = getLureValue(rod)
		if lure and lure.Value ~= 0 then
			task.wait(0.1)
			continue
		end
		
		-- Random delay before casting (anti-detection)
		if config.humanizeDelays then
			task.wait(math.random(200, 800) / 1000)
		end
		
		-- Add variance to cast power (not always perfect)
		local actualPower = config.castPower
		if config.humanizeDelays then
			actualPower = actualPower + math.random(-5, 5)
			actualPower = math.clamp(actualPower, 80, 100)
		end
		
		-- Sometimes don't use perfect cast (more human-like)
		local usePerfect = config.perfectCast
		if config.humanizeDelays and math.random(1, 10) <= 2 then
			usePerfect = false
		end
		
		-- Cast via Net module or fallback
		local casted = false
		if state.castRemote then
			local ok, result = safeCall("Cast (Net)", function()
				return state.castRemote:InvokeServer(actualPower, usePerfect)
			end)
			if ok and result == true then
				casted = true
			end
		end
		
		-- Fallback: direct remote
		if not casted then
			local castEvent = rod:FindFirstChild("events") and rod.events:FindFirstChild("cast")
			if castEvent then
				local ok = safeCall("Cast (Direct)", function()
					castEvent:FireServer(100, 1)
				end)
				if ok then casted = true end
			end
		end
		
		if casted then
			Stats.increment("totalCasts")
			Stats.increment("successfulCasts")
			if config.freezeWhileFishing then setCharacterFrozen(true) end
			task.wait(config.humanizeDelays and rng(0.4, 0.8) or 0.5)
			
			-- Occasional longer wait (simulate human thinking)
			if config.humanizeDelays and math.random(1, 15) == 1 then
				task.wait(math.random(1500, 3000) / 1000)
			end
		else
			Stats.increment("totalCasts")
			Stats.increment("failedCasts")
			task.wait(1) -- Wait longer on failure
		end
	end
end

local function startAutoCast()
	if castThread and coroutine.status(castThread) ~= "dead" then return end
	castThread = task.spawn(autoCastLoop)
end

-- ============================================================
-- AUTO SHAKE (Advanced: seed-based + multiple fallback methods)
-- ============================================================
local shakeThread = nil

-- Find shakeui in multiple locations (PlayerGui, CoreGui, gethui)
local function findShakeUI()
	-- Check PlayerGui first (most common)
	local shakeui = PLAYER_GUI:FindFirstChild("shakeui")
	if shakeui then return shakeui end
	
	-- Check CoreGui (some games use this)
	pcall(function()
		local coreGui = game:GetService("CoreGui")
		shakeui = coreGui:FindFirstChild("shakeui")
	end)
	if shakeui then return shakeui end
	
	-- Check gethui (executor hidden UI)
	if gethui then
		pcall(function()
			local hui = gethui()
			if hui then
				shakeui = hui:FindFirstChild("shakeui")
			end
		end)
	end
	if shakeui then return shakeui end
	
	return nil
end



local function autoShakeLoop()
	-- Simplified shake loop based on Nexus Hub v4 pattern
	-- Waits for seed args from LureShake/Start interception, then fires all needed shakes
	
	while state.running and config.autoShake do
		-- Wait for seed args (captured from LureShake/Start RemoteFunction)
		if state.shakeArgs then
			local args = state.shakeArgs
			state.shakeArgs = nil -- Clear immediately to prevent double-fire
			
			if config.debugMode then
				logDebug("Seed-based shake: processing seed " .. tostring(args.seed))
			end
			
			-- Calculate needed shakes using server-side RNG
			local ok = pcall(function()
				local rngObj = Random.new(args.seed)
				local scale = args.ShakeScale or 1
				local cooldown = 0.25 / scale
				local acc = args.initialTimer
				local needed = 0
				
				-- Calculate how many shakes needed
				while acc > 0 and needed < 60 do
					acc = acc - rngObj:NextNumber(0.5, 1.5)
					needed = needed + 1
				end
				
				if config.debugMode then
					logDebug(string.format("Need %d shakes, cooldown %.3fs", needed, cooldown))
				end
				
				-- Initial humanized delay (more variance)
				task.wait(math.random(80, 150) / 100)
				
				-- Fire all needed shakes with proper cooldown
				for i = 1, needed do
					if not config.autoShake then break end
					
					-- Fire shake remote
					if state.shakeRemote then
						pcall(function() state.shakeRemote:FireServer() end)
						Stats.increment("totalShakes")
					end
					
					-- Humanized cooldown between shakes (more variance)
					local jitter = math.random(-20, 40) / 1000
					task.wait(cooldown + math.random(50, 120) / 1000 + jitter)
					
					-- Occasional pause (simulate human thinking)
					if math.random(1, 10) == 1 then
						task.wait(math.random(100, 300) / 1000)
					end
				end
				
				if config.debugMode then
					logDebug("Seed-based shake completed")
				end
			end)
			
			if not ok and config.debugMode then
				logDebug("Seed-based shake failed")
			end
		else
			-- No seed args yet, wait a bit
			task.wait(0.05)
		end
	end
end

local function startAutoShake()
	if shakeThread and coroutine.status(shakeThread) ~= "dead" then return end
	shakeThread = task.spawn(autoShakeLoop)
end

-- ============================================================
-- AUTO REEL (Robust: proper timeout + validation)
-- ============================================================
local reelThread = nil

local function findReelFinishedRemote()
	local events = replicatedStorage:FindFirstChild("events")
	if not events then return nil end
	return events:FindFirstChild("reelfinished") or events:FindFirstChild("reelfinished ")
end

-- Reel via ReelController (Nexus Hub v4 pattern)
local function solveReelController(reel)
	if not reel then return false end
	
	if config.reelMode == "instant" then
		local t0 = os.clock()
		while not reel.ready and os.clock() - t0 < REEL_INSTANT_TIMEOUT do
			task.wait(0.05)
		end
		if state.reelController.ActiveReel == reel then
			local ok = pcall(function() reel:EndMinigame(true) end)
			return ok
		end
	else
		-- Legit: bar lock runs in RenderStepped, just wait for minigame to finish
		local t0 = os.clock()
		while state.reelController.ActiveReel == reel and os.clock() - t0 < REEL_LEGIT_TIMEOUT do
			task.wait(0.1)
		end
		return true
	end
	return false
end

-- Reel via upvalue manipulation (fallback)
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
		local rf = findReelFinishedRemote()
		if rf then rf:FireServer(getupvalue(updateColors, 1), true) end
	end)
end

-- Reel via simple remote fire (last resort)
local function solveReelSimple()
	local rf = findReelFinishedRemote()
	if not rf then return false end
	return pcall(function() rf:FireServer(100, true) end)
end

local function autoReelLoop()
	while state.running and config.autoReel do
		if state.reelController and state.reelController.ActiveReel then
			local reelSuccess = solveReelController(state.reelController.ActiveReel)
			
			-- Post-reel: only if successful
			if reelSuccess then
				Stats.increment("totalReels")
				Stats.increment("successfulReels")
				state.sellCounter = state.sellCounter + 1
				
				-- Auto sell
				if config.autoSell and state.sellCounter >= config.sellInterval then
					task.wait(0.3)
					local sellOk = safeCall("Auto Sell", function()
						local world = workspace:FindFirstChild("world")
						if not world then return end
						local npcs = world:FindFirstChild("npcs")
						if not npcs then return end
						local merchant = npcs:FindFirstChild(MERCHANT_NAME)
						if not merchant then return end
						local sellall = merchant:FindFirstChild("merchant") and merchant.merchant:FindFirstChild("sellall")
						if sellall and sellall:IsA("RemoteFunction") then
							sellall:InvokeServer()
							state.totalSells = state.totalSells + 1
						end
					end)
					state.sellCounter = 0
				end
				
				-- Auto appraise
				if config.autoAppraise then
					task.wait(0.2)
					safeCall("Auto Appraise", function()
						local events = replicatedStorage:FindFirstChild("events")
						if not events then return end
						local appraise = events:FindFirstChild("appraise") or events:FindFirstChild("appraiseall")
						if not appraise then return end
						if appraise:IsA("RemoteFunction") then
							appraise:InvokeServer()
						elseif appraise:IsA("RemoteEvent") then
							appraise:FireServer()
						end
					end)
				end
				
				task.wait(config.humanizeDelays and rng(0.3, 0.8) or 0.5)
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
	safeCall("Sell All", function()
		local world = workspace:FindFirstChild("world")
		if not world then return end
		local npcs = world:FindFirstChild("npcs")
		if not npcs then return end
		local merchant = npcs:FindFirstChild(MERCHANT_NAME)
		if not merchant then return end
		local sellall = merchant:FindFirstChild("merchant") and merchant.merchant:FindFirstChild("sellall")
		if sellall and sellall:IsA("RemoteFunction") then
			sellall:InvokeServer()
			state.totalSells = state.totalSells + 1
		end
	end)
end

local function clearESP()
	for _, obj in ipairs(state.espObjects) do
		pcall(function() obj:Destroy() end)
	end
	table.clear(state.espObjects)
end

local function updateFishESP()
	clearESP()
	if not config.fishESP then return end
	pcall(function()
		for _, zone in ipairs(collectionService:GetTagged("SpearfishingZone")) do
			local h = Instance.new("Highlight")
			h.Adornee = zone
			h.FillColor = Color3.fromRGB(0, 200, 255)
			h.OutlineColor = Color3.fromRGB(255, 255, 0)
			h.FillTransparency = 0.6
			h.Parent = zone
			table.insert(state.espObjects, h)
		end
		for _, d in ipairs(workspace:GetDescendants()) do
			if d:IsA("BasePart") and d.Name:lower():find("fish") then
				local h = Instance.new("Highlight")
				h.Adornee = d
				h.FillColor = Color3.fromRGB(0, 255, 100)
				h.OutlineColor = Color3.fromRGB(255, 255, 255)
				h.FillTransparency = 0.5
				h.Parent = d
				table.insert(state.espObjects, h)
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
			if dist < closestDist then
				closestDist = dist
				closest = d
			end
		end
	end
	if closest then hrp.CFrame = closest.CFrame + Vector3.new(0, 5, 0) end
end

local function spearFishAutoFarm()
	safeCall("Spear Fish Auto Farm", function()
		local packages = replicatedStorage:FindFirstChild("packages")
		if not packages then return end
		local net = packages:FindFirstChild("Net")
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
-- SAFETY HOOKS (lightweight — only __namecall + __index)
-- ============================================================
-- Bobber fix: DISABLED by default (can interfere with shake UI)
-- This was destroying "bob" and "bodyweld" attachments which can
-- cause the fishing mechanics to break and shakeui to disappear.
-- Enable via config.bobberFix if you know what you're doing.
local function watchBobbers()
	if not config.bobberFix then return end
	table.insert(state.connections, workspace.DescendantAdded:Connect(function(d)
		if not state.running then return end
		if d:IsA("BasePart") and d.Name:lower():find("bobber") then
			task.defer(function()
				if not d.Parent then return end
				for _, desc in ipairs(d:GetDescendants()) do
					if desc:IsA("Attachment") and (desc.Name == "bob" or desc.Name == "bodyweld") then
						desc:Destroy()
					end
				end
			end)
		end
	end))
end

local function installSafetyHooks()
	-- Skip ALL hooks if none are enabled (prevents "invalid client" kick)
	if not config.antiKick and not config.antiAFK and not config.spoofProperties then
		return
	end
	
	pcall(function()
		local meta = getrawmetatable(game)
		if not meta then return end
		setreadonly(meta, false)
		
		state.oldNamecall = meta.__namecall
		state.oldIndex = meta.__index
		
		-- __namecall: anti-kick + anti-AFK + spoof property signals
		meta.__namecall = newcclosure(function(self, ...)
			local method = getnamecallmethod()
			local args = {...}
			
			-- Anti-kick: block Kick calls from game scripts
			if config.antiKick and not checkcaller() then
				if method == "Kick" or method == "kick" then return end
			end
			
			-- Anti-AFK: spoof afk remote
			if config.antiAFK and method == "FireServer" and self.Name == "afk" then
				args[1] = false
				return state.oldNamecall(self, unpack(args))
			end
			
			-- Spoof GetPropertyChangedSignal for WalkSpeed/JumpPower
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
		
		-- __index: spoof WalkSpeed/JumpPower reads (local player only)
		if config.spoofProperties then
			meta.__index = newcclosure(function(self, index)
				if not checkcaller() and self and index then
					if typeof(self) == "Instance" and self:IsA("Humanoid") then
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
		
		setreadonly(meta, true)
	end)
end

-- ============================================================
-- HEARTBEAT (anti-freeze + CFrame lock + ReelController bar lock)
-- ============================================================
local function onHeartbeat()
	if not state.running then return end
	local character = LOCAL_PLAYER.Character
	if not character then return end
	local hrp = character:FindFirstChild("HumanoidRootPart")
	local hum = character:FindFirstChildOfClass("Humanoid")
	
	if hrp and hrp.Anchored then hrp.Anchored = false end
	if hum and hum.PlatformStand then hum.PlatformStand = false end
	
	-- CFrame lock while casting
	if state.frozenCFrame and hrp and config.freezeWhileFishing and config.autoCast then
		hrp.CFrame = state.frozenCFrame
	end
	
	-- ReelController bar lock (Nexus Hub v4 pattern)
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
local function onMainError(err)
	warn("[Fisch] Fatal error:", err, debug.traceback())
	unload()
end

local function initializeScript()
	pcall(function() setfpscap(9999) end)
	
	-- Load Net module (sync)
	loadNetModule()
	
	-- Heartbeat
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
	
	-- Anti-AFK
	table.insert(state.connections, LOCAL_PLAYER.Idled:Connect(function()
		if config.antiAFK then
			virtualUser:CaptureController()
			virtualUser:ClickButton2(Vector2.new())
		end
	end))
	
	-- Re-enable reel script if disabled
	table.insert(state.connections, PLAYER_GUI.DescendantAdded:Connect(function(d)
		if d.Name == "reel" and d:IsA("LocalScript") and d.Disabled then
			d.Disabled = false
		end
	end))
	
	-- INSTANT SHAKE: detect shakeui appearing and trigger shake immediately
	-- This is a backup to autoShakeLoop for faster response
	table.insert(state.connections, PLAYER_GUI.DescendantAdded:Connect(function(d)
		if not state.running or not config.autoShake then return end
		if d.Name == "shakeui" then
			if config.debugMode then
				logDebug("shakeui appeared! Triggering instant shake...")
			end
			task.spawn(function()
				task.wait(0.1) -- Small delay to let UI initialize
				if config.autoShake then
					doShake()
				end
			end)
		end
	end))
	
	-- Bite end detection
	table.insert(state.connections, PLAYER_GUI.DescendantRemoving:Connect(function(d)
		if d.Name == "playerbar" and d.Parent and d.Parent.Name == "bar" then
			state.biteEnded = true
		end
		if d.Name == "reel" and d:IsA("ScreenGui") then
			state.biteEnded = true
		end
	end))
	
	watchBobbers()
	installSafetyHooks()
	
	-- Respawn handler
	LOCAL_PLAYER.CharacterAdded:Connect(function()
		state.sellCounter = 0
		state.biteEnded = false
		state.frozenCFrame = nil
		if config.freezeWhileFishing then
			task.wait(1)
			setCharacterFrozen(false)
		end
	end)
	
	-- Session watchdog with random stop time (anti-detection)
	task.spawn(function()
		local sessionLimit = SESSION_RANDOM_STOP
		if config.debugMode then
			logDebug(string.format("Session will auto-stop after %d minutes", sessionLimit / 60))
		end
		
		while state.running do
			task.wait(60)
			local elapsed = os.clock() - state.sessionStart
			if elapsed >= sessionLimit then
				warn(string.format("[Fisch] Session limit reached (%d min). Auto-stopping for safety.", sessionLimit / 60))
				config.autoCast = false
				config.autoShake = false
				config.autoReel = false
				setCharacterFrozen(false)
				
				-- Notify user
				pcall(function()
					game:GetService("StarterGui"):SetCore("SendNotification", {
						Title = "Fisch Byte",
						Text = string.format("Session ended after %d min. Take a break!", sessionLimit / 60),
						Duration = 10
					})
				end)
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
		Name = "Fisch v6.4 | " .. platformLabel,
		LoadingTitle = "Fisch Byte",
		LoadingSubtitle = "Δ " .. compatCount .. "/14 compatible",
		ConfigurationSaving = { Enabled = true, FolderName = "FischByte", FileName = "Config_v6" },
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
		CurrentValue = true,
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
			config.reelMode = type(opt) == "table" and opt[1] or opt
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
	
	SafetyTab:CreateSection("⚠️ Hooks (may cause kick)")
	SafetyTab:CreateParagraph({
		Title = "Warning",
		Content = "Enabling hooks installs metamethod hooks.\nThis can trigger anti-cheat detection.\nOnly enable on alt accounts!",
	})
	SafetyTab:CreateToggle({
		Name = "Anti Kick (hook)",
		CurrentValue = false,
		Flag = "AntiKick",
		Callback = function(v)
			config.antiKick = v
			if v then installSafetyHooks() end
		end,
	})
	SafetyTab:CreateToggle({
		Name = "Anti AFK (hook)",
		CurrentValue = false,
		Flag = "AntiAFK",
		Callback = function(v)
			config.antiAFK = v
			if v then installSafetyHooks() end
		end,
	})
	SafetyTab:CreateToggle({
		Name = "Spoof WalkSpeed / JP (hook)",
		CurrentValue = false,
		Flag = "SpoofProps",
		Callback = function(v)
			config.spoofProperties = v
			if v then installSafetyHooks() end
		end,
	})
	SafetyTab:CreateSection("Safe (no hooks)")
	SafetyTab:CreateToggle({
		Name = "Humanize Delays",
		CurrentValue = true,
		Flag = "Humanize",
		Callback = function(v) config.humanizeDelays = v end,
	})
	SafetyTab:CreateSection("Status")
	SafetyTab:CreateParagraph({
		Title = "Delta Compatibility",
		Content = compatCount .. "/14 functions supported\nPlatform: " .. platformLabel,
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
				Content = "Teleported!",
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
				Content = "Unfrozen!",
				Duration = 3,
				Image = 4483362458,
			})
		end,
	})
	
	-- ==================== SCRIPT TAB ====================
	local ScriptTab = Window:CreateTab("Script", 4483362458)
	ScriptTab:CreateSection("Debug")
	ScriptTab:CreateToggle({
		Name = "Debug Mode (console logs)",
		CurrentValue = false,
		Flag = "DebugMode",
		Callback = function(v)
			config.debugMode = v
			if v then
				Rayfield:Notify({
					Title = "Fisch Byte",
					Content = "Debug mode enabled - check console for logs",
					Duration = 3,
					Image = 4483362458,
				})
			end
		end,
	})
	ScriptTab:CreateSection("Script")
	ScriptTab:CreateButton({
		Name = "Unload Script",
		Callback = function()
			Rayfield:Destroy()
			unload()
		end,
	})
	
	-- Startup notification
	Rayfield:Notify({
		Title = "Fisch Byte v6.4",
		Content = "Fixed shake UI disappearing | " .. compatCount .. "/14 compat | " .. platformLabel,
		Duration = 5,
		Image = 4483362458,
	})
end

xpcall(initializeScript, onMainError)
