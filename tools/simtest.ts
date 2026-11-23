// simtest.ts — headless QA: runs real physics + DrivingBrain in Node.
// Usage: npx tsc -p tsconfig.sim.json && node simtest-out/tools/simtest.js
import { TrackSpline } from '../src/sim/TrackSpline';
import { VehiclePhysics, carById, PhysicsEnv, MU_DRY } from '../src/sim/VehiclePhysics';
import { DrivingBrain, PROFILES, BrainCarState } from '../src/sim/DrivingBrain';
import { AIOpponent, RIVALS } from '../src/sim/AIOpponent';
import { AutoDrive } from '../src/sim/AutoDrive';
import { RaceLogic, RacerEntry } from '../src/sim/RaceLogic';
import { DriftScore } from '../src/sim/DriftScore';

const DT = 1 / 120;
const spline = new TrackSpline();
console.log(`TRACK length=${spline.length.toFixed(0)}m corners=${spline.corners.length} tunnel=[${spline.tunnelRange[0].toFixed(0)},${spline.tunnelRange[1].toFixed(0)}] bridge=[${spline.bridgeRange[0].toFixed(0)},${spline.bridgeRange[1].toFixed(0)}]`);
for (const c of spline.corners) console.log(`  corner ${c.name} R${c.radius.toFixed(0)} ${c.dir > 0 ? 'KANAN' : 'KIRI'} apex@${c.sApex.toFixed(0)}m`);

function makeEnv(mu = MU_DRY): PhysicsEnv {
  return {
    mu, gripMul: 1, noSpin: false, ghostMode: false, infiniteBoost: false,
    assists: { steer: true, brake: true, recover: true, drift: true },
    upgrades: { tires: 0, suspension: 0, lsd: 0, engine: 0 },
    tuningPreset: 'balanced', paceTorqueMul: 1,
  };
}

function brainState(p: VehiclePhysics): BrainCarState {
  const st = p.state;
  return { x: st.x, y: st.y, z: st.z, heading: st.heading, vx: st.vx, vz: st.vz, speedMs: st.speedMs, slipAngle: st.beta, yawRate: st.yawRate, gear: st.gear, rpm: st.rpm, s: st.s, lateral: st.lateral };
}

// --- Test 1: 0-100 km/h (full throttle, flat-ish start straight)
{
  const p = new VehiclePhysics(carById('hachi86'));
  const start = spline.pointAt(spline.startS, 0);
  p.reset(start.x, start.z, spline.tangentHeadingAt(spline.startS), spline, 0);
  const env = makeEnv();
  let t = 0, t100 = -1, maxV = 0;
  for (let i = 0; i < 120 * 30; i++) {
    p.step({ steer: 0, throttle: 1, brake: 0, handbrake: 0 }, DT, spline, env);
    t += DT;
    maxV = Math.max(maxV, p.state.speedKmh);
    if (t100 < 0 && p.state.speedKmh >= 100) t100 = t;
  }
  console.log(`TEST 0-100: ${t100.toFixed(2)}s (target 9.8+-0.5) | top speed on start straight after 30s: ${maxV.toFixed(0)} km/h`);
}

// --- Test 2: top speed downhill (place at top, full throttle 25 s)
{
  const p = new VehiclePhysics(carById('hachi86'));
  const start = spline.pointAt(60, 0);
  p.reset(start.x, start.z, spline.tangentHeadingAt(60), spline, 0);
  const env = makeEnv();
  let maxV = 0;
  for (let i = 0; i < 120 * 25; i++) {
    p.step({ steer: 0, throttle: 1, brake: 0, handbrake: 0 }, DT, spline, env);
    maxV = Math.max(maxV, p.state.speedKmh);
  }
  console.log(`TEST TOP SPEED downhill 25s full throttle: ${maxV.toFixed(0)} km/h (target ~185)`);
}

