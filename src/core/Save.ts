/**
 * Save.ts — localStorage: best time, unlock, setting, progresi (§9.5, §13).
 *
 * Semua akses dibungkus try/catch: localStorage bisa diblokir (mode privat,
 * iframe sandbox) dan game harus tetap jalan tanpa save.
 */

export interface Settings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  quality: "low" | "medium" | "high";
  cameraMode: "chase" | "bumper" | "hood";
  invertSteer: boolean;
  cameraSensitivity: number;
  subtitles: boolean;
  reduceMotion: boolean;
  hudScale: number;
  colorblindSafe: boolean;
}

export interface Progress {
  cash: number;
  /** Best time per mode (ms). */
  bestTimes: Record<string, number>;
  /** Car id → unlocked. */
  unlockedCars: string[];
  /** Upgrade level per car: carId → {tire,susp,lsd,engine} 0..4 */
  upgrades: Record<string, { tire: number; susp: number; lsd: number; engine: number }>;
  /** Race week yang sudah selesai (1..6). */
  weeksCleared: number[];
  /** Rival yang sudah dikalahkan. */
  rivalsBeaten: string[];
  selectedCar: string;
  /** Statistik. */
  stats: { races: number; wins: number; drifts: number; bestDrift: number; totalKm: number };
}

export interface SaveData {
  version: number;
  settings: Settings;
  progress: Progress;
}

const KEY = "eurobeat-drift-legend.save.v1";
const VERSION = 1;

const DEFAULT_SETTINGS: Settings = {
  masterVolume: 0.85,
  musicVolume: 0.62,
  sfxVolume: 0.9,
  quality: "high",
  cameraMode: "chase",
  invertSteer: false,
  cameraSensitivity: 1,
  subtitles: true,
  reduceMotion: false,
  hudScale: 1,
  colorblindSafe: false,
};

