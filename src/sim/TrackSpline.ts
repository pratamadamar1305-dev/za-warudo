// TrackSpline.ts
// "GUNMA PASS" — pure-math track definition: Catmull-Rom spline, curvature,
// precomputed racing line, gutter zones, corners, sectors, tunnel/bridge marks.
// No three.js / DOM imports so headless simulation tests can use it.

export interface Vec3 { x: number; y: number; z: number; }

export interface SplineSample {
  s: number; // arc length from start (m)
  x: number; y: number; z: number;
  tx: number; ty: number; tz: number; // tangent (unit)
  rx: number; rz: number; // right vector in XZ (unit)
  curvature: number; // signed, + = right turn (1/m)
  racingOffset: number; // lateral offset of racing line, right +
  gutterSide: number; // +1 right, -1 left, 0 none
  gutterInner: number; // abs lateral band start
  gutterOuter: number; // abs lateral band end
  tunnel: boolean;
  bridge: boolean;
  section: number;
}

export interface CornerInfo {
  sApex: number; sStart: number; sEnd: number;
  radius: number; dir: number; // +1 right, -1 left
  name: string; // HAIRPIN / CORNER / SWEEP
}

export const ROAD_HALF_WIDTH = 4.5;
export const WALL_LATERAL = 4.35;
export const START_S = 40;

interface Mark { name: string; sStart: number; sEnd: number; }

class TrackBuilder {
  pts: Vec3[] = [];
  marks: Mark[] = [];
  x = 0; y = 980; z = 0; heading = 0; // heading 0 = -Z, + = right turn
  length = 0;
  private lastX = 0; private lastY = 980; private lastZ = 0;
  constructor() { this.pts.push({ x: 0, y: 980, z: 0 }); }
  private push(x: number, y: number, z: number) {
    this.length += Math.hypot(x - this.lastX, y - this.lastY, z - this.lastZ);
    this.pts.push({ x, y, z });
    this.lastX = x; this.lastY = y; this.lastZ = z;
  }
  mark(name: string, sStart: number, sEnd: number) { this.marks.push({ name, sStart, sEnd }); }
  straight(len: number, drop: number) {
    const fx = Math.sin(this.heading), fz = -Math.cos(this.heading);
    const steps = Math.max(1, Math.round(len / 20));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      this.push(this.x + fx * len * t, this.y - drop * t, this.z + fz * len * t);
    }
    this.x += fx * len; this.z += fz * len; this.y -= drop;
  }
  curve(radius: number, angleDeg: number, drop: number, dir: number) {
    const total = (Math.abs(angleDeg) * Math.PI) / 180;
    const steps = Math.max(3, Math.round((radius * total) / 8));
    const rx = Math.cos(this.heading), rz = Math.sin(this.heading);
    const cx = this.x + rx * radius * dir, cz = this.z + rz * radius * dir;
    const relX = this.x - cx, relZ = this.z - cz;
    const startY = this.y;
    for (let i = 1; i <= steps; i++) {
      // rotateY(rel, psi) maps (x,z) by -psi in math orientation, so psi = -dir*a
      const a = -dir * (i / steps) * total;
      const cos = Math.cos(a), sin = Math.sin(a);
      this.push(cx + relX * cos + relZ * sin, startY - drop * (i / steps), cz - relX * sin + relZ * cos);
    }
    const last = this.pts[this.pts.length - 1];
    this.x = last.x; this.z = last.z; this.y -= drop;
    this.heading += dir * total;
  }
  hairpin(dir: number, radius: number, drop: number) { this.curve(radius, 180, drop, dir); }
}

function buildControlPoints(): { pts: Vec3[]; marks: Mark[]; length: number } {
  const b = new TrackBuilder();
  // 1. Opening straight 600 m
  b.straight(600, 50);
  // 2. S-curves, R65-90
  b.curve(80, 70, 15, +1);
  b.straight(60, 4);
  b.curve(70, 90, 17, -1);
  b.straight(60, 4);
  b.curve(85, 70, 15, +1);
  // 3. Mid straight
  b.straight(400, 30);
  // 4. Hairpin #1, R18
  b.hairpin(+1, 18, 7);
  // 5. Fast mid + 80 m tunnel
  b.straight(300, 25);
  const tunnelStart = b.length;
  b.straight(80, 7);
  b.mark('tunnel', tunnelStart, b.length);
  b.curve(120, 60, 12, -1);
  b.straight(1400, 105);
  // 6. FIVE CONSECUTIVE HAIRPINS, R16-20
  const dirs = [-1, +1, -1, +1, -1];
  const radii = [18, 16, 20, 17, 19];
  for (let i = 0; i < 5; i++) {
    b.straight(45, 4);
    b.hairpin(dirs[i], radii[i], 6);
  }
  // 7. Sweepers + 400 m bridge straight
  b.curve(90, 50, 10, +1);
  b.straight(60, 4);
  b.curve(75, 50, 10, -1);
  const bridgeStart = b.length;
  b.straight(400, 32);
  b.mark('bridge', bridgeStart, b.length);
  // 8. Final chicane
  b.curve(35, 45, 5, +1);
  b.straight(30, 2);
  b.curve(35, 45, 5, -1);
  // 9. Finish straight
  b.straight(600, 40);
  // Rescale elevation so total drop is exactly 640 m (980 -> 340)
  const totalDrop = 980 - b.y;
  const k = 640 / totalDrop;
  for (const p of b.pts) p.y = 980 - (980 - p.y) * k;
  return { pts: b.pts, marks: b.marks, length: b.length };
}

