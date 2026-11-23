// VehiclePhysics.ts
// Semi-empirical arcade drift model: bicycle model + Pacejka-lite tire curve +
// weight transfer + handbrake yaw injection. Pure math (no three.js / DOM).

import type { DrivingIntent } from './DrivingBrain';
import { TrackSpline, WALL_LATERAL } from './TrackSpline';

// ---------- tuning constants (see "Cara tuning feel") ----------
export const MU_DRY = 1.05;
export const MU_WET = 0.78;
export const MU_GUTTER = 1.35;
export const PACEJKA_B = 9;
export const PACEJKA_C = 1.4;
export const HANDBRAKE_YAW = 2.4; // rad/s yaw injection rate
export const HANDBRAKE_YAW_TIME = 0.25; // s
export const COUNTERSTEER_DAMP = 1600; // Nm*s/rad
export const DRAG_K = 0.62; // quadratic drag N/(m/s)^2
export const DRAG_LIN = 18; // linear drag N/(m/s)
export const POWER_SCALE = 1.15; // calibrated drivetrain output; low-speed launch shaping is separate
export const WHEEL_R = 0.31;
const G = 9.81;
const MAX_SPEED = 90; // m/s anti-tunnel clamp
const MAX_YAW = 6; // rad/s anti-tunnel clamp

export interface CarParams {
  id: string; name: string; brand: string; drive: string;
  mass: number; wheelbase: number; trackWidth: number; cgHeight: number; yawInertia: number;
  gears: number[]; finalDrive: number; redline: number; powerHp: number; torqueNm: number;
  maxSteerDeg: number; grip: number; color: number; price: number; unlockWins: number;
  desc: string;
}

export const CARS: CarParams[] = [
  {
    id: 'hachi86', name: 'TOFU RUNNER', brand: 'GUNMA', drive: 'RWD',
    mass: 940, wheelbase: 2.4, trackWidth: 1.35, cgHeight: 0.52, yawInertia: 1250,
    gears: [3.58, 2.02, 1.38, 1.0, 0.79], finalDrive: 4.3, redline: 7800,
    powerHp: 130, torqueNm: 149, maxSteerDeg: 34, grip: 1.0,
    color: 0xd42a2a, price: 0, unlockWins: 0,
    desc: 'RWD ringan 940 kg · 1.6L NA · LSD 60% · papan tofu di pintu',
  },
  {
    id: 'fd7', name: 'FD-7 SAVANNA', brand: 'SAVANNA', drive: 'AWD',
    mass: 1180, wheelbase: 2.6, trackWidth: 1.45, cgHeight: 0.55, yawInertia: 1650,
    gears: [3.4, 2.1, 1.5, 1.1, 0.85], finalDrive: 4.1, redline: 8000,
    powerHp: 180, torqueNm: 210, maxSteerDeg: 32, grip: 1.08,
    color: 0x2a6fd4, price: 45000, unlockWins: 1,
    desc: 'AWD bertenaga · stabil di tikungan cepat · favorit Ryo',
  },
  {
    id: 'ek9', name: 'EK-9 TYPE-R', brand: 'TYPE-R', drive: 'FWD',
    mass: 1080, wheelbase: 2.5, trackWidth: 1.42, cgHeight: 0.54, yawInertia: 1450,
    gears: [3.2, 2.0, 1.4, 1.05, 0.82], finalDrive: 4.4, redline: 8500,
    powerHp: 160, torqueNm: 170, maxSteerDeg: 36, grip: 1.05,
    color: 0xf2f2f2, price: 60000, unlockWins: 2,
    desc: 'FWD presisi · grip tinggi · kuat di bagian cepat · favorit Ayu',
  },
  {
    id: 's13', name: 'NISSAN-KAI S13', brand: 'KAI', drive: 'RWD',
    mass: 1250, wheelbase: 2.5, trackWidth: 1.4, cgHeight: 0.53, yawInertia: 1600,
    gears: [3.5, 2.1, 1.45, 1.05, 0.8], finalDrive: 4.2, redline: 7600,
    powerHp: 170, torqueNm: 230, maxSteerDeg: 33, grip: 1.02,
    color: 0x8a2be2, price: 80000, unlockWins: 3,
    desc: 'RWD torsi besar · drift liar · favorit Kenji',
  },
];

