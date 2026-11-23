// Save state uses native Preferences on Android and localStorage as a browser/failure fallback.
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

export interface SettingsData {
  volMusic: number;
  volSfx: number;
  quality: 'low' | 'medium' | 'high';
  camSens: number;
  motionReduce: boolean;
  subtitles: boolean;
  invertY: boolean;
  haptics: boolean;
  steeringMode: 'buttons' | 'tilt';
  tiltZero: number | null;
  audioMode: 'speaker' | 'headphones';
  assists: { steer: boolean; brake: boolean; recover: boolean; drift: boolean };
  difficulty: 'chill' | 'normal' | 'hard' | 'legend';
}

export interface GhostSample { t: number; x: number; z: number; heading: number; }
export interface SaveData {
  bestTime: number | null;
  bestDrift: number;
  cuan: number;
  wins: number;
  week: number;
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
    bestTime: null, bestDrift: 0, cuan: 12000, wins: 0, week: 1,
    selectedCar: 'hachi86', unlockedCars: ['hachi86'], upgrades: {}, tuningPreset: 'balanced',
    settings: {
      volMusic: 55, volSfx: 85, quality: 'medium', camSens: 100, motionReduce: false,
      subtitles: true, invertY: false, haptics: true, steeringMode: 'buttons', tiltZero: null,
      audioMode: 'speaker', assists: { steer: true, brake: true, recover: true, drift: true }, difficulty: 'normal',
    },
    ghost: null, timeAttackBest: null,
  };
}

export let save: SaveData = defaultSave();

async function getStored(): Promise<string | null> {
  if (Capacitor.isNativePlatform()) {
    try {
      const { value } = await Preferences.get({ key: KEY });
      if (value !== null) return value;
    } catch { /* use browser fallback */ }
  }
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export async function loadSave(): Promise<void> {
  try {
    const raw = await getStored();
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    const defaults = defaultSave();
    save = {
      ...defaults, ...parsed,
      settings: { ...defaults.settings, ...(parsed.settings ?? {}), assists: { ...defaults.settings.assists, ...(parsed.settings?.assists ?? {}) } },
    };
    if (Capacitor.isNativePlatform()) {
      try { await Preferences.set({ key: KEY, value: JSON.stringify(save) }); } catch { /* fallback remains */ }
    }
  } catch { save = defaultSave(); }
}

export async function persistSave(): Promise<void> {
  const value = JSON.stringify(save);
  try { localStorage.setItem(KEY, value); } catch { /* private mode/storage disabled */ }
  if (Capacitor.isNativePlatform()) { try { await Preferences.set({ key: KEY, value }); } catch { /* localStorage fallback is already updated */ } }
}

export function getUpgrades(carId: string) {
  if (!save.upgrades[carId]) save.upgrades[carId] = { tires: 0, suspension: 0, lsd: 0, engine: 0 };
  return save.upgrades[carId];
}
