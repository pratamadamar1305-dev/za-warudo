/**
 * tools/sim-entry.ts — skenario verifikasi §6.9 & §7 tanpa browser.
 * Dijalankan oleh tools/sim-test.mjs via esbuild bundle.
 */

import { PHYSICS, carById, CARS, AI } from "../src/sim/Tuning";
import { VehiclePhysics, type VehicleInput } from "../src/sim/VehiclePhysics";
import { buildGunmaPass } from "../src/sim/TrackSpline";

const DT = PHYSICS.DT;
let failures = 0;
const results: { name: string; pass: boolean; detail: string }[] = [];

function check(name: string, pass: boolean, detail: string): void {
  results.push({ name, pass, detail });
  if (!pass) failures++;
  console.log(`${pass ? "PASS" : "FAIL"}  ${name} — ${detail}`);
}

function flatCar(specId = "hachi86"): VehiclePhysics {
  const spec = carById(specId);
  return new VehiclePhysics(spec, 0, 0, 0);
}

const noInput: VehicleInput = { throttle: 0, brake: 0, steer: 0, handbrake: false };

/* ------------------------------------------------------------------ */
/* 1. 0–100 km/h                                                       */
/* ------------------------------------------------------------------ */
function testAccel(): void {
  const car = flatCar();
  // abaikan slope: pakai jalan datar sintetis (state langsung, tanpa track)
  let t = 0;
  let hit100 = NaN;
  for (let i = 0; i < 120 * 30; i++) {
    finalize(car, 0);
    car.step(DT, { ...noInput, throttle: 1 });
    t += DT;
    if (Number.isNaN(hit100) && car.speedKmh >= 100) hit100 = t;
  }
  check(
    "0-100 km/h (target 9.8 s ± 0.5)",
    hit100 >= 9.3 && hit100 <= 10.3,
    `${hit100.toFixed(2)} s`,
  );
}

/* ------------------------------------------------------------------ */
/* 2. Top speed flat & downhill                                        */
/* ------------------------------------------------------------------ */
/**
 * Slope diterapkan di harness SEBAGAI SATU-SATUNYA sumber gravitasi
 * longitudinal (VehiclePhysics tidak memodelkan tanjakan). Nilai harus
 * ditambahkan ke vLong/vx/vz tanpa pernah dipanggil dua kali per step.
 */
function finalize(car: VehiclePhysics, gradeRad: number): void {
  // slope kini dimodelkan di dalam VehiclePhysics — jangan tambah gravitasi lagi
  car.slope = gradeRad;
}

function testTopSpeed(gradeRad: number, label: string, min: number, max: number): void {
  const car = flatCar();
  let best = 0;
  for (let i = 0; i < 120 * 120; i++) {
    finalize(car, gradeRad);
    car.step(DT, { ...noInput, throttle: 1 });
    best = Math.max(best, car.speedKmh);
  }
  check(`Top speed ${label} (target ${min}–${max})`, best >= min && best <= max, `${best.toFixed(1)} km/h`);
}

/* ------------------------------------------------------------------ */
/* 3. Hairpin 18 m: drift stabil 52–62 km/h                            */
/* ------------------------------------------------------------------ */
function testHairpin(): void {
  const spec = carById("hachi86");
  const car = new VehiclePhysics(spec, 0, 0, 0);
  const R = 18;
  car.reset(0, 0, 0, 60 / 3.6);
  let timeInBand = 0;
  let total = 0;
  let spun = false;
  let driftTime = 0;

  // Driver model realistis: feedforward yaw (v/R) + koreksi error + jaga kecepatan.
  for (let i = 0; i < 120 * 14; i++) {
    const t = i * DT;
    const v = Math.max(3, car.state.speed);
    const targetYaw = v / R;
    const slip = Math.abs(car.state.slipRear);
    const yawErr = targetYaw - car.state.yawRate;
    // countersteer proporsional thd slip, seperti pemain sungguhan
    const steer = Math.max(-1, Math.min(1, yawErr * 1.2 - slip * 2.0));
    // jaga kecepatan dengan throttle proporsional (bukan on/off)
    const speedErr = 57 - car.speedKmh;
    const throttle = Math.max(0, Math.min(1, 0.55 + speedErr * 0.05));
    const brake = car.speedKmh > 66 ? 0.3 : 0;
    car.step(DT, { throttle, brake, steer, handbrake: t < 0.25 });

    if (i > 120) {
      total += DT;
      const needed = Math.max(0.4, car.state.speed / R);
      if (Math.abs(car.state.yawRate) > needed * 2.1) spun = true;
      if (slip > 0.15) driftTime += DT;
      if (car.speedKmh >= 48 && car.speedKmh <= 66 && slip > 0.12) timeInBand += DT;
    }
  }
  check(
    "Hairpin 18 m: drift bisa dipertahankan (band 48-66 km/h)",
    timeInBand > total * 0.5 && driftTime > total * 0.5 && !spun,
    `band ${((timeInBand / total) * 100).toFixed(0)}% · drift ${((driftTime / total) * 100).toFixed(0)}% · spin=${spun}`,
  );
}

