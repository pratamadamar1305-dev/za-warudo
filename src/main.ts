/**
 * main.ts — bootstrap, loop utama, state machine, wiring semua sistem.
 *
 * Urutan: Boot (tap to start) → audio unlock → Menu ↔ Garage/Settings →
 * Race (countdown → race → results) → Race lagi.
 *
 * Aturan keras: tidak ada state nyangkut, tidak ada kebocoran, tidak ada
 * AudioContext ganda (§13).
 */

import "./style.css";
import * as THREE from "three";
import { AudioEngine } from "./core/AudioEngine";
import { Eurobeat, TRACKS } from "./core/Eurobeat";
import { SFX } from "./core/SFX";
import { Loop } from "./core/Loop";
import { Input } from "./core/Input";
import { StateMachine } from "./core/StateMachine";
import { SaveManager } from "./core/Save";
import { carById, CARS, PHYSICS, RACE, RIVALS, type RivalProfile } from "./sim/Tuning";
import { buildGunmaPass } from "./sim/TrackSpline";
import { RaceLogic, registerRivalSpecs, type RaceMode } from "./sim/RaceLogic";
import { DriftScore } from "./sim/DriftScore";
import { setupScene, type SceneSetup } from "./render/SceneSetup";
import { buildTrackMesh, type TrackMeshes } from "./render/TrackMesh";
import { buildScenery, type SceneryResult } from "./render/Scenery";
import { buildCar, type CarModel } from "./render/CarModel";
import { FX } from "./render/FX";
import { SpeedFx } from "./render/SpeedFx";
import { CameraRig } from "./render/CameraRig";
import { Cutscene } from "./render/Cutscene";
import { HUD } from "./ui/HUD";
import { Menu, type RaceModeKey } from "./ui/Menu";
import { DialogSystem } from "./ui/DialogSystem";
import { Results, formatTime } from "./ui/Results";
import { SettingsApplier } from "./ui/Settings";

/* ------------------------------------------------------------------ */
/* DOM help                                                            */
/* ------------------------------------------------------------------ */

const app = document.getElementById("app")!;
const uiRoot = document.getElementById("ui")!;
const canvas = document.getElementById("gl") as HTMLCanvasElement;
const bootEl = document.getElementById("boot")!;
const bootBtn = document.getElementById("boot-start") as HTMLButtonElement;
const fatalEl = document.getElementById("fatal")!;
const fatalMsg = document.getElementById("fatal-msg")!;

function showFatal(err: unknown): void {
  const msg = err instanceof Error ? `${err.name}: ${err.message}\n${err.stack ?? ""}` : String(err);
  fatalMsg.textContent = msg;
  fatalEl.hidden = false;
  bootEl.classList.add("hide");
}

/* ------------------------------------------------------------------ */
/* Bootstrapping                                                       */
/* ------------------------------------------------------------------ */

registerRivalSpecs(CARS);

const save = new SaveManager();
const input = new Input();
const states = new StateMachine();

let renderer: SceneSetup | null = null;
let audio: AudioEngine | null = null;
let eurobeat: Eurobeat | null = null;
let sfx: SFX | null = null;
let cameraRig: CameraRig | null = null;
let speedFx: SpeedFx | null = null;
let hud: HUD | null = null;
let menu: Menu | null = null;
let dialog: DialogSystem | null = null;
let results: Results | null = null;
let settingsApplier: SettingsApplier | null = null;
let loop: Loop | null = null;

/* Race-scoped objects (dispose di setiap transisi keluar Race) */
let race: RaceLogic | null = null;
let trackMesh: TrackMeshes | null = null;
let scenery: SceneryResult | null = null;
let fx: FX | null = null;
let playerCar: CarModel | null = null;
let rivalCar: CarModel | null = null;
let driftScore: DriftScore | null = null;
let currentMode: RaceMode = "downhill";
let currentRival: RivalProfile = RIVALS[0]!;
let raceSeed = 0x2f6b1;
let ghost: GhostRecorder | null = null;
let ghostCar: CarModel | null = null;
let cutscene: Cutscene | null = null;
let introActive = false;
let raceTime = 0;
let lastHitAt = 0;
let cameraModeIndex = 0;
let qualityAutoShown = false;
let started = false;

const CAMERA_MODES = ["chase", "bumper", "hood"] as const;

/* ------------------------------------------------------------------ */
/* Ghost replay (Time Attack)                                          */
/* ------------------------------------------------------------------ */

