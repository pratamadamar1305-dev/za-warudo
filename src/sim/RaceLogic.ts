/**
 * RaceLogic.ts — checkpoint, posisi, timer, rival, gap, finish (§7, §9).
 *
 * Semua pengecekan lewat spline (bukan raycast mesh), jadi murah & deterministik.
 */

import { AI, RACE, type CarSpec, type RivalProfile } from "./Tuning";
import type { TrackSpline } from "./TrackSpline";
import { VehiclePhysics } from "./VehiclePhysics";
import { AIOpponent } from "./AIOpponent";

export type RaceMode = "timeattack" | "downhill" | "uphill" | "tofu";

export interface RacerEntry {
  name: string;
  carId: string;
  isPlayer: boolean;
  progress: number;
  finishTime: number | null;
  finished: boolean;
  color: number;
  car: VehiclePhysics;
  ai: AIOpponent | null;
  gapToPlayer: number;
}

export interface RaceConfig {
  mode: RaceMode;
  playerSpec: CarSpec;
  playerName: string;
  rivals: readonly RivalProfile[];
  seed: number;
  /** Tingkat kesulitan untuk rubber-band (0.9..1.1). */
  difficulty: number;
}

export interface RaceResult {
  mode: RaceMode;
  timeMs: number;
  position: number;
  totalRacers: number;
  driftPoints: number;
  bestDrift: number;
  topSpeedKmh: number;
  gapText: string;
  won: boolean;
  entries: RacerEntry[];
}

const TOFU_CUPS = 3;

export class RaceLogic {
  readonly track: TrackSpline;
  readonly config: RaceConfig;
  readonly racers: RacerEntry[] = [];
  readonly player: VehiclePhysics;
  time = 0;
  started = false;
  finished = false;
  result: RaceResult | null = null;
  /** 0..1 — intensitas drift untuk musik & efek. */
  driftIntensity = 0;
  readonly racingLine: Float32Array;
  private finishS: number;
  private countdown = RACE.COUNTDOWN_SEC;
  /** Mode tofu: level "tumpah". */
  tofuSpill = 0;
  tofuCupsRemaining = TOFU_CUPS;
  private lastLateralSign = 0;
  private lateralAccum = 0;

  constructor(track: TrackSpline, config: RaceConfig) {
    this.track = track;
    this.config = config;
    this.racingLine = track.buildRacingLine(AI.LINE_OFFSET);
    this.finishS = track.length - 8;

    // Pemain mulai 12 m di belakang garis start pada downhill (start berjarak)
    const playerStartS = config.mode === "uphill" ? 16 : 12;
    const pp = track.pointAtOffset(playerStartS, 0);
    this.player = new VehiclePhysics(config.playerSpec, pp.x, pp.z, pp.heading);
    this.player.setSafePose(pp.x, pp.z, pp.heading);
    this.player.state.trackS = playerStartS;

    this.racers.push({
      name: config.playerName,
      carId: config.playerSpec.id,
      isPlayer: true,
      progress: playerStartS,
      finishTime: null,
      finished: false,
      color: config.playerSpec.color,
      car: this.player,
      ai: null,
      gapToPlayer: 0,
    });

    const count = config.mode === "timeattack" || config.mode === "tofu" ? 0 : 1;
    for (let i = 0; i < Math.min(count, config.rivals.length); i++) {
      const profile = config.rivals[i]!;
      const spec = carSpecForRival(profile, config);
      const startS = Math.min(track.length - 60, playerStartS + 14 + i * 6);
      const lateral = i % 2 === 0 ? -2.2 : 2.2;
      const ai = new AIOpponent(
        profile,
        spec,
        track,
        this.racingLine,
        startS,
        lateral,
        config.seed + i * 977,
      );
      ai.state.skill = profile.skill * config.difficulty;
      this.racers.push({
        name: profile.name,
        carId: spec.id,
        isPlayer: false,
        progress: startS,
        finishTime: null,
        finished: false,
        color: spec.color,
        car: ai.state.car,
        ai,
        gapToPlayer: 0,
      });
    }
  }

  get countdownValue(): number {
    return Math.max(0, Math.ceil(this.countdown));
  }

  get countdownDone(): boolean {
    return this.countdown <= 0;
  }

  get raceTimeSec(): number {
    return this.time;
  }

  /** Jumlah racers sudah finish. */
  get finishedCount(): number {
    return this.racers.filter((r) => r.finished).length;
  }

  get playerEntry(): RacerEntry {
    return this.racers.find((r) => r.isPlayer)!;
  }

  get rivalEntry(): RacerEntry | null {
    return this.racers.find((r) => !r.isPlayer) ?? null;
  }

  get playerPosition(): number {
    const sorted = this.sortedRacers();
    const idx = sorted.findIndex((r) => r.isPlayer);
    return idx < 0 ? 1 : idx + 1;
  }

  sortedRacers(): RacerEntry[] {
    return [...this.racers].sort((a, b) => {
      if (a.finished && b.finished) return (a.finishTime ?? 0) - (b.finishTime ?? 0);
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.progress - a.progress;
    });
  }

