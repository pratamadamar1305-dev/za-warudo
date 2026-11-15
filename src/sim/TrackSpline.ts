/**
 * TrackSpline.ts — geometri Gunma Pass (§4).
 *
 * Layout dibangun analitik (garis lurus + busur) lalu dihaluskan lewat
 * centripetal Catmull-Rom, kemudian di-resample seragam 1.5 m sehingga
 * curvature, racing line, dan lookup AI semuanya konsisten.
 *
 * Catatan deviasi sadar dari §4: spesifikasi meminta spline *tertutup* padahal
 * race hanya 1 putaran dari puncak (980 m) ke kaki (340 m) — turun 640 m.
 * Loop tertutup akan memaksa tanjakan 640 m di seam, yang tidak mungkin secara
 * geometri jalan. Jadi spline dibuka (closed = false) dengan flag `closed`
 * tetap disediakan untuk sirkuit lain.
 */

export interface TrackSample {
  /** posisi dunia */
  x: number;
  y: number;
  z: number;
  /** jarak kumulatif dari start (m) */
  s: number;
  /** 1/R bertanda; positif = belok kanan */
  curvature: number;
  /** setengah lebar jalan (m) */
  halfWidth: number;
  /** lebar gutter di sisi dalam (m), 0 = tidak ada */
  gutter: number;
  /** sisi gutter: +1 = kanan, -1 = kiri, 0 = tidak ada */
  gutterSide: number;
  tunnel: boolean;
  bridge: boolean;
  /** kemiringan longitudinal (rad), positif = menanjak */
  grade: number;
}

export interface TrackFrame {
  x: number;
  y: number;
  z: number;
  /** heading (rad), 0 = +X */
  heading: number;
  halfWidth: number;
  curvature: number;
  tunnel: boolean;
  bridge: boolean;
  gutter: number;
  gutterSide: number;
}

export interface Projection {
  s: number;
  /** jarak lateral bertanda, + = kanan dari arah maju */
  lateral: number;
  index: number;
  distanceToCenter: number;
}

interface Segment {
  kind: "straight" | "arc";
  length: number;
  /** untuk arc */
  radius?: number;
  /** derajat, positif = kanan */
  angle?: number;
  grade: number;
  gutter?: boolean;
  tunnel?: boolean;
  bridge?: boolean;
  width?: number;
}

const RESAMPLE_STEP = 1.5;

export class TrackSpline {
  readonly points: TrackSample[] = [];
  readonly closed: boolean;
  private grid = new Map<string, number[]>();
  private cell = 24;

  constructor(segments: Segment[], closed = false) {
    this.closed = closed;
    const raw = buildWaypoints(segments, closed);
    const smooth = smoothWithCatmullRom(raw, closed);
    const resampled = resampleUniform(smooth, RESAMPLE_STEP, closed);
    this.points = assignMetrics(resampled, closed);
    this.buildGrid();
  }

  get length(): number {
    return this.points.length > 0 ? this.points[this.points.length - 1]!.s : 0;
  }

  get startSample(): TrackSample {
    return this.points[0]!;
  }

  sampleAt(s: number): TrackSample {
    const n = this.points.length;
    if (n === 0) throw new Error("Track kosong");
    let ss = s;
    if (this.closed) {
      ss = ((ss % this.length) + this.length) % this.length;
    } else {
      ss = Math.max(0, Math.min(this.length - 0.001, ss));
    }
    const idx = Math.max(0, Math.min(n - 1, Math.round((ss / this.length) * (n - 1))));
    return this.points[idx]!;
  }

  /** Frame interpolasi halus pada jarak s. */
  frameAt(s: number, lookAhead = 2): TrackFrame {
    const a = this.sampleAt(s);
    const b = this.sampleAt(s + lookAhead);
    const heading = Math.atan2(b.z - a.z, b.x - a.x);
    const gutter = a.gutter;
    return {
      x: a.x,
      y: a.y,
      z: a.z,
      heading: Number.isFinite(heading) ? heading : 0,
      halfWidth: a.halfWidth,
      curvature: a.curvature,
      tunnel: a.tunnel,
      bridge: a.bridge,
      gutter,
      gutterSide: a.gutterSide,
    };
  }