interface GhostFrame {
  s: number;
  lateral: number;
  t: number;
}

class GhostRecorder {
  frames: GhostFrame[] = [];
  private timer = 0;
  private readonly sample = 1 / RACE.GHOST_SAMPLE_HZ;

  reset(): void {
    this.frames = [];
    this.timer = 0;
  }

  update(dt: number, s: number, lateral: number, t: number): void {
    this.timer += dt;
    if (this.timer < this.sample) return;
    this.timer = 0;
    this.frames.push({ s, lateral, t });
  }

  get best(): GhostFrame[] | null {
    return this.frames.length > 4 ? this.frames : null;
  }
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

async function boot(): Promise<void> {
  try {
    input.attach(document);
    renderer = setupScene(canvas, save.data.settings.quality);
    // Tonemap & warna kini ditangani pipeline post-FX (ACES + sRGB di shader),
    // jadi renderer tidak boleh menerapkan keduanya lagi.
    renderer.renderer.toneMapping = THREE.NoToneMapping;
    renderer.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    speedFx = new SpeedFx(renderer.renderer, app.clientWidth || 1280, app.clientHeight || 720);
    cameraRig = new CameraRig(renderer.camera);
    cameraRig.reset();

    cutscene = new Cutscene(uiRoot);
    hud = new HUD(uiRoot);
    dialog = new DialogSystem(uiRoot, { onBlip: () => sfx?.hover() });

    results = new Results(uiRoot, {
      onRestart: () => {
        startRace(currentMode, currentRival.id);
      },
      onGarage: () => {
        results?.hide();
        states.go("Garage");
        menu?.show("garage");
      },
      onMenu: () => {
        results?.hide();
        returnToMenu();
      },
      onConfirm: () => sfx?.confirm(),
    });

    menu = new Menu(uiRoot, save, {
      onStartRace: (mode, rivalId) => {
        const profile = RIVALS.find((r) => r.id === rivalId) ?? RIVALS[0]!;
        startRace(modeToRaceMode(mode), profile.id);
      },
      onSelectCar: () => {},
      onBuyUpgrade: (carId, kind) => {
        const ok = save.buyUpgrade(carId, kind);
        hud?.toast(ok ? "Upgrade terpasang" : "Cuan tidak cukup", 1600);
      },
      onSettingsChange: (patch) => {
        save.updateSettings(patch);
        settingsApplier?.apply(save.data.settings);
      },
      onOpen: (screen) => {
        states.force(screen === "garage" ? "Garage" : screen === "settings" ? "Settings" : screen === "controls" ? "Controls" : screen === "credits" ? "Credits" : "Menu");
        if (screen === "menu") menu?.refreshMenu();
      },
      onHover: () => void sfx?.hover(),
      onConfirm: () => void sfx?.confirm(),
      onBack: () => void sfx?.back(),
    });
    menu.refreshMenu();

    settingsApplier = new SettingsApplier({
      audio,
      camera: cameraRig,
      root: document.documentElement,
      onQuality: (q) => {
        renderer?.setQuality(q);
        speedFx?.setQuality(q);
      },
    });

    // Resize dengan ResizeObserver (§13.8)
    const ro = new ResizeObserver(() => {
      const w = app.clientWidth;
      const h = app.clientHeight;
      renderer?.setSize(w, h);
      speedFx?.setSize(w, h);
      cutscene?.resize();
    });
    ro.observe(app);
    renderer.setSize(app.clientWidth, app.clientHeight);
    speedFx.setSize(app.clientWidth, app.clientHeight);

    // visibility change: pause + suspend audio (§13.2)
    // Semua listener global didaftarkan dengan AbortController agar bisa
    // dilepas bersih saat teardown (tidak ada listener menggantung).
    globalAbort = new AbortController();
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden && states.current === "Race") setPaused(true);
      },
      { signal: globalAbort.signal },
    );
    window.addEventListener(
      "focus",
      () => {
        if (states.current === "Race" && loop && !loop.paused) void audio?.resume();
      },
      { signal: globalAbort.signal },
    );
    window.addEventListener(
      "pagehide",
      () => {
        audio?.suspend();
        loop?.stop();
      },
      { signal: globalAbort.signal },
    );

    // Loop
    loop = new Loop(
      {
        fixedStep: (dt) => fixedStep(dt),
        render: (alpha, dt) => renderFrame(alpha, dt),
      },
      PHYSICS.DT,
      PHYSICS.MAX_SUBSTEPS,
      PHYSICS.MAX_FRAME_DT,
    );
    loop.start();

    bootBtn.disabled = false;
    bootBtn.textContent = "TAP TO START";
    bootBtn.addEventListener("click", () => void startGame(), { once: true, signal: globalAbort.signal });
    startGameResolve?.();
  } catch (err) {
    showFatal(err);
  }
}

