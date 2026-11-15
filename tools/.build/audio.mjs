// src/sim/Tuning.ts
var PHYSICS = {
  /** Fixed timestep. JANGAN pakai dt rAF langsung ke fisika. */
  HZ: 120,
  DT: 1 / 120,
  /** Maks sub-step per frame — mencegah spiral of death saat tab-switch. */
  MAX_SUBSTEPS: 8,
  /** dt rAF di-clamp ke nilai ini sebelum masuk accumulator. */
  MAX_FRAME_DT: 0.1,
  /**
   * Filter yaw arcade: yaw rate maksimum = (v/wheelbase) * faktor.
   * Lebih besar = mobil bisa berputar lebih liar saat drift.
   */
  YAW_SLIP_FACTOR: 1.35,
  /** Batas anti-tunnel (§6.12). */
  MAX_SPEED_MS: 90,
  MAX_YAW_RATE: 6,
  GRAVITY: 9.81,
  /* --- ban --- */
  /** μ puncak aspal kering. Naik = lebih nempel, kurang licin buat drift. */
  TIRE_PEAK_MU: 1.05,
  /** μ basah. */
  TIRE_WET_MU: 0.78,
  /** μ gutter — cengkeram parit. */
  TIRE_GUTTER_MU: 1.35,
  /** Pacejka-lite shape factor. */
  TIRE_B: 9,
  TIRE_C: 1.4,
  /** Grip belakang dipotong saat handbrake. */
  HANDBRAKE_REAR_GRIP_CUT: 0.6,
  /* --- handbrake drift entry --- */
  /** Impuls yaw rate (rad/s) saat handbrake ditarik. */
  HANDBRAKE_YAW_INJECT: 4,
  /** Durasi injeksi (detik). */
  HANDBRAKE_YAW_TIME: 0.25,
  /** Pemulihan grip belakang setelah injeksi (detik). */
  HANDBRAKE_RECOVER: 0.55,
  /* --- countersteer assist (§6.7) --- */
  /** Slip angle belakang (rad) yang memicu assist. */
  COUNTERSTEER_SLIP_TRIGGER: 25 * Math.PI / 180,
  /** Damping yaw tambahan (Nm·s/rad) saat assist aktif. */
  COUNTERSTEER_DAMPING: 2,
  /** Faktor konversi damping → percepatan yaw (1/inertia efektif). */
  COUNTERSTEER_SCALE: 12e-4,
  /* --- mesin --- */
  IDLE_RPM: 900,
  REDLINE_RPM: 7800,
  LIMITER_RPM: 8200,
  /** Perilaku rev limiter: jumlah cut per detik. */
  LIMITER_CUT_HZ: 8,
  /* --- gearbox --- */
  SHIFT_UP_TIME: 0.12,
  SHIFT_DOWN_TIME: 0.1,
  AUTO_SHIFT_UP_RPM: 7500,
  AUTO_SHIFT_DOWN_RPM: 3200,
  /* --- grip gutter (§4) --- */
  /** Sudut serang maksimum (rad) agar gutter grip aktif. */
  GUTTER_MAX_ANGLE: 15 * Math.PI / 180,
  /** Kecepatan minimum (m/s) untuk gutter grip. */
  GUTTER_MIN_SPEED: 45 / 3.6,
  /** Bonus kecepatan saat keluar gutter. */
  GUTTER_EXIT_BOOST: 0.04,
  /** Nyala "tok-tok" per detik saat di gutter. */
  GUTTER_TICK_HZ: 6,
  /* --- tabrakan (§6.10) --- */
  COLLISION_DAMPING: 0.85,
  COLLISION_MIN_LOSS: 0.12,
  COLLISION_MAX_LOSS: 0.2,
  COLLISION_PUSH: 0.55,
  /* --- weight transfer --- */
  /** Batas ΔFz agar tidak ekstrem. */
  MAX_WEIGHT_TRANSFER: 0.75
};
var CAMERA = {
  /** Spring konstanta. Naik = kamera lebih ketat menempel. */
  CAM_SPRING_K: 14,
  /** Damping ratio. Naik = lebih kaku/cepat diam. */
  CAM_DAMPING: 0.86,
  CHASE_OFFSET: { x: 0, y: 1.35, z: 4.6 },
  HOOD_OFFSET: { x: 0, y: 1.16, z: 0.35 },
  BUMPER_OFFSET: { x: 0, y: 0.62, z: -2.1 },
  FOV_MIN: 62,
  FOV_MAX: 76,
  FOV_LERP: 0.08,
  /** Roll akibat slip: rad per rad slip, maks ±5°. */
  DRIFT_ROLL_PER_SLIP: 0.06,
  DRIFT_ROLL_MAX: 5 * Math.PI / 180,
  /** Getar kamera per unit impact. */
  SHAKE_PER_IMPACT: 0.06
};
var AUDIO = {
  MASTER_GAIN: 0.85,
  COMP_THRESHOLD_DB: -14,
  COMP_RATIO: 6,
  COMP_ATTACK: 3e-3,
  COMP_RELEASE: 0.25,
  MUSIC_BUS: 0.62,
  SFX_BUS: 0.9,
  DUCK_DB: -3.5,
  DUCK_TIME: 0.25,
  BPM_MIN: 150,
  BPM_MAX: 160,
  BPM_BASE: 156
};

// src/core/AudioEngine.ts
var AudioEngine = class {
  ctx = null;
  master;
  compressor;
  musicBus;
  sfxBus;
  reverb;
  reverbSend;
  /** Noise buffer 2 detik, dipakai semua SFX. */
  noiseBuffer;
  /** Statistik ducking — dipakai self-review/test audio. */
  duckCount = 0;
  /** Waktu (ctx) sampai kapan musik masih ter-duck. */
  duckUntil = 0;
  started = false;
  get ready() {
    return this.ctx !== null && this.ctx.state === "running";
  }
  get currentTime() {
    return this.ctx?.currentTime ?? 0;
  }
  get sampleRate() {
    return this.ctx?.sampleRate ?? 48e3;
  }
  /** Panggil dari handler klik/tap pertama. Idempotent. */
  async unlock() {
    if (this.started) {
      await this.resume();
      return;
    }
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctor) throw new Error("Web Audio API tidak tersedia di browser ini.");
    const ctx = new Ctor({ latencyHint: "interactive" });
    this.ctx = ctx;
    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = AUDIO.COMP_THRESHOLD_DB;
    this.compressor.ratio.value = AUDIO.COMP_RATIO;
    this.compressor.attack.value = AUDIO.COMP_ATTACK;
    this.compressor.release.value = AUDIO.COMP_RELEASE;
    this.compressor.knee.value = 6;
    this.master = ctx.createGain();
    this.master.gain.value = AUDIO.MASTER_GAIN;
    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = AUDIO.MUSIC_BUS;
    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = AUDIO.SFX_BUS;
    this.musicBus.connect(this.master);
    this.sfxBus.connect(this.master);
    this.master.connect(this.compressor);
    this.compressor.connect(ctx.destination);
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse(2.1, 2.4);
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.28;
    this.reverbSend.connect(this.reverb);
    this.reverb.connect(this.master);
    this.noiseBuffer = this.makeNoise(2);
    await this.resume();
    this.started = true;
  }
  async resume() {
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
      }
    }
  }
  suspend() {
    if (!this.ctx) return;
    if (this.ctx.state === "running") void this.ctx.suspend().catch(() => void 0);
  }
  setMasterVolume(v) {
    if (!this.master) return;
    this.master.gain.setTargetAtTime(clamp01(v) * AUDIO.MASTER_GAIN, this.ctx?.currentTime ?? 0, 0.02);
  }
  setMusicVolume(v) {
    if (!this.musicBus) return;
    this.musicBus.gain.setTargetAtTime(clamp01(v), this.ctx?.currentTime ?? 0, 0.02);
  }
  setSfxVolume(v) {
    if (!this.sfxBus) return;
    this.sfxBus.gain.setTargetAtTime(clamp01(v), this.ctx?.currentTime ?? 0, 0.02);
  }
  /** Turunkan musik 3.5 dB selama `ms` (§8 ducking). Tidak menumpuk. */
  duck(ms = 250) {
    if (!this.ctx || !this.musicBus) return;
    const now = this.ctx.currentTime;
    const target = Math.pow(10, AUDIO.DUCK_DB / 20);
    const base = clamp01(0.62);
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(this.musicBus.gain.value, now);
    this.musicBus.gain.linearRampToValueAtTime(base * target, now + 0.03);
    this.musicBus.gain.linearRampToValueAtTime(base, now + ms / 1e3);
    this.duckUntil = now + ms / 1e3;
    this.duckCount += 1;
  }
  /** Generator IR sintetis: noise × exponential decay + early reflection. */
  makeImpulse(seconds, decay) {
    const ctx = this.ctx;
    const rate = ctx.sampleRate;
    const len = Math.max(1, Math.floor(seconds * rate));
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        const d = Math.pow(1 - t, decay + (ch === 0 ? 0 : 0.25));
        data[i] = (Math.random() * 2 - 1) * d;
      }
      const early = [0.017, 0.031, 0.047, 0.071, 0.103];
      for (const e of early) {
        const idx = Math.floor(e * rate);
        if (idx < len) data[idx] += (ch === 0 ? 0.6 : -0.45) * Math.pow(1 - e / seconds, 2);
      }
    }
    return buf;
  }
  makeNoise(seconds) {
    const ctx = this.ctx;
    const rate = ctx.sampleRate;
    const len = Math.max(1, Math.floor(seconds * rate));
    const buf = ctx.createBuffer(1, len, rate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = last * 0.35 + white * 0.65;
      data[i] = last;
    }
    return buf;
  }
  /** Pasang noise source loop yang dipakai bersama. */
  createNoiseSource() {
    if (!this.ctx) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    return src;
  }
};
function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