  /** Titik tengah lintasan + offset lateral (untuk racing line / spawn). */
  pointAtOffset(s: number, lateral: number): { x: number; z: number; y: number; heading: number } {
    const f = this.frameAt(s);
    const nx = Math.cos(f.heading + Math.PI / 2);
    const nz = Math.sin(f.heading + Math.PI / 2);
    return { x: f.x + nx * lateral, z: f.z + nz * lateral, y: f.y, heading: f.heading };
  }

  /** Proyeksi posisi dunia ke spline. Memakai hint index untuk kecepatan. */
  project(x: number, z: number, hintIndex = -1): Projection {
    let bestIdx = -1;
    let bestD2 = Infinity;
    if (hintIndex >= 0) {
      const n = this.points.length;
      const window = 60;
      for (let k = -window; k <= window; k++) {
        let i = hintIndex + k;
        if (this.closed) i = ((i % n) + n) % n;
        else if (i < 0 || i >= n) continue;
        const p = this.points[i]!;
        const dx = x - p.x;
        const dz = z - p.z;
        const d2 = dx * dx + dz * dz;
        if (d2 < bestD2) {
          bestD2 = d2;
          bestIdx = i;
        }
      }
    }
    if (bestIdx < 0) {
      const candidates = this.gridCandidates(x, z);
      if (candidates.length > 0) {
        for (const i of candidates) {
          const p = this.points[i]!;
          const dx = x - p.x;
          const dz = z - p.z;
          const d2 = dx * dx + dz * dz;
          if (d2 < bestD2) {
            bestD2 = d2;
            bestIdx = i;
          }
        }
      } else {
        for (let i = 0; i < this.points.length; i++) {
          const p = this.points[i]!;
          const dx = x - p.x;
          const dz = z - p.z;
          const d2 = dx * dx + dz * dz;
          if (d2 < bestD2) {
            bestD2 = d2;
            bestIdx = i;
          }
        }
      }
    }
    if (bestIdx < 0) bestIdx = 0;
    const p = this.points[bestIdx]!;
    const f = this.frameAt(p.s);
    // lateral: proyeksi relatif terhadap normal kanan
    const nx = Math.cos(f.heading + Math.PI / 2);
    const nz = Math.sin(f.heading + Math.PI / 2);
    const lateral = (x - p.x) * nx + (z - p.z) * nz;
    return {
      s: p.s,
      lateral,
      index: bestIdx,
      distanceToCenter: Math.abs(lateral),
    };
  }

  /** Racing line precompute: offset lateral menuju apex, dihaluskan. */
  buildRacingLine(offset = 3.2): Float32Array {
    const n = this.points.length;
    const raw = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const p = this.points[i]!;
      const k = p.curvature;
      const side = Math.abs(k) < 1e-4 ? 0 : Math.sign(k);
      // masuk ke dalam tikungan (berlawanan arah curvature)
      raw[i] = -side * Math.min(offset, p.halfWidth * 0.72);
    }
    // smoothing 3 pass box filter supaya keluar-masuk apex mulus
    let cur = raw;
    for (let pass = 0; pass < 3; pass++) {
      const next = new Float32Array(n);
      const r = 8;
      for (let i = 0; i < n; i++) {
        let sum = 0;
        let cnt = 0;
        for (let k = -r; k <= r; k++) {
          let j = i + k;
          if (this.closed) j = ((j % n) + n) % n;
          else if (j < 0 || j >= n) continue;
          sum += cur[j]!;
          cnt++;
        }
        next[i] = cnt > 0 ? sum / cnt : 0;
      }
      cur = next;
    }
    return cur;
  }

  private buildGrid(): void {
    this.grid.clear();
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i]!;
      const key = cellKey(p.x, p.z, this.cell);
      const arr = this.grid.get(key);
      if (arr) arr.push(i);
      else this.grid.set(key, [i]);
    }
  }

  private gridCandidates(x: number, z: number): number[] {
    const out: number[] = [];
    const cx = Math.floor(x / this.cell);
    const cz = Math.floor(z / this.cell);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const arr = this.grid.get(`${cx + dx},${cz + dz}`);
        if (arr) out.push(...arr);
      }
    }
    return out;
  }
}

function cellKey(x: number, z: number, cell: number): string {
  return `${Math.floor(x / cell)},${Math.floor(z / cell)}`;
}

/* ------------------------------------------------------------------ */
/* Konstruksi waypoint                                                 */
/* ------------------------------------------------------------------ */

interface Waypoint {
  x: number;
  z: number;
  s: number;
  grade: number;
  gutter: number;
  gutterSide: number;
  tunnel: boolean;
  bridge: boolean;
  width: number;
}

