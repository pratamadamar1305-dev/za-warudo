// Cheats.ts — SINGLE SOURCE OF TRUTH for every cheat flag (spec §13A).
// All systems read from here. No scattered `if (cheat)` checks elsewhere.
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

export type AutoDriveProfile = 'chill' | 'normal' | 'pro';
export type DriveLineStyle = 'speed' | 'apex' | 'gear' | 'ghost';

export interface CheatFlags {
  autoDrive: boolean;
  autoDriveProfile: AutoDriveProfile;
  driveLine: boolean;
  driveLineStyle: DriveLineStyle;
  driveLineIntensity: number; // 0..3
  gripMul: number; // 0.5..3.0
  noSpin: boolean;
  ghostMode: boolean;
  infiniteBoost: boolean;
  slowmo: number; // 0.1..2.0
  bpmOverride: number | null; // 120..190
  scoreMul: number; // 1..100
  unlockAll: boolean;
  weather: 'clear' | 'rain';
  traffic: boolean;
  freecam: boolean;
  freezeTimer: boolean;
}

export const DEFAULT_CHEATS: CheatFlags = {
  autoDrive: false,
  autoDriveProfile: 'pro',
  driveLine: false,
  driveLineStyle: 'speed',
  driveLineIntensity: 2,
  gripMul: 1.0,
  noSpin: false,
  ghostMode: false,
  infiniteBoost: false,
  slowmo: 1.0,
  bpmOverride: null,
  scoreMul: 1,
  unlockAll: false,
  weather: 'clear',
  traffic: false,
  freecam: false,
  freezeTimer: false,
};

const KEY = 'edl_cheats_v1';

export const cheats: CheatFlags = { ...DEFAULT_CHEATS };

type Listener = (msg: string) => void;
const listeners: Listener[] = [];
export function onCheatChange(cb: Listener) { listeners.push(cb); }
function notify(msg: string) { for (const cb of listeners) cb(msg); }

export function resolveCheatConflicts(f: CheatFlags): CheatFlags {
  f.gripMul = Math.min(3.0, Math.max(0.5, f.gripMul));
  f.slowmo = Math.min(2.0, Math.max(0.1, f.slowmo));
  f.scoreMul = Math.min(100, Math.max(1, f.scoreMul));
  f.driveLineIntensity = Math.min(3, Math.max(0, Math.round(f.driveLineIntensity)));
  if (f.bpmOverride !== null) f.bpmOverride = Math.min(190, Math.max(120, f.bpmOverride));
  if (!['chill', 'normal', 'pro'].includes(f.autoDriveProfile)) f.autoDriveProfile = 'pro';
  if (!['speed', 'apex', 'gear', 'ghost'].includes(f.driveLineStyle)) f.driveLineStyle = 'speed';
  if (f.weather !== 'clear' && f.weather !== 'rain') f.weather = 'clear';
  if (f.driveLineIntensity === 0) f.driveLine = false;
  return f;
}

export async function loadCheats(): Promise<void> {
  try {
    let raw: string | null = null;
    if (Capacitor.isNativePlatform()) {
      try { raw = (await Preferences.get({ key: KEY })).value; } catch { /* browser fallback */ }
    }
    if (!raw) { try { raw = localStorage.getItem(KEY); } catch { /* unavailable */ } }
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CheatFlags>;
      Object.assign(cheats, { ...DEFAULT_CHEATS, ...parsed });
      resolveCheatConflicts(cheats);
      if (Capacitor.isNativePlatform()) await Preferences.set({ key: KEY, value: JSON.stringify(cheats) }).catch(() => undefined);
    }
  } catch { /* ignore corrupt values */ }
}

export async function persistCheats(): Promise<void> {
  const value = JSON.stringify(cheats);
  try { localStorage.setItem(KEY, value); } catch { /* ignore */ }
  if (Capacitor.isNativePlatform()) { try { await Preferences.set({ key: KEY, value }); } catch { /* localStorage fallback remains */ } }
}

export function setCheatFlag<K extends keyof CheatFlags>(key: K, value: CheatFlags[K], source = 'ui') {
  (cheats as unknown as Record<string, unknown>)[key] = value;
  resolveCheatConflicts(cheats);
  persistCheats();
  notify(`${String(key)} = ${JSON.stringify(value)} [${source}]`);
}

export function resetCheats() {
  Object.assign(cheats, { ...DEFAULT_CHEATS });
  persistCheats();
  notify('ALL CHEATS RESET');
}

// A race using any cheat except driveLine is "dirty": no leaderboard, no ghost, CHEAT label.
export function isDirtyRace(): boolean {
  return (
    cheats.autoDrive ||
    cheats.gripMul !== 1 ||
    cheats.noSpin ||
    cheats.ghostMode ||
    cheats.infiniteBoost ||
    cheats.slowmo !== 1 ||
    cheats.scoreMul !== 1 ||
    cheats.traffic ||
    cheats.freezeTimer ||
    cheats.weather === 'rain'
  );
}

export function describeCheats(): string {
  const on: string[] = [];
  if (cheats.autoDrive) on.push(`AUTO DRIVE ${cheats.autoDriveProfile.toUpperCase()}`);
  if (cheats.driveLine) on.push(`DRIVE LINE ${cheats.driveLineStyle} ${cheats.driveLineIntensity}`);
  if (cheats.gripMul !== 1) on.push(`GRIP x${cheats.gripMul.toFixed(2)}`);
  if (cheats.noSpin) on.push('NO SPIN');
  if (cheats.ghostMode) on.push('GHOST');
  if (cheats.infiniteBoost) on.push('BOOST');
  if (cheats.slowmo !== 1) on.push(`SLOWMO x${cheats.slowmo}`);
  if (cheats.bpmOverride) on.push(`BPM ${cheats.bpmOverride}`);
  if (cheats.scoreMul !== 1) on.push(`SCORE x${cheats.scoreMul}`);
  if (cheats.unlockAll) on.push('UNLOCK ALL');
  if (cheats.weather === 'rain') on.push('RAIN');
  if (cheats.traffic) on.push('TRAFFIC');
  if (cheats.freecam) on.push('FREECAM');
  if (cheats.freezeTimer) on.push('FREEZE TIMER');
  return on.length ? on.join(' · ') : 'NO CHEATS';
}
