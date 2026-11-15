/**
 * VehiclePhysics.ts — model drift semi-empirical arcade (§6).
 *
 * Formulasi body-frame yang benar:
 *   dvLong/dt = ax + yawRate * vLat
 *   dvLat/dt  = ay - yawRate * vLong
 *   dyaw/dt   = Mz / Iz
 *
 * Gaya ban dihitung per AXLE (bukan per roda) dengan Pacejka-lite.
 * Fixed 120 Hz, tanpa NaN, tanpa tembus jalan.
 */

import { PHYSICS, type CarSpec } from "./Tuning";

export interface VehicleInput {
  throttle: number;
  brake: number;
  steer: number;
  handbrake: boolean;
  isAI?: boolean;
}

export interface VehicleState {
  x: number;
  z: number;
  heading: number;
  vx: number;
  vz: number;
  yawRate: number;
  vLong: number;
  vLat: number;
  steerAngle: number;
  slipFront: number;
  slipRear: number;
  rpm: number;
  gear: number;
  shiftTimer: number;
  handbrakeTimer: number;
  gutterBoostTimer: number;
  inGutter: boolean;
  gutterSide: number;
  limiter: boolean;
  lateral: number;
  trackS: number;
  trackIndex: number;
  speed: number;
  odometer: number;
  hitWall: boolean;
  hitStrength: number;
  /** true bila mobil sedang drift (untuk skor & audio). */
  drifting: boolean;
}

const IDLE = PHYSICS.IDLE_RPM;

/* Tuning internal (bukan bagian dari panel rasa utama). */
const INTERNAL = {
  /** Distribusi berat statis ke depan. */
  frontWeightBias: 0.53,
  /** Efisiensi drivetrain. */
  drivetrain: 0.575,
  /** Rolling resistance (N). */
  rolling: 14,
  /** Koefisien drag efektif: F = 0.5*rho*CdA*v^2. */
  cda: 0.66,
  /** Damping yaw aerodinamis (1/s). */
  yawAeroDamp: 0.55,
  /** Penalti grip saat ban mulai kehilangan traksi (arcade, ringan). */
  scrubLat: 0.012,
};

export class VehiclePhysics {
  spec: CarSpec;
  state: VehicleState;
  gripMod = 1;
  powerMod = 1;
  /** Batas kecepatan efektif (m/s) — governor arcade berbasis grade. */
  speedCapMs = 46.7;
  /** Kemiringan jalan (rad). Positif = menanjak. Di-set tiap frame oleh RaceLogic. */
  slope = 0;
  dampen = 1;
  input: VehicleInput = { throttle: 0, brake: 0, steer: 0, handbrake: false };

  readonly telemetry = {
    zeroTo100: NaN,
    topSpeedKmh: 0,
    spinCount: 0,
  };

  private accelTimer = 0;
  private wasUnder100 = true;
  private time = 0;
  private lastALong = 0;
  private lastALat = 0;
  private driveForce = 0;
  private brakeForce = 0;
  private gutterGripActive = false;
  /** 1 = baru upshift, -1 = baru downshift, 0 = tidak ada (dibaca audio/HUD). */
  pendingShift = 0;
  private safeX = 0;
  private safeZ = 0;
  private safeHeading = 0;

  constructor(spec: CarSpec, x: number, z: number, heading: number) {
    this.spec = spec;
    this.state = makeState(x, z, heading);
    this.setSafePose(x, z, heading);
  }

  reset(x: number, z: number, heading: number, speed = 0): void {
    this.state = makeState(x, z, heading);
    this.state.vLong = speed;
    this.state.vx = Math.cos(heading) * speed;
    this.state.vz = Math.sin(heading) * speed;
    this.state.speed = speed;
    this.accelTimer = 0;
    this.wasUnder100 = true;
    this.time = 0;
    this.setSafePose(x, z, heading);
  }

  setSafePose(x: number, z: number, heading: number): void {
    this.safeX = x;
    this.safeZ = z;
    this.safeHeading = heading;
  }