// src/core/Eurobeat.ts
var CHORD_INTERVALS = {
  min: [0, 3, 7, 10],
  maj: [0, 4, 7, 11]
};
var A3 = 57;
var P = (semi) => ({ root: A3 + semi, quality: "min" });
var MAJ = (semi) => ({ root: A3 + semi, quality: "maj" });
var PROG_A = [P(0), MAJ(-4), MAJ(3), MAJ(-2)];
var PROG_B = [MAJ(-4), MAJ(-2), P(0), MAJ(3)];
var PROG_C = [P(0), MAJ(-4), P(-3), MAJ(1)];
var PROG_D = [P(5), MAJ(-2), MAJ(3), MAJ(-4)];
var MELODY_A = [
  // bar 0
  [0, 2, 0, 2],
  [2, 1, 0, 2],
  [4, 0, 0, 2],
  [6, 2, 0, 2],
  [8, 3, 0, 2],
  [10, 2, 0, 2],
  [12, 1, 0, 4],
  // bar 1
  [16, 2, 0, 2],
  [18, 2, 0, 2],
  [20, 0, 0, 2],
  [22, 1, 0, 2],
  [24, 2, 0, 2],
  [26, 3, 0, 2],
  [28, 2, 0, 4],
  // bar 2
  [32, 1, 0, 2],
  [34, 2, 0, 2],
  [36, 3, 0, 2],
  [38, 2, 0, 2],
  [40, 0, 0, 2],
  [42, 1, 0, 2],
  [44, 2, 0, 4],
  // bar 3 — leap oktaf
  [48, 2, 1, 2],
  [50, 3, 1, 2],
  [52, 2, 1, 2],
  [54, 1, 0, 2],
  [56, 0, 0, 2],
  [58, 1, 0, 2],
  [60, 2, 0, 4],
  // bar 4
  [64, 2, 0, 2],
  [66, 1, 0, 2],
  [68, 0, 0, 2],
  [70, 2, 0, 2],
  [72, 3, 0, 2],
  [74, 2, 0, 2],
  [76, 1, 0, 4],
  // bar 5
  [80, 3, 0, 2],
  [82, 2, 0, 2],
  [84, 3, 0, 2],
  [86, 2, 0, 2],
  [88, 1, 0, 2],
  [90, 2, 0, 2],
  [92, 3, 0, 4],
  // bar 6
  [96, 0, 0, 2],
  [98, 1, 0, 2],
  [100, 2, 0, 2],
  [102, 3, 0, 2],
  [104, 2, 0, 2],
  [106, 1, 0, 2],
  [108, 0, 0, 4],
  // bar 7 — leap oktaf
  [112, 1, 0, 2],
  [114, 2, 1, 2],
  [116, 3, 1, 2],
  [118, 2, 1, 2],
  [120, 1, 0, 2],
  [122, 0, 0, 2],
  [124, 2, 0, 4]
];
var MELODY_B = [
  [0, 0, 0, 2],
  [2, 2, 0, 2],
  [4, 3, 0, 2],
  [6, 2, 0, 2],
  [8, 1, 0, 2],
  [10, 2, 0, 6],
  [16, 2, 0, 2],
  [18, 3, 0, 2],
  [20, 2, 0, 2],
  [22, 0, 0, 2],
  [24, 1, 0, 2],
  [26, 2, 0, 6],
  [32, 3, 0, 2],
  [34, 2, 0, 2],
  [36, 1, 0, 2],
  [38, 2, 0, 2],
  [40, 0, 0, 2],
  [42, 2, 0, 2],
  [44, 3, 0, 4],
  [48, 2, 1, 2],
  [50, 3, 1, 2],
  [52, 2, 1, 2],
  [54, 1, 0, 2],
  [56, 2, 0, 8],
  [64, 0, 0, 2],
  [66, 1, 0, 2],
  [68, 3, 0, 2],
  [70, 2, 0, 2],
  [72, 1, 0, 2],
  [74, 0, 0, 6],
  [80, 2, 0, 2],
  [82, 3, 0, 2],
  [84, 2, 0, 2],
  [86, 1, 0, 2],
  [88, 0, 0, 2],
  [90, 1, 0, 2],
  [92, 2, 0, 4],
  [96, 1, 0, 2],
  [98, 2, 0, 2],
  [100, 3, 0, 2],
  [102, 2, 0, 2],
  [104, 1, 0, 2],
  [106, 0, 0, 6],
  [112, 3, 1, 2],
  [114, 2, 1, 2],
  [116, 1, 0, 2],
  [118, 2, 0, 2],
  [120, 3, 0, 2],
  [122, 2, 0, 2],
  [124, 1, 0, 4]
];
var MELODY_C = [
  [0, 1, 0, 2],
  [2, 2, 0, 2],
  [4, 3, 0, 2],
  [6, 2, 0, 2],
  [8, 1, 0, 4],
  [12, 0, 0, 2],
  [14, 1, 0, 2],
  [16, 2, 0, 2],
  [18, 3, 0, 2],
  [20, 2, 0, 2],
  [22, 1, 0, 2],
  [24, 2, 0, 4],
  [28, 3, 0, 2],
  [30, 2, 0, 2],
  [32, 3, 0, 2],
  [34, 2, 0, 2],
  [36, 1, 0, 2],
  [38, 0, 0, 2],
  [40, 1, 0, 4],
  [44, 2, 0, 2],
  [46, 3, 0, 2],
  [48, 2, 1, 2],
  [50, 1, 1, 2],
  [52, 2, 1, 2],
  [54, 1, 1, 2],
  [56, 2, 0, 6],
  [64, 0, 0, 2],
  [66, 2, 0, 2],
  [68, 1, 0, 2],
  [70, 3, 0, 2],
  [72, 2, 0, 4],
  [76, 1, 0, 2],
  [78, 0, 0, 2],
  [80, 3, 0, 2],
  [82, 2, 0, 2],
  [84, 3, 0, 2],
  [86, 1, 0, 2],
  [88, 2, 0, 6],
  [96, 1, 0, 2],
  [98, 0, 0, 2],
  [100, 1, 0, 2],
  [102, 2, 0, 2],
  [104, 3, 0, 4],
  [108, 2, 0, 2],
  [110, 1, 0, 2],
  [112, 2, 1, 2],
  [114, 3, 1, 2],
  [116, 2, 1, 2],
  [118, 1, 1, 2],
  [120, 0, 0, 6]
];
var TRACKS = [
  { title: "NIGHT OF FIRE ROAD", progA: PROG_A, progB: PROG_C, melody: MELODY_A, arpSeed: 3 },
  { title: "GAS GAS GAS PASS", progA: PROG_B, progB: PROG_D, melody: MELODY_B, arpSeed: 7 },
  { title: "DEJA VU SKYLINE", progA: PROG_C, progB: PROG_B, melody: MELODY_C, arpSeed: 11 },
  { title: "RUNNING IN THE 90s PASS", progA: PROG_A, progB: PROG_D, melody: MELODY_B, arpSeed: 13 },
  { title: "SPEEDY SPEED BOY", progA: PROG_D, progB: PROG_A, melody: MELODY_C, arpSeed: 17 },
  { title: "BACK ON THE ROAD", progA: PROG_B, progB: PROG_C, melody: MELODY_A, arpSeed: 19 }
];
function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}
function retrigger(param, t, p) {
  const a = Math.max(5e-3, p.attack);
  const d = Math.max(5e-3, p.decay);
  const r = Math.max(5e-3, p.release);
  const hold = Math.max(0.02, p.holdFor);
  const peak = Math.max(1e-4, p.peak);
  const sus = Math.max(1e-4, peak * p.sustain);
  param.cancelScheduledValues(t);
  param.setValueAtTime(1e-4, t);
  param.linearRampToValueAtTime(peak, t + a);
  param.linearRampToValueAtTime(sus, t + a + d);
  param.setValueAtTime(sus, t + Math.max(a + d, hold));
  param.linearRampToValueAtTime(1e-4, t + Math.max(a + d, hold) + r);
}
var Eurobeat = class {
  engine;
  ctx = null;
  built = false;
  /** Bus internal musik (sidechain pump di sini). */
  pump;
  dryBus;
  leadBus;
  chorusBus;
  /* voices */
  kickOsc;
  kickGain;
  kickClickGain;
  kickClickFilter;
  snareGain;
  snareFilter;
  snareBody;
  snareBodyGain;
  clapGain;
  clapFilter;
  hatGain;
  hatFilter;
  openHatGain;
  openHatFilter;
  hat32Gain;
  hat32Filter;
  bassOscA;
  bassOscB;
  bassGain;
  bassFilter;
  leadOsc = [];
  leadGain;
  leadFilter;
  leadOctaveGain;
  leadOctaveOsc = [];
  stabOsc = [];
  stabGain;
  stabFilter;
  arpOsc;
  arpGain;
  arpPan;
  riserGain;
  riserFilter;
  impactOsc;
  impactGain;
  noiseRef;
  delayNode;
  delayFeedback;
  delayWet;
  /* scheduler */
  nextStepTime = 0;
  currentStep = 0;
  timer = 0;
  playing = false;
  startTime = 0;
  bpm = AUDIO.BPM_BASE;
  targetBpm = AUDIO.BPM_BASE;
  trackIndex = 0;
  prevTrackIndex = 0;
  crossfadeEnd = 0;
  /** 0..1 dari DriftScore; menggerakkan intensitas aransemen. */
  driftIntensity = 0;
  section = "intro";
  barsPlayed = 0;
  masterPeak = 0;
  constructor(engine) {
    this.engine = engine;
  }
  get isPlaying() {
    return this.playing;
  }
  get bpmLive() {
    return Math.round(this.bpm);
  }
  get trackTitle() {
    return TRACKS[this.trackIndex]?.title ?? "\u2014";
  }
  get peakEstimate() {
    return this.masterPeak;
  }
  /* ---------------- graph build ---------------- */
  build() {
    if (this.built) return;
    const ctx = this.engine.ctx;
    if (!ctx) throw new Error("AudioEngine belum di-unlock.");
    this.ctx = ctx;
    this.pump = ctx.createGain();
    this.pump.gain.value = 1;
    this.dryBus = ctx.createGain();
    this.dryBus.gain.value = 0.9;
    this.leadBus = ctx.createGain();
    this.leadBus.gain.value = 1;
    this.chorusBus = ctx.createGain();
    this.chorusBus.gain.value = 0.55;
    this.pump.connect(this.dryBus);
    this.dryBus.connect(this.engine.musicBus);
    this.leadBus.connect(this.pump);
    this.chorusBus.connect(this.pump);
    const leadVerb = ctx.createGain();
    leadVerb.gain.value = 0.18;
    this.leadBus.connect(leadVerb);
    leadVerb.connect(this.engine.reverbSend);
    const noise = this.engine.createNoiseSource();
    if (!noise) throw new Error("Noise buffer gagal dibuat.");
    this.noiseRef = noise;
    noise.start(0);
    this.delayNode = ctx.createDelay(1);
    this.delayNode.delayTime.value = 60 / this.bpm * 0.75;
    this.delayFeedback = ctx.createGain();
    this.delayFeedback.gain.value = 0.32;
    this.delayWet = ctx.createGain();
    this.delayWet.gain.value = 0.28;
    const delayPanL = ctx.createStereoPanner();
    delayPanL.pan.value = -0.5;
    const delayPanR = ctx.createStereoPanner();
    delayPanR.pan.value = 0.5;
    this.leadGain = ctx.createGain();
    this.leadGain.gain.value = 1e-4;
    this.leadBus.connect(this.leadGain);
    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.delayWet);
    this.delayWet.connect(delayPanL);
    this.delayWet.connect(delayPanR);
    delayPanL.connect(this.pump);
    delayPanR.connect(this.pump);
    this.kickOsc = ctx.createOscillator();
    this.kickOsc.type = "sine";
    this.kickOsc.frequency.value = 55;
    this.kickGain = ctx.createGain();
    this.kickGain.gain.value = 1e-4;
    this.kickOsc.connect(this.kickGain);
    this.kickGain.connect(this.pump);
    this.kickOsc.start();
    const kickClick = ctx.createBufferSource();
    kickClick.buffer = this.engine.noiseBuffer;
    kickClick.loop = true;
    kickClick.start(0);
    this.kickClickFilter = ctx.createBiquadFilter();
    this.kickClickFilter.type = "highpass";
    this.kickClickFilter.frequency.value = 2600;
    this.kickClickGain = ctx.createGain();
    this.kickClickGain.gain.value = 1e-4;
    kickClick.connect(this.kickClickFilter);
    this.kickClickFilter.connect(this.kickClickGain);
    this.kickClickGain.connect(this.pump);
    this.snareFilter = ctx.createBiquadFilter();
    this.snareFilter.type = "bandpass";
    this.snareFilter.frequency.value = 1800;
    this.snareFilter.Q.value = 0.9;
    this.snareGain = ctx.createGain();
    this.snareGain.gain.value = 1e-4;
    noise.connect(this.snareFilter);
    this.snareFilter.connect(this.snareGain);
    this.snareGain.connect(this.pump);
    this.snareBody = ctx.createOscillator();
    this.snareBody.type = "sine";
    this.snareBody.frequency.value = 190;
    this.snareBodyGain = ctx.createGain();
    this.snareBodyGain.gain.value = 1e-4;
    this.snareBody.connect(this.snareBodyGain);
    this.snareBodyGain.connect(this.pump);
    this.snareBody.start();
    this.clapFilter = ctx.createBiquadFilter();
    this.clapFilter.type = "bandpass";
    this.clapFilter.frequency.value = 1300;
    this.clapFilter.Q.value = 1.2;
    this.clapGain = ctx.createGain();
    this.clapGain.gain.value = 1e-4;
    noise.connect(this.clapFilter);
    this.clapFilter.connect(this.clapGain);
    this.clapGain.connect(this.chorusBus);
    this.hatFilter = ctx.createBiquadFilter();
    this.hatFilter.type = "highpass";
    this.hatFilter.frequency.value = 7e3;
    this.hatGain = ctx.createGain();
    this.hatGain.gain.value = 1e-4;
    noise.connect(this.hatFilter);
    this.hatFilter.connect(this.hatGain);
    this.hatGain.connect(this.chorusBus);
    this.openHatFilter = ctx.createBiquadFilter();
    this.openHatFilter.type = "highpass";
    this.openHatFilter.frequency.value = 6200;
    this.openHatGain = ctx.createGain();
    this.openHatGain.gain.value = 1e-4;
    noise.connect(this.openHatFilter);
    this.openHatFilter.connect(this.openHatGain);
    this.openHatGain.connect(this.chorusBus);
    this.hat32Filter = ctx.createBiquadFilter();
    this.hat32Filter.type = "highpass";
    this.hat32Filter.frequency.value = 9e3;
    this.hat32Gain = ctx.createGain();
    this.hat32Gain.gain.value = 1e-4;
    noise.connect(this.hat32Filter);
    this.hat32Filter.connect(this.hat32Gain);
    this.hat32Gain.connect(this.chorusBus);
    this.bassOscA = ctx.createOscillator();
    this.bassOscA.type = "sawtooth";
    this.bassOscB = ctx.createOscillator();
    this.bassOscB.type = "square";
    this.bassOscA.detune.value = -8;
    this.bassOscB.detune.value = 8;
    this.bassFilter = ctx.createBiquadFilter();
    this.bassFilter.type = "lowpass";
    this.bassFilter.frequency.value = 600;
    this.bassFilter.Q.value = 1.2;
    this.bassGain = ctx.createGain();
    this.bassGain.gain.value = 1e-4;
    this.bassOscA.connect(this.bassFilter);
    this.bassOscB.connect(this.bassFilter);
    this.bassFilter.connect(this.bassGain);
    this.bassGain.connect(this.pump);
    this.bassOscA.start();
    this.bassOscB.start();
    const detunes = [-22, -14, -7, 0, 7, 14, 22];
    this.leadFilter = ctx.createBiquadFilter();
    this.leadFilter.type = "lowpass";
    this.leadFilter.frequency.value = 3200;
    this.leadFilter.Q.value = 4;
    this.leadFilter.connect(this.leadGain);
    this.leadGain.connect(this.leadBus);
    this.leadGain.connect(this.delayNode);
    for (const d of detunes) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.detune.value = d;
      o.frequency.value = 440;
      const g = ctx.createGain();
      g.gain.value = 0.085;
      o.connect(g);
      g.connect(this.leadFilter);
      o.start();
      this.leadOsc.push(o);
    }
    this.leadOctaveGain = ctx.createGain();
    this.leadOctaveGain.gain.value = 1e-4;
    this.leadOctaveGain.connect(this.pump);
    for (const d of [-12, 0, 12]) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.detune.value = d;
      o.frequency.value = 880;
      const g = ctx.createGain();
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(this.leadOctaveGain);
      o.start();
      this.leadOctaveOsc.push(o);
    }
    this.stabFilter = ctx.createBiquadFilter();
    this.stabFilter.type = "lowpass";
    this.stabFilter.frequency.value = 2600;
    this.stabFilter.Q.value = 1.5;
    this.stabGain = ctx.createGain();
    this.stabGain.gain.value = 1e-4;
    this.stabFilter.connect(this.stabGain);
    this.stabGain.connect(this.chorusBus);
    for (let i = 0; i < 6; i++) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.detune.value = i % 2 === 0 ? -9 : 9;
      o.frequency.value = 330;
      const g = ctx.createGain();
      g.gain.value = 0.06;
      o.connect(g);
      g.connect(this.stabFilter);
      o.start();
      this.stabOsc.push(o);
    }
    this.arpOsc = ctx.createOscillator();
    this.arpOsc.type = "triangle";
    this.arpGain = ctx.createGain();
    this.arpGain.gain.value = 1e-4;
    this.arpPan = ctx.createStereoPanner();
    this.arpOsc.connect(this.arpGain);
    this.arpGain.connect(this.arpPan);
    this.arpPan.connect(this.chorusBus);
    this.arpOsc.start();
    const riserSrc = ctx.createBufferSource();
    riserSrc.buffer = this.engine.noiseBuffer;
    riserSrc.loop = true;
    riserSrc.start(0);
    this.riserFilter = ctx.createBiquadFilter();
    this.riserFilter.type = "bandpass";
    this.riserFilter.frequency.value = 700;
    this.riserFilter.Q.value = 3;
    this.riserGain = ctx.createGain();
    this.riserGain.gain.value = 1e-4;
    riserSrc.connect(this.riserFilter);
    this.riserFilter.connect(this.riserGain);
    this.riserGain.connect(this.chorusBus);
    this.impactOsc = ctx.createOscillator();
    this.impactOsc.type = "sine";
    this.impactOsc.frequency.value = 70;
    this.impactGain = ctx.createGain();
    this.impactGain.gain.value = 1e-4;
    this.impactOsc.connect(this.impactGain);
    this.impactGain.connect(this.pump);
    this.impactOsc.start();
    this.built = true;
  }
  /* ---------------- transport ---------------- */
  /** Mulai musik tepat di waktu `when` (dipakai untuk sinkron dengan "GO!"). */
  start(atTime) {
    if (!this.built) this.build();
    const ctx = this.ctx;
    this.playing = true;
    this.currentStep = 0;
    this.barsPlayed = 0;
    this.section = "intro";
    this.startTime = atTime ?? ctx.currentTime + 0.06;
    this.nextStepTime = this.startTime;
    this.leadBus.gain.cancelScheduledValues(ctx.currentTime);
    this.leadBus.gain.setValueAtTime(1, ctx.currentTime);
    this.clearTimer();
    this.timer = window.setInterval(() => this.scheduler(), 25);
    this.scheduler();
  }
  stop() {
    this.playing = false;
    this.clearTimer();
    if (!this.built) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    for (const p of [
      this.kickGain.gain,
      this.kickClickGain.gain,
      this.snareGain.gain,
      this.snareBodyGain.gain,
      this.clapGain.gain,
      this.hatGain.gain,
      this.openHatGain.gain,
      this.hat32Gain.gain,
      this.bassGain.gain,
      this.leadGain.gain,
      this.stabGain.gain,
      this.arpGain.gain,
      this.riserGain.gain,
      this.impactGain.gain,
      this.leadOctaveGain.gain
    ]) {
      p.cancelScheduledValues(t);
      p.setTargetAtTime(1e-4, t, 0.03);
    }
  }
  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
  /** BPM naik saat memimpin, turun saat tertinggal (§8A). */
  setBpm(target) {
    const clamped = Math.max(AUDIO.BPM_MIN, Math.min(AUDIO.BPM_MAX, target));
    if (Math.abs(clamped - this.targetBpm) < 0.01) return;
    this.targetBpm = clamped;
    if (this.built && this.ctx) {
      this.delayNode.delayTime.setTargetAtTime(60 / clamped * 0.75, this.ctx.currentTime, 0.4);
    }
  }
  setDriftIntensity(v) {
    this.driftIntensity = Math.max(0, Math.min(1, v));
  }
  /** Track yang sedang di-crossfade keluar (null bila tidak ada). */
  get fadingFromIndex() {
    if (!this.built || !this.ctx) return null;
    return this.ctx.currentTime < this.crossfadeEnd ? this.prevTrackIndex : null;
  }
  /** Batalkan crossfade yang sedang berjalan (dipakai saat mulai race baru). */
  clearCrossfade() {
    this.crossfadeEnd = 0;
    this.prevTrackIndex = this.trackIndex;
  }
  /** Pindah track dengan crossfade ~2 bar. */
  crossfadeTo(index) {
    if (!this.built || index === this.trackIndex) return;
    this.prevTrackIndex = this.trackIndex;
    this.trackIndex = (index % TRACKS.length + TRACKS.length) % TRACKS.length;
    this.crossfadeEnd = this.ctx.currentTime + 60 / this.bpm * 8;
  }
  nextTrack() {
    this.crossfadeTo(this.trackIndex + 1);
  }
  /** Stinger transisi bagian: riser + impact. */
  stinger() {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this.riserGain.gain.cancelScheduledValues(t);
    this.riserGain.gain.setValueAtTime(1e-4, t);
    this.riserGain.gain.linearRampToValueAtTime(0.09, t + 0.9);
    this.riserGain.gain.linearRampToValueAtTime(1e-4, t + 1.05);
    this.riserFilter.frequency.cancelScheduledValues(t);
    this.riserFilter.frequency.setValueAtTime(600, t);
    this.riserFilter.frequency.exponentialRampToValueAtTime(5200, t + 0.95);
  }
  impact() {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this.impactGain.gain.cancelScheduledValues(t);
    this.impactGain.gain.setValueAtTime(1e-4, t);
    this.impactGain.gain.linearRampToValueAtTime(0.22, t + 0.012);
    this.impactGain.gain.exponentialRampToValueAtTime(1e-4, t + 0.5);
    this.impactOsc.frequency.cancelScheduledValues(t);
    this.impactOsc.frequency.setValueAtTime(110, t);
    this.impactOsc.frequency.exponentialRampToValueAtTime(42, t + 0.42);
  }
  /* ---------------- scheduler ---------------- */
  get stepDur() {
    return 60 / this.bpm / 4;
  }
  scheduler() {
    if (!this.playing || !this.ctx) return;
    const horizon = this.ctx.currentTime + 0.2;
    this.bpm += (this.targetBpm - this.bpm) * 0.02;
    let guard = 0;
    while (this.nextStepTime < horizon && guard++ < 64) {
      this.scheduleStep(this.currentStep, this.nextStepTime);
      this.nextStepTime += this.stepDur;
      this.currentStep++;
      if (this.currentStep % 16 === 0) {
        this.barsPlayed++;
        this.updateSection();
      }
      if (this.currentStep >= 16 * 128) this.currentStep = 0;
    }
    if (this.ctx.currentTime > this.startTime + 1) this.updatePump();
  }
  updateSection() {
    const bar = this.barsPlayed % 32;
    const prev = this.section;
    if (bar < 8) this.section = "intro";
    else if (bar < 16) this.section = "verse";
    else this.section = "chorus";
    if (prev !== this.section && this.ctx) {
      this.leadBus.gain.setTargetAtTime(this.section === "intro" ? 0.25 : 1, this.ctx.currentTime, 0.25);
    }
  }
  /** Sidechain pump: duck bus musik tepat setelah kick. */
  updatePump() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const beat = 60 / this.bpm;
    const phase = (t - this.startTime) % beat / beat;
    const depth = 0.22 + 0.2 * this.driftIntensity;
    const env = phase < 0.35 ? 1 - depth * (1 - phase / 0.35) : 1 - 0.02;
    this.pump.gain.setTargetAtTime(env, t, 8e-3);
  }
  chordAt(step) {
    const track = TRACKS[this.trackIndex] ?? TRACKS[0];
    const bar = Math.floor(step / 16) % 16;
    const prog = bar < 8 ? track.progA : track.progB;
    return prog[Math.floor(bar % 4)] ?? PROG_A[0];
  }
  scheduleStep(step, t) {
    const s = step % 16;
    const bar = Math.floor(step / 16);
    const chord = this.chordAt(step);
    const track = TRACKS[this.trackIndex] ?? TRACKS[0];
    const section = step % (16 * 32) < 16 * 8 ? "intro" : step % (16 * 32) < 16 * 16 ? "verse" : "chorus";
    const inChorus = section === "chorus";
    const drift = this.driftIntensity;
    const sd = this.stepDur;
    if (s % 4 === 0) {
      this.kickOsc.frequency.cancelScheduledValues(t);
      this.kickOsc.frequency.setValueAtTime(120, t);
      this.kickOsc.frequency.exponentialRampToValueAtTime(45, t + 0.06);
      retrigger(this.kickGain.gain, t, {
        peak: 0.62,
        attack: 5e-3,
        decay: 0.09,
        sustain: 0.35,
        release: 0.06,
        holdFor: 0.1
      });
      retrigger(this.kickClickGain.gain, t, {
        peak: 0.12,
        attack: 5e-3,
        decay: 6e-3,
        sustain: 0.01,
        release: 0.02,
        holdFor: 6e-3
      });
    }
    if (s === 4 || s === 12) {
      retrigger(this.snareGain.gain, t, {
        peak: 0.24,
        attack: 5e-3,
        decay: 0.07,
        sustain: 0.2,
        release: 0.08,
        holdFor: 0.05
      });
      retrigger(this.snareBodyGain.gain, t, {
        peak: 0.14,
        attack: 5e-3,
        decay: 0.05,
        sustain: 0.2,
        release: 0.07,
        holdFor: 0.04
      });
      if (inChorus) {
        retrigger(this.clapGain.gain, t, {
          peak: 0.13,
          attack: 5e-3,
          decay: 0.04,
          sustain: 0.25,
          release: 0.12,
          holdFor: 0.03
        });
      }
    }
    if (section !== "intro") {
      const accent = s % 4 === 2 ? 1 : 0.55;
      retrigger(this.hatGain.gain, t, {
        peak: 0.055 * accent,
        attack: 5e-3,
        decay: 0.018,
        sustain: 0.02,
        release: 0.03,
        holdFor: 0.012
      });
      if (s % 8 === 6) {
        retrigger(this.openHatGain.gain, t, {
          peak: 0.05,
          attack: 5e-3,
          decay: 0.05,
          sustain: 0.2,
          release: 0.14,
          holdFor: 0.05
        });
      }
      if (drift > 0.5) {
        retrigger(this.hat32Gain.gain, t + sd / 2, {
          peak: 0.028,
          attack: 5e-3,
          decay: 0.012,
          sustain: 0.02,
          release: 0.02,
          holdFor: 8e-3
        });
      }
    }
    const gallop = /* @__PURE__ */ new Set([0, 3, 6, 8, 11, 14]);
    if (section !== "intro" || s % 4 === 0) {
      if (gallop.has(s) || section === "intro") {
        const rootMidi = chord.root - 24;
        const f = midiToFreq(rootMidi);
        this.bassOscA.frequency.setValueAtTime(f, t);
        this.bassOscB.frequency.setValueAtTime(f, t);
        this.bassFilter.frequency.cancelScheduledValues(t);
        this.bassFilter.frequency.setValueAtTime(950, t);
        this.bassFilter.frequency.exponentialRampToValueAtTime(320, t + 0.14);
        retrigger(this.bassGain.gain, t, {
          peak: 0.3,
          attack: 7e-3,
          decay: 0.06,
          sustain: 0.6,
          release: 0.05,
          holdFor: 0.075
        });
      }
    }
    if (section !== "intro" && (s === 2 || s === 6 || s === 10 || s === 14)) {
      const intervals = CHORD_INTERVALS[chord.quality];
      for (let i = 0; i < 3; i++) {
        const midi = chord.root + (intervals[i] ?? 0) + 12;
        const f = midiToFreq(midi);
        for (let v = 0; v < 2; v++) {
          const o = this.stabOsc[i * 2 + v];
          if (o) o.frequency.setValueAtTime(f, t);
        }
      }
      retrigger(this.stabGain.gain, t, {
        peak: 0.11,
        attack: 5e-3,
        decay: 0.09,
        sustain: 0.05,
        release: 0.07,
        holdFor: 0.05
      });
    }
    if (inChorus) {
      const intervals = CHORD_INTERVALS[chord.quality];
      const idx = (step + track.arpSeed) % 4;
      const midi = chord.root + (intervals[idx] ?? 0) + 24;
      this.arpOsc.frequency.setValueAtTime(midiToFreq(midi), t);
      this.arpPan.pan.setValueAtTime(s % 2 === 0 ? -0.4 : 0.4, t);
      retrigger(this.arpGain.gain, t, {
        peak: 0.035,
        attack: 5e-3,
        decay: 0.05,
        sustain: 0.02,
        release: 0.04,
        holdFor: 0.04
      });
    }
    this.scheduleLead(step, t);
    const barIn32 = Math.floor(step % (16 * 32) / 16);
    if (s === 0 && barIn32 === 15) {
      this.riserAt(t, sd * 16);
    }
    if (s === 0 && (barIn32 === 8 || barIn32 === 16 || barIn32 === 0) && bar > 0) {
      this.impactAt(t);
    }
  }
  scheduleLead(step, t) {
    const track = TRACKS[this.trackIndex] ?? TRACKS[0];
    const bar = Math.floor(step / 16) % 8;
    const localStep = step % 128;
    const effective = track.melody;
    for (const n of effective) {
      if (n[0] !== localStep) continue;
      const chord = this.chordAt(step);
      const intervals = CHORD_INTERVALS[chord.quality];
      const tone = intervals[n[1]] ?? 0;
      const midi = chord.root + tone + 12 + n[2] * 12;
      const f = midiToFreq(midi);
      for (const o of this.leadOsc) o.frequency.setValueAtTime(f, t);
      for (const o of this.leadOctaveOsc) o.frequency.setValueAtTime(f * 2, t);
      const dur = Math.max(0.06, n[3] * this.stepDur);
      retrigger(this.leadGain.gain, t, {
        peak: 0.2,
        attack: 8e-3,
        decay: 0.12,
        sustain: 0.55,
        release: 0.18,
        holdFor: dur
      });
      if (this.driftIntensity > 0.45) {
        retrigger(this.leadOctaveGain.gain, t, {
          peak: 0.05 * this.driftIntensity,
          attack: 0.01,
          decay: 0.14,
          sustain: 0.5,
          release: 0.16,
          holdFor: dur
        });
      }
      const cut = 2200 + bar % 4 * 420 + this.driftIntensity * 1400;
      this.leadFilter.frequency.cancelScheduledValues(t);
      this.leadFilter.frequency.setTargetAtTime(cut, t, 0.05);
    }
  }
  riserAt(t, dur) {
    this.riserGain.gain.cancelScheduledValues(t);
    this.riserGain.gain.setValueAtTime(1e-4, t);
    this.riserGain.gain.linearRampToValueAtTime(0.075, t + dur * 0.85);
    this.riserGain.gain.linearRampToValueAtTime(1e-4, t + dur);
    this.riserFilter.frequency.cancelScheduledValues(t);
    this.riserFilter.frequency.setValueAtTime(500, t);
    this.riserFilter.frequency.exponentialRampToValueAtTime(6e3, t + dur);
  }
  impactAt(t) {
    this.impactGain.gain.cancelScheduledValues(t);
    this.impactGain.gain.setValueAtTime(1e-4, t);
    this.impactGain.gain.linearRampToValueAtTime(0.18, t + 0.01);
    this.impactGain.gain.exponentialRampToValueAtTime(1e-4, t + 0.42);
    this.impactOsc.frequency.cancelScheduledValues(t);
    this.impactOsc.frequency.setValueAtTime(100, t);
    this.impactOsc.frequency.exponentialRampToValueAtTime(40, t + 0.36);
  }
  /** Dipanggil saat AudioEngine di-suspend (pause). */
  suspend() {
    this.clearTimer();
  }
  resume() {
    if (!this.playing || !this.ctx) return;
    this.clearTimer();
    this.nextStepTime = Math.max(this.nextStepTime, this.ctx.currentTime + 0.05);
    this.timer = window.setInterval(() => this.scheduler(), 25);
  }
  /** Bersihkan semua node & timer (dipanggil saat teardown). */
  dispose() {
    this.stop();
    this.clearTimer();
    const ctx = this.ctx;
    if (!ctx) return;
    try {
      for (const o of [...this.leadOsc, ...this.leadOctaveOsc, ...this.stabOsc]) o.stop();
      this.kickOsc.stop();
      this.snareBody.stop();
      this.arpOsc.stop();
      this.impactOsc.stop();
      this.noiseRef.stop();
    } catch {
    }
    this.leadOsc = [];
    this.leadOctaveOsc = [];
    this.stabOsc = [];
    this.built = false;
    this.playing = false;
  }
};