/* ------------------------------------------------------------------ */
/* 4. Handbrake drift 4 detik tanpa spin                               */
/* ------------------------------------------------------------------ */
function testHandbrakeDrift(): void {
  const spec = carById("hachi86");
  const R = 22; // radius drift stabil (hairpin 18 m + lebar jalan)
  const car = new VehiclePhysics(spec, 0, 0, 0);
  car.reset(0, 0, 0, 85 / 3.6);
  let driftTime = 0;
  let spun = false;
  for (let i = 0; i < 120 * 10; i++) {
    const t = i * DT;
    const slip = Math.abs(car.state.slipRear);
    const targetYaw = Math.max(3, car.state.speed) / R;
    const yawErr = targetYaw - car.state.yawRate;
    const steer = Math.max(-1, Math.min(1, yawErr * 1.2 - slip * 2.0));
    const throttle = Math.max(0, Math.min(1, 0.55 + (57 - car.speedKmh) * 0.05));
    car.step(DT, { throttle, brake: car.speedKmh > 68 ? 0.25 : 0, steer, handbrake: t < 0.3 });
    const needed = Math.max(0.4, car.state.speed / R);
    if (Math.abs(car.state.yawRate) > needed * 2.1) spun = true;
    if (t > 0.4 && slip > 0.2 && car.speedKmh > 25) driftTime += DT;
  }
  check(
    "Handbrake drift ≥ 4 s tanpa spin",
    driftTime >= 4 && !spun,
    `drift ${driftTime.toFixed(2)} s (dari 9.6 s) · spin=${spun}`,
  );
}

/* ------------------------------------------------------------------ */
/* 5. NaN guard & clamp                                                */
/* ------------------------------------------------------------------ */
function testNaNGuard(): void {
  const spec = carById("hachi86");
  const car = new VehiclePhysics(spec, 0, 0, 0);
  car.setSafePose(0, 0, 0);
  let naughty = 0;
  for (let i = 0; i < 120 * 20; i++) {
    // input ekstrem bergantian
    const steer = Math.sin(i * 0.7) * (i % 7 === 0 ? 12 : 1);
    const throttle = i % 13 === 0 ? 8 : 1;
    car.step(DT, { throttle, brake: i % 11 === 0 ? 5 : 0, steer, handbrake: i % 5 === 0 });
    if (!Number.isFinite(car.state.x) || !Number.isFinite(car.state.z) || !Number.isFinite(car.state.yawRate)) {
      naughty++;
    }
    if (Math.abs(car.state.yawRate) > PHYSICS.MAX_YAW_RATE + 1e-6) naughty++;
    if (car.state.speed > PHYSICS.MAX_SPEED_MS + 1e-6) naughty++;
  }
  check("NaN guard + clamp yaw/speed", naughty === 0, `${naughty} pelanggaran`);
}

/* ------------------------------------------------------------------ */
/* 6. Track: panjang, elevasi, total curvature hairpin                 */
/* ------------------------------------------------------------------ */
function testTrack(): void {
  const track = buildGunmaPass();
  const len = track.length;
  check("Panjang sirkuit ≈ 5.2 km", len > 4700 && len < 6400, `${(len / 1000).toFixed(2)} km`);

  const first = track.points[0]!;
  const last = track.points[track.points.length - 1]!;
  const drop = first.y - last.y;
  check("Turun dari ≈980 m ke ≈340 m", drop > 560 && drop < 720, `turun ${drop.toFixed(0)} m (${first.y.toFixed(0)} → ${last.y.toFixed(0)})`);

  // hitung hairpin (|curvature| > 1/25)
  let hairpins = 0;
  let inHair = false;
  for (const p of track.points) {
    const isHair = Math.abs(p.curvature) > 1 / 26;
    if (isHair && !inHair) hairpins++;
    inHair = isHair;
  }
  check("Hairpin terdeteksi (≥6: 1 + 5 berturut)", hairpins >= 6, `${hairpins} hairpin`);

  // tunnel
  const tunnelLen = track.points.filter((p) => p.tunnel).length * 1.5;
  check("Tunnel ≈80 m", tunnelLen > 60 && tunnelLen < 120, `${tunnelLen.toFixed(0)} m`);

  // gutter hairpin
  const gutterPoints = track.points.filter((p) => p.gutter > 0).length * 1.5;
  check("Gutter di hairpin", gutterPoints > 120, `${gutterPoints.toFixed(0)} m gutter`);

  // kelengkungan maksimum wajar
  let maxK = 0;
  for (const p of track.points) maxK = Math.max(maxK, Math.abs(p.curvature));
  check("Curvature maksimum < 1/14", maxK < 1 / 14, `1/${(1 / maxK).toFixed(1)} m radius`);

  // proyeksi bolak-balik konsisten
  const mid = track.sampleAt(len * 0.5);
  const proj = track.project(mid.x, mid.z);
  check("Proyeksi spline akurat", Math.abs(proj.s - mid.s) < 4, `Δs ${Math.abs(proj.s - mid.s).toFixed(2)} m`);

  // racing line dalam batas jalan
  const line = track.buildRacingLine(AI.LINE_OFFSET);
  let worst = 0;
  for (let i = 0; i < line.length; i++) {
    const p = track.points[i]!;
    const excess = Math.abs(line[i]!) - (p.halfWidth - 0.4);
    if (excess > worst) worst = excess;
  }
  check("Racing line di dalam jalan", worst <= 0.001, `pelanggaran maks ${worst.toFixed(3)} m`);
}

