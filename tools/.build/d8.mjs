// src/sim/Tuning.ts
var PHYSICS = {
  /** Fixed timestep. JANGAN pakai dt rAF langsung ke fisika. */
  HZ: 120,
  DT: 1 / 120,
  /** Maks sub-step per frame — mencegah spiral of death saat tab-switch. */
  MAX_SUBSTEPS: 8,
  /** dt rAF di-clamp ke nilai ini sebelum masuk accumulator. */
  MAX_FRAME_DT: 0.1,
  /**
   * Filter yaw arcade: yaw rate maksimum = (v/wheelbase) * faktor.
   * Lebih besar = mobil bisa berputar lebih liar saat drift.
   */
  YAW_SLIP_FACTOR: 1.35,
  /** Batas anti-tunnel (§6.12). */
  MAX_SPEED_MS: 90,
  MAX_YAW_RATE: 6,
  GRAVITY: 9.81,
  /* --- ban --- */
  /** μ puncak aspal kering. Naik = lebih nempel, kurang licin buat drift. */
  TIRE_PEAK_MU: 1.05,
  /** μ basah. */
  TIRE_WET_MU: 0.78,
  /** μ gutter — cengkeram parit. */
  TIRE_GUTTER_MU: 1.35,
  /** Pacejka-lite shape factor. */
  TIRE_B: 9,
  TIRE_C: 1.4,
  /** Grip belakang dipotong saat handbrake. */
  HANDBRAKE_REAR_GRIP_CUT: 0.6,
  /* --- handbrake drift entry --- */
  /** Impuls yaw rate (rad/s) saat handbrake ditarik. */
  HANDBRAKE_YAW_INJECT: 4,
  /** Durasi injeksi (detik). */
  HANDBRAKE_YAW_TIME: 0.25,
  /** Pemulihan grip belakang setelah injeksi (detik). */
  HANDBRAKE_RECOVER: 0.55,
  /* --- countersteer assist (§6.7) --- */
  /** Slip angle belakang (rad) yang memicu assist. */
  COUNTERSTEER_SLIP_TRIGGER: 25 * Math.PI / 180,
  /** Damping yaw tambahan (Nm·s/rad) saat assist aktif. */
  COUNTERSTEER_DAMPING: 2,
  /** Faktor konversi damping → percepatan yaw (1/inertia efektif). */
  COUNTERSTEER_SCALE: 12e-4,
  /* --- mesin --- */
  IDLE_RPM: 900,
  REDLINE_RPM: 7800,
  LIMITER_RPM: 8200,
  /** Perilaku rev limiter: jumlah cut per detik. */
  LIMITER_CUT_HZ: 8,
  /* --- gearbox --- */
  SHIFT_UP_TIME: 0.12,
  SHIFT_DOWN_TIME: 0.1,
  AUTO_SHIFT_UP_RPM: 7500,
  AUTO_SHIFT_DOWN_RPM: 3200,
  /* --- grip gutter (§4) --- */
  /** Sudut serang maksimum (rad) agar gutter grip aktif. */
  GUTTER_MAX_ANGLE: 15 * Math.PI / 180,
  /** Kecepatan minimum (m/s) untuk gutter grip. */
  GUTTER_MIN_SPEED: 45 / 3.6,
  /** Bonus kecepatan saat keluar gutter. */
  GUTTER_EXIT_BOOST: 0.04,
  /** Nyala "tok-tok" per detik saat di gutter. */
  GUTTER_TICK_HZ: 6,
  /* --- tabrakan (§6.10) --- */
  COLLISION_DAMPING: 0.85,
  COLLISION_MIN_LOSS: 0.12,
  COLLISION_MAX_LOSS: 0.2,
  COLLISION_PUSH: 0.55,
  /* --- weight transfer --- */
  /** Batas ΔFz agar tidak ekstrem. */
  MAX_WEIGHT_TRANSFER: 0.75
};
var HACHI_86 = {
  id: "hachi86",
  name: "HACHI 86",
  subtitle: "1.6L NA \xB7 RWD \xB7 940 kg",
  color: 15922423,
  accent: 1711394,
  mass: 940,
  wheelbase: 2.4,
  track: 1.35,
  cgHeight: 0.52,
  inertiaYaw: 1250,
  powerHp: 130,
  powerRpm: 6600,
  torqueNm: 149,
  torqueRpm: 5200,
  gears: [3.58, 2.02, 1.38, 1, 0.79],
  finalDrive: 4.3,
  lsdLock: 0.6,
  steerLockDeg: 34,
  steerRatio: 13,
  drive: "rwd",
  wheelRadius: 0.3,
  gripScale: 1,
  driftBias: 1
};
var FD7 = {
  id: "fd7",
  name: "FD-7 SAVANNA",
  subtitle: "1.3L TWIN-TURBO \xB7 RWD \xB7 1270 kg",
  color: 16765952,
  accent: 1711394,
  mass: 1270,
  wheelbase: 2.43,
  track: 1.46,
  cgHeight: 0.5,
  inertiaYaw: 1680,
  powerHp: 255,
  powerRpm: 6500,
  torqueNm: 294,
  torqueRpm: 5e3,
  gears: [3.48, 2.02, 1.39, 1, 0.72],
  finalDrive: 4.1,
  lsdLock: 0.72,
  steerLockDeg: 33,
  steerRatio: 13.5,
  drive: "rwd",
  wheelRadius: 0.32,
  gripScale: 1.06,
  driftBias: 1.08
};
var EK9 = {
  id: "ek9",
  name: "EK-9 TYPE-R",
  subtitle: "1.6L VTEC \xB7 FWD \xB7 1070 kg",
  color: 16777215,
  accent: 14162732,
  mass: 1070,
  wheelbase: 2.62,
  track: 1.48,
  cgHeight: 0.48,
  inertiaYaw: 1420,
  powerHp: 182,
  powerRpm: 7800,
  torqueNm: 160,
  torqueRpm: 6200,
  gears: [3.23, 2.1, 1.46, 1.13, 0.89],
  finalDrive: 4.4,
  lsdLock: 0.5,
  steerLockDeg: 35,
  steerRatio: 12.8,
  drive: "fwd",
  wheelRadius: 0.3,
  gripScale: 1.03,
  driftBias: 0.86
};
var S13 = {
  id: "s13",
  name: "NISSAN-KAI S13",
  subtitle: "2.0L TURBO \xB7 RWD \xB7 1180 kg",
  color: 3107839,
  accent: 857124,
  mass: 1180,
  wheelbase: 2.47,
  track: 1.46,
  cgHeight: 0.51,
  inertiaYaw: 1520,
  powerHp: 205,
  powerRpm: 6400,
  torqueNm: 265,
  torqueRpm: 4800,
  gears: [3.32, 1.9, 1.31, 1, 0.76],
  finalDrive: 4.36,
  lsdLock: 0.68,
  steerLockDeg: 34,
  steerRatio: 13.2,
  drive: "rwd",
  wheelRadius: 0.31,
  gripScale: 1.02,
  driftBias: 1.05
};
var CARS = [HACHI_86, FD7, EK9, S13];
function carById(id) {
  return CARS.find((c) => c.id === id) ?? HACHI_86;
}
var CAMERA = {
  /** Spring konstanta. Naik = kamera lebih ketat menempel. */
  CAM_SPRING_K: 14,
  /** Damping ratio. Naik = lebih kaku/cepat diam. */
  CAM_DAMPING: 0.86,
  CHASE_OFFSET: { x: 0, y: 1.35, z: 4.6 },
  HOOD_OFFSET: { x: 0, y: 1.16, z: 0.35 },
  BUMPER_OFFSET: { x: 0, y: 0.62, z: -2.1 },
  FOV_MIN: 62,
  FOV_MAX: 76,
  FOV_LERP: 0.08,
  /** Roll akibat slip: rad per rad slip, maks ±5°. */
  DRIFT_ROLL_PER_SLIP: 0.06,
  DRIFT_ROLL_MAX: 5 * Math.PI / 180,
  /** Getar kamera per unit impact. */
  SHAKE_PER_IMPACT: 0.06
};