let startGameResolve: (() => void) | null = null;
let globalAbort: AbortController | null = null;

/* ------------------------------------------------------------------ */
/* Start (gesture pertama)                                             */
/* ------------------------------------------------------------------ */

async function startGame(): Promise<void> {
  if (started) return;
  started = true;
  try {
    audio = new AudioEngine();
    await audio.unlock();
    audio.setMasterVolume(save.data.settings.masterVolume);
    audio.setMusicVolume(save.data.settings.musicVolume);
    audio.setSfxVolume(save.data.settings.sfxVolume);

    eurobeat = new Eurobeat(audio);
    eurobeat.build();
    sfx = new SFX(audio);
    sfx.build();
    settingsApplier = new SettingsApplier({
      audio,
      camera: cameraRig,
      root: document.documentElement,
      onQuality: (q) => {
        renderer?.setQuality(q);
        speedFx?.setQuality(q);
      },
    });
    settingsApplier.apply(save.data.settings);

    bootEl.classList.add("hide");
    states.go("Menu");
    menu?.show("menu");

    // tampilkan dialog pembuka sekali
    dialog?.say("PLAYER", "Malam ini Gunma Pass. Kabut tipis, aspal kering. Waktunya turun.");
    dialog?.say("RYO", "Heh, AE86? Kamu bercanda ya. Sori, tapi aku nggak punya waktu.");
  } catch (err) {
    started = false;
    showFatal(err);
  }
}

function modeToRaceMode(m: RaceModeKey): RaceMode {
  switch (m) {
    case "downhill":
      return "downhill";
    case "uphill":
      return "uphill";
    case "timeattack":
      return "timeattack";
    case "tofu":
      return "tofu";
  }
}

/* ------------------------------------------------------------------ */
/* Race lifecycle                                                      */
/* ------------------------------------------------------------------ */

function disposeRace(): void {
  introActive = false;
  trackMesh?.dispose();
  scenery?.dispose();
  fx?.dispose();
  playerCar?.dispose();
  rivalCar?.dispose();
  ghostCar?.dispose();
  if (renderer) {
    for (const child of [...renderer.scene.children]) {
      if (child.userData.raceScoped) renderer.scene.remove(child);
    }
  }
  trackMesh = null;
  scenery = null;
  fx = null;
  playerCar = null;
  rivalCar = null;
  ghostCar = null;
  race = null;
  driftScore = null;
  ghost = null;
  ghostCar = null;
  hud?.hide();
}