  /** Step fisika. dt harus 1/120. */
  step(dt: number, input: VehicleInput): void {
    const st = this.state;
    const spec = this.spec;
    this.input = input;
    this.time += dt;
    st.hitWall = false;
    st.hitStrength = 0;

    const m = spec.mass;
    const g = PHYSICS.GRAVITY;
    const Lf = spec.wheelbase * 0.47;
    const Lr = spec.wheelbase * 0.53;

    /* ---------- 1. steering ---------- */
    const maxSteer = (spec.steerLockDeg * Math.PI) / 180;
    const speedAbs = Math.hypot(st.vx, st.vz);
    const speedFactor = 1 - clamp(speedAbs / 220, 0, 0.62);
    const steerTarget = clamp(input.steer, -1, 1) * maxSteer * speedFactor;
    const steerRate = 7.0;
    st.steerAngle += clamp(steerTarget - st.steerAngle, -steerRate * dt, steerRate * dt);

    /* ---------- 2. drivetrain ---------- */
    this.updateDrivetrain(dt, input, Math.abs(st.vLong));

    /* ---------- 3. load per axle + weight transfer ---------- */
    const baseFront = m * g * INTERNAL.frontWeightBias;
    const baseRear = m * g * (1 - INTERNAL.frontWeightBias);
    const dLong = (m * this.lastALong * spec.cgHeight) / spec.wheelbase;
    const dLat = (m * this.lastALat * spec.cgHeight) / spec.track;
    const capF = m * g * PHYSICS.MAX_WEIGHT_TRANSFER;
    const FzFront = clamp(baseFront - dLong, m * g * 0.1, capF);
    const FzRear = clamp(baseRear + dLong, m * g * 0.1, capF);
    // transfer lateral: kurangi grip axle dalam (roll)
    const latLoss = clamp(dLat / (m * g), 0, 0.5);

    /* ---------- 4. slip angle per axle ---------- */
    const vRef = Math.max(2.5, Math.abs(st.vLong));
    const alphaFront = Math.atan2(st.vLat + st.yawRate * Lf, vRef) - st.steerAngle;
    const alphaRear = Math.atan2(st.vLat - st.yawRate * Lr, vRef);

    /* ---------- 5. μ efektif ---------- */
    let mu = PHYSICS.TIRE_PEAK_MU * this.gripMod;
    if (this.gutterGripActive) mu = PHYSICS.TIRE_GUTTER_MU;
    let rearMuCut = 1;
    if (st.handbrakeTimer > 0) {
      const k = Math.min(1, st.handbrakeTimer / PHYSICS.HANDBRAKE_YAW_TIME);
      rearMuCut = 1 - PHYSICS.HANDBRAKE_REAR_GRIP_CUT * k;
    }
    if (input.handbrake) rearMuCut *= 0.92;

    /* COMBINED SLIP (kunci feel drift):
       selama ban belakang sudah sliding, throttle memakan kapasitas lateral
       ban (friction circle). Tanpa ini, bicycle model selalu "menangkap"
       mobil kembali dalam <1 detik dan drift tidak mungkin dipertahankan. */
    const slidingRear = Math.min(1, Math.abs(alphaRear) / 0.45);
    const powerSlide = clamp(input.throttle, 0, 1) * slidingRear;
    rearMuCut *= 1 - 0.62 * powerSlide;

    /* ---------- 6. gaya ban ---------- */
    const FyFront = tireForce(alphaFront, mu * (1 - latLoss * 0.25), FzFront);
    // ARCADE: kapasitas lateral belakang menjenuh (bukan puncak Pacejka) selama
    // ban sudah sliding. Ini yang membuat drift bisa DIPERTAHANKAN, bukan cuma
    // "twitch" 0.3 detik seperti model linear murni.
    const slideAmount = clamp(Math.abs(alphaRear) / 0.5, 0, 1);
    const rearSaturation = 1 - 0.34 * slideAmount * rearMuCut;
    const FyRear = tireForce(alphaRear, mu * rearMuCut * rearSaturation * (1 - latLoss * 0.25), FzRear);
    const steerCos = Math.cos(st.steerAngle);

    const ay = (FyFront * steerCos + FyRear) / m;
    const yawMoment = FyFront * steerCos * Lf - FyRear * Lr;
    let yawAccel = yawMoment / spec.inertiaYaw;

    /* ---------- 7. handbrake yaw injection ---------- */
    if (st.handbrakeTimer > 0) {
      const k = st.handbrakeTimer / (PHYSICS.HANDBRAKE_YAW_TIME + PHYSICS.HANDBRAKE_RECOVER);
      const dir = Math.sign(input.steer) || Math.sign(st.yawRate) || 1;
      const inject = PHYSICS.HANDBRAKE_YAW_INJECT * spec.driftBias * Math.sign(input.steer || 0);
      yawAccel += inject * k * 6;
      void dir;
      st.handbrakeTimer = Math.max(0, st.handbrakeTimer - dt);
    }

    /* ---------- 8. countersteer assist ---------- */
    const slipRearAbs = Math.abs(alphaRear);
    if (slipRearAbs > PHYSICS.COUNTERSTEER_SLIP_TRIGGER) {
      const counter = input.steer !== 0 && Math.sign(input.steer) !== Math.sign(st.yawRate);
      if (counter) {
        const excess = slipRearAbs - PHYSICS.COUNTERSTEER_SLIP_TRIGGER;
        yawAccel -= st.yawRate * PHYSICS.COUNTERSTEER_DAMPING * excess * 0.22;
      }
    }
    // damping aero: dilemahkan saat mobil memang sedang drift
    // Damping aero tetap aktif walau drift. Sebelumnya dimatikan saat drift,
    // dan itu membuat mobil bisa "corkscrew" tanpa henti (spin tak teredam).
    yawAccel -= st.yawRate * INTERNAL.yawAeroDamp * (0.55 + speedAbs / 42);

    // Yaw limiter arcade: spin boleh melebihi geometri, tapi tidak sampai
    // berputar liar. Ini yang membuat drift "liar tapi bisa diselamatkan".
    const yawLimit = clamp((speedAbs / Math.max(1, spec.wheelbase)) * PHYSICS.YAW_SLIP_FACTOR, 1.2, 4.6);
    if (Math.abs(st.yawRate) > yawLimit) {
      yawAccel -= Math.sign(st.yawRate) * (Math.abs(st.yawRate) - yawLimit) * 14;
    }

    st.yawRate += yawAccel * dt;
    st.yawRate = clamp(st.yawRate, -PHYSICS.MAX_YAW_RATE, PHYSICS.MAX_YAW_RATE);

    /* ---------- 9. gaya longitudinal ---------- */
    const drag = 0.5 * 1.225 * INTERNAL.cda * st.vLong * Math.abs(st.vLong);
    const roll = INTERNAL.rolling * Math.sign(st.vLong);
    const governor = this.governorForce(st.vLong);
    // gravitasi sepanjang jalan: tanjakan memperlambat, turunan mempercepat
    const gravityAlong = -PHYSICS.GRAVITY * Math.sin(this.slope);
    const ax = (this.driveForce - this.brakeForce - drag - roll - governor) / m + gravityAlong;
    this.lastALong = ax;
    this.lastALat = ay;

    /* ---------- 10. integrasi body-frame ---------- */
    st.vLong += (ax + st.yawRate * st.vLat) * dt;
    st.vLat += (ay - st.yawRate * st.vLong) * dt;
    // scrub lateral kecil supaya tidak berosilasi
    st.vLat -= st.vLat * INTERNAL.scrubLat * dt * Math.abs(st.vLat);

    if (Math.abs(st.vLong) > PHYSICS.MAX_SPEED_MS) {
      st.vLong = Math.sign(st.vLong) * PHYSICS.MAX_SPEED_MS;
    }

    /* ---------- 11. world space ---------- */
    const cosH = Math.cos(st.heading);
    const sinH = Math.sin(st.heading);
    st.vx = st.vLong * cosH - st.vLat * sinH;
    st.vz = st.vLong * sinH + st.vLat * cosH;

    st.heading += st.yawRate * dt;
    if (!Number.isFinite(st.heading)) st.heading = 0;
    st.x += st.vx * dt;
    st.z += st.vz * dt;

    st.slipFront = alphaFront;
    st.slipRear = alphaRear;
    st.speed = Math.hypot(st.vx, st.vz);
    st.odometer += st.speed * dt;
    st.drifting =
      Math.abs(alphaRear) > 0.16 && st.speed > 6 && Math.abs(st.lateral) < 40;

    /* ---------- 12. telemetry ---------- */
    const kmh = st.speed * 3.6;
    if (kmh > this.telemetry.topSpeedKmh) this.telemetry.topSpeedKmh = kmh;
    if (this.wasUnder100 && kmh >= 100 && Number.isNaN(this.telemetry.zeroTo100)) {
      this.telemetry.zeroTo100 = this.accelTimer;
      this.wasUnder100 = false;
    }
    this.accelTimer += dt;
    if (Math.abs(st.yawRate) > 3.4 && Math.abs(alphaRear) > 1.0) this.telemetry.spinCount++;

    if (st.gutterBoostTimer > 0) st.gutterBoostTimer = Math.max(0, st.gutterBoostTimer - dt);

    /* ---------- 13. NaN guard ---------- */
    if (!isFiniteState(st)) this.recoverSafe();
  }

