-- KANHA PRIVATE HUB V5 (Ultimate Fixed + Full Teleports)

local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "Kanha Private Hub V5",
   LoadingTitle = "Kanha's Ultimate Build",
   LoadingSubtitle = "100% Keyless - No Bugs",
   ConfigurationSaving = { Enabled = false },
   KeySystem = false
})

local player = game.Players.LocalPlayer
local runService = game:GetService("RunService")
local virtualUser = game:GetService("VirtualUser")

-- Variabel
local autoCast = false
local autoShake = false
local autoReel = false
local infiniteOxygen = false

-- Timers
local castTimer = 0
local shakeTimer = 0
local reelTimer = 0

-- TAB FARMING
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
   Name = "Infinite Oxygen (Paksa Health)",
   CurrentValue = false,
   Flag = "OxyToggle",
   Callback = function(Value) infiniteOxygen = Value end,
})

-- TAB TELEPORT (UPDATE TOTAL)
local TpTab = Window:CreateTab("Teleport", 4483362458)

local islands = {
    -- Surface Islands
    ["Moosewood"] = Vector3.new(390, 135, 260),
    ["Roslit Bay"] = Vector3.new(-1450, 135, 750),
    ["Snowcap"] = Vector3.new(2800, 135, 2200),
    ["Forsaken"] = Vector3.new(-2720, 235, 1650),
    ["Ancient Isle"] = Vector3.new(5900, 150, 500),
    ["Mushgrove Swamp"] = Vector3.new(2600, 135, -750),
    ["Terrapin Island"] = Vector3.new(130, 135, -1000),
    ["Sunstone Island"] = Vector3.new(-950, 135, -1100),
    
    -- Special Locations
    ["Statue of Sovereignty"] = Vector3.new(120, 400, -50),
    ["Keepers Altar"] = Vector3.new(-1400, 135, -800),
    ["Vertigo"] = Vector3.new(300, 500, -2000),
    ["Frigid Cavern"] = Vector3.new(2200, 100, 2400),
    
    -- Underwater / Depths
    ["The Depths (Zona Dalam)"] = Vector3.new(1000, -600, 1200),
    ["Glimmerfin Deep"] = Vector3.new(-2000, -300, 500),
    ["Brine Pool"] = Vector3.new(3000, -200, 1800)
}

for name, pos in pairs(islands) do
    TpTab:CreateButton({
       Name = "TP to " .. name,
       Callback = function()
           if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
               player.Character.HumanoidRootPart.CFrame = CFrame.new(pos)
               Rayfield:Notify({Title = "Teleport", Content = "Pindah ke " .. name, Duration = 3})
           end
       end,
    })
end

-- LOGIC LOOP
runService.RenderStepped:Connect(function()
    local currentTime = tick()
    local char = player.Character
    
    -- FIX 1: AUTO CAST (Lempar Kail)
    if autoCast and (currentTime - castTimer >= 2.5) then
        castTimer = currentTime
        mouse1click() -- Fungsi executor yang gak ngunci kursor
    end

    -- FIX 2: AUTO SHAKE (Goyang Kail)
    if autoShake and (currentTime - shakeTimer >= 0.1) then
        shakeTimer = currentTime
        mouse1click()
    end

    -- FIX 3: AUTO REEL (Tarik Ikan)
    if autoReel and (currentTime - reelTimer >= 0.1) then
        reelTimer = currentTime
        mouse1click()
    end

    -- FIX 4: INFINITE OXYGEN (Anti Lemas)
    if infiniteOxygen and char then
        local hum = char:FindFirstChild("Humanoid")
        if hum then
            hum.MaxHealth = 999999
            hum.Health = 999999
            -- Cari folder Oksigen di GUI game biar gak nge-reset
            local gui = player:FindFirstChild("PlayerGui")
            if gui then
                local oxy = gui:FindFirstChild("Oxygen", true)
                if oxy and oxy:IsA("TextLabel") then
                    oxy.Text = "1000"
                end
            end
        end
    end
end)

Rayfield:Notify({
   Title = "Kanha Hub V5",
   Content = "Sistem gerak, Oxy, dan Teleport FIXED.",
   Duration = 5,
   Image = 4483362458,
})
