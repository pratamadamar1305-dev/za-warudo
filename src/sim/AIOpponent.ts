/**
 * AIOpponent.ts — rival dengan pure pursuit + racing line + rubber-band (§7).
 *
 * AI TIDAK memakai Math.random di dalam step (deterministik per seed).
 * Tidak pernah teleport. Selalu memakai VehiclePhysics yang sama dengan pemain.
 */

import { AI, PHYSICS, type CarSpec, type RivalProfile } from "./Tuning";
import type { TrackSpline } from "./TrackSpline";
import { VehiclePhysics, clamp, type VehicleInput } from "./VehiclePhysics";
import { SeededRng } from "../core/Save";

export interface AIState {
  name: string;
  carId: string;
  car: VehiclePhysics;
  profile: RivalProfile;
  /** Skill efektif setelah rubber-band. */
  skill: number;
  /** Sisa jarak (race progress). */
  progress: number;
  finished: boolean;
  finishTime: number;
  lineOffset: number;
  lastLineIdx: number;
  /** Cooldown dialog. */
  dialogueCooldown: number;
  /** Gutter usage counter. */
  gutterTimer: number;
}

export class AIOpponent {
  readonly state: AIState;
  private track: TrackSpline;
  private line: Float32Array;
  private rng: SeededRng;
  private skillBase: number;
  private messageQueue: { text: string; at: number }[] = [];
  /** Jarak tempuh untuk sorting. */
  totalProgress = 0;

  constructor(
    profile: RivalProfile,
    spec: CarSpec,
    track: TrackSpline,
    line: Float32Array,
    startS: number,
    lateral: number,
    seed: number,
  ) {
    this.track = track;
    this.line = line;
    this.rng = new SeededRng(seed);
    this.skillBase = profile.skill;
    const p = track.pointAtOffset(startS, lateral);
    this.state = {
      name: profile.name,
      carId: profile.carId,
      car: new VehiclePhysics(spec, p.x, p.z, p.heading),
      profile,
      skill: profile.skill,
      progress: startS,
      finished: false,
      finishTime: 0,
      lineOffset: profile.gutterLove > 0.6 ? 0.5 : 0,
      lastLineIdx: 0,
      dialogueCooldown: 0,
      gutterTimer: 0,
    };
    this.state.car.setSafePose(p.x, p.z, p.heading);
    this.totalProgress = startS;
  }

  reset(startS: number, lateral: number): void {
    const p = this.track.pointAtOffset(startS, lateral);
    this.state.car.reset(p.x, p.z, p.heading, 0);
    this.state.car.setSafePose(p.x, p.z, p.heading);
    this.state.finished = false;
    this.state.finishTime = 0;
    this.state.progress = startS;
    this.state.dialogueCooldown = 0;
    this.totalProgress = startS;
  }

  /** Rubber-band: sesuaikan skill berdasarkan selisih waktu. */
  applyRubberBand(playerProgress: number, playerTime: number, _aiTime: number): void {
    const gapMeters = playerProgress - this.state.progress;
    // konversi kasar: 30 m/s → 1 m ≈ 0.033 s
    const gapSeconds = gapMeters / 30;
    let skill = this.skillBase;
    if (gapSeconds > AI.RUBBERBAND_BEHIND_S) {
      skill -= AI.RUBBERBAND_SKILL_DOWN;
    } else if (gapSeconds < -AI.RUBBERBAND_AHEAD_S) {
      skill += AI.RUBBERBAND_SKILL_UP;
    }
    // clamp supaya tidak curang
    this.state.skill = clamp(skill, 0.7, 1.02);
    void playerTime;
  }

  step(dt: number): VehicleInput {
    const st = this.state;
    const car = st.car;
    const track = this.track;

    const proj = track.project(car.state.x, car.state.z, car.state.trackIndex);
    car.state.trackS = proj.s;
    const sample = track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    car.resolveBarrier(track, sample.halfWidth, sample.gutter);

    // pure pursuit
    const look = Math.max(AI.LOOKAHEAD_MIN, car.state.speed * AI.LOOKAHEAD_PER_SPEED);
    const targetS = proj.s + look;
    const idx = this.lineIndex(targetS);
    st.lastLineIdx = idx;
    const lateral = (this.line[idx] ?? 0) + this.personalOffset(targetS);
    const target = track.pointAtOffset(targetS, lateral);
    const desiredHeading = Math.atan2(target.z - car.state.z, target.x - car.state.x);
    let err = desiredHeading - car.state.heading;
    while (err > Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;

    const steer = clamp(err * 2.3, -1, 1);

    // target speed dari curvature + grade
    const lookCurv = track.sampleAt(proj.s + Math.max(8, car.state.speed * 0.5)).curvature;
    const mu = PHYSICS.TIRE_PEAK_MU * car.spec.gripScale;
    const vTarget = Math.sqrt((mu * PHYSICS.GRAVITY) / Math.max(0.0016, Math.abs(lookCurv))) * st.skill;
    const vNow = car.state.speed;
    const throttle = vNow < vTarget * 0.97 ? 0.95 : vNow < vTarget * 1.04 ? 0.35 : 0;
    const brake = vNow > vTarget * 1.06 ? clamp((vNow - vTarget) / 6, 0.1, 0.8) : 0;

    // drifting kalau tikungan tajam + skill tinggi
    const wantDrift = Math.abs(lookCurv) > 0.035 && st.skill > 0.88 && this.rng.next() > 0.94;
    const handbrake = wantDrift && Math.abs(steer) > 0.5 && car.state.speed > 10 && st.gutterTimer <= 0;

    const input: VehicleInput = { throttle, brake, steer, handbrake, isAI: true };
    car.step(dt, input);

    st.progress = proj.s;
    this.totalProgress = proj.s;

    if (st.dialogueCooldown > 0) st.dialogueCooldown -= dt;
    if (st.gutterTimer > 0) st.gutterTimer -= dt;
    if (car.state.inGutter) st.gutterTimer = 0.8;
    return input;
  }

  private lineIndex(s: number): number {
    const n = this.line.length;
    const wrapped = Math.max(0, Math.min(this.track.length, s));
    return Math.max(0, Math.min(n - 1, Math.round((wrapped / this.track.length) * (n - 1))));
  }

  /** Offset pribadi per karakter (gutter lover masuk lebih dalam). */
  private personalOffset(s: number): number {
    const idx = this.lineIndex(s);
    const base = this.line[idx] ?? 0;
    const love = this.state.profile.gutterLove;
    if (love <= 0) return 0;
    const sample = this.track.sampleAt(s);
    if (sample.gutter <= 0) return 0;
    // masuk ke sisi gutter dalam
    return Math.sign(base || 1) * love * (sample.halfWidth * 0.32);
  }

  /** Ambil baris dialog (dengan cooldown supaya tidak spam). */
  say(kind: "intro" | "overtaken" | "overtaking" | "winning" | "losing" | "finishWin" | "finishLose"): string | null {
    const st = this.state;
    if (st.dialogueCooldown > 0) return null;
    const lines = st.profile.lines[kind];
    if (!lines || lines.length === 0) return null;
    st.dialogueCooldown = 9;
    return this.rng.pick(lines);
  }

  drainMessages(): string[] {
    const out = this.messageQueue.map((m) => m.text);
    this.messageQueue.length = 0;
    return out;
  }
}