  /** Governor arcade: hambatan ekstra halus di atas batas kecepatan. */
  private governorForce(vLong: number): number {
    const cap = this.effectiveCap();
    if (Math.abs(vLong) <= cap) return 0;
    const over = Math.abs(vLong) - cap;
    return Math.sign(vLong) * over * over * 420;
  }

  /** Kap dinamis: turunan menaikkan top speed hingga 189 km/h (§6.9). */
  private effectiveCap(): number {
    const descend = Math.max(0, -Math.sin(this.slope)); // >0 bila menurun (slope negatif = turun)
    return Math.min(51.7, this.speedCapMs + descend * 70);
  }

  private updateDrivetrain(dt: number, input: VehicleInput, vAbs: number): void {
    const st = this.state;
    const spec = this.spec;
    if (st.shiftTimer > 0) st.shiftTimer = Math.max(0, st.shiftTimer - dt);

    /* auto-clutch / auto-shift (arcade): pemain tidak perlu grembel manual */
    if (st.shiftTimer <= 0) {
      const curIdx = clamp(st.gear, 1, spec.gears.length) - 1;
      const nextRatio = spec.gears[curIdx + 1];
      const wheelRps = Math.abs(st.vLong) / (2 * Math.PI * spec.wheelRadius);
      // rpm yang akan terjadi di gigi berikutnya
      if (nextRatio !== undefined) {
        const nextRpm = wheelRps * nextRatio * spec.finalDrive * 60;
        if (st.rpm > PHYSICS.AUTO_SHIFT_UP_RPM && nextRpm > IDLE * 1.6) {
          st.gear = curIdx + 2;
          st.shiftTimer = PHYSICS.SHIFT_UP_TIME;
          this.pendingShift = 1;
        }
      }
      if (curIdx > 0) {
        const prevRatio = spec.gears[curIdx - 1] ?? 1;
        const prevRpm = wheelRps * prevRatio * spec.finalDrive * 60;
        if (st.rpm < PHYSICS.AUTO_SHIFT_DOWN_RPM && prevRpm < PHYSICS.REDLINE_RPM * 0.92) {
          st.gear = curIdx;
          st.shiftTimer = PHYSICS.SHIFT_DOWN_TIME;
          this.pendingShift = -1;
        }
      }
    }

    const gearIdx = clamp(st.gear, 1, spec.gears.length) - 1;
    const gearRatio = spec.gears[gearIdx] ?? 1;
    // rps roda → rpm mesin: rps * ratio * final * 60
    const wheelRps = vAbs / (2 * Math.PI * spec.wheelRadius);
    const rpmFromWheel = wheelRps * gearRatio * spec.finalDrive * 60;

    const targetRpm = Math.max(rpmFromWheel, IDLE + input.throttle * 500);
    st.rpm += (targetRpm - st.rpm) * Math.min(1, dt * 10);
    if (st.rpm < IDLE) st.rpm = IDLE;

    st.limiter = st.rpm >= PHYSICS.LIMITER_RPM - 60;
    if (st.rpm > PHYSICS.LIMITER_RPM) st.rpm = PHYSICS.LIMITER_RPM;

    // torsi dari kurva
    const torque = engineTorque(spec, st.rpm);
    let wheelForce = (torque * gearRatio * spec.finalDrive * INTERNAL.drivetrain) / spec.wheelRadius;
    wheelForce *= this.powerMod * input.throttle;

    // batas traksi roda penggerak (arcade: sedikit di atas μ agar tetap hidup)
    const driveAxleLoad =
      spec.drive === "fwd"
        ? spec.mass * PHYSICS.GRAVITY * INTERNAL.frontWeightBias
        : spec.mass * PHYSICS.GRAVITY * (1 - INTERNAL.frontWeightBias);
    const tractionCap = PHYSICS.TIRE_PEAK_MU * driveAxleLoad * (spec.drive === "awd" ? 1.6 : 1.02);
    this.driveForce = Math.min(wheelForce, tractionCap);

    if (st.limiter) {
      const cut = Math.sin(this.time * Math.PI * 2 * PHYSICS.LIMITER_CUT_HZ) > 0;
      if (cut) this.driveForce *= 0.15;
    }
    if (st.shiftTimer > 0) this.driveForce *= 0.1;

    // engine braking saat gas dilepas
    if (input.throttle < 0.05 && vAbs > 1) {
      this.driveForce -= Math.sign(st.vLong) * 260 * (st.rpm / PHYSICS.REDLINE_RPM);
    }

    this.brakeForce = input.brake * spec.mass * 9.4;

    // handbrake: rem belakang ringan + injeksi
    if (input.handbrake && st.handbrakeTimer <= 0) {
      st.handbrakeTimer = PHYSICS.HANDBRAKE_YAW_TIME + PHYSICS.HANDBRAKE_RECOVER;
      this.brakeForce += 900;
    }
    if (input.handbrake) this.brakeForce += 400;
  }