function buildWaypoints(segments: Segment[], _closed: boolean): Waypoint[] {
  const pts: Waypoint[] = [];
  let x = 0;
  let z = 0;
  let heading = Math.PI / 2; // menghadap +Z
  let s = 0;

  for (const seg of segments) {
    const grade = seg.grade;
    const gutter = seg.gutter ? 0.45 : 0;
    const width = seg.width ?? 9;
    if (seg.kind === "straight") {
      const steps = Math.max(1, Math.ceil(seg.length / 3));
      const stepLen = seg.length / steps;
      for (let i = 0; i < steps; i++) {
        pts.push({
          x,
          z,
          s,
          grade,
          gutter,
          gutterSide: seg.gutter ? 1 : 0,
          tunnel: seg.tunnel ?? false,
          bridge: seg.bridge ?? false,
          width,
        });
        x += Math.cos(heading) * stepLen;
        z += Math.sin(heading) * stepLen;
        s += stepLen;
      }
    } else {
      const radius = seg.radius ?? 40;
      const angle = ((seg.angle ?? 90) * Math.PI) / 180;
      const dir = Math.sign(angle) || 1;
      const arcLen = Math.abs(angle) * radius;
      const steps = Math.max(6, Math.ceil(arcLen / 3));
      const dAng = angle / steps;
      const stepLen = arcLen / steps;
      const gutterSide = dir; // sisi dalam tikungan = arah belok
      for (let i = 0; i < steps; i++) {
        pts.push({
          x,
          z,
          s,
          grade,
          gutter,
          gutterSide: seg.gutter ? gutterSide : 0,
          tunnel: seg.tunnel ?? false,
          bridge: seg.bridge ?? false,
          width,
        });
        // gerak maju setengah langkah, belok, maju setengah langkah
        x += Math.cos(heading) * stepLen * 0.5;
        z += Math.sin(heading) * stepLen * 0.5;
        heading += dAng;
        x += Math.cos(heading) * stepLen * 0.5;
        z += Math.sin(heading) * stepLen * 0.5;
        s += stepLen;
      }
    }
  }
  // titik akhir
  pts.push({
    x,
    z,
    s,
    grade: segments[segments.length - 1]?.grade ?? 0,
    gutter: 0,
    gutterSide: 0,
    tunnel: false,
    bridge: false,
    width: segments[segments.length - 1]?.width ?? 9,
  });
  return pts;
}



/* ------------------------------------------------------------------ */
/* Catmull-Rom (centripetal)                                           */
/* ------------------------------------------------------------------ */

function smoothWithCatmullRom(pts: Waypoint[], closed: boolean): Waypoint[] {
  if (pts.length < 3) return pts;
  const out: Waypoint[] = [];
  const n = pts.length;
  const alpha = 0.5;

  const get = (i: number): Waypoint => {
    if (closed) return pts[((i % n) + n) % n]!;
    return pts[Math.max(0, Math.min(n - 1, i))]!;
  };

  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const steps = 6;
    for (let k = 0; k < steps; k++) {
      const t = k / steps;
      out.push({
        x: catmull(p0.x, p1.x, p2.x, p3.x, t, alpha),
        z: catmull(p0.z, p1.z, p2.z, p3.z, t, alpha),
        s: p1.s + (p2.s - p1.s) * t,
        grade: p1.grade,
        gutter: p1.gutter,
        gutterSide: p1.gutterSide,
        tunnel: p1.tunnel,
        bridge: p1.bridge,
        width: p1.width,
      });
    }
  }
  if (!closed) out.push(pts[pts.length - 1]!);
  return out;
}