// --- Test 3: full race — PRO AutoDrive vs 3 AI (5 runs)
function runRace(seed: number, verbose = false) {
  const player = new VehiclePhysics(carById('hachi86'));
  const env = makeEnv();
  const ad = new AutoDrive(spline);
  ad.setMode('pro');
  const rivals = RIVALS.map((def, i) => {
    const ai = new AIOpponent(def, spline, seed * 100 + i);
    ai.setPhysics(new VehiclePhysics(carById(def.carId)));
    return ai;
  });
  const entries: RacerEntry[] = [
    { id: 'player', name: 'PLAYER', isPlayer: true, s: 0, speedMs: 0, finished: false, finishTime: 0, sectorIdx: 0, sectorStartTime: 0 },
    ...rivals.map((r) => ({ id: r.def.id, name: r.def.name, isPlayer: false, s: 0, speedMs: 0, finished: false, finishTime: 0, sectorIdx: 0, sectorStartTime: 0 })),
  ];
  const logic = new RaceLogic(spline);
  logic.reset(entries);
  // grid placement
  const grid = [spline.startS, spline.startS - 8, spline.startS - 16, spline.startS - 24];
  const cars = [player, ...rivals.map((r) => r.physics)];
  cars.forEach((c, i) => {
    const pt = spline.pointAt(grid[i], i % 2 === 0 ? -1.5 : 1.5);
    c.reset(pt.x, pt.z, spline.tangentHeadingAt(grid[i]), spline, 0);
  });
  const drift = new DriftScore();
  let maxSlip = 0, maxSpeed = 0, wallHits = 0, nan = 0, steps = 0;
  let lastCountdown = 3;
  const logs: string[] = [];
  while (logic.phase !== 'finished' && steps < 120 * 600) {
    logic.update(DT, false);
    if (logic.countdownValue !== lastCountdown) lastCountdown = logic.countdownValue;
    const racing = logic.phase === 'racing';
    // player via AutoDrive PRO (grip envelope applies to physics too, through global clamp)
    const muEff = MU_DRY * ad.gripEnvelope;
    const envP: PhysicsEnv = { ...env, mu: muEff, paceTorqueMul: ad.paceTorqueMul };
    const others = rivals.map((r) => brainState(r.physics));
    const gap = logic.gapToLeader;
    const intent = racing ? ad.update(brainState(player), DT, others, muEff, false, gap, spline.finishS - player.state.s, (m) => logs.push(m)) : { steer: 0, throttle: 0, brake: 0, handbrake: 0 };
    if (intent) player.step(intent, DT, spline, envP);
    // rivals
    rivals.forEach((r, i) => {
      r.paceCap = ad.aiPaceCap;
      if (ad.rivalMistake && i === 0) r.blundering = true;
      if (racing) r.update(DT, spline, env, others.filter((_, j) => j !== i).concat([brainState(player)]), brainState(player), MU_DRY);
      else r.physics.step({ steer: 0, throttle: 0, brake: 0, handbrake: 0 }, DT, spline, env);
    });
    // entries sync
    entries[0].s = player.state.s; entries[0].speedMs = player.state.speedMs;
    rivals.forEach((r, i) => { entries[i + 1].s = r.physics.state.s; entries[i + 1].speedMs = r.physics.state.speedMs; });
    maxSlip = Math.max(maxSlip, player.slipDeg);
    maxSpeed = Math.max(maxSpeed, player.state.speedKmh);
    if (player.events.hitWall) wallHits++;
    if (player.events.nanRecovered) nan++;
    drift.update(DT, player.driftAngleDeg, player.state.speedKmh, player.events.hitWall, 1);
    steps++;
  }
  const pos = logic.playerPosition;
  const time = entries[0].finishTime;
  const aiTimes = entries.slice(1).map((e) => `${e.name}:${e.finishTime.toFixed(1)}`).join(' ');
  console.log(`RACE seed=${seed}: player P${pos} time=${time.toFixed(2)}s | AI ${aiTimes} | maxSlip=${maxSlip.toFixed(0)}deg maxV=${maxSpeed.toFixed(0)} wallHits=${wallHits} nan=${nan} driftScore=${drift.displayPoints}`);
  if (verbose) for (const l of logs) console.log('  ' + l);
  return { pos, time, maxSlip, maxSpeed, wallHits, nan };
}

console.log('--- PRO races ---');
const results = [];
for (let i = 1; i <= 5; i++) results.push(runRace(i));
const p1 = results.filter((r) => r.pos === 1).length;
const times = results.map((r) => r.time);
console.log(`PRO SUMMARY: P1 ${p1}/5 | time range ${Math.min(...times).toFixed(1)}-${Math.max(...times).toFixed(1)}s (target 185-195s = 3:05-3:15) | maxSlip overall ${Math.max(...results.map((r) => r.maxSlip)).toFixed(0)}deg | wallHits ${results.reduce((a, r) => a + r.wallHits, 0)}`);

// --- Test 4: chill mode sanity (avg speed, no drift, no spin)
{
  const player = new VehiclePhysics(carById('hachi86'));
  const env = makeEnv();
  const ad = new AutoDrive(spline);
  ad.setMode('chill');
  const start = spline.pointAt(spline.startS, 0);
  player.reset(start.x, start.z, spline.tangentHeadingAt(spline.startS), spline, 0);
  let sumV = 0, n = 0, maxSlip = 0, steps = 0;
  while (player.state.s < spline.finishS && steps < 120 * 600) {
    const intent = ad.update(brainState(player), DT, [], MU_DRY, false, 0, spline.finishS - player.state.s, () => {});
    if (intent) player.step(intent, DT, spline, env);
    sumV += player.state.speedKmh; n++;
    maxSlip = Math.max(maxSlip, player.slipDeg);
    steps++;
  }
  console.log(`CHILL: avg ${(sumV / n).toFixed(0)} km/h (target <90) | maxSlip ${maxSlip.toFixed(0)}deg (target <18) | finished=${player.state.s >= spline.finishS} time=${(steps * DT).toFixed(0)}s`);
}

// --- Test 5: normal mode vs hard AI (should sometimes win, sometimes lose)
{
  const player = new VehiclePhysics(carById('hachi86'));
  const env = makeEnv();
  const ad = new AutoDrive(spline);
  ad.setMode('normal');
  const start = spline.pointAt(spline.startS, 0);
  player.reset(start.x, start.z, spline.tangentHeadingAt(spline.startS), spline, 0);
  let steps = 0;
  while (player.state.s < spline.finishS && steps < 120 * 600) {
    const intent = ad.update(brainState(player), DT, [], MU_DRY, false, 0, spline.finishS - player.state.s, () => {});
    if (intent) player.step(intent, DT, spline, env);
    steps++;
  }
  console.log(`NORMAL solo lap: ${(steps * DT).toFixed(1)}s`);
}