  applyTrackInfo(
    lateral: number,
    halfWidth: number,
    gutterWidth: number,
    gutterSide: number,
    trackS: number,
    trackIndex: number,
  ): void {
    const st = this.state;
    st.lateral = lateral;
    st.trackS = trackS;
    st.trackIndex = trackIndex;

    const inZone =
      gutterWidth > 0 &&
      gutterSide !== 0 &&
      Math.abs(lateral) > halfWidth - 0.05 &&
      Math.abs(lateral) < halfWidth + gutterWidth + 0.25 &&
      Math.sign(lateral) === gutterSide;

    if (inZone) {
      const attack = Math.abs(Math.atan2(st.vLat, Math.max(1, Math.abs(st.vLong))));
      const fast = st.speed > PHYSICS.GUTTER_MIN_SPEED;
      const shallow = attack < PHYSICS.GUTTER_MAX_ANGLE;
      st.inGutter = true;
      st.gutterSide = gutterSide;
      const wasGrip = this.gutterGripActive;
      this.gutterGripActive = fast && shallow;
      if (this.gutterGripActive && !wasGrip) {
        const boost = 1 + PHYSICS.GUTTER_EXIT_BOOST;
        st.vLong *= boost;
        st.vx *= boost;
        st.vz *= boost;
        st.speed = Math.hypot(st.vx, st.vz);
        st.gutterBoostTimer = 0.6;
      }
    } else {
        st.inGutter = false;
      st.gutterSide = 0;
      this.gutterGripActive = false;
    }
  }