function startRace(mode: RaceMode, rivalId: string): void {
  if (!renderer) return;
  disposeRace();
  results?.hide();
  menu?.show(null);
  raceTime = 0;
  lastHitAt = 0;
  cameraModeIndex = CAMERA_MODES.indexOf(save.data.settings.cameraMode as (typeof CAMERA_MODES)[number]);
  if (cameraModeIndex < 0) cameraModeIndex = 0;

  currentMode = mode;
  currentRival = RIVALS.find((r) => r.id === rivalId) ?? RIVALS[0]!;
  raceSeed = (raceSeed * 1664525 + 1013904223) >>> 0;

  const track = buildGunmaPass();
  trackMesh = buildTrackMesh(track);
  trackMesh.group.userData.raceScoped = true;
  renderer.scene.add(trackMesh.group);

  scenery = buildScenery(track, trackMesh);
  scenery.group.userData.raceScoped = true;
  renderer.scene.add(scenery.group);

  fx = new FX();
  fx.group.userData.raceScoped = true;
  renderer.scene.add(fx.group);

  const playerSpec = carById(save.data.progress.selectedCar);
  const upgrades = save.data.progress.upgrades[playerSpec.id];

  const profile = RIVALS.find((r) => r.id === currentRival.id)!;
  race = new RaceLogic(track, {
    mode,
    playerSpec: applyUpgrades(playerSpec, upgrades),
    playerName: "KAMU",
    rivals: [profile],
    seed: raceSeed,
    difficulty: 1,
  });

  // efisiensi: naikkan grip & power sesuai upgrade
  if (upgrades) {
    race.player.gripMod = 1 + upgrades.tire * 0.035;
    race.player.powerMod = 1 + upgrades.engine * 0.05;
  }

  playerCar = buildCar(playerSpec, { outline: true });
  playerCar.root.userData.raceScoped = true;
  renderer.scene.add(playerCar.root);

  const rivalEntry = race.rivalEntry;
  if (rivalEntry) {
    rivalCar = buildCar(carById(rivalEntry.carId), { outline: true });
    rivalCar.root.userData.raceScoped = true;
    renderer.scene.add(rivalCar.root);
    // lampu rival: jangan beri spotlight (mahal) — hanya material
    rivalCar.root.traverse((o) => {
      if ((o as THREE.SpotLight).isSpotLight) o.visible = false;
    });
  } else {
    rivalCar = null;
  }

  driftScore = new DriftScore();
  ghost = new GhostRecorder();

  hud?.setTrack(track);
  hud?.show();
  hud?.setRole(
    mode === "timeattack" ? "TIME ATTACK" : mode === "tofu" ? "TOFU DELIVERY" : mode === "uphill" ? "UPHILL BATTLE" : "DOWNHILL BATTLE",
  );

  // dialog pembuka race
  const rivalLines = race.rivalEntry ? profile.lines.intro : [];
  if (rivalLines.length > 0 && save.data.settings.subtitles) {
    dialog?.sayMany(profile.name, rivalLines);
  } else if (mode === "timeattack") {
    dialog?.say("PLAYER", "Sendirian. Waktu bicara, bukan lawan.");
  }

  cameraRig?.reset();
  cameraRig!.mode = CAMERA_MODES[cameraModeIndex] ?? "chase";

  // Intro cutscene (§3.7): dolly mengelilingi mobil, bisa di-skip.
  introActive = true;
  const startPos = new THREE.Vector3(
    race.player.state.x,
    track.sampleAt(race.player.state.trackS).y,
    race.player.state.z,
  );
  cutscene?.start(startPos, race.player.state.heading, () => {
    introActive = false;
  });

  // musik mulai
  if (eurobeat) {
    eurobeat.setDriftIntensity(0);
    eurobeat.clearCrossfade();
    eurobeat.crossfadeTo(Math.floor(Math.random() * TRACKS.length));
    eurobeat.setBpm(150);
  }

  states.force("Race");
  loop!.paused = false;
  loop!.resetClock();
  hud?.showCountdown();
  void audio?.resume();
}

function returnToMenu(): void {
  disposeRace();
  results?.hide();
  states.force("Menu");
  menu?.show("menu");
  menu?.refreshMenu();
  dialog?.hide();
  eurobeat?.setDriftIntensity(0);
  cameraRig?.reset();
}

function setPaused(on: boolean): void {
  if (states.current !== "Race" && states.current !== "Pause") return;
  if (on) {
    states.go("Pause");
    loop!.paused = true;
    sfx?.silenceContinuous();
    audio?.suspend();
    eurobeat?.suspend();
    showPauseOverlay();
  } else {
    states.go("Race");
    loop!.paused = false;
    loop!.resetClock();
    void audio?.resume();
    eurobeat?.resume();
    hidePauseOverlay();
  }
}

let pauseOverlay: HTMLElement | null = null;

function showPauseOverlay(): void {
  if (pauseOverlay) return;
  pauseOverlay = document.createElement("div");
  pauseOverlay.className = "screen";
  pauseOverlay.style.zIndex = "28";
  pauseOverlay.style.background = "rgba(4,7,14,.72)";
  pauseOverlay.style.alignItems = "center";
  pauseOverlay.style.justifyContent = "center";
  pauseOverlay.innerHTML = `
    <div class="panel pad" style="text-align:center;min-width:300px">
      <h2 class="screen-title" style="margin-bottom:14px">PAUSE</h2>
      <div style="display:grid;gap:9px">
        <button class="btn" data-p="resume">Lanjut (ESC)</button>
        <button class="btn" data-p="restart">Restart (R)</button>
        <button class="btn" data-p="menu">Menu</button>
        <button class="btn btn-sm" data-p="mute">Musik: ON</button>
      </div>
      <p style="font-size:10px;color:var(--dim);margin-top:12px">Pause on blur aktif · audio di-suspend</p>
    </div>`;
  uiRoot.appendChild(pauseOverlay);
  pauseOverlay.querySelector('[data-p="resume"]')!.addEventListener("click", () => setPaused(false));
  pauseOverlay.querySelector('[data-p="restart"]')!.addEventListener("click", () => {
    hidePauseOverlay();
    startRace(currentMode, currentRival.id);
  });
  pauseOverlay.querySelector('[data-p="menu"]')!.addEventListener("click", () => {
    hidePauseOverlay();
    loop!.paused = false;
    returnToMenu();
  });
  const muteBtn = pauseOverlay.querySelector('[data-p="mute"]') as HTMLButtonElement;
  muteBtn.addEventListener("click", () => {
    const s = save.data.settings;
    const next = s.musicVolume > 0 ? 0 : 0.62;
    save.updateSettings({ musicVolume: next });
    settingsApplier?.apply(save.data.settings);
    muteBtn.textContent = `Musik: ${next > 0 ? "ON" : "OFF"}`;
  });
}