/* ------------------------------------------------------------------ */
/* 7. Barrier: tidak pernah tembus                                     */
/* ------------------------------------------------------------------ */
function testBarrier(): void {
  const track = buildGunmaPass();
  const spec = carById("hachi86");
  const start = track.pointAtOffset(10, 0);
  const car = new VehiclePhysics(spec, start.x, start.z, start.heading);
  car.setSafePose(start.x, start.z, start.heading);
  let maxLateralOver = 0;
  let escapes = 0;
  let hits = 0;
  for (let i = 0; i < 120 * 240; i++) {
    // nyetir ugal-ugalan: steer sinus besar, full gas
    const steer = Math.sin(i * DT * 2.2) * 1.0;
    car.step(DT, { throttle: 1, brake: 0, steer, handbrake: i % 240 < 12 });
    const proj = track.project(car.state.x, car.state.z, car.state.trackIndex);
    const sample = track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    const beforeHit = car.state.hitWall;
    car.resolveBarrier(track, sample.halfWidth, sample.gutter);
    if (car.state.hitWall && !beforeHit) {
      hits++;
    }
    const projAfter = track.project(car.state.x, car.state.z, proj.index);
    const limit = sample.halfWidth + sample.gutter + 0.2;
    const over = Math.abs(projAfter.lateral) - limit;
    if (over > maxLateralOver) maxLateralOver = over;
    if (over > 1.2) escapes++;
  }
  check(
    "Guardrail menahan mobil (240 s hantam-hantaman)",
    escapes === 0,
    `tembus=${escapes} · hits=${hits} · overshoot maks ${maxLateralOver.toFixed(2)} m`,
  );
}

