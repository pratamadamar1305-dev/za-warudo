// splinedebug.ts — inspect spline geometry around hairpin #1
import { TrackSpline } from '../src/sim/TrackSpline';

const spline = new TrackSpline();
console.log(`length=${spline.length.toFixed(0)} samples=${spline.samples.length}`);
// print curvature profile every 20m from 1380 to 1560 (hairpin #1 region)
for (let s = 1380; s <= 1560; s += 10) {
  const smp = spline.sampleAt(s);
  const r = smp.curvature !== 0 ? 1 / Math.abs(smp.curvature) : Infinity;
  console.log(`s=${s} pos=(${smp.x.toFixed(1)},${smp.z.toFixed(1)}) tan=(${smp.tx.toFixed(2)},${smp.tz.toFixed(2)}) kappa=${smp.curvature.toFixed(4)} R=${r.toFixed(1)}`);
}
// check for duplicate/near-duplicate consecutive samples (cusp detector)
let worst = 0, worstS = 0;
for (let i = 1; i < spline.samples.length; i++) {
  const a = spline.samples[i - 1], b = spline.samples[i];
  const d = Math.hypot(b.x - a.x, b.z - a.z);
  if (d < worst || worst === 0) { /* track min */ }
  if (d > 0 && d < 0.5) { worst = d; worstS = b.s; }
}
console.log(`min sample spacing <0.5m at s=${worstS} spacing=${worst.toFixed(3)}`);
// max curvature anywhere
let maxK = 0, maxKS = 0;
for (const smp of spline.samples) if (Math.abs(smp.curvature) > maxK) { maxK = Math.abs(smp.curvature); maxKS = smp.s; }
console.log(`max |kappa|=${maxK.toFixed(3)} (R=${(1 / maxK).toFixed(1)}) at s=${maxKS.toFixed(0)}`);