export function carById(id: string): CarParams { return CARS.find((c) => c.id === id) ?? CARS[0]; }

export interface VehicleState {
  x: number; y: number; z: number; heading: number;
  vx: number; vz: number; yawRate: number;
  steerAngle: number; throttle: number; brake: number; handbrake: number;
  gear: number; rpm: number;
  slipF: number; slipR: number; beta: number; // radians
  speedMs: number; speedKmh: number;
  s: number; lateral: number;
  onGutter: boolean; gutterTokTimer: number; handbrakeTimer: number;
  lastSafe: { x: number; z: number; heading: number; vx: number; vz: number; s: number };
  safeTimer: number; recoverTimer: number;
}

export interface PhysicsEnv {
  mu: number;
  gripMul: number;
  noSpin: boolean;
  ghostMode: boolean;
  infiniteBoost: boolean;
  assists: { steer: boolean; brake: boolean; recover: boolean; drift: boolean };
  upgrades: { tires: number; suspension: number; lsd: number; engine: number };
  tuningPreset: string; // 'grip' | 'drift' | 'balanced'
  paceTorqueMul: number; // PRO Unbeatable Guarantee torque bonus
}

export interface PhysicsEvents {
  hitWall: boolean; hitIntensity: number;
  gutterTok: boolean; gutterEntered: boolean; gutterExited: boolean;
  shifted: boolean; shiftUp: boolean; limiter: boolean;
  nanRecovered: boolean; autoRecovered: boolean;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export class VehiclePhysics {
  state: VehicleState;
  events: PhysicsEvents = { hitWall: false, hitIntensity: 0, gutterTok: false, gutterEntered: false, gutterExited: false, shifted: false, shiftUp: false, limiter: false, nanRecovered: false, autoRecovered: false };
  private lastAx = 0; private lastAy = 0;
  private wasGutter = false;

  constructor(public params: CarParams) {
    this.state = {
      x: 0, y: 0, z: 0, heading: 0, vx: 0, vz: 0, yawRate: 0,
      steerAngle: 0, throttle: 0, brake: 0, handbrake: 0,
      gear: 1, rpm: 900, slipF: 0, slipR: 0, beta: 0,
      speedMs: 0, speedKmh: 0, s: 0, lateral: 0,
      onGutter: false, gutterTokTimer: 0, handbrakeTimer: 0,
      lastSafe: { x: 0, z: 0, heading: 0, vx: 0, vz: 0, s: 0 },
      safeTimer: 0, recoverTimer: 0,
    };
  }

  reset(x: number, z: number, heading: number, spline: TrackSpline, speedMs = 0) {
    const st = this.state;
    st.x = x; st.z = z; st.heading = heading;
    const fx = Math.sin(heading), fz = -Math.cos(heading);
    st.vx = fx * speedMs; st.vz = fz * speedMs;
    st.yawRate = 0; st.gear = 1; st.rpm = 900;
    st.slipF = 0; st.slipR = 0; st.beta = 0;
    st.speedMs = speedMs; st.speedKmh = speedMs * 3.6;
    st.onGutter = false; st.handbrakeTimer = 0; st.recoverTimer = 0;
    const ctx = spline.nearest(x, z, 0);
    st.s = ctx.s; st.lateral = ctx.lateral; st.y = ctx.sample.y;
    st.lastSafe = { x, z, heading, vx: st.vx, vz: st.vz, s: ctx.s };
    st.safeTimer = 0; this.lastAx = 0; this.lastAy = 0; this.wasGutter = false;
  }

  step(intent: DrivingIntent, dt: number, spline: TrackSpline, env: PhysicsEnv) {
    const st = this.state, p = this.params;
    this.events = { hitWall: false, hitIntensity: 0, gutterTok: false, gutterEntered: false, gutterExited: false, shifted: false, shiftUp: false, limiter: false, nanRecovered: false, autoRecovered: false };

    const steerIn = clamp(intent.steer, -1, 1);
    const throttle = clamp(intent.throttle, 0, 1);
    const brake = clamp(intent.brake, 0, 1);
    const hb = clamp(intent.handbrake, 0, 1);
    st.throttle = throttle; st.brake = brake; st.handbrake = hb;

    let fx = Math.sin(st.heading), fz = -Math.cos(st.heading);
    let rx = Math.cos(st.heading), rz = Math.sin(st.heading);
    let vLong = st.vx * fx + st.vz * fz;
    let vLat = st.vx * rx + st.vz * rz;
    const speed = Math.hypot(vLong, vLat);
    st.speedMs = speed; st.speedKmh = speed * 3.6;

    // --- spline context
    const ctx = spline.nearest(st.x, st.z, st.s);
    st.s = ctx.s; st.lateral = ctx.lateral;
    const sample = ctx.sample;
    st.y = sample.y;

    // --- surface grip (mu), upgrades, tuning, gutter
    let mu = env.mu * p.grip * env.gripMul;
    mu *= 1 + 0.03 * env.upgrades.tires;
    if (env.tuningPreset === 'grip') mu *= 1.05;
    if (env.tuningPreset === 'drift') mu *= 0.94;
    const inGutterBand = sample.gutterSide !== 0 &&
      Math.sign(st.lateral) === sample.gutterSide &&
      Math.abs(st.lateral) >= sample.gutterInner && Math.abs(st.lateral) <= sample.gutterOuter;
    const attackOk = Math.abs(st.beta) < 0.26; // < ~15 deg attack angle
    st.onGutter = inGutterBand && attackOk && speed > 12.5;
    if (st.onGutter) {
      mu = Math.max(mu, MU_GUTTER * env.gripMul);
      st.gutterTokTimer -= dt;
      if (st.gutterTokTimer <= 0) { this.events.gutterTok = true; st.gutterTokTimer = 1 / 6; }
      if (!this.wasGutter) this.events.gutterEntered = true;
    } else if (this.wasGutter) {
      this.events.gutterExited = true;
      vLong *= 1.04; // gutter exit boost
    }
    this.wasGutter = st.onGutter;
    mu = Math.min(mu, 1.5); // global clamp — PRO envelope passes through here

    // --- steering (speed-sensitive, rate-limited)
    const steerMax = (p.maxSteerDeg * Math.PI) / 180 * (1 - clamp(speed / 220, 0, 0.62));
    const steerTarget = steerIn * steerMax;
    const maxSteerStep = 3.5 * dt; // rad/s rate limit — prevents instant large inputs
    let steerAngle = st.steerAngle + clamp(steerTarget - st.steerAngle, -maxSteerStep, maxSteerStep);
    if (env.assists.drift && Math.abs(st.slipR) > 0.44) { // rear slip > ~25 deg
      const target = clamp(st.beta * 0.85, -steerMax, steerMax);
      steerAngle = steerAngle * 0.35 + target * 0.65;
    }
    st.steerAngle = steerAngle;

    // --- axle slip angles
    const a = p.wheelbase * 0.55, b = p.wheelbase - a;
    const vLongSafe = Math.max(Math.abs(vLong), 1.2);
    const vLatF = vLat + st.yawRate * a;
    const vLatR = vLat - st.yawRate * b;
    const alphaF = Math.atan2(vLatF, vLongSafe) - steerAngle * Math.sign(vLong || 1);
    const alphaR = Math.atan2(vLatR, vLongSafe);
    st.slipF = alphaF; st.slipR = alphaR;
    st.beta = Math.atan2(vLat, vLongSafe);

    // --- weight transfer (clamped)
    const suspFactor = 1 - 0.06 * env.upgrades.suspension;
    const FzF0 = (p.mass * G * b) / p.wheelbase;
    const FzR0 = (p.mass * G * a) / p.wheelbase;
    const dFzLong = clamp((p.mass * this.lastAx * p.cgHeight) / p.wheelbase * suspFactor, -0.45 * FzF0, 0.45 * FzF0);
    const dFzLat = clamp((p.mass * this.lastAy * p.cgHeight) / p.trackWidth * suspFactor, -0.45 * FzF0, 0.45 * FzF0);
    const FzF = Math.max(FzF0 + dFzLong + dFzLat * 0.5, 200);
    const FzR = Math.max(FzR0 - dFzLong - dFzLat * 0.5, 200);

    // --- Pacejka-lite tire forces
    const rearGripCut = hb > 0.3 ? 0.7 : 1.0;
    const DF = mu * FzF, DR = mu * FzR * rearGripCut;
    const FyF = -DF * Math.sin(PACEJKA_C * Math.atan(PACEJKA_B * alphaF));
    const FyR = -DR * Math.sin(PACEJKA_C * Math.atan(PACEJKA_B * alphaR));

    // --- gearbox / rpm
    const ratio = p.gears[Math.min(st.gear, p.gears.length) - 1];
    let rpm = (Math.abs(vLong) / WHEEL_R) * ratio * p.finalDrive * (60 / (2 * Math.PI));
    if (Math.abs(vLong) < 1.5) rpm = 900 + throttle * 2200; // clutch slip at launch
    rpm = clamp(rpm, 900, 8200);
    if (intent.targetGear !== undefined && intent.targetGear >= 1 && intent.targetGear <= p.gears.length) {
      if (intent.targetGear !== st.gear) { st.gear = intent.targetGear; this.events.shifted = true; this.events.shiftUp = intent.targetGear > st.gear; }
    } else {
      if (rpm > p.redline * 0.93 && st.gear < p.gears.length) { st.gear++; this.events.shifted = true; this.events.shiftUp = true; }
      else if (rpm < 3600 && st.gear > 1 && Math.abs(vLong) > 4) { st.gear--; this.events.shifted = true; this.events.shiftUp = false; }
    }
    st.rpm = rpm;

    // --- engine force
    const x = clamp(rpm / p.redline, 0, 1);
    const tqCurve = 0.42 + 0.58 * Math.sin(Math.min(x, 1.05) * Math.PI * 0.8);
    const engMul = (1 + 0.06 * env.upgrades.engine) * env.paceTorqueMul * (env.infiniteBoost ? 1.5 : 1);
    // Progressive launch calibration: keep the 0–100 feel road-realistic without
    // throwing away high-speed horsepower / downhill top speed.
    const launchFactor = vLong < 27.78
      ? 0.15 + 0.45 * clamp(vLong / 27.78, 0, 1)
      : 0.60 + 0.40 * clamp((vLong - 27.78) / 16.67, 0, 1);
    let Fx = (throttle * p.torqueNm * tqCurve * engMul * ratio * p.finalDrive * POWER_SCALE * launchFactor) / WHEEL_R;
    const powerW = p.powerHp * 745.7 * engMul * POWER_SCALE;
    if (vLong > 1) Fx = Math.min(Fx, powerW / vLong);
    if (rpm >= 8150) { Fx *= 0.25; this.events.limiter = true; }

    // --- brake / reverse / handbrake decel
    const brakeForce = brake * mu * p.mass * G * 0.95;
    if (vLong > 0.3) Fx -= brakeForce;
    else if (brake > 0.3 && vLong > -8) Fx -= brake * 2600; // reverse gear
    if (hb > 0.3 && vLong > 0.3) Fx -= hb * 0.35 * mu * p.mass * G * 0.5;

    // --- drag + slope
    Fx -= DRAG_K * vLong * Math.abs(vLong) + DRAG_LIN * vLong;
    Fx += p.mass * G * -sample.ty; // downhill gravity component

    // --- integrate longitudinal / lateral
    const axNew = Fx / p.mass;
    vLong += axNew * dt;
    const ayNew = (FyF + FyR) / p.mass;
    vLat += ayNew * dt;
    const lowDamp = clamp(1 - speed / 6, 0, 1) * 3.0;
    vLat *= Math.max(0, 1 - lowDamp * dt);
    this.lastAx = axNew; this.lastAy = ayNew;

    // --- yaw dynamics
    let Mz = FyF * a - FyR * b;
    if (hb > 0.5 && st.handbrakeTimer < HANDBRAKE_YAW_TIME && speed > 6) {
      st.handbrakeTimer += dt;
      const gripFactor = clamp(mu / MU_DRY, 0.5, 1.4);
      const dirSign = steerIn !== 0 ? Math.sign(steerIn) : Math.sign(st.yawRate || 1);
      st.yawRate += dirSign * HANDBRAKE_YAW * gripFactor * dt;
    } else if (hb <= 0.5) st.handbrakeTimer = 0;
    if (env.assists.drift && Math.abs(st.slipR) > 0.44 && Math.sign(steerAngle) === -Math.sign(st.yawRate)) {
      Mz -= COUNTERSTEER_DAMP * st.yawRate;
    }
    if (env.noSpin) {
      st.yawRate = clamp(st.yawRate, -1.3, 1.3);
      const maxLat = Math.tan(0.35) * vLongSafe;
      vLat = clamp(vLat, -maxLat, maxLat);
    }
    st.yawRate += (Mz / p.yawInertia) * dt;
    st.yawRate *= 1 - 0.15 * dt;
    st.yawRate = clamp(st.yawRate, -MAX_YAW, MAX_YAW);

    // --- integrate position
    st.heading += st.yawRate * dt;
    fx = Math.sin(st.heading); fz = -Math.cos(st.heading);
    rx = Math.cos(st.heading); rz = Math.sin(st.heading);
    st.vx = fx * vLong + rx * vLat;
    st.vz = fz * vLong + rz * vLat;
    st.x += st.vx * dt; st.z += st.vz * dt;
    const sp = Math.hypot(st.vx, st.vz);
    if (sp > MAX_SPEED) { st.vx *= MAX_SPEED / sp; st.vz *= MAX_SPEED / sp; }
    st.speedMs = Math.hypot(st.vx, st.vz); st.speedKmh = st.speedMs * 3.6;

    // --- wall collision via spline distance (no mesh raycast)
    if (!env.ghostMode) {
      const ctx2 = spline.nearest(st.x, st.z, st.s);
      st.s = ctx2.s; st.lateral = ctx2.lateral;
      if (Math.abs(st.lateral) > WALL_LATERAL) {
        const sgn = Math.sign(st.lateral);
        const smp = ctx2.sample;
        const newLat = sgn * WALL_LATERAL;
        st.x = smp.x + smp.rx * newLat;
        st.z = smp.z + smp.rz * newLat;
        // remove outward lateral velocity, damp speed 15%
        const vLatNow = st.vx * smp.rx + st.vz * smp.rz;
        const outward = vLatNow * sgn;
        if (outward > 0) {
          st.vx -= smp.rx * vLatNow * 1.3;
          st.vz -= smp.rz * vLatNow * 1.3;
        }
        st.vx *= 0.85; st.vz *= 0.85;
        this.events.hitWall = true;
        this.events.hitIntensity = Math.max(0.1, Math.min(1, outward / 12));
        st.yawRate *= 0.6;
      }
    }

    // --- auto-recover assist (facing wrong way, stuck)
    if (env.assists.recover && st.speedMs < 2 && throttle > 0.5) {
      st.recoverTimer += dt;
      if (st.recoverTimer > 1.5) {
        const smp = spline.sampleAt(st.s);
        const h = spline.tangentHeadingAt(st.s);
        const dh = Math.abs(((h - st.heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        if (dh > 2.0) {
          st.heading = h; st.yawRate = 0;
          st.vx = smp.tx * 4; st.vz = smp.tz * 4;
          this.events.autoRecovered = true;
        }
        st.recoverTimer = 0;
      }
    } else st.recoverTimer = 0;

    // --- NaN guard: reset to last safe spline position
    if (!isFinite(st.x) || !isFinite(st.z) || !isFinite(st.heading) || !isFinite(st.vx) || !isFinite(st.vz) || !isFinite(st.yawRate)) {
      st.x = st.lastSafe.x; st.z = st.lastSafe.z; st.heading = st.lastSafe.heading;
      st.vx = st.lastSafe.vx; st.vz = st.lastSafe.vz; st.yawRate = 0;
      st.s = st.lastSafe.s;
      this.events.nanRecovered = true;
    }
    st.safeTimer += dt;
    if (st.safeTimer > 0.5 && st.speedMs > 4) {
      st.lastSafe = { x: st.x, z: st.z, heading: st.heading, vx: st.vx, vz: st.vz, s: st.s };
      st.safeTimer = 0;
    }
  }

  get driftAngleDeg(): number { return (this.state.beta * 180) / Math.PI; }
  get slipDeg(): number { return Math.abs(this.driftAngleDeg); }
}