  resolveBarrier(
    spline: { pointAtOffset(s: number, lateral: number): { x: number; z: number; heading: number } },
    halfWidth: number,
    gutterWidth: number,
  ): void {
    const st = this.state;
    const limit = halfWidth + gutterWidth + 0.12;
    const over = Math.abs(st.lateral) - limit;
    if (over <= 0) return;

    const side = Math.sign(st.lateral) || 1;
    const target = spline.pointAtOffset(st.trackS, side * (limit - 0.4));
    st.x = target.x;
    st.z = target.z;

    const cosH = Math.cos(st.heading);
    const sinH = Math.sin(st.heading);
    let vLong = st.vx * cosH + st.vz * sinH;
    let vLat = -st.vx * sinH + st.vz * cosH;
    const speedBefore = Math.hypot(st.vx, st.vz);

    vLat *= -0.25;
    vLong *= PHYSICS.COLLISION_DAMPING;
    const impact = clamp(speedBefore / 22, 0, 1.6);
    const loss = clamp(impact * 0.15, PHYSICS.COLLISION_MIN_LOSS, PHYSICS.COLLISION_MAX_LOSS);
    vLong *= 1 - loss;

    st.vLong = vLong;
    st.vLat = vLat;
    st.vx = vLong * cosH - vLat * sinH;
    st.vz = vLong * sinH + vLat * cosH;
    st.yawRate *= 0.5;
    st.hitWall = speedBefore > 2.0;
    st.hitStrength = impact;
    st.speed = Math.hypot(st.vx, st.vz);
  }

