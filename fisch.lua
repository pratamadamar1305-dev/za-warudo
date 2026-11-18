--[[
    [K] FISCH PRIVATE BUILD v3.0 — RAYFIELD UI
    Keyless. Paths locked from Kanha's console dump.
]]

if not game:IsLoaded() then game.Loaded:Wait() end

-- ────────────────────────────────────────────
-- RAYFIELD LOADER
-- ────────────────────────────────────────────
local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Players     = game:GetService("Players")
local RS          = game:GetService("ReplicatedStorage")
local UserInput   = game:GetService("UserInputService")
local VirtualUser = game:GetService("VirtualUser")
local Player      = Players.LocalPlayer

-- ────────────────────────────────────────────
-- CONFIG
-- ────────────────────────────────────────────
local CONFIG = {
    AutoFish        = false,
    AutoShake       = true,
    ESP             = false,
    Speed           = 22,
    AntiAFK         = true,
    RandomizeTiming = true,
    ShakeInterval   = 0.08,
}

local function jitter(base)
    if not CONFIG.RandomizeTiming then return base end
    return base + math.random(-40, 40) / 1000
end
local function wait_j(t) task.wait(jitter(t)) end

-- ────────────────────────────────────────────
-- ANTI-BAN & ANTI-AFK
-- ────────────────────────────────────────────
Player.Idled:Connect(function()
    if CONFIG.AntiAFK then
        VirtualUser:CaptureController()
        VirtualUser:ClickButton2(Vector2.new())
    end
end)

local last_fire = 0
local function safe_fire(remote, ...)
    if not remote then return end
    local now = tick()
    if now - last_fire < (0.08 + math.random()*0.04) then return end
    last_fire = now
    local args = {...}
    pcall(function() remote:FireServer(table.unpack(args)) end)
end

-- ────────────────────────────────────────────
-- REMOTES (Exact Paths from Console)
-- ────────────────────────────────────────────
local Remotes = {
    RodCast      = RS:WaitForChild("events", 10) and RS.events:WaitForChild("rod_cast", 5),
    ReelFinished = RS:WaitForChild("events", 10) and RS.events:WaitForChild("reelfinished", 5),
    RodEquip     = RS:WaitForChild("events", 10) and RS.events:WaitForChild("anno_equip", 5),
}

pcall(function()
    Remotes.Shake = RS.resources.replicated.fishing.shakeui.safezone.shakeui.button.shake
end)

-- ────────────────────────────────────────────
-- SHAKE PROMPT FINDER
-- ────────────────────────────────────────────
local function find_shake_prompt()
    local pg = Player:FindFirstChild("PlayerGui")
    if not pg then return nil end
    for _, d in ipairs(pg:GetDescendants()) do
        if (d:IsA("TextButton") or d:IsA("ImageButton")) and d.Visible then
            local n = d.Name:lower()
            if n:find("shake") or n:find("reel") then
                return d
            end
        end
    end
    return nil
end

-- ────────────────────────────────────────────
-- MAIN LOOP
-- ────────────────────────────────────────────
task.spawn(function()
    while task.wait() do
        if not CONFIG.AutoFish then continue end

        if math.random() < 0.04 then wait_j(0.7); continue end

        if Remotes.RodCast then
            safe_fire(Remotes.RodCast)
        else
            local tool = Player.Character and Player.Character:FindFirstChildOfClass("Tool")
            if tool then pcall(function() tool:Activate() end) end
        end

        wait_j(2.0)

        local shake_deadline = tick() + 25
        local had_bite = false
        
        while tick() < shake_deadline and CONFIG.AutoFish do
            local prompt = find_shake_prompt()
            if prompt then
                had_bite = true
                if CONFIG.AutoShake then
                    pcall(function() prompt:Click() end)
                    if Remotes.Shake then safe_fire(Remotes.Shake) end
                end
                wait_j(CONFIG.ShakeInterval)
            else
                if had_bite then break end
                wait_j(0.15)
            end
        end

        wait_j(0.4)
        if Remotes.ReelFinished then safe_fire(Remotes.ReelFinished) end

        wait_j(1.0)
    end
end)

-- ────────────────────────────────────────────
-- SPEED HANDLER
-- ────────────────────────────────────────────
local function apply_speed()
    local hum = Player.Character and Player.Character:FindFirstChildOfClass("Humanoid")
    if hum then hum.WalkSpeed = CONFIG.Speed end
end
Player.CharacterAdded:Connect(function(c)
    c:WaitForChild("Humanoid")
    apply_speed()
end)

