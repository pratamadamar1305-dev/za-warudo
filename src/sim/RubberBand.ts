/**
 * RubberBand.ts — kurva bantuan ketat tapi tidak curang (§7).
 *
 * Dipisah dari AIOpponent supaya mudah di-tune dan diuji.
 */

export interface RubberBandConfig {
  /** Selisih waktu (detik) sebelum bantuan mulai. */
  behindThreshold: number;
  aheadThreshold: number;
  /** Besar bantuan (dalam pengali skill). */
  skillDown: number;
  skillUp: number;
  /** Batas keras. */
  minSkill: number;
  maxSkill: number;
}

export const DEFAULT_BAND: RubberBandConfig = {
  behindThreshold: 6,
  aheadThreshold: 8,
  skillDown: 0.04,
  skillUp: 0.03,
  minSkill: 0.7,
  maxSkill: 1.02,
};

/**
 * Hitung skill efektif.
 * @param baseSkill skill dasar karakter
 * @param playerBehindSeconds positif = pemain tertinggal
 */
export function applyBand(baseSkill: number, playerBehindSeconds: number, cfg = DEFAULT_BAND): number {
  let skill = baseSkill;
  if (playerBehindSeconds > cfg.behindThreshold) skill -= cfg.skillDown;
  else if (playerBehindSeconds < -cfg.aheadThreshold) skill += cfg.skillUp;
  return Math.max(cfg.minSkill, Math.min(cfg.maxSkill, skill));
}

/** Skala target kecepatan (0.97..1.03) — dipakai AI saat memilih vTarget. */
export function speedScale(playerBehindSeconds: number, cfg = DEFAULT_BAND): number {
  if (playerBehindSeconds > cfg.behindThreshold) return 0.97;
  if (playerBehindSeconds < -cfg.aheadThreshold) return 1.03;
  return 1;
}