function hidePauseOverlay(): void {
  pauseOverlay?.remove();
  pauseOverlay = null;
}

function applyUpgrades(spec: ReturnType<typeof carById>, upg?: { tire: number; susp: number; lsd: number; engine: number }) {
  if (!upg) return spec;
  return {
    ...spec,
    gripScale: spec.gripScale + upg.tire * 0.03,
    powerHp: spec.powerHp * (1 + upg.engine * 0.05),
    driftBias: spec.driftBias + upg.lsd * 0.06,
    inertiaYaw: spec.inertiaYaw * (1 - upg.susp * 0.02),
  };
}

/* ------------------------------------------------------------------ */
/* Fixed step                                                          */
/* ------------------------------------------------------------------ */

function fixedStep(dt: number): void {
  if (states.current !== "Race" || !race) return;

  const steerRaw = input.steerAxis() * (save.data.settings.invertSteer ? -1 : 1);
  const playerInput = {
    throttle: input.throttleAxis(),
    brake: input.brakeAxis(),
    steer: steerRaw,
    handbrake: input.isDown("handbrake"),
  };

  const wasCountdown = !race.countdownDone;
  race.step(dt, playerInput);
  raceTime = race.time;

  if (wasCountdown && race.countdownDone) {
    // Eurobeat mulai TEPAT di GO (§8B)
    eurobeat?.start();
    eurobeat?.impact();
    sfx?.countdownVoice("go");
  }

  if (race.started && !race.finished) {
    ghost?.update(dt, race.player.state.trackS, race.player.state.lateral, race.time);

    // drift score
    driftScore?.update(
      dt,
      race.player.state.slipRear,
      race.player.speedKmh,
      race.player.state.hitWall,
      race.player.state.inGutter,
    );

    // suara impact (rate-limited)
    if (race.player.state.hitWall && race.player.state.hitStrength > 0.25 && raceTime - lastHitAt > 0.25) {
      lastHitAt = raceTime;
      const strength = race.player.state.hitStrength;
      sfx?.impact(strength);
      cameraRig?.addShake(strength);
      input.rumble(90, Math.min(1, strength), 0.5);
      if (fx) {
        const s = race.player.state;
        fx.spawnSpark(s.x, 0.5, s.z, strength, Math.sign(s.lateral) || 1);
      }
    }

    // BPM dinamis: naik saat memimpin
    const gap = race.gapSeconds();
    eurobeat?.setBpm(150 + Math.max(-4, Math.min(10, gap * 2.2)));
    eurobeat?.setDriftIntensity(driftScore?.intensity ?? 0);

    // dialog rival berbasis gap
    const rival = race.rivalEntry;
    if (rival?.ai) {
      if (race.isGapWin()) {
        const line = rival.ai.say("finishLose");
        if (line && save.data.settings.subtitles) dialog?.say(rival.name, line);
      } else if (gap < -0.6 && rival.ai.state.dialogueCooldown <= 0) {
        const line = rival.ai.say("losing");
        if (line && save.data.settings.subtitles) dialog?.say(rival.name, line);
      } else if (gap > 0.6 && rival.ai.state.dialogueCooldown <= 0) {
        const line = rival.ai.say("overtaking");
        if (line && save.data.settings.subtitles) dialog?.say(rival.name, line);
      }
    }
  }

  // finish
  if (race.finished && race.result) {
    finishRace();
  }
}

let finishedHandled = false;