// src/sim/VehiclePhysics.ts
var IDLE = PHYSICS.IDLE_RPM;
var INTERNAL = {
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
  scrubLat: 0.012
};
var VehiclePhysics = class {
  spec;
  state;
  gripMod = 1;
  powerMod = 1;
  /** Batas kecepatan efektif (m/s) — governor arcade berbasis grade. */
  speedCapMs = 46.7;
  /** Kemiringan jalan (rad). Positif = menanjak. Di-set tiap frame oleh RaceLogic. */
  slope = 0;
  dampen = 1;
  input = { throttle: 0, brake: 0, steer: 0, handbrake: false };
  telemetry = {
    zeroTo100: NaN,
    topSpeedKmh: 0,
    spinCount: 0
  };
  accelTimer = 0;
  wasUnder100 = true;
  time = 0;
  lastALong = 0;
  lastALat = 0;
  driveForce = 0;
  brakeForce = 0;
  gutterGripActive = false;
  /** 1 = baru upshift, -1 = baru downshift, 0 = tidak ada (dibaca audio/HUD). */
  pendingShift = 0;
  safeX = 0;
  safeZ = 0;
  safeHeading = 0;
  constructor(spec2, x, z, heading) {
    this.spec = spec2;
    this.state = makeState(x, z, heading);
    this.setSafePose(x, z, heading);
  }
  reset(x, z, heading, speed = 0) {
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
  setSafePose(x, z, heading) {
    this.safeX = x;
    this.safeZ = z;
    this.safeHeading = heading;
  }
  /** Step fisika. dt harus 1/120. */
  step(dt, input) {
    const st = this.state;
    const spec2 = this.spec;
    this.input = input;
    this.time += dt;
    st.hitWall = false;
    st.hitStrength = 0;
    const m = spec2.mass;
    const g = PHYSICS.GRAVITY;
    const Lf = spec2.wheelbase * 0.47;
    const Lr = spec2.wheelbase * 0.53;
    const maxSteer = spec2.steerLockDeg * Math.PI / 180;
    const speedAbs = Math.hypot(st.vx, st.vz);
    const speedFactor = 1 - clamp(speedAbs / 220, 0, 0.62);
    const steerTarget = clamp(input.steer, -1, 1) * maxSteer * speedFactor;
    const steerRate = 7;
    st.steerAngle += clamp(steerTarget - st.steerAngle, -steerRate * dt, steerRate * dt);
    this.updateDrivetrain(dt, input, Math.abs(st.vLong));
    const baseFront = m * g * INTERNAL.frontWeightBias;
    const baseRear = m * g * (1 - INTERNAL.frontWeightBias);
    const dLong = m * this.lastALong * spec2.cgHeight / spec2.wheelbase;
    const dLat = m * this.lastALat * spec2.cgHeight / spec2.track;
    const capF = m * g * PHYSICS.MAX_WEIGHT_TRANSFER;
    const FzFront = clamp(baseFront - dLong, m * g * 0.1, capF);
    const FzRear = clamp(baseRear + dLong, m * g * 0.1, capF);
    const latLoss = clamp(dLat / (m * g), 0, 0.5);
    const vRef = Math.max(2.5, Math.abs(st.vLong));
    const alphaFront = Math.atan2(st.vLat + st.yawRate * Lf, vRef) - st.steerAngle;
    const alphaRear = Math.atan2(st.vLat - st.yawRate * Lr, vRef);
    let mu = PHYSICS.TIRE_PEAK_MU * this.gripMod;
    if (this.gutterGripActive) mu = PHYSICS.TIRE_GUTTER_MU;
    let rearMuCut = 1;
    if (st.handbrakeTimer > 0) {
      const k = Math.min(1, st.handbrakeTimer / PHYSICS.HANDBRAKE_YAW_TIME);
      rearMuCut = 1 - PHYSICS.HANDBRAKE_REAR_GRIP_CUT * k;
    }
    if (input.handbrake) rearMuCut *= 0.92;
    const slidingRear = Math.min(1, Math.abs(alphaRear) / 0.45);
    const powerSlide = clamp(input.throttle, 0, 1) * slidingRear;
    rearMuCut *= 1 - 0.62 * powerSlide;
    const FyFront = tireForce(alphaFront, mu * (1 - latLoss * 0.25), FzFront);
    const slideAmount = clamp(Math.abs(alphaRear) / 0.5, 0, 1);
    const rearSaturation = 1 - 0.34 * slideAmount * rearMuCut;
    const FyRear = tireForce(alphaRear, mu * rearMuCut * rearSaturation * (1 - latLoss * 0.25), FzRear);
    const steerCos = Math.cos(st.steerAngle);
    const ay = (FyFront * steerCos + FyRear) / m;
    const yawMoment = FyFront * steerCos * Lf - FyRear * Lr;
    let yawAccel = yawMoment / spec2.inertiaYaw;
    if (st.handbrakeTimer > 0) {
      const k = st.handbrakeTimer / (PHYSICS.HANDBRAKE_YAW_TIME + PHYSICS.HANDBRAKE_RECOVER);
      const dir = Math.sign(input.steer) || Math.sign(st.yawRate) || 1;
      const inject = PHYSICS.HANDBRAKE_YAW_INJECT * spec2.driftBias * Math.sign(input.steer || 0);
      yawAccel += inject * k * 6;
      void dir;
      st.handbrakeTimer = Math.max(0, st.handbrakeTimer - dt);
    }
    const slipRearAbs = Math.abs(alphaRear);
    if (slipRearAbs > PHYSICS.COUNTERSTEER_SLIP_TRIGGER) {
      const counter = input.steer !== 0 && Math.sign(input.steer) !== Math.sign(st.yawRate);
      if (counter) {
        const excess = slipRearAbs - PHYSICS.COUNTERSTEER_SLIP_TRIGGER;
        yawAccel -= st.yawRate * PHYSICS.COUNTERSTEER_DAMPING * excess * 0.22;
      }
    }
    yawAccel -= st.yawRate * INTERNAL.yawAeroDamp * (0.55 + speedAbs / 42);
    const yawLimit = clamp(speedAbs / Math.max(1, spec2.wheelbase) * PHYSICS.YAW_SLIP_FACTOR, 1.2, 4.6);
    if (Math.abs(st.yawRate) > yawLimit) {
      yawAccel -= Math.sign(st.yawRate) * (Math.abs(st.yawRate) - yawLimit) * 14;
    }
    st.yawRate += yawAccel * dt;
    st.yawRate = clamp(st.yawRate, -PHYSICS.MAX_YAW_RATE, PHYSICS.MAX_YAW_RATE);
    const drag = 0.5 * 1.225 * INTERNAL.cda * st.vLong * Math.abs(st.vLong);
    const roll = INTERNAL.rolling * Math.sign(st.vLong);
    const governor = this.governorForce(st.vLong);
    const gravityAlong = -PHYSICS.GRAVITY * Math.sin(this.slope);
    const ax = (this.driveForce - this.brakeForce - drag - roll - governor) / m + gravityAlong;
    this.lastALong = ax;
    this.lastALat = ay;
    st.vLong += (ax + st.yawRate * st.vLat) * dt;
    st.vLat += (ay - st.yawRate * st.vLong) * dt;
    st.vLat -= st.vLat * INTERNAL.scrubLat * dt * Math.abs(st.vLat);
    if (Math.abs(st.vLong) > PHYSICS.MAX_SPEED_MS) {
      st.vLong = Math.sign(st.vLong) * PHYSICS.MAX_SPEED_MS;
    }
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
    st.drifting = Math.abs(alphaRear) > 0.16 && st.speed > 6 && Math.abs(st.lateral) < 40;
    const kmh = st.speed * 3.6;
    if (kmh > this.telemetry.topSpeedKmh) this.telemetry.topSpeedKmh = kmh;
    if (this.wasUnder100 && kmh >= 100 && Number.isNaN(this.telemetry.zeroTo100)) {
      this.telemetry.zeroTo100 = this.accelTimer;
      this.wasUnder100 = false;
    }
    this.accelTimer += dt;
    if (Math.abs(st.yawRate) > 3.4 && Math.abs(alphaRear) > 1) this.telemetry.spinCount++;
    if (st.gutterBoostTimer > 0) st.gutterBoostTimer = Math.max(0, st.gutterBoostTimer - dt);
    if (!isFiniteState(st)) this.recoverSafe();
  }
  /** Governor arcade: hambatan ekstra halus di atas batas kecepatan. */
  governorForce(vLong) {
    const cap = this.effectiveCap();
    if (Math.abs(vLong) <= cap) return 0;
    const over = Math.abs(vLong) - cap;
    return Math.sign(vLong) * over * over * 420;
  }
  /** Kap dinamis: turunan menaikkan top speed hingga 189 km/h (§6.9). */
  effectiveCap() {
    const descend = Math.max(0, -Math.sin(this.slope));
    return Math.min(51.7, this.speedCapMs + descend * 70);
  }
  updateDrivetrain(dt, input, vAbs) {
    const st = this.state;
    const spec2 = this.spec;
    if (st.shiftTimer > 0) st.shiftTimer = Math.max(0, st.shiftTimer - dt);
    if (st.shiftTimer <= 0) {
      const curIdx = clamp(st.gear, 1, spec2.gears.length) - 1;
      const nextRatio = spec2.gears[curIdx + 1];
      const wheelRps2 = Math.abs(st.vLong) / (2 * Math.PI * spec2.wheelRadius);
      if (nextRatio !== void 0) {
        const nextRpm = wheelRps2 * nextRatio * spec2.finalDrive * 60;
        if (st.rpm > PHYSICS.AUTO_SHIFT_UP_RPM && nextRpm > IDLE * 1.6) {
          st.gear = curIdx + 2;
          st.shiftTimer = PHYSICS.SHIFT_UP_TIME;
          this.pendingShift = 1;
        }
      }
      if (curIdx > 0) {
        const prevRatio = spec2.gears[curIdx - 1] ?? 1;
        const prevRpm = wheelRps2 * prevRatio * spec2.finalDrive * 60;
        if (st.rpm < PHYSICS.AUTO_SHIFT_DOWN_RPM && prevRpm < PHYSICS.REDLINE_RPM * 0.92) {
          st.gear = curIdx;
          st.shiftTimer = PHYSICS.SHIFT_DOWN_TIME;
          this.pendingShift = -1;
        }
      }
    }
    const gearIdx = clamp(st.gear, 1, spec2.gears.length) - 1;
    const gearRatio = spec2.gears[gearIdx] ?? 1;
    const wheelRps = vAbs / (2 * Math.PI * spec2.wheelRadius);
    const rpmFromWheel = wheelRps * gearRatio * spec2.finalDrive * 60;
    const targetRpm = Math.max(rpmFromWheel, IDLE + input.throttle * 500);
    st.rpm += (targetRpm - st.rpm) * Math.min(1, dt * 10);
    if (st.rpm < IDLE) st.rpm = IDLE;
    st.limiter = st.rpm >= PHYSICS.LIMITER_RPM - 60;
    if (st.rpm > PHYSICS.LIMITER_RPM) st.rpm = PHYSICS.LIMITER_RPM;
    const torque = engineTorque(spec2, st.rpm);
    let wheelForce = torque * gearRatio * spec2.finalDrive * INTERNAL.drivetrain / spec2.wheelRadius;
    wheelForce *= this.powerMod * input.throttle;
    const driveAxleLoad = spec2.drive === "fwd" ? spec2.mass * PHYSICS.GRAVITY * INTERNAL.frontWeightBias : spec2.mass * PHYSICS.GRAVITY * (1 - INTERNAL.frontWeightBias);
    const tractionCap = PHYSICS.TIRE_PEAK_MU * driveAxleLoad * (spec2.drive === "awd" ? 1.6 : 1.02);
    this.driveForce = Math.min(wheelForce, tractionCap);
    if (st.limiter) {
      const cut = Math.sin(this.time * Math.PI * 2 * PHYSICS.LIMITER_CUT_HZ) > 0;
      if (cut) this.driveForce *= 0.15;
    }
    if (st.shiftTimer > 0) this.driveForce *= 0.1;
    if (input.throttle < 0.05 && vAbs > 1) {
      this.driveForce -= Math.sign(st.vLong) * 260 * (st.rpm / PHYSICS.REDLINE_RPM);
    }
    this.brakeForce = input.brake * spec2.mass * 9.4;
    if (input.handbrake && st.handbrakeTimer <= 0) {
      st.handbrakeTimer = PHYSICS.HANDBRAKE_YAW_TIME + PHYSICS.HANDBRAKE_RECOVER;
      this.brakeForce += 900;
    }
    if (input.handbrake) this.brakeForce += 400;
  }
  applyTrackInfo(lateral, halfWidth, gutterWidth, gutterSide, trackS, trackIndex) {
    const st = this.state;
    st.lateral = lateral;
    st.trackS = trackS;
    st.trackIndex = trackIndex;
    const inZone = gutterWidth > 0 && gutterSide !== 0 && Math.abs(lateral) > halfWidth - 0.05 && Math.abs(lateral) < halfWidth + gutterWidth + 0.25 && Math.sign(lateral) === gutterSide;
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
  resolveBarrier(spline, halfWidth, gutterWidth) {
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
    st.hitWall = speedBefore > 2;
    st.hitStrength = impact;
    st.speed = Math.hypot(st.vx, st.vz);
  }
  recoverSafe() {
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
  get speedKmh() {
    return this.state.speed * 3.6;
  }
};
function engineTorque(spec2, rpm) {
  const peak = spec2.torqueNm;
  if (rpm <= spec2.torqueRpm) {
    const t = clamp((rpm - IDLE) / Math.max(1, spec2.torqueRpm - IDLE), 0, 1);
    return peak * (0.55 + 0.45 * t);
  }
  const over = clamp((rpm - spec2.torqueRpm) / Math.max(1, PHYSICS.LIMITER_RPM - spec2.torqueRpm), 0, 1);
  return peak * (1 - 0.18 * over * over);
}
function tireForce(alpha, mu, load) {
  const D = mu * load;
  return -D * Math.sin(PHYSICS.TIRE_C * Math.atan(PHYSICS.TIRE_B * alpha));
}
function makeState(x, z, heading) {
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
    drifting: false
  };
}
function isFiniteState(st) {
  return Number.isFinite(st.x) && Number.isFinite(st.z) && Number.isFinite(st.heading) && Number.isFinite(st.vx) && Number.isFinite(st.vz) && Number.isFinite(st.yawRate) && Number.isFinite(st.vLong) && Number.isFinite(st.vLat) && Number.isFinite(st.rpm) && Number.isFinite(st.speed);
}
function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

// tools/diag8.ts
var DT = PHYSICS.DT;
var spec = carById("hachi86");
var car = new VehiclePhysics(spec, 0, 0, 0);
var R = 18;
car.reset(0, 0, 0, 60 / 3.6);
console.log("t,kmh,slipR,slipF,yaw,needed,ratio,vLat,steer,thr");
for (let i = 0; i < 120 * 10; i++) {
  const t = i * DT;
  const v = Math.max(3, car.state.speed);
  const targetYaw = v / R;
  const slip = Math.abs(car.state.slipRear);
  const yawErr = targetYaw - car.state.yawRate;
  const steer = Math.max(-1, Math.min(1, yawErr * 1.6 - slip * 0.75));
  const speedErr = 57 - car.speedKmh;
  const throttle = Math.max(0, Math.min(1, 0.55 + speedErr * 0.05));
  car.step(DT, { throttle, brake: car.speedKmh > 66 ? 0.3 : 0, steer, handbrake: t < 0.25 });
  const needed = Math.max(0.4, car.state.speed / R);
  if (i % 12 === 0) console.log(`${t.toFixed(2)},${car.speedKmh.toFixed(1)},${car.state.slipRear.toFixed(2)},${car.state.slipFront.toFixed(2)},${car.state.yawRate.toFixed(2)},${needed.toFixed(2)},${(Math.abs(car.state.yawRate) / needed).toFixed(2)},${car.state.vLat.toFixed(2)},${car.state.steerAngle.toFixed(2)},${throttle.toFixed(2)}`);
}