  private recoverSafe(): void {
    const st = this.state;
    st.x = this.safeX;
    st.z = this.safeZ;
    st.heading = this.safeHeading;
    st.vx = 0;
    st.vz = 0;
    st.vLong = 0;
    st.vLat = 0;
    st.yawRate = 0;
    st.rpm = IDLE;
    st.gear = 1;
    st.slipFront = 0;
    st.slipRear = 0;
    st.steerAngle = 0;
    this.lastALong = 0;
    this.lastALat = 0;
  }

  get speedKmh(): number {
    return this.state.speed * 3.6;
  }
}

/** Kurva torsi normalisasi: naik hingga torqueRpm, turun setelah powerRpm. */
function engineTorque(spec: CarSpec, rpm: number): number {
  const peak = spec.torqueNm;
  if (rpm <= spec.torqueRpm) {
    // 55% pada idle → 100% di puncak torsi
    const t = clamp((rpm - IDLE) / Math.max(1, spec.torqueRpm - IDLE), 0, 1);
    return peak * (0.55 + 0.45 * t);
  }
  // setelah puncak torsi: turun maksimum 18% sampai redline (bukan 42%)
  const over = clamp((rpm - spec.torqueRpm) / Math.max(1, PHYSICS.LIMITER_RPM - spec.torqueRpm), 0, 1);
  return peak * (1 - 0.18 * over * over);
}

/** Pacejka-lite per axle: Fy = -D sin(C atan(B α)). */
export function tireForce(alpha: number, mu: number, load: number): number {
  const D = mu * load;
  return -D * Math.sin(PHYSICS.TIRE_C * Math.atan(PHYSICS.TIRE_B * alpha));
}

function makeState(x: number, z: number, heading: number): VehicleState {
  return {
    x,
    z,
    heading,
    vx: 0,
    vz: 0,
    yawRate: 0,
    vLong: 0,
    vLat: 0,
    steerAngle: 0,
    slipFront: 0,
    slipRear: 0,
    rpm: IDLE,
    gear: 1,
    shiftTimer: 0,
    handbrakeTimer: 0,
    gutterBoostTimer: 0,
    inGutter: false,
    gutterSide: 0,
    limiter: false,
    lateral: 0,
    trackS: 0,
    trackIndex: 0,
    speed: 0,
    odometer: 0,
    hitWall: false,
    hitStrength: 0,
    drifting: false,
  };
}

function isFiniteState(st: VehicleState): boolean {
  return (
    Number.isFinite(st.x) &&
    Number.isFinite(st.z) &&
    Number.isFinite(st.heading) &&
    Number.isFinite(st.vx) &&
    Number.isFinite(st.vz) &&
    Number.isFinite(st.yawRate) &&
    Number.isFinite(st.vLong) &&
    Number.isFinite(st.vLat) &&
    Number.isFinite(st.rpm) &&
    Number.isFinite(st.speed)
  );
}

export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}