function finishRace(): void {
  if (finishedHandled || !race?.result) return;
  finishedHandled = true;
  const res = race.result;
  res.driftPoints = driftScore?.displayPoints ?? 0;
  res.bestDrift = driftScore?.state.best ?? 0;

  const key = raceKey(currentMode, currentRival.id);
  const prevBest = save.data.progress.bestTimes[key] ?? null;
  const isNewBest = prevBest === null || res.timeMs < prevBest;

  const cashEarned = 900 + Math.round(res.driftPoints / 12) + (res.won && res.totalRacers > 1 ? 1400 : 0) + (isNewBest ? 800 : 0);
  save.addCash(cashEarned);
  save.recordRace({ won: res.won, km: race.track.length / 1000, bestTimeKey: key, timeMs: res.timeMs });
  if (res.bestDrift > 0) save.recordDrift(res.bestDrift);

  // progresi: tandai rival kalah
  if (res.won && res.totalRacers > 1 && !save.data.progress.rivalsBeaten.includes(currentRival.id)) {
    const p = save.data.progress;
    p.rivalsBeaten.push(currentRival.id);
    const week = Math.min(6, p.weeksCleared.length + 1);
    if (!p.weeksCleared.includes(week)) p.weeksCleared.push(week);
    // unlock mobil berikutnya
    const unlockOrder = ["fd7", "s13", "ek9"];
    const nextCar = unlockOrder.find((c) => !p.unlockedCars.includes(c));
    if (nextCar && p.weeksCleared.length >= 2) save.unlockCar(nextCar);
    save.updateProgress({ rivalsBeaten: p.rivalsBeaten, weeksCleared: p.weeksCleared });
  }

  // ghost terbaik untuk Time Attack
  if (currentMode === "timeattack" && ghost?.best && isNewBest) {
    save.data.progress.bestTimes[key] = res.timeMs;
    save.save();
  }

  const finalLine =
    res.totalRacers > 1
      ? res.won
        ? currentRival.lines.finishLose[0]
        : currentRival.lines.finishWin[0]
      : "Yosha! Catat waktunya.";
  if (finalLine && save.data.settings.subtitles) {
    dialog?.say(currentRival.name, finalLine);
  }

  sfx?.finishFanfare();
  eurobeat?.setDriftIntensity(0);
  hud?.hide();
  dialog?.hide();

  window.setTimeout(() => {
    if (states.current !== "Race") return;
    states.go("Results");
    loop!.paused = true;
    results?.show(res, prevBest);
    results?.toastCash(cashEarned);
    sfx?.confirm();
  }, 900);
}

function raceKey(mode: RaceMode, rivalId: string): string {
  return `${mode}:${rivalId}`;
}

/* ------------------------------------------------------------------ */
/* Render                                                              */
/* ------------------------------------------------------------------ */