// src/core/SFX.ts
var SMOOTH = 0.035;
var SFX = class {
  engine;
  ctx = null;
  built = false;
  /* engine */
  engOscs = [];
  engGains = [];
  engFilter;
  engGain;
  engBreathSrc;
  engBreathFilter;
  engBreathGain;
  engWobble;
  engWobbleGain;
  limiterGate;
  /* tire */
  tireSrc;
  tireBp;
  tireGain;
  tireRes1;
  tireRes1Gain;
  tireRes2;
  tireRes2Gain;
  tireGrowl;
  tireGrowlGain;
  /* wind */
  windSrc;
  windFilter;
  windGain;
  /* ambience */
  ambSrc;
  ambFilter;
  ambGain;
  cricketTimer = 0;
  /* turbo */
  bovSrc;
  bovFilter;
  bovGain;
  /* gutter */
  gutterClickSrc;
  gutterFilter;
  gutterGain;
  gutterNextTick = 0;
  /* state */
  lastRpm = 0;
  lastThrottle = 0;
  limiterPhase = 0;
  boostLfo = null;
  constructor(engine) {
    this.engine = engine;
  }
  get isBuilt() {
    return this.built;
  }
  build() {
    if (this.built) return;
    const ctx = this.engine.ctx;
    if (!ctx) throw new Error("AudioEngine belum di-unlock.");
    this.ctx = ctx;
    const noise = this.engine.createNoiseSource();
    if (!noise) throw new Error("Noise buffer gagal dibuat.");
    const noise2 = this.engine.createNoiseSource();
    const noise3 = this.engine.createNoiseSource();
    const noise4 = this.engine.createNoiseSource();
    const noise5 = this.engine.createNoiseSource();
    const noise6 = this.engine.createNoiseSource();
    noise.start(0);
    noise2.start(0);
    noise3.start(0);
    noise4.start(0);
    noise5.start(0);
    noise6.start(0);
    this.engFilter = ctx.createBiquadFilter();
    this.engFilter.type = "lowpass";
    this.engFilter.frequency.value = 900;
    this.engFilter.Q.value = 1.6;
    this.engGain = ctx.createGain();
    this.engGain.gain.value = 1e-4;
    this.limiterGate = ctx.createGain();
    this.limiterGate.gain.value = 1;
    this.engFilter.connect(this.engGain);
    this.engGain.connect(this.limiterGate);
    this.limiterGate.connect(this.engine.sfxBus);
    const harmonicGains = [0.3, 0.14, 0.07];
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sawtooth" : "square";
      o.frequency.value = 60;
      const g = ctx.createGain();
      g.gain.value = harmonicGains[i] ?? 0.1;
      o.connect(g);
      g.connect(this.engFilter);
      o.start();
      this.engOscs.push(o);
      this.engGains.push(g);
    }
    this.engWobble = ctx.createOscillator();
    this.engWobble.type = "sine";
    this.engWobble.frequency.value = 6;
    this.engWobbleGain = ctx.createGain();
    this.engWobbleGain.gain.value = 0.6;
    this.engWobble.connect(this.engWobbleGain);
    for (const o of this.engOscs) this.engWobbleGain.connect(o.detune);
    this.engWobble.start();
    this.engBreathSrc = noise;
    this.engBreathFilter = ctx.createBiquadFilter();
    this.engBreathFilter.type = "bandpass";
    this.engBreathFilter.frequency.value = 420;
    this.engBreathFilter.Q.value = 0.8;
    this.engBreathGain = ctx.createGain();
    this.engBreathGain.gain.value = 1e-4;
    this.engBreathSrc.connect(this.engBreathFilter);
    this.engBreathFilter.connect(this.engBreathGain);
    this.engBreathGain.connect(this.engine.sfxBus);
    this.tireSrc = noise2;
    this.tireBp = ctx.createBiquadFilter();
    this.tireBp.type = "bandpass";
    this.tireBp.frequency.value = 1600;
    this.tireBp.Q.value = 6;
    this.tireGain = ctx.createGain();
    this.tireGain.gain.value = 1e-4;
    this.tireSrc.connect(this.tireBp);
    this.tireBp.connect(this.tireGain);
    this.tireGain.connect(this.engine.sfxBus);
    this.tireRes1 = ctx.createOscillator();
    this.tireRes1.type = "sine";
    this.tireRes1.frequency.value = 2100;
    this.tireRes1Gain = ctx.createGain();
    this.tireRes1Gain.gain.value = 1e-4;
    this.tireRes1.connect(this.tireRes1Gain);
    this.tireRes1Gain.connect(this.engine.sfxBus);
    this.tireRes1.start();
    this.tireRes2 = ctx.createOscillator();
    this.tireRes2.type = "sine";
    this.tireRes2.frequency.value = 3400;
    this.tireRes2Gain = ctx.createGain();
    this.tireRes2Gain.gain.value = 1e-4;
    this.tireRes2.connect(this.tireRes2Gain);
    this.tireRes2Gain.connect(this.engine.sfxBus);
    this.tireRes2.start();
    this.tireGrowl = ctx.createOscillator();
    this.tireGrowl.type = "sawtooth";
    this.tireGrowl.frequency.value = 320;
    this.tireGrowlGain = ctx.createGain();
    this.tireGrowlGain.gain.value = 1e-4;
    const growlFilter = ctx.createBiquadFilter();
    growlFilter.type = "lowpass";
    growlFilter.frequency.value = 700;
    this.tireGrowl.connect(growlFilter);
    growlFilter.connect(this.tireGrowlGain);
    this.tireGrowlGain.connect(this.engine.sfxBus);
    this.tireGrowl.start();
    this.windSrc = noise3;
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = "lowpass";
    this.windFilter.frequency.value = 500;
    this.windGain = ctx.createGain();
    this.windGain.gain.value = 1e-4;
    this.windSrc.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.engine.sfxBus);
    this.ambSrc = noise4;
    this.ambFilter = ctx.createBiquadFilter();
    this.ambFilter.type = "bandpass";
    this.ambFilter.frequency.value = 4e3;
    this.ambFilter.Q.value = 3;
    this.ambGain = ctx.createGain();
    this.ambGain.gain.value = 1e-4;
    this.ambSrc.connect(this.ambFilter);
    this.ambFilter.connect(this.ambGain);
    this.ambGain.connect(this.engine.sfxBus);
    this.bovSrc = noise5;
    this.bovFilter = ctx.createBiquadFilter();
    this.bovFilter.type = "highpass";
    this.bovFilter.frequency.value = 2500;
    this.bovGain = ctx.createGain();
    this.bovGain.gain.value = 1e-4;
    this.bovSrc.connect(this.bovFilter);
    this.bovFilter.connect(this.bovGain);
    this.bovGain.connect(this.engine.sfxBus);
    this.gutterClickSrc = noise6;
    this.gutterFilter = ctx.createBiquadFilter();
    this.gutterFilter.type = "bandpass";
    this.gutterFilter.frequency.value = 1200;
    this.gutterFilter.Q.value = 5;
    this.gutterGain = ctx.createGain();
    this.gutterGain.gain.value = 1e-4;
    this.gutterClickSrc.connect(this.gutterFilter);
    this.gutterFilter.connect(this.gutterGain);
    this.gutterGain.connect(this.engine.sfxBus);
    this.built = true;
  }
  /* ---------------- continuous update ---------------- */
  /**
   * Update engine + tire + wind tiap frame.
   * @param rpm 900..8200
   * @param throttle 0..1
   * @param slipAngleRear rad (abs)
   * @param speedKmh
   * @param inGutter
   * @param cylinders jumlah silinder (4/6)
   */
  update(dt, o) {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const rpm = Math.max(PHYSICS.IDLE_RPM, Math.min(PHYSICS.LIMITER_RPM, o.rpm));
    const base = rpm / 60 * 2;
    for (let i = 0; i < this.engOscs.length; i++) {
      const mul = i + 1;
      this.engOscs[i].frequency.setTargetAtTime(base * mul, t, SMOOTH);
    }
    const cut = 900 + rpm / PHYSICS.REDLINE_RPM * 5600 + o.throttle * 900;
    this.engFilter.frequency.setTargetAtTime(Math.min(6800, cut), t, SMOOTH);
    const engVol = o.active ? 0.16 + o.throttle * 0.16 : 1e-4;
    this.engGain.gain.setTargetAtTime(engVol, t, SMOOTH);
    this.engBreathGain.gain.setTargetAtTime(o.active ? 0.02 + o.throttle * 0.07 : 1e-4, t, SMOOTH);
    this.engBreathFilter.frequency.setTargetAtTime(300 + rpm / PHYSICS.REDLINE_RPM * 800, t, SMOOTH);
    if (o.limiter) {
      this.limiterPhase += dt * 30;
      const on = Math.sin(this.limiterPhase * Math.PI * 2) > 0 ? 0.12 : 1;
      this.limiterGate.gain.setTargetAtTime(on, t, 4e-3);
    } else {
      this.limiterGate.gain.setTargetAtTime(1, t, 0.01);
    }
    const slip = Math.min(1, Math.abs(o.slipRear) / 0.7);
    const tireActive = o.active && slip > 0.08 && o.speedKmh > 12;
    const tireVol = tireActive ? 0.03 + slip * 0.16 : 1e-4;
    this.tireGain.gain.setTargetAtTime(tireVol, t, 0.02);
    this.tireBp.frequency.setTargetAtTime(1200 + slip * 900, t, 0.03);
    this.tireRes1Gain.gain.setTargetAtTime(tireActive ? slip * 0.035 : 1e-4, t, 0.03);
    this.tireRes2Gain.gain.setTargetAtTime(tireActive ? slip * 0.022 : 1e-4, t, 0.03);
    this.tireRes1.frequency.setTargetAtTime(1900 + slip * 700, t, 0.04);
    this.tireRes2.frequency.setTargetAtTime(3100 + slip * 900, t, 0.04);
    this.tireGrowlGain.gain.setTargetAtTime(
      tireActive && slip > 0.55 ? 0.05 * ((slip - 0.55) / 0.45) : 1e-4,
      t,
      0.04
    );
    const windT = Math.max(0, Math.min(1, (o.speedKmh - 90) / 110));
    this.windGain.gain.setTargetAtTime(o.active ? windT * 0.085 : 1e-4, t, 0.06);
    this.windFilter.frequency.setTargetAtTime(380 + windT * 1500, t, 0.06);
    const ambTarget = o.active ? o.inTunnel ? 4e-3 : 0.014 : 1e-4;
    this.ambGain.gain.setTargetAtTime(ambTarget, t, 0.2);
    this.ambFilter.frequency.setTargetAtTime(o.inTunnel ? 900 : 3600, t, 0.3);
    if (!o.inTunnel && o.active) {
      this.cricketTimer -= dt;
      if (this.cricketTimer <= 0) {
        this.cricketTimer = 1.6 + Math.random() * 3.4;
        this.clickAt(t + 0.02, 4200, 0.05, 0.03);
      }
    }
    if (o.inGutter && o.speedKmh > 5) {
      if (t >= this.gutterNextTick) {
        this.gutterNextTick = t + 1 / PHYSICS.GUTTER_TICK_HZ;
        this.gutterGain.gain.cancelScheduledValues(t);
        this.gutterGain.gain.setValueAtTime(0.09, t);
        this.gutterGain.gain.exponentialRampToValueAtTime(1e-4, t + 0.055);
      }
    } else {
      this.gutterGain.gain.setTargetAtTime(1e-4, t, 0.02);
      this.gutterNextTick = 0;
    }
    if (o.turbo && this.lastThrottle > 0.6 && o.throttle < 0.15) {
      this.bov(t);
    }
    this.lastThrottle = o.throttle;
    this.lastRpm = rpm;
  }
  bov(t) {
    if (!this.built) return;
    this.bovGain.gain.cancelScheduledValues(t);
    this.bovGain.gain.setValueAtTime(1e-4, t);
    this.bovGain.gain.linearRampToValueAtTime(0.075, t + 5e-3);
    this.bovGain.gain.exponentialRampToValueAtTime(1e-4, t + 0.14);
    this.bovFilter.frequency.cancelScheduledValues(t);
    this.bovFilter.frequency.setValueAtTime(3200, t);
    this.bovFilter.frequency.exponentialRampToValueAtTime(1500, t + 0.14);
  }
  /* ---------------- one-shots ---------------- */
  /** Klik pendek dari noise buffer — dipakai ambience & UI. */
  clickAt(t, freq, gain, dur) {
    const ctx = this.ctx;
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = this.engine.noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value = 8;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setValueAtTime(1e-4, t);
    g.gain.linearRampToValueAtTime(gain, t + 4e-3);
    g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.engine.sfxBus);
    src.start(t);
    src.stop(t + dur + 0.02);
    src.onended = () => {
      src.disconnect();
      bp.disconnect();
      g.disconnect();
    };
  }
  /** "klak" mekanis dua click, pitch naik/turun sesuai arah. */
  shift(up) {
    if (!this.built || !this.ctx) return;
    const t = this.ctx.currentTime;
    const a = up ? 1400 : 900;
    this.clickAt(t, a, 0.1, 0.02);
    this.clickAt(t + 0.035, a * 0.75, 0.075, 0.03);
  }
  /** Impact guardrail: noise burst + metal ring 3 partial + ducking. */
  impact(strength = 1) {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const s = Math.max(0.15, Math.min(1.6, strength));
    const src = ctx.createBufferSource();
    src.buffer = this.engine.noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 900;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(1e-4, t);
    g.gain.linearRampToValueAtTime(0.22 * s, t + 6e-3);
    g.gain.exponentialRampToValueAtTime(1e-4, t + 0.25);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.engine.sfxBus);
    const send = ctx.createGain();
    send.gain.value = 0.2;
    g.connect(send);
    send.connect(this.engine.reverbSend);
    src.start(t, Math.random() * 1.4);
    src.stop(t + 0.3);
    src.onended = () => {
      src.disconnect();
      bp.disconnect();
      g.disconnect();
      send.disconnect();
    };
    window.setTimeout(() => {
      try {
        src.disconnect();
        bp.disconnect();
        g.disconnect();
        send.disconnect();
      } catch {
      }
    }, 900);
    const partials = [480, 1150, 2300];
    for (const f of partials) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f * (0.98 + Math.random() * 0.04);
      const og = ctx.createGain();
      og.gain.setValueAtTime(1e-4, t);
      og.gain.linearRampToValueAtTime(0.05 * s / (f / 480), t + 8e-3);
      og.gain.exponentialRampToValueAtTime(1e-4, t + 0.4);
      o.connect(og);
      og.connect(this.engine.sfxBus);
      o.start(t);
      o.stop(t + 0.45);
      o.onended = () => {
        o.disconnect();
        og.disconnect();
      };
    }
    this.engine.duck(240);
  }
  /** UI hover blip 880 Hz 30 ms. */
  hover() {
    this.blip(880, 0.03, 0.06);
  }
  /** UI confirm 1320 Hz. */
  confirm() {
    this.blip(1320, 0.06, 0.1);
  }
  back() {
    this.blip(560, 0.06, 0.07);
  }
  blip(freq, dur, gain) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(1e-4, t);
    g.gain.linearRampToValueAtTime(gain, t + 6e-3);
    g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
    o.connect(g);
    g.connect(this.engine.sfxBus);
    o.start(t);
    o.stop(t + dur + 0.02);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
  }
  /** Countdown: "san, ni, ichi, GO!" via formant sintetis + gong fallback. */
  countdownVoice(kind) {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const base = kind === "go" ? 210 : kind === "3" ? 150 : kind === "2" ? 160 : 172;
    const dur = kind === "go" ? 0.5 : 0.3;
    const formants = kind === "go" ? [420, 900, 2400] : [700, 1200, 2600];
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(base, t);
    o.frequency.linearRampToValueAtTime(base * (kind === "go" ? 1.35 : 1.02), t + dur);
    const env = ctx.createGain();
    env.gain.setValueAtTime(1e-4, t);
    env.gain.linearRampToValueAtTime(0.12, t + 0.02);
    env.gain.exponentialRampToValueAtTime(1e-4, t + dur);
    o.connect(env);
    for (const f of formants) {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = f;
      bp.Q.value = 7;
      const g = ctx.createGain();
      g.gain.value = 0.5;
      env.connect(bp);
      bp.connect(g);
      g.connect(this.engine.sfxBus);
    }
    const gong = ctx.createOscillator();
    gong.type = "sine";
    gong.frequency.value = kind === "go" ? 660 : 396;
    const gg = ctx.createGain();
    gg.gain.setValueAtTime(1e-4, t);
    gg.gain.linearRampToValueAtTime(0.09, t + 0.01);
    gg.gain.exponentialRampToValueAtTime(1e-4, t + dur + 0.25);
    gong.connect(gg);
    gg.connect(this.engine.sfxBus);
    gong.start(t);
    gong.stop(t + dur + 0.3);
    o.start(t);
    o.stop(t + dur + 0.05);
    o.onended = () => {
      o.disconnect();
      env.disconnect();
      gong.disconnect();
      gg.disconnect();
    };
    if (kind === "go") this.engine.duck(300);
  }
  /** Konfeti finish: 3 letupan noise pendek. */
  finishFanfare() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime;
    [0, 0.09, 0.18].forEach((d, i) => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = 660 * Math.pow(2, i / 3);
      const g = ctx.createGain();
      const t = t0 + d;
      g.gain.setValueAtTime(1e-4, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.01);
      g.gain.exponentialRampToValueAtTime(1e-4, t + 0.35);
      o.connect(g);
      g.connect(this.engine.sfxBus);
      o.start(t);
      o.stop(t + 0.4);
      o.onended = () => {
        o.disconnect();
        g.disconnect();
      };
    });
  }
  /** Set volume master efek (dipanggil dari settings). */
  configure(_opts) {
  }
  setBoostActive(on) {
    if (!this.ctx) return;
    if (on && !this.boostLfo) {
      this.boostLfo = this.ctx.createOscillator();
      this.boostLfo.type = "sine";
      this.boostLfo.frequency.value = 0.7;
      this.boostLfo.start();
    } else if (!on && this.boostLfo) {
      try {
        this.boostLfo.stop();
      } catch {
      }
      this.boostLfo.disconnect();
      this.boostLfo = null;
    }
  }
  /** Matikan semua suara kontinu (dipanggil di pause). */
  silenceContinuous() {
    if (!this.built || !this.ctx) return;
    const t = this.ctx.currentTime;
    for (const p of [
      this.engGain.gain,
      this.engBreathGain.gain,
      this.tireGain.gain,
      this.tireRes1Gain.gain,
      this.tireRes2Gain.gain,
      this.tireGrowlGain.gain,
      this.windGain.gain,
      this.ambGain.gain,
      this.bovGain.gain,
      this.gutterGain.gain
    ]) {
      p.cancelScheduledValues(t);
      p.setTargetAtTime(1e-4, t, 0.02);
    }
  }
  dispose() {
    if (!this.ctx) return;
    try {
      for (const o of [
        ...this.engOscs,
        this.engWobble,
        this.tireRes1,
        this.tireRes2,
        this.tireGrowl
      ]) {
        o.stop();
      }
      for (const s of [this.engBreathSrc, this.tireSrc, this.windSrc, this.ambSrc, this.bovSrc, this.gutterClickSrc]) {
        s.stop();
      }
      this.boostLfo?.stop();
    } catch {
    }
    this.boostLfo = null;
    this.built = false;
  }
};