-- ────────────────────────────────────────────
-- ESP HANDLER
-- ────────────────────────────────────────────
local drawings = {}
task.spawn(function()
    while task.wait(0.5) do
        if not CONFIG.ESP then
            for _, hl in pairs(drawings) do hl:Remove() end
            drawings = {}
            continue
        end
        for _, d in ipairs(workspace:GetDescendants()) do
            if d:IsA("Model") and d:FindFirstChild("Handle") then
                local n = d.Name:lower()
                if n:find("fish") or n:find("crab") or n:find("shark") or n:find("ray") then
                    if not drawings[d] then
                        local hl = Drawing.new("Highlight")
                        hl.Adornee = d.Handle
                        hl.FillColor = Color3.fromRGB(0, 255, 200)
                        hl.OutlineColor = Color3.fromRGB(255, 255, 255)
                        hl.FillTransparency = 0.6
                        hl.OutlineTransparency = 0
                        drawings[d] = hl
                    end
                end
            end
        end
    end
end)

-- ────────────────────────────────────────────
-- RAYFIELD UI
-- ────────────────────────────────────────────
local Window = Rayfield:CreateWindow({
    Name = "Fisch | [K] Private",
    LoadingTitle = "Loading [K] build...",
    LoadingSubtitle = "made for kanha",
    ConfigurationSaving = {
        Enabled = true,
        FolderName = "K_Fisch",
        FileName = "Config"
    },
    KeySystem = false
})

-- ─── TAB 1: MAIN ───
local MainTab = Window:CreateTab("Main", 4483362458)
local MainSection = MainTab:CreateSection("Automation")

MainTab:CreateToggle({
    Name = "Auto Fish",
    CurrentValue = false,
    Flag = "AutoFish",
    Callback = function(v)
        CONFIG.AutoFish = v
    end
})

MainTab:CreateToggle({
    Name = "Auto Shake",
    CurrentValue = true,
    Flag = "AutoShake",
    Callback = function(v)
        CONFIG.AutoShake = v
    end
})

MainTab:CreateSlider({
    Name = "Shake Speed (s)",
    Range = {0.03, 0.2},
    Increment = 0.01,
    Suffix = "s",
    CurrentValue = 0.08,
    Flag = "ShakeSpeed",
    Callback = function(v)
        CONFIG.ShakeInterval = v
    end
})

-- ─── TAB 2: PLAYER ───
local PlayerTab = Window:CreateTab("Player", 4483362458)
local PlayerSection = PlayerTab:CreateSection("Movement & Render")

PlayerTab:CreateSlider({
    Name = "WalkSpeed",
    Range = {16, 150},
    Increment = 1,
    Suffix = "spd",
    CurrentValue = 22,
    Flag = "Speed",
    Callback = function(v)
        CONFIG.Speed = v
        apply_speed()
    end
})

PlayerTab:CreateToggle({
    Name = "ESP Fish",
    CurrentValue = false,
    Flag = "ESP",
    Callback = function(v)
        CONFIG.ESP = v
    end
})

-- ─── TAB 3: SETTINGS ───
local SettingsTab = Window:CreateTab("Settings", 4483362458)
local SettingsSection = SettingsTab:CreateSection("Anti-Ban")

SettingsTab:CreateToggle({
    Name = "Anti-AFK",
    CurrentValue = true,
    Flag = "AntiAFK",
    Callback = function(v)
        CONFIG.AntiAFK = v
    end
})

SettingsTab:CreateToggle({
    Name = "Randomize Timing (Jitter)",
    CurrentValue = true,
    Flag = "Jitter",
    Callback = function(v)
        CONFIG.RandomizeTiming = v
    end
})

SettingsTab:CreateButton({
    Name = "Re-lock Remotes",
    Callback = function()
        Remotes.RodCast      = RS.events:FindFirstChild("rod_cast")
        Remotes.ReelFinished = RS.events:FindFirstChild("reelfinished")
        Remotes.RodEquip     = RS.events:FindFirstChild("anno_equip")
        pcall(function()
            Remotes.Shake = RS.resources.replicated.fishing.shakeui.safezone.shakeui.button.shake
        end)
        Rayfield:Notify({Title="Remotes", Content="Locked in.", Duration=3})
    end
})

SettingsTab:CreateButton({
    Name = "Unload Script",
    Callback = function()
        Rayfield:Destroy()
    end
})

Rayfield:Notify({
    Title = "[K] Armed",
    Content = "rod_cast / shake / reelfinished locked.",
    Duration = 5,
    Image = 4483362458
})

print("[K] Fisch v3.0 — Rayfield UI loaded.")