function catmull(p0: number, p1: number, p2: number, p3: number, t: number, alpha: number): number {
  const t0 = 0;
  const t1 = t0 + Math.pow(Math.hypot(p1 - p0, 0) + 1e-4, alpha);
  const t2 = t1 + Math.pow(Math.hypot(p2 - p1, 0) + 1e-4, alpha);
  const t3 = t2 + Math.pow(Math.hypot(p3 - p2, 0) + 1e-4, alpha);
  const tt = t1 + (t2 - t1) * t;
  const a1 = lerp(p0, p1, (tt - t0) / (t1 - t0));
  const a2 = lerp(p1, p2, (tt - t1) / (t2 - t1));
  const a3 = lerp(p2, p3, (tt - t2) / (t3 - t2));
  const b1 = lerp(a1, a2, (tt - t0) / (t2 - t0));
  const b2 = lerp(a2, a3, (tt - t1) / (t3 - t1));
  return lerp(b1, b2, (tt - t1) / (t2 - t1));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ------------------------------------------------------------------ */
/* Resample seragam + metrik                                           */
/* ------------------------------------------------------------------ */

function resampleUniform(pts: Waypoint[], stepLen: number, closed: boolean): Waypoint[] {
  if (pts.length < 2) return pts;
  // hitung panjang kumulatif segmen
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    cum.push(cum[i - 1]! + Math.hypot(b.x - a.x, b.z - a.z));
  }
  const total = cum[cum.length - 1]!;
  const count = Math.max(2, Math.ceil(total / stepLen));
  const out: Waypoint[] = [];
  let cursor = 0;
  for (let i = 0; i <= count; i++) {
    const targetS = closed ? (i / count) * total : Math.min(total, (i / count) * total);
    while (cursor < cum.length - 2 && cum[cursor + 1]! < targetS) cursor++;
    const a = pts[cursor]!;
    const b = pts[Math.min(pts.length - 1, cursor + 1)]!;
    const segLen = Math.max(1e-6, cum[cursor + 1]! - cum[cursor]!);
    const t = Math.max(0, Math.min(1, (targetS - cum[cursor]!) / segLen));
    out.push({
      x: lerp(a.x, b.x, t),
      z: lerp(a.z, b.z, t),
      s: targetS,
      grade: lerp(a.grade, b.grade, t),
      gutter: a.gutter,
      gutterSide: a.gutterSide,
      tunnel: a.tunnel,
      bridge: a.bridge,
      width: lerp(a.width, b.width, t),
    });
  }
  // set s agar tepat seragam
  for (let i = 0; i < out.length; i++) out[i]!.s = (i / count) * total;
  return out;
}

function assignMetrics(pts: Waypoint[], closed: boolean): TrackSample[] {
  const n = pts.length;
  const out: TrackSample[] = [];
  let elevation = 980;
  const prevY: number[] = new Array(n).fill(0);

  // Elevasi diintegrasikan dari grade tiap sampel (positif = menanjak)
  prevY[0] = elevation;
  for (let i = 1; i < n; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    const dist = Math.hypot(b.x - a.x, b.z - a.z) || 0.001;
    // grade positif = turun, jadi elevasi berkurang sebesar tan(grade)*dist
    elevation -= Math.tan(b.grade) * dist;
    prevY[i] = elevation;
  }

  // curvature via tiga titik
  for (let i = 0; i < n; i++) {
    const i0 = Math.max(0, i - 1);
    const i2 = Math.min(n - 1, i + 1);
    const a = pts[i0]!;
    const b = pts[i]!;
    const c = pts[i2]!;
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const bcx = c.x - b.x;
    const bcz = c.z - b.z;
    const cross = abx * bcz - abz * bcx;
    const area = Math.abs(cross) * 0.5;
    const la = Math.hypot(abx, abz);
    const lb = Math.hypot(bcx, bcz);
    const lc = Math.hypot(c.x - a.x, c.z - a.z);
    let k = 0;
    if (la > 1e-4 && lb > 1e-4 && lc > 1e-4 && area > 1e-6) {
      k = (4 * area) / (la * lb * lc);
      if (cross < 0) k = -k;
    }
    out.push({
      x: b.x,
      y: prevY[i] ?? elevation,
      z: b.z,
      s: b.s,
      curvature: k,
      halfWidth: b.width * 0.5,
      gutter: b.gutter,
      gutterSide: b.gutterSide,
      tunnel: b.tunnel,
      bridge: b.bridge,
      grade: b.grade,
    });
  }

  // smoothing curvature (5 pass) — menghilangkan jitter numerik
  const src = out.map((p) => p.curvature);
  let cur = src;
  const win = 6;
  for (let pass = 0; pass < 5; pass++) {
    const next = new Array<number>(src.length);
    for (let i = 0; i < src.length; i++) {
      let sum = 0;
      let c = 0;
      for (let k = -win; k <= win; k++) {
        let j = i + k;
        if (closed) j = ((j % src.length) + src.length) % src.length;
        else if (j < 0 || j >= src.length) continue;
        sum += cur[j]!;
        c++;
      }
      next[i] = c > 0 ? sum / c : 0;
    }
    cur = next;
  }
  for (let i = 0; i < out.length; i++) out[i]!.curvature = cur[i]!;
  return out;
}