function renderFrame(_alpha: number, dt: number): void {
  if (!renderer) return;
  const { renderer: r, scene, camera } = renderer;

  // Results punya timeout 60 s → auto kembali ke menu (§13.5)
  if (states.current === "Results" && results?.isVisible) {
    if (results.update(dt)) {
      results.hide();
      loop!.paused = false;
      returnToMenu();
    }
  }

  input.pollGamepad();
  hudInput();

  // dialog typewriter
  dialog?.update(dt);

  // cutscene intro mengambil alih kamera & overlay
  if (introActive && cutscene && race && renderer) {
    const stillOn = cutscene.update(dt, renderer.camera);
    if (!stillOn) introActive = false;
  }

  if (states.current === "Race" || states.current === "Pause") {
    if (race && playerCar && cameraRig) {
      const st = race.player.state;
      const spec = race.player.spec;

      // posisi mobil pemain (interpolasi via langsung — fisika sudah 120 Hz)
      const smooth = 1 - Math.pow(0.001, dt);
      const px = playerCar.root.position.x + (st.x - playerCar.root.position.x) * Math.min(1, smooth * 2.2);
      const pz = playerCar.root.position.z + (st.z - playerCar.root.position.z) * Math.min(1, smooth * 2.2);
      playerCar.root.position.set(px, roadHeightAt(st, race), pz);
      playerCar.root.rotation.y = -st.heading;

      // roll bodi saat drift, pitch saat rem/gas
      const roll = Math.max(-0.1, Math.min(0.1, st.slipRear * 0.09));
      const pitch = Math.max(-0.06, Math.min(0.06, -(st.vLong * 0.0) - (input.brakeAxis() - input.throttleAxis()) * 0.03));
      playerCar.body.rotation.z = roll;
      playerCar.body.rotation.x = pitch;

      // putaran roda + steer visual
      const wheelSpin = (st.odometer / spec.wheelRadius) % (Math.PI * 2);
      for (const w of playerCar.wheels) w.rotation.x = wheelSpin;
      const steerVis = st.steerAngle * 2.2;
      for (const s of playerCar.steerWheels) s.rotation.y = -steerVis;

      // lampu rem menyala
      for (const b of playerCar.brakeLights) {
        (b.material as THREE.MeshBasicMaterial).color.setHex(input.brakeAxis() > 0.1 ? 0xff2b3d : 0x5a0f18);
      }

      // rival
      if (rivalCar && race.rivalEntry) {
        const rs = race.rivalEntry.car.state;
        rivalCar.root.position.set(rs.x, race.track.sampleAt(rs.trackS).y, rs.z);
        rivalCar.root.rotation.y = -rs.heading;
        const rw = (rs.odometer / 0.31) % (Math.PI * 2);
        for (const w of rivalCar.wheels) w.rotation.x = rw;
        const rroll = Math.max(-0.1, Math.min(0.1, rs.slipRear * 0.09));
        rivalCar.body.rotation.z = rroll;
        for (const s of rivalCar.steerWheels) s.rotation.y = -rs.steerAngle * 2.2;
      }

      // ghost (time attack best run) — mobil transparan
      if (ghostCar && ghost?.best && race.started) {
        const frames = ghost.best;
        const t = race.time;
        const frame = sampleGhost(frames, t);
        if (frame) {
          const pt = race.track.pointAtOffset(frame.s, frame.lateral);
          ghostCar.root.position.set(pt.x, race.track.sampleAt(frame.s).y, pt.z);
          ghostCar.root.rotation.y = -pt.heading;
          ghostCar.root.visible = true;
        } else {
          ghostCar.root.visible = false;
        }
      }

      // FX
      if (fx) {
        const stc = race.player.state;
        if (stc.drifting && stc.speed > 6) {
          const intensity = Math.min(1, Math.abs(stc.slipRear) / 0.7);
          if (Math.random() < 0.6) {
            for (const a of playerCar.smokeAnchors) {
              const wp = new THREE.Vector3();
              a.getWorldPosition(wp);
              fx.spawnSmoke(wp.x, wp.y, wp.z, intensity);
            }
          }
          // jejak ban
          const back = new THREE.Vector3(-1.1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), stc.heading);
          fx.addSkid(
            stc.x + back.x - 0.55, stc.z + back.z - 0.55,
            stc.x + back.x + 0.55, stc.z + back.z + 0.55,
            race.track.sampleAt(stc.trackS).y + 0.02,
            stc.heading,
          );
        }
        fx.update(dt);
      }

      // kamera
      cameraRig.mode = save.data.settings.cameraMode === "bumper" ? "bumper" : save.data.settings.cameraMode === "hood" ? "hood" : "chase";
      cameraRig.reduceMotion = save.data.settings.reduceMotion;
      if (!introActive) {
        cameraRig.update(
          dt, st.x, roadHeightAt(st, race), st.z, st.heading, st.vx, st.vz,
          st.slipRear, race.player.speedKmh,
        );
      }

      // audio kontinu
      sfx?.update(dt, {
        rpm: st.rpm,
        throttle: input.throttleAxis(),
        slipRear: st.slipRear,
        speedKmh: race.player.speedKmh,
        inGutter: st.inGutter,
        inTunnel: race.track.sampleAt(st.trackS).tunnel,
        limiter: st.limiter,
        turbo: race.player.spec.id === "fd7" || race.player.spec.id === "s13",
        active: states.current === "Race",
      });

      // HUD
      const entities = race.racers.map((e) => ({ x: e.car.state.x, z: e.car.state.z, color: e.color, isPlayer: e.isPlayer }));
      hud?.update(dt, {
        speedKmh: race.player.speedKmh,
        rpm: st.rpm,
        gear: st.gear,
        driftPoints: driftScore?.displayPoints ?? 0,
        driftLabel: driftScore?.state.label ?? "",
        driftIntensity: driftScore?.intensity ?? 0,
        multiplier: driftScore?.state.multiplier ?? 1,
        gapSeconds: race.gapSeconds(),
        hasRival: race.racers.length > 1,
        timeText: formatTime(race.time * 1000),
        position: race.playerPosition,
        totalRacers: race.racers.length,
        trackTitle: eurobeat?.trackTitle ?? TRACKS[0]!.title,
        bpm: eurobeat?.bpmLive ?? 156,
        colorblindSafe: save.data.settings.colorblindSafe,
      }, entities);

      if (!race.countdownDone) {
        hud?.setCountdown(race.countdownValue);
      } else {
        hud?.setCountdown(0);
      }
    }

    // speed fx
    speedFx?.update(
      dt,
      race?.player.speedKmh ?? 0,
      driftScore?.intensity ?? 0,
      save.data.settings.reduceMotion,
    );
  }

  // render (satu jalur: scene → bloom → composite)
  renderer.update(dt, 0, 0);
  if (speedFx) speedFx.render(scene, camera);
  else r.render(scene, camera);

  // auto-degrade toast sekali
  if (!qualityAutoShown && r.info.render.calls > 900) {
    qualityAutoShown = true;
    hud?.toast("Kualitas diturunkan otomatis untuk menjaga FPS", 3000);
  }

  input.endFrame();
}