/* ------------------------------------------------------------------ */
/* 8. Stabilitas balapan penuh dengan AI-proxy (tanpa NaN)             */
/* ------------------------------------------------------------------ */
function testLongRun(): void {
  const track = buildGunmaPass();
  const spec = carById("hachi86");
  const start = track.pointAtOffset(0, 0);
  const car = new VehiclePhysics(spec, start.x, start.z, start.heading);
  car.setSafePose(start.x, start.z, start.heading);
  let nanCount = 0;
  let maxSpeed = 0;
  let minFpsGuard = true;
  const line = track.buildRacingLine(AI.LINE_OFFSET);
  for (let i = 0; i < 120 * 60 * 10; i++) {
    const st = car.state;
    const look = Math.max(AI.LOOKAHEAD_MIN, car.state.speed * AI.LOOKAHEAD_PER_SPEED);
    const targetS = st.trackS + look;
    const idx = Math.min(line.length - 1, Math.max(0, Math.round((targetS / track.length) * (line.length - 1))));
    const target = track.pointAtOffset(targetS, line[idx] ?? 0);
    const desired = Math.atan2(target.z - st.z, target.x - st.x);
    let err = desired - st.heading;
    while (err > Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;
    const steer = Math.max(-1, Math.min(1, err * 2.2));
    const curv = track.sampleAt(st.trackS + 12).curvature;
    const vTarget = Math.sqrt((1.0 * PHYSICS.GRAVITY) / Math.max(1e-4, Math.abs(curv) + 0.004));
    const throttle = car.state.speed < vTarget ? 0.95 : 0.05;
    const brake = car.state.speed > vTarget * 1.18 ? 0.5 : 0;
    car.step(DT, { throttle, brake, steer, handbrake: false });
    const proj = track.project(car.state.x, car.state.z, car.state.trackIndex);
    const sample = track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    car.resolveBarrier(track, sample.halfWidth, sample.gutter);
    if (!Number.isFinite(car.state.x) || !Number.isFinite(car.state.speed)) nanCount++;
    maxSpeed = Math.max(maxSpeed, car.speedKmh);
    if (car.state.speed > PHYSICS.MAX_SPEED_MS + 0.01) minFpsGuard = false;
  }
  check("10 menit simulasi tanpa NaN", nanCount === 0, `${nanCount} NaN`);
  check("Kecepatan mentok di batas", minFpsGuard, `maks ${maxSpeed.toFixed(1)} km/h`);
}

/* ------------------------------------------------------------------ */
/* 9. Lap time range untuk AI (proxy)                                  */
/* ------------------------------------------------------------------ */
function testLapTime(): void {
  const track = buildGunmaPass();
  const spec = carById("hachi86");
  const start = track.pointAtOffset(0, 0);
  const car = new VehiclePhysics(spec, start.x, start.z, start.heading);
  car.setSafePose(start.x, start.z, start.heading);
  const line = track.buildRacingLine(AI.LINE_OFFSET);
  let t = 0;
  let finished = false;
  const maxT = 300;
  let prevS = 0;
  let wraps = 0;
  for (let i = 0; i < 120 * maxT; i++) {
    const st = car.state;
    const look = Math.max(AI.LOOKAHEAD_MIN, st.speed * AI.LOOKAHEAD_PER_SPEED);
    const targetS = st.trackS + look;
    const idx = Math.min(line.length - 1, Math.max(0, Math.round((targetS / track.length) * (line.length - 1))));
    const target = track.pointAtOffset(targetS, line[idx] ?? 0);
    const desired = Math.atan2(target.z - st.z, target.x - st.x);
    let err = desired - st.heading;
    while (err > Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;
    const steer = Math.max(-1, Math.min(1, err * 2.4));
    const curv = track.sampleAt(st.trackS + 14).curvature;
    const vTarget = Math.sqrt((1.02 * PHYSICS.GRAVITY) / Math.max(1e-4, Math.abs(curv) + 0.0035));
    const throttle = car.state.speed < vTarget * 1.02 ? 0.95 : 0.1;
    const brake = car.state.speed > vTarget * 1.15 ? 0.55 : 0;
    car.step(DT, { throttle, brake, steer, handbrake: false });
    const proj = track.project(st.x, st.z, st.trackIndex);
    const sample = track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    car.resolveBarrier(track, sample.halfWidth, sample.gutter);
    if (st.trackS < prevS - 100) wraps++;
    prevS = st.trackS;
    t += DT;
    if (st.trackS > track.length - 40) {
      finished = true;
      break;
    }
    if (wraps > 2) break;
  }
  const mm = Math.floor(t / 60);
  const ss = (t % 60).toFixed(1);
  check(
    "AI proxy finish 3:20–3:45",
    finished && t >= 200 && t <= 225,
    `${finished ? `${mm}:${ss.padStart(4, "0")}` : "tidak finish"} (${t.toFixed(1)} s)`,
  );
}

/* ------------------------------------------------------------------ */
/* 10. Konsistensi mobil rival                                         */
/* ------------------------------------------------------------------ */
function testCars(): void {
  const ids = new Set(CARS.map((c) => c.id));
  check("4 mobil terdaftar, id unik", ids.size === 4, [...ids].join(", "));
  let ok = true;
  for (const c of CARS) {
    if (c.gears.length !== 5) ok = false;
    if (c.mass < 800 || c.mass > 1500) ok = false;
    if (c.inertiaYaw < 900) ok = false;
  }
  check("Spesifikasi mobil valid", ok, "5-speed, massa & inertia wajar");
}

export function runAll(): void {
  console.log("=== EUROBEAT DRIFT LEGEND — QA SIM ===");
  testAccel();
  testTopSpeed(0, "flat", 160, 176);
  testTopSpeed(-0.07, "downhill 7%", 176, 196);
  testHairpin();
  testHandbrakeDrift();
  testNaNGuard();
  testTrack();
  testBarrier();
  testLongRun();
  testLapTime();
  testCars();
  console.log("\n=== RINGKASAN ===");
  const pass = results.filter((r) => r.pass).length;
  console.log(`${pass}/${results.length} skenario lulus`);
  if (failures > 0) {
    console.log(`\n${failures} GAGAL:`);
    for (const r of results.filter((x) => !x.pass)) console.log(` - ${r.name}: ${r.detail}`);
    process.exitCode = 1;
  }
}
