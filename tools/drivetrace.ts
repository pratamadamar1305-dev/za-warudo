// drivetrace.ts — trace brain-driven car state every 0.5s
import { TrackSpline } from '../src/sim/TrackSpline';
import { VehiclePhysics, carById, PhysicsEnv, MU_DRY } from '../src/sim/VehiclePhysics';
import { DrivingBrain, PROFILES, BrainCarState } from '../src/sim/DrivingBrain';

const DT = 1 / 120;
const spline = new TrackSpline();
const env: PhysicsEnv = {
  mu: MU_DRY, gripMul: 1, noSpin: false, ghostMode: false, infiniteBoost: false,
  assists: { steer: true, brake: true, recover: true, drift: true },
  upgrades: { tires: 0, suspension: 0, lsd: 0, engine: 0 },
  tuningPreset: 'balanced', paceTorqueMul: 1,
};
const p = new VehiclePhysics(carById('hachi86'));
const start = spline.pointAt(spline.startS, 0);
p.reset(start.x, start.z, spline.tangentHeadingAt(spline.startS), spline, 0);
const brain = new DrivingBrain(spline, PROFILES.pro);
let t = 0;
for (let i = 0; i < 120 * 150; i++) {
  const st = p.state;
  const car: BrainCarState = { x: st.x, y: st.y, z: st.z, heading: st.heading, vx: st.vx, vz: st.vz, speedMs: st.speedMs, slipAngle: st.beta, yawRate: st.yawRate, gear: st.gear, rpm: st.rpm, s: st.s, lateral: st.lateral };
  const intent = brain.update(car, DT, [], MU_DRY * 1.18);
  p.step(intent, DT, spline, env);
  t += DT;
  if (i % 60 === 0) {
    console.log(`t=${t.toFixed(1)} s=${st.s.toFixed(0)} lat=${st.lateral.toFixed(1)} v=${st.speedKmh.toFixed(0)} steer=${intent.steer.toFixed(2)} thr=${intent.throttle.toFixed(2)} brk=${intent.brake.toFixed(2)} hb=${intent.handbrake.toFixed(0)} slip=${p.slipDeg.toFixed(0)} yaw=${st.yawRate.toFixed(2)} gear=${st.gear} wall=${p.events.hitWall ? 1 : 0}`);
  }
  if (st.s > spline.finishS) { console.log(`FINISH t=${t.toFixed(1)}`); break; }
}
