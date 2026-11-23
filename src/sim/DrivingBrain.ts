// DrivingBrain.ts
// THE single driving logic for AI rivals AND Auto Drive (spec §7 prerequisite).
// Pure pursuit + racing line + explicit drift state machine. No three.js / audio / DOM.

import { TrackSpline } from './TrackSpline';

export interface DrivingIntent {
  steer: number; // -1..1
  throttle: number; // 0..1
  brake: number; // 0..1
  handbrake: number; // 0..1
  targetGear?: number;
}

export interface DrivingProfile {
  skill: number;
  aggression: number;
  lineOffsetMax: number; // m, lateral racing-line amplitude
  driftAffinity: number; // 0 = never drift
  brakeMargin: number; // fraction above vTarget before braking
  lookaheadGain: number;
  gripAwareness: number;
}

export interface BrainCarState {
  x: number; y: number; z: number; heading: number;
  vx: number; vz: number; speedMs: number;
  slipAngle: number; // signed beta, radians
  yawRate: number; // rad/s, + = turning right
  gear: number; rpm: number;
  s: number; lateral: number;
}

export const PROFILES: Record<string, DrivingProfile> = {
  chill: { skill: 0.78, aggression: 0.3, lineOffsetMax: 0.5, driftAffinity: 0, brakeMargin: 0.25, lookaheadGain: 0.9, gripAwareness: 0.8 },
  normal: { skill: 0.9, aggression: 0.6, lineOffsetMax: 3.2, driftAffinity: 0.7, brakeMargin: 0.08, lookaheadGain: 1.0, gripAwareness: 0.95 },
  pro: { skill: 1.0, aggression: 0.9, lineOffsetMax: 3.2, driftAffinity: 1.0, brakeMargin: 0.005, lookaheadGain: 1.15, gripAwareness: 1.0 },
  ryo: { skill: 0.97, aggression: 0.9, lineOffsetMax: 3.2, driftAffinity: 0.8, brakeMargin: 0.02, lookaheadGain: 1.05, gripAwareness: 0.97 },
  kenji: { skill: 0.9, aggression: 0.5, lineOffsetMax: 2.0, driftAffinity: 0.5, brakeMargin: 0.1, lookaheadGain: 0.95, gripAwareness: 0.9 },
  ayu: { skill: 0.94, aggression: 0.6, lineOffsetMax: 3.2, driftAffinity: 0.3, brakeMargin: 0.05, lookaheadGain: 1.0, gripAwareness: 0.98 },
  legend: { skill: 0.98, aggression: 0.85, lineOffsetMax: 3.2, driftAffinity: 0.9, brakeMargin: 0.01, lookaheadGain: 1.1, gripAwareness: 1.0 },
  hard: { skill: 0.93, aggression: 0.7, lineOffsetMax: 3.0, driftAffinity: 0.6, brakeMargin: 0.04, lookaheadGain: 1.05, gripAwareness: 0.97 },
};