/* ------------------------------------------------------------------ */
/* Layout Gunma Pass                                                   */
/* ------------------------------------------------------------------ */

/**
 * Segmen sesuai §4 berurutan. Grade dipilih agar total turun ≈ 640 m dari
 * 980 m ke 340 m (rata-rata ~12.3% pada panjang 5.2 km; spesifikasi menyebut
 * 7% rata-rata — angka itu tidak konsisten dengan 980→340 m, jadi titik
 * elevasi yang diprioritaskan dan grade maksimum dijaga ≤ 12%).
 */
export function buildGunmaPass(): TrackSpline {
  const GL = 0.123; // 12.3% agar 980 m -> 340 m pada 5.2 km (lihat catatan di README)
  const segments: Segment[] = [
    /* 1. Straight pembuka ~600 m, 9 m lebar */
    { kind: "straight", length: 600, grade: GL, width: 9 },
    { kind: "arc", length: 0, radius: 220, angle: -18, grade: GL },
    { kind: "straight", length: 180, grade: GL },
    /* 2. S-curve pembuka: 3 tikungan cepat r 65-90 */
    { kind: "straight", length: 40, grade: GL },
    { kind: "arc", length: 0, radius: 90, angle: 62, grade: GL },
    { kind: "straight", length: 55, grade: GL },
    { kind: "arc", length: 0, radius: 72, angle: -54, grade: GL },
    { kind: "straight", length: 48, grade: GL },
    { kind: "arc", length: 0, radius: 68, angle: 70, grade: GL },
    /* 3. Hairpin #1 r 18 + gutter sisi dalam */
    { kind: "straight", length: 70, grade: GL },
    { kind: "arc", length: 0, radius: 18, angle: 178, grade: GL, gutter: true },
    { kind: "straight", length: 60, grade: GL },
    /* 4. Section menengah cepat + tunnel 80 m */
    { kind: "arc", length: 0, radius: 130, angle: -38, grade: GL },
    { kind: "straight", length: 360, grade: GL },
    { kind: "straight", length: 80, grade: GL, tunnel: true },
    { kind: "straight", length: 380, grade: GL },
    { kind: "arc", length: 0, radius: 120, angle: 44, grade: GL },
    { kind: "straight", length: 380, grade: GL },
    { kind: "arc", length: 0, radius: 95, angle: -30, grade: GL },
    { kind: "straight", length: 260, grade: GL },
    { kind: "straight", length: 240, grade: GL },
    { kind: "arc", length: 0, radius: 150, angle: -46, grade: GL },
    { kind: "straight", length: 120, grade: GL },
    /* 5. FIVE CONSECUTIVE HAIRPINS — jarak apex ~55 m */
    { kind: "arc", length: 0, radius: 17, angle: 178, grade: GL, gutter: true },
    { kind: "straight", length: 22, grade: GL },
    { kind: "arc", length: 0, radius: 20, angle: -178, grade: GL, gutter: true },
    { kind: "straight", length: 18, grade: GL },
    { kind: "arc", length: 0, radius: 16, angle: 178, grade: GL, gutter: true },
    { kind: "straight", length: 22, grade: GL },
    { kind: "arc", length: 0, radius: 19, angle: -178, grade: GL, gutter: true },
    { kind: "straight", length: 18, grade: GL },
    { kind: "arc", length: 0, radius: 18, angle: 178, grade: GL, gutter: true },
    { kind: "straight", length: 70, grade: GL },
    /* 6. Straight 400 m + jembatan + danau di kiri */
    { kind: "arc", length: 0, radius: 110, angle: -34, grade: GL },
    { kind: "straight", length: 160, grade: GL, bridge: true },
    { kind: "straight", length: 400, grade: GL, bridge: true },
    /* 7. Chicane terakhir + finish */
    { kind: "arc", length: 0, radius: 55, angle: -46, grade: GL },
    { kind: "straight", length: 45, grade: GL },
    { kind: "arc", length: 0, radius: 50, angle: 54, grade: GL },
    { kind: "straight", length: 70, grade: GL },
    { kind: "arc", length: 0, radius: 85, angle: -40, grade: 0 },
    { kind: "straight", length: 150, grade: 0 },
  ];
  return new TrackSpline(segments, false);
}
