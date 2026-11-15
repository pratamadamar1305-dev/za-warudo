-- KANHA PRIVATE HUB V3 (Bug Fixed)

local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "Kanha Private Hub V3",
   LoadingTitle = "Kanha's Custom Build",
   LoadingSubtitle = "100% Keyless & Bug Fixed",
   ConfigurationSaving = { Enabled = false },
   KeySystem = false
})

local player = game.Players.LocalPlayer
local vim = game:GetService("VirtualInputManager")
local runService = game:GetService("RunService")

local autoCast = false
local autoShake = false
local autoReel = false
local infiniteOxygen = false

-- Timers (Biar gak saling nge-freeze)
local castTimer = 0
local shakeTimer = 0
local reelTimer = 0

local FarmTab = Window:CreateTab("Farming", 4483362458)

FarmTab:CreateToggle({
   Name = "Auto Cast",
   CurrentValue = false,
   Flag = "AutoCastToggle",
   Callback = function(Value) autoCast = Value end,
})

FarmTab:CreateToggle({
   Name = "Auto Shake",
   CurrentValue = false,
   Flag = "AutoShakeToggle",
   Callback = function(Value) autoShake = Value end,
})

FarmTab:CreateToggle({
   Name = "Auto Reel",
   CurrentValue = false,
   Flag = "AutoReelToggle",
   Callback = function(Value) autoReel = Value end,
})

FarmTab:CreateToggle({
   Name = "Infinite Oxygen",
   CurrentValue = false,
   Flag = "OxyToggle",
   Callback = function(Value) infiniteOxygen = Value end,
})

local TpTab = Window:CreateTab("Teleport", 4483362458)

local islands = {
    ["Moosewood"] = Vector3.new(390, 135, 260),
    ["Roslit Bay"] = Vector3.new(-1450, 135, 750),
    ["Snowcap"] = Vector3.new(2800, 135, 2200),
    ["Forsaken"] = Vector3.new(-2720, 235, 1650),
    ["Ancient Isle"] = Vector3.new(5900, 150, 500),
}

for name, pos in pairs(islands) do
    TpTab:CreateButton({
       Name = "TP to " .. name,
       Callback = function()
           if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
               player.Character.HumanoidRootPart.CFrame = CFrame.new(pos)
           end
       end,
    })
end

runService.RenderStepped:Connect(function()
    local currentTime = tick()
    local char = player.Character
    
    -- Auto Cast (Delay 2.5 detik biar aman)
    if autoCast and (currentTime - castTimer >= 2.5) then
        castTimer = currentTime
        vim:SendMouseButtonEvent(0, 0, 0, true, game, 1)
        vim:SendMouseButtonEvent(0, 0, 0, false, game, 1)
    end

    -- Auto Shake (Spam cepet)
    if autoShake and (currentTime - shakeTimer >= 0.05) then
        shakeTimer = currentTime
        vim:SendMouseButtonEvent(0, 0, 0, true, game, 1)
        vim:SendMouseButtonEvent(0, 0, 0, false, game, 1)
    end

    -- Auto Reel (Spam cepet)
    if autoReel and (currentTime - reelTimer >= 0.05) then
        reelTimer = currentTime
        vim:SendMouseButtonEvent(0, 0, 0, true, game, 1)
        vim:SendMouseButtonEvent(0, 0, 0, false, game, 1)
    end

    -- Infinite Oxygen
    if infiniteOxygen and char then
        local oxygen = char:FindFirstChild("Oxygen") or player:FindFirstChild("Oxygen")
        if oxygen and oxygen:IsA("ValueBase") then
            oxygen.Value = 9999
        end
    end
end)

Rayfield:Notify({
   Title = "Kanha Hub V3",
   Content = "Bug di-fix. RenderStepped aman. Gaskan.",
   Duration = 5,
   Image = 4483362458,
})