type DriftPhase = 'approach' | 'turnin' | 'hold' | 'exit';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export class DrivingBrain {
  private driftPhase: DriftPhase = 'approach';
  private hbTimer = 0;
  private holdThrottle = 1;
  private avoidOffset = 0;

  constructor(private spline: TrackSpline, public profile: DrivingProfile) {}

  setProfile(p: DrivingProfile) { this.profile = p; }

  update(car: BrainCarState, dt: number, others: BrainCarState[], mu: number): DrivingIntent {
    const p = this.profile;
    const look = Math.max(10, car.speedMs * 0.7) * p.lookaheadGain;

    // --- target speed from worst curvature inside braking distance
    const decel = Math.max(2, mu * 9.81 * 0.85 * p.gripAwareness);
    const brakeDist = (car.speedMs * car.speedMs) / (2 * decel) + 12;
    let maxK = 0;
    for (let s = car.s; s < car.s + brakeDist + look; s += 5) {
      const k = Math.abs(this.spline.curvatureAt(s));
      if (k > maxK) maxK = k;
    }
    let vTarget = 999;
    if (maxK > 0.001) vTarget = Math.sqrt((mu * 9.81) / maxK) * p.skill;

    // --- racing line target point (pure pursuit)
    const linePt = this.spline.racingLinePoint(car.s + look);
    const lineScale = p.lineOffsetMax / 3.2;
    const smp = this.spline.sampleAt(car.s + look);
    let tx = smp.x + smp.rx * smp.racingOffset * lineScale;
    let tz = smp.z + smp.rz * smp.racingOffset * lineScale;
    // --- overtake avoidance: shift off the line if a car is directly ahead
    let avoid = 0;
    for (const o of others) {
      const ds = o.s - car.s;
      if (ds > 0 && ds < 18 && Math.abs(o.lateral - car.lateral) < 2.2 && o.speedMs < car.speedMs + 2) {
        avoid = (car.lateral <= o.lateral ? -1 : 1) * 1.8;
      }
    }
    if (avoid !== 0) { tx += smp.rx * avoid; tz += smp.rz * avoid; }

    // --- pure pursuit steering
    const fx = Math.sin(car.heading), fz = -Math.cos(car.heading);
    const dx = tx - car.x, dz = tz - car.z;
    const dl = Math.hypot(dx, dz) || 1;
    const ndx = dx / dl, ndz = dz / dl;
    const cross = fx * ndz - fz * ndx;
    const dot = fx * ndx + fz * ndz;
    const angle = Math.atan2(cross, dot);
    // PD steering: proportional on target angle, damped by yaw rate (kills high-speed weave)
    let steer = clamp(angle * 1.7 - car.yawRate * 0.22, -1, 1);

    // --- drift state machine (normal & pro; chill has driftAffinity 0)
    let throttle = 1, brake = 0, handbrake = 0;
    let targetGear: number | undefined;
    const corner = this.spline.cornerAhead(car.s, car.s + brakeDist + 40);
    const slipDeg = Math.abs(car.slipAngle) * (180 / Math.PI);
    const wantsDrift = corner !== null && corner.radius < 26 && p.driftAffinity > 0;

    switch (this.driftPhase) {
      case 'approach':
        if (corner && wantsDrift && car.speedMs > vTarget * 0.85 && corner.sApex - car.s < 40) {
          this.driftPhase = 'turnin';
        }
        break;
      case 'turnin':
        if (!corner) { this.driftPhase = 'approach'; break; }
        if (corner.sApex - car.s < 7) {
          handbrake = 1; this.hbTimer = 0.18;
          if (car.gear > 1) targetGear = car.gear - 1;
          this.driftPhase = 'hold'; this.holdThrottle = 1;
        } else if (!wantsDrift) this.driftPhase = 'approach';
        break;
      case 'hold':
        if (!corner) { this.driftPhase = 'approach'; break; }
        this.hbTimer -= dt;
        if (this.hbTimer > 0) handbrake = 1;
        if (slipDeg > 42) this.holdThrottle = Math.max(0.3, this.holdThrottle - 0.4 * dt * 10);
        else if (slipDeg < 22) this.holdThrottle = Math.min(1, this.holdThrottle + 0.25 * dt * 10);
        throttle = this.holdThrottle;
        // countersteer proportional (P-gain 0.9), blended with pursuit
        const counter = clamp(-car.slipAngle * 1.6, -1, 1);
        steer = steer * 0.3 + counter * 0.7;
        if ((car.s > corner.sApex + 5 && slipDeg < 12) || slipDeg > 55) this.driftPhase = 'exit';
        break;
      case 'exit':
        throttle = 1;
        if (Math.abs(car.slipAngle) < 0.1) this.driftPhase = 'approach';
        break;
    }

    // --- normal throttle / brake control (skipped while holding a drift)
    if (this.driftPhase !== 'hold') {
      if (car.speedMs > vTarget * (1 + p.brakeMargin)) {
        brake = clamp((car.speedMs - vTarget) / 8, 0, 1);
        throttle = 0;
      } else {
        throttle = clamp((vTarget - car.speedMs) / 6 + 0.4, 0, 1);
      }
    }
    if (p.driftAffinity === 0) throttle = Math.min(throttle, 0.6); // chill cap

    return { steer, throttle, brake, handbrake, targetGear };
  }
}