  /** Dipanggil dari fixed step. dt = 1/120. */
  step(dt: number, input: { throttle: number; brake: number; steer: number; handbrake: boolean }): void {
    if (this.finished) return;

    if (this.countdown > 0) {
      this.countdown -= dt;
      // fisika tetap jalan (mobil diam) agar rpm/audio hidup
      this.player.step(dt, { throttle: 0, brake: 1, steer: 0, handbrake: true });
      this.applyTrack(this.player);
      return;
    }
    this.started = true;
    this.time += dt;

    /* ---------- pemain ---------- */
    this.player.slope = this.slopeAt(this.player.state.trackS);
    this.player.step(dt, input);
    this.applyTrack(this.player);
    if (this.player.state.hitWall) this.player.state.hitStrength = this.player.state.hitStrength;



    /* ---------- AI ---------- */
    const playerEntry = this.playerEntry;
    playerEntry.progress = this.player.state.trackS;
    for (const r of this.racers) {
      if (r.isPlayer || !r.ai) continue;
      r.ai.applyRubberBand(playerEntry.progress, this.time, this.time);
      r.ai.step(dt);
      r.progress = r.ai.state.car.state.trackS;
      r.gapToPlayer = r.progress - this.player.state.trackS;
      if (r.ai.state.car.state.hitWall && Math.random() < 0.05) {
        // nothing — AI tidak memicu dialog di sini (dikelola UI)
      }
    }

    /* ---------- tofu tilt ---------- */
    if (this.config.mode === "tofu") {
      this.updateTofu(dt);
    }

    /* ---------- finish ---------- */
    for (const r of this.racers) {
      if (r.finished) continue;
      if (r.progress >= this.finishS) {
        r.finished = true;
        r.finishTime = this.time;
      }
    }

    if (this.playerEntry.finished) {
      this.finished = true;
      this.result = this.buildResult();
    }
  }

  private updateTofu(dt: number): void {
    const lat = this.player.state.lateral;
    if (Math.sign(lat) !== this.lastLateralSign && Math.abs(lat) > 0.4) {
      this.lateralAccum += Math.abs(lat);
      this.lastLateralSign = Math.sign(lat);
    }
    const tilt = Math.abs(this.player.state.vLat) * 0.5 + Math.abs(this.player.state.yawRate) * 4;
    if (tilt > 4.2 || this.player.state.hitStrength > 0.6) {
      this.tofuSpill = Math.min(1, this.tofuSpill + dt * 0.9);
      if (this.tofuSpill >= 1) this.tofuCupsRemaining = Math.max(0, this.tofuCupsRemaining - 1);
    } else {
      this.tofuSpill = Math.max(0, this.tofuSpill - dt * 0.5);
    }
  }

  private applyTrack(car: VehiclePhysics): void {
    const proj = this.track.project(car.state.x, car.state.z, car.state.trackIndex);
    const sample = this.track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    car.resolveBarrier(this.track, sample.halfWidth, sample.gutter);
  }

  /** Kemiringan jalan (rad, positif menanjak) dari grade spline. */
  slopeAt(s: number): number {
    const p = this.track.sampleAt(s);
    return -Math.atan(p.grade);
  }

  /** Gap waktu (detik) antara pemain dan rival. + = pemain unggul. */
  gapSeconds(): number {
    const rival = this.rivalEntry;
    if (!rival) return 0;
    const diff = this.player.state.trackS - rival.progress;
    // kecepatan referensi: rata-rata keduanya, minimal 20 m/s
    const v = Math.max(20, (this.player.state.speed + rival.car.state.speed) * 0.5);
    return diff / v;
  }

  /** Gap meter untuk aturan "kuncup" 60 m. */
  gapMeters(): number {
    const rival = this.rivalEntry;
    if (!rival) return 0;
    return this.player.state.trackS - rival.progress;
  }

  /** Cek kemenangan aturan gap 60 m. */
  isGapWin(): boolean {
    return this.gapMeters() > AI.WIN_GAP_M;
  }

  private buildResult(): RaceResult {
    const sorted = this.sortedRacers();
    const pos = sorted.findIndex((r) => r.isPlayer) + 1;
    const won = pos === 1;
    const mm = Math.floor(this.time / 60);
    const ss = (this.time % 60).toFixed(3).padStart(6, "0");
    return {
      mode: this.config.mode,
      timeMs: Math.round(this.time * 1000),
      position: pos,
      totalRacers: this.racers.length,
      driftPoints: 0,
      bestDrift: 0,
      topSpeedKmh: Math.round(this.player.telemetry.topSpeedKmh),
      gapText: `${mm}:${ss}`,
      won,
      entries: sorted,
    };
  }
}

function carSpecForRival(profile: RivalProfile, config: RaceConfig): CarSpec {
  // Rival memakai mobil mereka sendiri bila punya, fallback ke rival pertama.
  for (const spec of rivalSpecs) {
    if (spec.id === profile.carId) return spec;
  }
  void config;
  return rivalSpecs[0]!;
}

/** Diisi oleh main.ts saat bootstrap untuk menghindari import sirkular. */
export let rivalSpecs: readonly CarSpec[] = [];
export function registerRivalSpecs(specs: readonly CarSpec[]): void {
  rivalSpecs = specs;
}
