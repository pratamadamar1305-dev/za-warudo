// Save.ts — localStorage persistence: best times, unlocks, settings, progression.

export interface SettingsData {
  volMusic: number;
  volSfx: number;
  quality: 'low' | 'medium' | 'high';
  camSens: number;
  motionReduce: boolean;
  subtitles: boolean;
  invertY: boolean;
  assists: { steer: boolean; brake: boolean; recover: boolean; drift: boolean };
  difficulty: 'chill' | 'normal' | 'hard' | 'legend';
}

export interface GhostSample { t: number; x: number; z: number; heading: number; }

export interface SaveData {
  bestTime: number | null;
  bestDrift: number;
  cuan: number;
  wins: number;
  week: number; // 1..6
  selectedCar: string;
  unlockedCars: string[];
  upgrades: Record<string, { tires: number; suspension: number; lsd: number; engine: number }>;
  tuningPreset: string;
  settings: SettingsData;
  ghost: GhostSample[] | null;
  timeAttackBest: number | null;
}

const KEY = 'edl_save_v1';

export function defaultSave(): SaveData {
  return {
    bestTime: null,
    bestDrift: 0,
    cuan: 12000,
    wins: 0,
    week: 1,
    selectedCar: 'hachi86',
    unlockedCars: ['hachi86'],
    upgrades: {},
    tuningPreset: 'balanced',
    settings: {
      volMusic: 80,
      volSfx: 90,
      quality: 'medium',
      camSens: 100,
      motionReduce: false,
      subtitles: true,
      invertY: false,
      assists: { steer: true, brake: true, recover: true, drift: true },
      difficulty: 'normal',
    },
    ghost: null,
    timeAttackBest: null,
  };
}

export let save: SaveData = defaultSave();

export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      save = { ...defaultSave(), ...parsed, settings: { ...defaultSave().settings, ...(parsed.settings ?? {}) } };
    }
  } catch { /* corrupted save -> defaults */ }
}

export function persistSave() {
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch { /* storage full/blocked */ }
}

export function getUpgrades(carId: string) {
  if (!save.upgrades[carId]) save.upgrades[carId] = { tires: 0, suspension: 0, lsd: 0, engine: 0 };
  return save.upgrades[carId];
}
