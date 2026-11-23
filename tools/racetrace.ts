// racetrace.ts — trace AutoDrive PRO in race setup (countdown + grid + rivals)
import { TrackSpline } from '../src/sim/TrackSpline';
import { VehiclePhysics, carById, PhysicsEnv, MU_DRY } from '../src/sim/VehiclePhysics';
import { BrainCarState } from '../src/sim/DrivingBrain';
import { AIOpponent, RIVALS } from '../src/sim/AIOpponent';
import { AutoDrive } from '../src/sim/AutoDrive';
import { RaceLogic, RacerEntry } from '../src/sim/RaceLogic';

const DT = 1 / 120;
const spline = new TrackSpline();
const env: PhysicsEnv = {
  mu: MU_DRY, gripMul: 1, noSpin: false, ghostMode: false, infiniteBoost: false,
  assists: { steer: true, brake: true, recover: true, drift: true },
  upgrades: { tires: 0, suspension: 0, lsd: 0, engine: 0 },
  tuningPreset: 'balanced', paceTorqueMul: 1,
};
const bs = (p: VehiclePhysics): BrainCarState => {
  const st = p.state;
  return { x: st.x, y: st.y, z: st.z, heading: st.heading, vx: st.vx, vz: st.vz, speedMs: st.speedMs, slipAngle: st.beta, yawRate: st.yawRate, gear: st.gear, rpm: st.rpm, s: st.s, lateral: st.lateral };
};
const player = new VehiclePhysics(carById('hachi86'));
const ad = new AutoDrive(spline);
ad.setMode('pro');
const rivals = RIVALS.map((def, i) => {
  const ai = new AIOpponent(def, spline, 100 + i);
  ai.setPhysics(new VehiclePhysics(carById(def.carId)));
  return ai;
});
const entries: RacerEntry[] = [
  { id: 'player', name: 'PLAYER', isPlayer: true, s: 0, speedMs: 0, finished: false, finishTime: 0, sectorIdx: 0, sectorStartTime: 0 },
  ...rivals.map((r) => ({ id: r.def.id, name: r.def.name, isPlayer: false, s: 0, speedMs: 0, finished: false, finishTime: 0, sectorIdx: 0, sectorStartTime: 0 })),
];
const logic = new RaceLogic(spline);
logic.reset(entries);
const grid = [spline.startS, spline.startS - 8, spline.startS - 16, spline.startS - 24];
[player, ...rivals.map((r) => r.physics)].forEach((c, i) => {
  const pt = spline.pointAt(grid[i], i % 2 === 0 ? -1.5 : 1.5);
  c.reset(pt.x, pt.z, spline.tangentHeadingAt(grid[i]), spline, 0);
});
let t = 0, steps = 0;
while (logic.phase !== 'finished' && steps < 120 * 200) {
  logic.update(DT, false);
  const racing = logic.phase === 'racing';
  const muEff = MU_DRY * ad.gripEnvelope;
  const envP: PhysicsEnv = { ...env, paceTorqueMul: ad.paceTorqueMul };
  const others = rivals.map((r) => bs(r.physics));
  const intent = racing ? ad.update(bs(player), DT, others, muEff, false, logic.gapToLeader, spline.finishS - player.state.s, (m) => console.log('LOG ' + m)) : { steer: 0, throttle: 0, brake: 0, handbrake: 0 };
  if (intent) player.step(intent, DT, spline, envP);
  rivals.forEach((r, i) => {
    r.paceCap = ad.aiPaceCap;
    if (racing) r.update(DT, spline, env, others.filter((_, j) => j !== i).concat([bs(player)]), bs(player), MU_DRY);
    else r.physics.step({ steer: 0, throttle: 0, brake: 0, handbrake: 0 }, DT, spline, env);
  });
  entries[0].s = player.state.s; entries[0].speedMs = player.state.speedMs;
  rivals.forEach((r, i) => { entries[i + 1].s = r.physics.state.s; entries[i + 1].speedMs = r.physics.state.speedMs; });
  t += DT; steps++;
  if (steps % 60 === 0) {
    const st = player.state;
    const shown = intent ?? { steer: 0, throttle: 0, brake: 0, handbrake: 0 };
    console.log(`t=${t.toFixed(1)} phase=${logic.phase} s=${st.s.toFixed(0)} lat=${st.lateral.toFixed(1)} v=${st.speedKmh.toFixed(0)} steer=${shown.steer.toFixed(2)} thr=${shown.throttle.toFixed(2)} brk=${shown.brake.toFixed(2)} hb=${shown.handbrake.toFixed(0)} slip=${player.slipDeg.toFixed(0)} yaw=${st.yawRate.toFixed(2)} pace=${ad.paceScaler.toFixed(2)} gap=${logic.gapToLeader.toFixed(1)} pos=P${logic.playerPosition} wall=${player.events.hitWall ? 1 : 0}`);
  }
}
console.log(`DONE t=${t.toFixed(1)} pos=P${logic.playerPosition} playerTime=${entries[0].finishTime.toFixed(1)}`);