/** Ketinggian jalan pada posisi mobil (dipakai untuk Y mobil & kamera). */
function roadHeightAt(st: { trackS: number }, r: RaceLogic): number {
  return r.track.sampleAt(st.trackS).y;
}

function sampleGhost(frames: GhostFrame[], t: number): GhostFrame | null {
  if (frames.length < 2) return null;
  if (t < frames[0]!.t || t > frames[frames.length - 1]!.t) return null;
  let lo = 0;
  let hi = frames.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (frames[mid]!.t <= t) lo = mid;
    else hi = mid;
  }
  const a = frames[lo]!;
  const b = frames[hi]!;
  const span = Math.max(1e-6, b.t - a.t);
  const k = (t - a.t) / span;
  return { s: a.s + (b.s - a.s) * k, lateral: a.lateral + (b.lateral - a.lateral) * k, t };
}

/* ------------------------------------------------------------------ */
/* Global input handling (menu, pause, dialog)                          */
/* ------------------------------------------------------------------ */

function hudInput(): void {
  // dialog skip
  if (dialog?.isActive && (input.justPressed("confirm") || input.justPressed("handbrake") || input.justPressed("pause"))) {
    dialog.skip();
    return;
  }

  // skip intro cutscene dengan tombol apa pun
  if (introActive && cutscene?.isActive) {
    const anyPressed =
      input.justPressed("confirm") ||
      input.justPressed("pause") ||
      input.justPressed("throttle") ||
      input.justPressed("brake") ||
      input.justPressed("handbrake") ||
      input.justPressed("camera");
    if (anyPressed) cutscene.skip();
  }

  // pause
  if (input.justPressed("pause")) {
    if (states.current === "Race") setPaused(true);
    else if (states.current === "Pause") setPaused(false);
    else if (states.current === "Menu") {
      // tidak ada aksi, biarkan
    } else if (states.current === "Results") {
      results?.hide();
      loop!.paused = false;
      returnToMenu();
    }
    return;
  }

  if (states.current === "Results") {
    if (input.justPressed("confirm")) {
      results?.hide();
      loop!.paused = false;
      startRace(currentMode, currentRival.id);
    }
    return;
  }

  if (states.current === "Race") {
    if (input.justPressed("camera")) {
      cameraModeIndex = (cameraModeIndex + 1) % CAMERA_MODES.length;
      const mode = CAMERA_MODES[cameraModeIndex]!;
      save.updateSettings({ cameraMode: mode });
      hud?.toast(`Kamera: ${mode.toUpperCase()}`, 1200);
      sfx?.hover();
    }
    if (input.justPressed("back")) {
      startRace(currentMode, currentRival.id);
    }
    return;
  }

  if (states.current === "Garage" || states.current === "Settings" || states.current === "Controls" || states.current === "Credits") {
    if (input.justPressed("pause") || input.justPressed("back")) {
      menu?.show("menu");
    }
  }
}

/* ------------------------------------------------------------------ */
/* Bootstrapping                                                        */
/* ------------------------------------------------------------------ */

window.addEventListener("error", (ev) => {
  if (!started) showFatal(ev.error ?? ev.message);
});

void boot();

// Timeout layar hasil ditangani di render loop (bukan interval terpisah),
// supaya tidak ada timer liar saat tab di-background.