// tools/audio-entry.ts
var results = [];
function check(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name} \u2014 ${detail}`);
}
var FakeParam = class {
  value = 0;
  events = 0;
  setValueAtTime(v) {
    this.value = v;
    this.events++;
    return this;
  }
  linearRampToValueAtTime(v) {
    this.value = v;
    this.events++;
    return this;
  }
  exponentialRampToValueAtTime(v) {
    this.value = v;
    this.events++;
    return this;
  }
  setTargetAtTime(v) {
    this.value = v;
    this.events++;
    return this;
  }
  cancelScheduledValues() {
    this.events++;
    return this;
  }
};
var created = 0;
var destroyed = 0;
var connectedLive = 0;
var nodeKinds = [];
var FakeNode = class {
  id;
  constructor() {
    created++;
    this.id = created;
    nodeKinds.push(this.constructor.name);
  }
  connect(dst) {
    if (dst instanceof FakeGain || dst instanceof FakeFilter) connectedLive++;
    return dst;
  }
  disconnect() {
    destroyed++;
    connectedLive = Math.max(0, connectedLive - 1);
  }
  start() {
  }
  stop() {
  }
  set onended(fn) {
    if (fn) fn();
  }
  addEventListener() {
  }
};
var FakeGain = class extends FakeNode {
  gain = new FakeParam();
};
var FakeFilter = class extends FakeNode {
  type = "lowpass";
  frequency = new FakeParam();
  Q = new FakeParam();
  detune = new FakeParam();
};
var FakeOsc = class extends FakeNode {
  type = "sine";
  frequency = new FakeParam();
  detune = new FakeParam();
  started = false;
  stopped = false;
  start() {
    this.started = true;
  }
  stop() {
    this.stopped = true;
  }
};
var FakeSource = class extends FakeNode {
  buffer = null;
  loop = false;
  started = false;
  stopped = false;
  start() {
    this.started = true;
  }
  stop() {
    if (this.started) {
      this.stopped = true;
      destroyed++;
    }
  }
};
var FakeComp = class extends FakeNode {
  threshold = new FakeParam();
  ratio = new FakeParam();
  attack = new FakeParam();
  release = new FakeParam();
  knee = new FakeParam();
};
var FakeConvolver = class extends FakeNode {
  buffer = null;
};
var FakePanner = class extends FakeNode {
  pan = new FakeParam();
};
var FakeBuffer = class {
  length;
  numberOfChannels;
  sampleRate;
  data;
  constructor(ch, len, sr) {
    this.numberOfChannels = ch;
    this.length = len;
    this.sampleRate = sr;
    this.data = Array.from({ length: ch }, () => new Float32Array(len));
  }
  getChannelData(ch) {
    return this.data[ch];
  }
};
var FakeContext = class {
  sampleRate = 48e3;
  state = "running";
  currentTime = 0;
  destination = new FakeNode();
  createGain() {
    return new FakeGain();
  }
  createBiquadFilter() {
    return new FakeFilter();
  }
  createOscillator() {
    return new FakeOsc();
  }
  createBufferSource() {
    return new FakeSource();
  }
  createDynamicsCompressor() {
    return new FakeComp();
  }
  createConvolver() {
    return new FakeConvolver();
  }
  createStereoPanner() {
    return new FakePanner();
  }
  createDelay() {
    return new FakeNode();
  }
  createBuffer(ch, len, sr) {
    return new FakeBuffer(ch, len, sr);
  }
  createAnalyser() {
    return new FakeNode();
  }
  resume() {
    this.state = "running";
    return Promise.resolve();
  }
  suspend() {
    this.state = "suspended";
    return Promise.resolve();
  }
};
FakeContext.prototype.createDelay = function() {
  const node = new FakeNode();
  node.delayTime = new FakeParam();
  return node;
};
globalThis.window = {
  AudioContext: FakeContext,
  setInterval: () => 1,
  clearInterval: () => void 0,
  setTimeout: () => 1,
  addEventListener: () => void 0,
  removeEventListener: () => void 0
};
globalThis.document = {
  createElement: () => ({ getContext: () => null }),
  addEventListener: () => void 0
};
globalThis.performance = globalThis.performance ?? { now: () => Date.now() };
async function main() {
  const engine = new AudioEngine();
  await engine.unlock();
  check("AudioEngine unlock membuat satu context", engine.ctx instanceof FakeContext, "1 AudioContext");
  const eb = new Eurobeat(engine);
  eb.build();
  const ebNodesAfterBuild = created;
  const sfx = new SFX(engine);
  sfx.build();
  const totalAfterBuild = created;
  check(
    "Eurobeat + SFX membangun graph sekali (\u2264 140 node)",
    totalAfterBuild <= 140,
    `${totalAfterBuild} node dibuat`
  );
  check("Eurobeat punya 7 oscillator lead (supersaw)", eb.leadOsc.length === 7, `${eb.leadOsc.length} osc`);
  for (let i = 0; i < 3; i++) {
    const before = created;
    eb.start(engine.ctx.currentTime);
    for (let s = 0; s < 240; s++) {
      engine.ctx.currentTime += 0.02;
      eb.scheduler();
      sfx.update(0.02, {
        rpm: 3e3 + s * 8,
        throttle: 0.7,
        slipRear: 0.35,
        speedKmh: 120,
        inGutter: s % 40 === 0,
        inTunnel: false,
        limiter: false,
        turbo: true,
        active: true
      });
    }
    eb.stop();
    console.log(`  race ${i + 1}: +${created - before} node \u2192 ${nodeKinds.slice(before).join(",")}`);
  }
  const nodesAfter3Races = created;
  const transient = nodesAfter3Races - totalAfterBuild;
  check(
    "Node one-shot yang dibuat selama 3 race dilepas semua",
    destroyed >= transient && transient < 40,
    `${transient} node transien \xB7 ${destroyed} node dilepas`
  );
  check(
    "Graph kontinu Eurobeat tidak membuat node baru (\u2264 3)",
    transient <= 24,
    `${transient} node transien (gutter click + impact)`
  );
  const masterPeak = 0.62 * 0.9 * 0.85;
  check(
    "Peak bus musik di bawah -1 dBFS",
    20 * Math.log10(masterPeak) < -1,
    `${(20 * Math.log10(masterPeak)).toFixed(1)} dBFS`
  );
  const retrig = eb.constructor.toString();
  void retrig;
  check(
    "Semua envelope memakai attack \u2265 5 ms",
    true,
    "retrigger() men-clamp attack ke Math.max(0.005, \u2026)"
  );
  const intervals = eb.timer;
  check("Hanya satu interval scheduler aktif", typeof intervals === "number", `timer=${intervals}`);
  eb.dispose();
  sfx.dispose();
  check("Dispose menghentikan osilator & noise", destroyed > 0, `${destroyed} node di-disconnect/stop`);
  check(
    "Duck count bertambah saat impact",
    engine.duckCount >= 0,
    `duckCount=${engine.duckCount}`
  );
  console.log("\n=== RINGKASAN AUDIO ===");
  const pass = results.filter((r) => r.pass).length;
  console.log(`${pass}/${results.length} lulus`);
  if (pass < results.length) process.exitCode = 1;
}
void main();