const DEFAULT_PROGRESS: Progress = {
  cash: 0,
  bestTimes: {},
  unlockedCars: ["hachi86"],
  upgrades: {
    hachi86: { tire: 0, susp: 0, lsd: 0, engine: 0 },
    fd7: { tire: 0, susp: 0, lsd: 0, engine: 0 },
    ek9: { tire: 0, susp: 0, lsd: 0, engine: 0 },
    s13: { tire: 0, susp: 0, lsd: 0, engine: 0 },
  },
  weeksCleared: [],
  rivalsBeaten: [],
  selectedCar: "hachi86",
  stats: { races: 0, wins: 0, drifts: 0, bestDrift: 0, totalKm: 0 },
};

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export class SaveManager {
  data: SaveData;
  private available = true;

  constructor() {
    this.data = { version: VERSION, settings: clone(DEFAULT_SETTINGS), progress: clone(DEFAULT_PROGRESS) };
    this.load();
  }

  get isAvailable(): boolean {
    return this.available;
  }

  load(): void {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      if (!parsed || typeof parsed !== "object") return;
      const merged: SaveData = {
        version: VERSION,
        settings: { ...clone(DEFAULT_SETTINGS), ...(parsed.settings ?? {}) },
        progress: {
          ...clone(DEFAULT_PROGRESS),
          ...(parsed.progress ?? {}),
          stats: { ...clone(DEFAULT_PROGRESS.stats), ...(parsed.progress?.stats ?? {}) },
          upgrades: { ...clone(DEFAULT_PROGRESS.upgrades), ...(parsed.progress?.upgrades ?? {}) },
        },
      };
      this.data = merged;
      this.sanitize();
    } catch {
      this.available = false;
    }
  }

  /** Pastikan nilai tetap valid walau file save rusak/diedit manual. */
  private sanitize(): void {
    const s = this.data.settings;
    s.masterVolume = clamp01(s.masterVolume, 0.85);
    s.musicVolume = clamp01(s.musicVolume, 0.62);
    s.sfxVolume = clamp01(s.sfxVolume, 0.9);
    if (!["low", "medium", "high"].includes(s.quality)) s.quality = "high";
    if (!["chase", "bumper", "hood"].includes(s.cameraMode)) s.cameraMode = "chase";
    s.cameraSensitivity = Math.max(0.3, Math.min(2, Number(s.cameraSensitivity) || 1));
    s.hudScale = Math.max(0.7, Math.min(1.6, Number(s.hudScale) || 1));
    const p = this.data.progress;
    p.cash = Math.max(0, Math.floor(Number(p.cash) || 0));
    if (!Array.isArray(p.unlockedCars) || p.unlockedCars.length === 0) p.unlockedCars = ["hachi86"];
    if (!p.unlockedCars.includes("hachi86")) p.unlockedCars.push("hachi86");
    if (!Array.isArray(p.weeksCleared)) p.weeksCleared = [];
    if (!Array.isArray(p.rivalsBeaten)) p.rivalsBeaten = [];
    if (typeof p.bestTimes !== "object" || p.bestTimes === null) p.bestTimes = {};
    if (!p.upgrades || typeof p.upgrades !== "object") p.upgrades = clone(DEFAULT_PROGRESS.upgrades);
    for (const carId of ["hachi86", "fd7", "ek9", "s13"]) {
      const u = p.upgrades[carId] ?? { tire: 0, susp: 0, lsd: 0, engine: 0 };
      u.tire = clampLevel(u.tire);
      u.susp = clampLevel(u.susp);
      u.lsd = clampLevel(u.lsd);
      u.engine = clampLevel(u.engine);
      p.upgrades[carId] = u;
    }
  }

  save(): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data));
      this.available = true;
    } catch {
      this.available = false;
    }
  }

  updateSettings(patch: Partial<Settings>): void {
    this.data.settings = { ...this.data.settings, ...patch };
    this.sanitize();
    this.save();
  }

  updateProgress(patch: Partial<Progress>): void {
    this.data.progress = { ...this.data.progress, ...patch };
    this.sanitize();
    this.save();
  }

  addCash(amount: number): void {
    this.data.progress.cash = Math.max(0, this.data.progress.cash + Math.floor(amount));
    this.save();
  }

  spendCash(amount: number): boolean {
    if (this.data.progress.cash < amount) return false;
    this.data.progress.cash -= amount;
    this.save();
    return true;
  }

  recordDrift(points: number): void {
    const st = this.data.progress.stats;
    st.drifts += 1;
    st.bestDrift = Math.max(st.bestDrift, Math.floor(points));
    this.save();
  }

  recordRace(opts: { won: boolean; km: number; bestTimeKey?: string; timeMs?: number }): void {
    const p = this.data.progress;
    p.stats.races += 1;
    if (opts.won) p.stats.wins += 1;
    p.stats.totalKm += opts.km;
    if (opts.bestTimeKey && typeof opts.timeMs === "number") {
      const prev = p.bestTimes[opts.bestTimeKey] ?? Number.POSITIVE_INFINITY;
      if (opts.timeMs < prev) p.bestTimes[opts.bestTimeKey] = Math.round(opts.timeMs);
    }
    this.save();
  }

  unlockCar(carId: string): boolean {
    const p = this.data.progress;
    if (p.unlockedCars.includes(carId)) return false;
    p.unlockedCars.push(carId);
    this.save();
    return true;
  }

  buyUpgrade(carId: string, kind: "tire" | "susp" | "lsd" | "engine"): boolean {
    const p = this.data.progress;
    const u = p.upgrades[carId] ?? { tire: 0, susp: 0, lsd: 0, engine: 0 };
    p.upgrades[carId] = u;
    const level = u[kind];
    if (level >= 4) return false;
    const cost = upgradeCost(level);
    if (!this.spendCash(cost)) return false;
    u[kind] = level + 1;
    this.save();
    return true;
  }

  resetAll(): void {
    this.data = { version: VERSION, settings: clone(DEFAULT_SETTINGS), progress: clone(DEFAULT_PROGRESS) };
    this.save();
  }
}

export function upgradeCost(level: number): number {
  const table = [1200, 2600, 5000, 9000];
  return table[Math.min(3, Math.max(0, level))] ?? 9000;
}

function clamp01(v: unknown, fallback: number): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(1, n));
}

function clampLevel(v: unknown): number {
  const n = Math.floor(Number(v));
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(4, n));
}

/** RNG deterministik untuk fisika & AI (§13.9). */
export class SeededRng {
  private s: number;

  constructor(seed = 0x9e3779b9) {
    this.s = seed >>> 0 || 1;
  }

  /** xorshift32 — cepat, cukup untuk AI & partikel. */
  next(): number {
    let x = this.s;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.s = x >>> 0;
    return this.s / 4294967296;
  }

  range(min: number, max: number): number {
    return min + (max - min) * this.next();
  }

  int(min: number, maxInclusive: number): number {
    return Math.floor(this.range(min, maxInclusive + 1));
  }

  pick<T>(arr: readonly T[]): T {
    if (arr.length === 0) throw new Error("pick() dari array kosong");
    return arr[Math.floor(this.next() * arr.length)] as T;
  }

  reseed(seed: number): void {
    this.s = seed >>> 0 || 1;
  }
}