function catmullRom(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
  const t2 = t * t, t3 = t2 * t;
  const cr = (a: number, b2: number, c: number, d: number) =>
    0.5 * ((2 * b2) + (-a + c) * t + (2 * a - 5 * b2 + 4 * c - d) * t2 + (-a + 3 * b2 - 3 * c + d) * t3);
  return { x: cr(p0.x, p1.x, p2.x, p3.x), y: cr(p0.y, p1.y, p2.y, p3.y), z: cr(p0.z, p1.z, p2.z, p3.z) };
}

export class TrackSpline {
  readonly length: number;
  readonly samples: SplineSample[] = [];
  readonly corners: CornerInfo[] = [];
  readonly sectorBounds: number[] = [];
  readonly tunnelRange: [number, number] = [0, 0];
  readonly bridgeRange: [number, number] = [0, 0];
  readonly startS = START_S;
  readonly finishS: number;
  readonly minX: number; readonly maxX: number; readonly minZ: number; readonly maxZ: number;

  constructor() {
    const { pts, marks, length } = buildControlPoints();
    this.length = length;
    this.finishS = length - 5;
    for (const m of marks) {
      if (m.name === 'tunnel') { this.tunnelRange[0] = m.sStart; this.tunnelRange[1] = m.sEnd; }
      if (m.name === 'bridge') { this.bridgeRange[0] = m.sStart; this.bridgeRange[1] = m.sEnd; }
    }
    // --- Catmull-Rom sampling every ~2 m
    const raw: { x: number; y: number; z: number; s: number }[] = [];
    let acc = 0;
    let prev = pts[0];
    raw.push({ x: prev.x, y: prev.y, z: prev.z, s: 0 });
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const chord = Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
      const steps = Math.max(1, Math.round(chord / 2));
      for (let j = 1; j <= steps; j++) {
        const p = catmullRom(p0, p1, p2, p3, j / steps);
        acc += Math.hypot(p.x - prev.x, p.y - prev.y, p.z - prev.z);
        raw.push({ x: p.x, y: p.y, z: p.z, s: acc });
        prev = p;
      }
    }
    const n = raw.length;
    // --- tangents, right vectors, curvature
    const curv = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const a = raw[Math.max(0, i - 1)], b2 = raw[Math.min(n - 1, i + 1)];
      let tx = b2.x - a.x, ty = b2.y - a.y, tz = b2.z - a.z;
      const tl = Math.hypot(tx, ty, tz) || 1;
      tx /= tl; ty /= tl; tz /= tl;
      let rx = -tz, rz = tx;
      const rl = Math.hypot(rx, rz) || 1;
      rx /= rl; rz /= rl;
      this.samples.push({
        s: raw[i].s, x: raw[i].x, y: raw[i].y, z: raw[i].z,
        tx, ty, tz, rx, rz,
        curvature: 0, racingOffset: 0, gutterSide: 0, gutterInner: 0, gutterOuter: 0,
        tunnel: false, bridge: false, section: 0,
      });
    }
    for (let i = 1; i < n - 1; i++) {
      const a = this.samples[i - 1], b2 = this.samples[i + 1];
      const ds = Math.max(0.5, (b2.s - a.s) / 2);
      const dtx = (b2.tx - a.tx) / (2 * ds), dtz = (b2.tz - a.tz) / (2 * ds);
      // signed curvature: dT/ds projected on right vector (+ = right turn)
      curv[i] = dtx * this.samples[i].rx + dtz * this.samples[i].rz;
    }
    curv[0] = curv[1]; curv[n - 1] = curv[n - 2];
    // smooth curvature (3-tap)
    for (let i = 0; i < n; i++) {
      const a = curv[Math.max(0, i - 1)], b2 = curv[i], c = curv[Math.min(n - 1, i + 1)];
      this.samples[i].curvature = (a + 2 * b2 + c) / 4;
    }
    // --- racing line: tanh toward apex, smoothed over +-40 m
    const rawOff = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const k = this.samples[i].curvature;
      rawOff[i] = Math.tanh(Math.abs(k) * 30) * 3.2 * Math.sign(k);
    }
    const win = 20; // samples (~40 m)
    for (let i = 0; i < n; i++) {
      let sum = 0, cnt = 0;
      for (let j = Math.max(0, i - win); j <= Math.min(n - 1, i + win); j++) { sum += rawOff[j]; cnt++; }
      this.samples[i].racingOffset = sum / cnt;
    }
    // --- gutters (inside of hairpins, R < 26), tunnel/bridge flags
    for (let i = 0; i < n; i++) {
      const smp = this.samples[i];
      if (Math.abs(smp.curvature) > 1 / 26) {
        smp.gutterSide = Math.sign(smp.curvature);
        smp.gutterInner = 3.4; smp.gutterOuter = 4.35;
      }
      if (smp.s >= this.tunnelRange[0] && smp.s <= this.tunnelRange[1]) smp.tunnel = true;
      if (smp.s >= this.bridgeRange[0] && smp.s <= this.bridgeRange[1]) smp.bridge = true;
    }
    // --- corners (for callouts / brake markers / brain)
    let i = 0;
    while (i < n) {
      if (Math.abs(this.samples[i].curvature) > 1 / 45) {
        let j = i, apexIdx = i, apexK = Math.abs(this.samples[i].curvature);
        while (j < n && Math.abs(this.samples[j].curvature) > 1 / 45) {
          if (Math.abs(this.samples[j].curvature) > apexK) { apexK = Math.abs(this.samples[j].curvature); apexIdx = j; }
          j++;
        }
        const radius = 1 / Math.max(apexK, 1e-6);
        const dir = Math.sign(this.samples[apexIdx].curvature) || 1;
        const name = radius < 26 ? 'HAIRPIN' : radius < 45 ? 'CORNER' : 'SWEEP';
        this.corners.push({ sApex: this.samples[apexIdx].s, sStart: this.samples[i].s, sEnd: this.samples[j - 1].s, radius, dir, name });
        i = j;
      } else i++;
    }
    // merge corners closer than 30 m (chicane pairs stay separate if > 30 m apart)
    // --- sectors (5)
    for (let k = 1; k < 5; k++) this.sectorBounds.push((this.length * k) / 5);
    // --- bounds for minimap
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const smp of this.samples) {
      minX = Math.min(minX, smp.x); maxX = Math.max(maxX, smp.x);
      minZ = Math.min(minZ, smp.z); maxZ = Math.max(maxZ, smp.z);
    }
    this.minX = minX; this.maxX = maxX; this.minZ = minZ; this.maxZ = maxZ;
  }

  sampleAt(s: number): SplineSample {
    const arr = this.samples;
    const sc = Math.min(Math.max(s, 0), this.length);
    // binary search
    let lo = 0, hi = arr.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].s < sc) lo = mid + 1; else hi = mid;
    }
    const idx = Math.max(1, lo);
    const a = arr[idx - 1], b2 = arr[idx];
    const span = Math.max(1e-6, b2.s - a.s);
    const t = Math.min(1, Math.max(0, (sc - a.s) / span));
    const lerp = (u: number, v: number) => u + (v - u) * t;
    return {
      s: sc,
      x: lerp(a.x, b2.x), y: lerp(a.y, b2.y), z: lerp(a.z, b2.z),
      tx: lerp(a.tx, b2.tx), ty: lerp(a.ty, b2.ty), tz: lerp(a.tz, b2.tz),
      rx: lerp(a.rx, b2.rx), rz: lerp(a.rz, b2.rz),
      curvature: lerp(a.curvature, b2.curvature),
      racingOffset: lerp(a.racingOffset, b2.racingOffset),
      gutterSide: a.gutterSide, gutterInner: a.gutterInner, gutterOuter: a.gutterOuter,
      tunnel: a.tunnel, bridge: a.bridge, section: a.section,
    };
  }

  curvatureAt(s: number): number { return this.sampleAt(s).curvature; }

  nearest(x: number, z: number, hintS: number): { s: number; lateral: number; dist: number; sample: SplineSample } {
    const arr = this.samples;
    const hintIdx = Math.min(arr.length - 1, Math.max(0, Math.round(hintS / 2)));
    const win = 70;
    let bestIdx = hintIdx, bestD = Infinity;
    for (let i = Math.max(0, hintIdx - win); i <= Math.min(arr.length - 1, hintIdx + win); i++) {
      const dx = arr[i].x - x, dz = arr[i].z - z;
      const d = dx * dx + dz * dz;
      if (d < bestD) { bestD = d; bestIdx = i; }
    }
    const smp = arr[bestIdx];
    const lateral = (x - smp.x) * smp.rx + (z - smp.z) * smp.rz;
    return { s: smp.s, lateral, dist: Math.sqrt(bestD), sample: smp };
  }

  pointAt(s: number, lateral: number): { x: number; y: number; z: number } {
    const smp = this.sampleAt(s);
    return { x: smp.x + smp.rx * lateral, y: smp.y, z: smp.z + smp.rz * lateral };
  }

  racingLinePoint(s: number): { x: number; z: number; rx: number; rz: number } {
    const smp = this.sampleAt(s);
    return { x: smp.x + smp.rx * smp.racingOffset, z: smp.z + smp.rz * smp.racingOffset, rx: smp.rx, rz: smp.rz };
  }

  tangentHeadingAt(s: number): number {
    const smp = this.sampleAt(s);
    return Math.atan2(smp.tx, -smp.tz);
  }

  cornerAhead(sFrom: number, sTo: number): CornerInfo | null {
    for (const c of this.corners) if (c.sApex >= sFrom && c.sApex <= sTo) return c;
    return null;
  }

  gradeAt(s: number): number { return this.sampleAt(s).ty; } // tangent y (negative = downhill)
}
