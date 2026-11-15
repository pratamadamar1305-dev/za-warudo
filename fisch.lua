-- KANHA PRIVATE HUB V6 (Remote Event Method - NO INPUT LOCK)
-- Bebas gerak, bebas klik, auto-fish tetep jalan.

local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "Kanha Private Hub V6",
   LoadingTitle = "Kanha's Ultimate Build",
   LoadingSubtitle = "No Input Lock - Remote Event",
   ConfigurationSaving = { Enabled = false },
   KeySystem = false
})

local player = game.Players.LocalPlayer
local runService = game:GetService("RunService")
local guiService = game:GetService("GuiService")

-- VARIABEL
local autoCast = false
local autoShake = false
local autoReel = false
local infiniteOxygen = false

-- TAB FARMING
local FarmTab = Window:CreateTab("Farming", 4483362458)

FarmTab:CreateToggle({
   Name = "Auto Cast (Remote Event)",
   CurrentValue = false,
   Flag = "AutoCastToggle",
   Callback = function(Value) autoCast = Value end,
})

FarmTab:CreateToggle({
   Name = "Auto Shake (UI Navigation)",
   CurrentValue = false,
   Flag = "AutoShakeToggle",
   Callback = function(Value) autoShake = Value end,
})

FarmTab:CreateToggle({
   Name = "Auto Reel (Remote Event)",
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

-- TAB TELEPORT (LENGKAP)
local TpTab = Window:CreateTab("Teleport", 4483362458)

local islands = {
    ["Moosewood"] = Vector3.new(390, 135, 260),
    ["Roslit Bay"] = Vector3.new(-1450, 135, 750),
    ["Snowcap"] = Vector3.new(2800, 135, 2200),
    ["Forsaken"] = Vector3.new(-2720, 235, 1650),
    ["Ancient Isle"] = Vector3.new(5900, 150, 500),
    ["Mushgrove Swamp"] = Vector3.new(2600, 135, -750),
    ["Terrapin Island"] = Vector3.new(130, 135, -1000),
    ["Sunstone Island"] = Vector3.new(-950, 135, -1100),
    ["Statue of Sovereignty"] = Vector3.new(120, 400, -50),
    ["Keepers Altar"] = Vector3.new(-1400, 135, -800),
    ["Vertigo"] = Vector3.new(300, 500, -2000),
    ["Frigid Cavern"] = Vector3.new(2200, 100, 2400),
    ["The Depths"] = Vector3.new(1000, -600, 1200),
    ["Glimmerfin Deep"] = Vector3.new(-2000, -300, 500),
    ["Brine Pool"] = Vector3.new(3000, -200, 1800),
    ["Harvester's Spike"] = Vector3.new(2200, 135, 2000)
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

-- LOGIC LOOP (TANPA INPUT MOUSE)
runService.Heartbeat:Connect(function()
    local char = player.Character
    
    -- 1. AUTO CAST (Tembak Remote Event)
    if autoCast and char then
        local tool = char:FindFirstChildOfClass("Tool")
        if tool and tool:FindFirstChild("events") and tool.events:FindFirstChild("cast") then
            tool.events.cast:FireServer(100, 1)
            task.wait(2) -- Jeda biar gak spam
        end
    end

    -- 2. AUTO SHAKE (Navigasi UI, Bukan Klik Mouse)
    if autoShake then
        local shakeUI = player.PlayerGui:FindFirstChild("shakeui")
        if shakeUI then
            local button = shakeUI:FindFirstChild("safezone") and shakeUI.safezone:FindFirstChild("button")
            if button then
                guiService.SelectedObject = button
                -- Tekan Enter via VirtualInput (ini gak ngunci mouse, cuma keyboard)
                game:GetService("VirtualInputManager"):SendKeyEvent(true, Enum.KeyCode.Return, false, game)
                task.wait(0.05)
                game:GetService("VirtualInputManager"):SendKeyEvent(false, Enum.KeyCode.Return, false, game)
            end
        end
    end

    -- 3. AUTO REEL (Tembak Remote Event)
    if autoReel then
        -- Reel di Fisch biasanya pakai event "reelfinished" atau sejenis
        local reelEvent = game:GetService("ReplicatedStorage"):FindFirstChild("events") 
        if reelEvent and reelEvent:FindFirstChild("reelfinished") then
            reelEvent.reelfinished:FireServer(100, true)
        end
    end

    -- 4. INFINITE OXYGEN (Set Health)
    if infiniteOxygen and char then
        local hum = char:FindFirstChild("Humanoid")
        if hum then
            hum.MaxHealth = 999999
            hum.Health = 999999
        end
    end
end)
