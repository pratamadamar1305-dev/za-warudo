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
var AI = {
  /** Skill dasar — pengali vTarget tikungan. */
  AI_SKILL_BASE: 0.94,
  /** Batas rubber-band down/up (§7). */
  RUBBERBAND_BEHIND_S: 6,
  RUBBERBAND_AHEAD_S: 8,
  RUBBERBAND_SKILL_DOWN: 0.04,
  RUBBERBAND_SKILL_UP: 0.03,
  /** Lookahead pure pursuit. */
  LOOKAHEAD_MIN: 8,
  LOOKAHEAD_PER_SPEED: 0.55,
  /** Jarak lateral racing line maks. */
  LINE_OFFSET: 3.2,
  /** Gap kemenangan "kuncup" 60 m. */
  WIN_GAP_M: 60
};
var RIVALS = [
  {
    id: "ryo",
    name: "RYO",
    carId: "fd7",
    skill: 0.97,
    aggression: 0.95,
    blunder: 0.14,
    gutterLove: 0.25,
    tone: "#ffd400",
    lines: {
      intro: [
        "FD-7 ini bukan mainan, bro. Sori kalau kamu ketinggalan.",
        "Downhill ini milikku. Kamu cuma numpang lewat."
      ],
      overtaken: ["Hah? Kamu lewat? Nggak mungkin!", "Yosha... tapi ini belum selesai."],
      overtaking: ["Mada mada! Masih jauh, kawan.", "See ya di bawah, sori ya."],
      winning: ["Kamu masih di belakang? Kasihan.", "Tekanan ban aja belum panas, bro."],
      losing: ["Sial... FD-7 ini kok ngadat?!", "Jangan senang dulu, masih jauh."],
      finishWin: ["Gampang. Balik lagi kalau sudah bisa drift beneran.", "Sori, kamu telat dua tikungan."],
      finishLose: ["...Apa? Aku kalah sama AE86? Tidak mungkin!", "Yosha... kamu hebat. Lain kali aku balas."]
    }
  },
  {
    id: "kenji",
    name: "KENJI",
    carId: "s13",
    skill: 0.9,
    aggression: 0.8,
    blunder: 0.07,
    gutterLove: 0.9,
    tone: "#2f6bff",
    lines: {
      intro: [
        "Line-nya sudah aku hafal. Kamu nggak bisa lewat.",
        "S13-ku paling jago di gutter. Lihat sendiri nanti."
      ],
      overtaken: ["Heh, line itu punyaku.", "Nggak boleh lewat situ, bre!"],
      overtaking: ["Blok kanan-kiri, silakan coba.", "Defensif itu seni, kawan."],
      winning: ["Aman. Santai dulu.", "Kamu terlalu jauh, bro."],
      losing: ["Kok bisa... line-ku kunci!", "Jangan di dalam gutter terus, dang!"],
      finishWin: ["Told you. Line itu milikku.", "Latihan gutter dulu, baru tantang aku."],
      finishLose: ["Ah... kalah. Tapi teknik gutter-ku tetap terbaik.", "Kamu licik. Aku suka itu."]
    }
  },
  {
    id: "ayu",
    name: "AYU",
    carId: "ek9",
    skill: 0.94,
    aggression: 0.55,
    blunder: 0.03,
    gutterLove: 0.5,
    tone: "#21e6c1",
    lines: {
      intro: [
        "Aku nggak suka ngebut... tapi di sini aku paling cepat.",
        "EK-9 ini halus. Kamu bakal kaget di bagian cepat."
      ],
      overtaken: ["Eh? Cepat juga kamu.", "Aku harus lebih halus lagi."],
      overtaking: ["Sori, aku lewat ya.", "VTEC sudah buka. Dadah!"],
      winning: ["Masih nyaman di sini.", "Smooth is fast, kawan."],
      losing: ["Hmm... aku harus naikkan ritme.", "Jangan salahkan aku kalau aku balap sekarang."],
      finishWin: ["Smooth selalu menang.", "Terima kasih sudah balapan. Kamu kuat di hairpin."],
      finishLose: ["Kamu lebih halus dari dugaanku. Respect.", "Aku kalah. Tapi besok aku balas, ya."]
    }
  }
];
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
var RACE = {
  TRACK_LENGTH_M: 5200,
  START_ALTITUDE: 980,
  FINISH_ALTITUDE: 340,
  ROAD_WIDTH: 9,
  /** Lebar gutter. */
  GUTTER_WIDTH: 0.45,
  COUNTDOWN_SEC: 3,
  RESULTS_TIMEOUT_S: 60,
  GHOST_SAMPLE_HZ: 10
};

// src/sim/TrackSpline.ts
var RESAMPLE_STEP = 1.5;
var TrackSpline = class {
  points = [];
  closed;
  grid = /* @__PURE__ */ new Map();
  cell = 24;
  constructor(segments, closed = false) {
    this.closed = closed;
    const raw = buildWaypoints(segments, closed);
    const smooth = smoothWithCatmullRom(raw, closed);
    const resampled = resampleUniform(smooth, RESAMPLE_STEP, closed);
    this.points = assignMetrics(resampled, closed);
    this.buildGrid();
  }
  get length() {
    return this.points.length > 0 ? this.points[this.points.length - 1].s : 0;
  }
  get startSample() {
    return this.points[0];
  }
  sampleAt(s) {
    const n = this.points.length;
    if (n === 0) throw new Error("Track kosong");
    let ss = s;
    if (this.closed) {
      ss = (ss % this.length + this.length) % this.length;
    } else {
      ss = Math.max(0, Math.min(this.length - 1e-3, ss));
    }
    const idx = Math.max(0, Math.min(n - 1, Math.round(ss / this.length * (n - 1))));
    return this.points[idx];
  }
  /** Frame interpolasi halus pada jarak s. */
  frameAt(s, lookAhead = 2) {
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
      gutterSide: a.gutterSide
    };
  }
  /** Titik tengah lintasan + offset lateral (untuk racing line / spawn). */
  pointAtOffset(s, lateral) {
    const f = this.frameAt(s);
    const nx = Math.cos(f.heading + Math.PI / 2);
    const nz = Math.sin(f.heading + Math.PI / 2);
    return { x: f.x + nx * lateral, z: f.z + nz * lateral, y: f.y, heading: f.heading };
  }
  /** Proyeksi posisi dunia ke spline. Memakai hint index untuk kecepatan. */
  project(x, z, hintIndex = -1) {
    let bestIdx = -1;
    let bestD2 = Infinity;
    if (hintIndex >= 0) {
      const n = this.points.length;
      const window = 60;
      for (let k = -window; k <= window; k++) {
        let i = hintIndex + k;
        if (this.closed) i = (i % n + n) % n;
        else if (i < 0 || i >= n) continue;
        const p2 = this.points[i];
        const dx = x - p2.x;
        const dz = z - p2.z;
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
          const p2 = this.points[i];
          const dx = x - p2.x;
          const dz = z - p2.z;
          const d2 = dx * dx + dz * dz;
          if (d2 < bestD2) {
            bestD2 = d2;
            bestIdx = i;
          }
        }
      } else {
        for (let i = 0; i < this.points.length; i++) {
          const p2 = this.points[i];
          const dx = x - p2.x;
          const dz = z - p2.z;
          const d2 = dx * dx + dz * dz;
          if (d2 < bestD2) {
            bestD2 = d2;
            bestIdx = i;
          }
        }
      }
    }
    if (bestIdx < 0) bestIdx = 0;
    const p = this.points[bestIdx];
    const f = this.frameAt(p.s);
    const nx = Math.cos(f.heading + Math.PI / 2);
    const nz = Math.sin(f.heading + Math.PI / 2);
    const lateral = (x - p.x) * nx + (z - p.z) * nz;
    return {
      s: p.s,
      lateral,
      index: bestIdx,
      distanceToCenter: Math.abs(lateral)
    };
  }
  /** Racing line precompute: offset lateral menuju apex, dihaluskan. */
  buildRacingLine(offset = 3.2) {
    const n = this.points.length;
    const raw = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const p = this.points[i];
      const k = p.curvature;
      const side = Math.abs(k) < 1e-4 ? 0 : Math.sign(k);
      raw[i] = -side * Math.min(offset, p.halfWidth * 0.72);
    }
    let cur = raw;
    for (let pass2 = 0; pass2 < 3; pass2++) {
      const next = new Float32Array(n);
      const r = 8;
      for (let i = 0; i < n; i++) {
        let sum = 0;
        let cnt = 0;
        for (let k = -r; k <= r; k++) {
          let j = i + k;
          if (this.closed) j = (j % n + n) % n;
          else if (j < 0 || j >= n) continue;
          sum += cur[j];
          cnt++;
        }
        next[i] = cnt > 0 ? sum / cnt : 0;
      }
      cur = next;
    }
    return cur;
  }
  buildGrid() {
    this.grid.clear();
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const key = cellKey(p.x, p.z, this.cell);
      const arr = this.grid.get(key);
      if (arr) arr.push(i);
      else this.grid.set(key, [i]);
    }
  }
  gridCandidates(x, z) {
    const out = [];
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
};
function cellKey(x, z, cell) {
  return `${Math.floor(x / cell)},${Math.floor(z / cell)}`;
}
function buildWaypoints(segments, _closed) {
  const pts = [];
  let x = 0;
  let z = 0;
  let heading = Math.PI / 2;
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
          width
        });
        x += Math.cos(heading) * stepLen;
        z += Math.sin(heading) * stepLen;
        s += stepLen;
      }
    } else {
      const radius = seg.radius ?? 40;
      const angle = (seg.angle ?? 90) * Math.PI / 180;
      const dir = Math.sign(angle) || 1;
      const arcLen = Math.abs(angle) * radius;
      const steps = Math.max(6, Math.ceil(arcLen / 3));
      const dAng = angle / steps;
      const stepLen = arcLen / steps;
      const gutterSide = dir;
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
          width
        });
        x += Math.cos(heading) * stepLen * 0.5;
        z += Math.sin(heading) * stepLen * 0.5;
        heading += dAng;
        x += Math.cos(heading) * stepLen * 0.5;
        z += Math.sin(heading) * stepLen * 0.5;
        s += stepLen;
      }
    }
  }
  pts.push({
    x,
    z,
    s,
    grade: segments[segments.length - 1]?.grade ?? 0,
    gutter: 0,
    gutterSide: 0,
    tunnel: false,
    bridge: false,
    width: segments[segments.length - 1]?.width ?? 9
  });
  return pts;
}
function smoothWithCatmullRom(pts, closed) {
  if (pts.length < 3) return pts;
  const out = [];
  const n = pts.length;
  const alpha = 0.5;
  const get = (i) => {
    if (closed) return pts[(i % n + n) % n];
    return pts[Math.max(0, Math.min(n - 1, i))];
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
        width: p1.width
      });
    }
  }
  if (!closed) out.push(pts[pts.length - 1]);
  return out;
}
function catmull(p0, p1, p2, p3, t, alpha) {
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
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function resampleUniform(pts, stepLen, closed) {
  if (pts.length < 2) return pts;
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    cum.push(cum[i - 1] + Math.hypot(b.x - a.x, b.z - a.z));
  }
  const total = cum[cum.length - 1];
  const count = Math.max(2, Math.ceil(total / stepLen));
  const out = [];
  let cursor = 0;
  for (let i = 0; i <= count; i++) {
    const targetS = closed ? i / count * total : Math.min(total, i / count * total);
    while (cursor < cum.length - 2 && cum[cursor + 1] < targetS) cursor++;
    const a = pts[cursor];
    const b = pts[Math.min(pts.length - 1, cursor + 1)];
    const segLen = Math.max(1e-6, cum[cursor + 1] - cum[cursor]);
    const t = Math.max(0, Math.min(1, (targetS - cum[cursor]) / segLen));
    out.push({
      x: lerp(a.x, b.x, t),
      z: lerp(a.z, b.z, t),
      s: targetS,
      grade: lerp(a.grade, b.grade, t),
      gutter: a.gutter,
      gutterSide: a.gutterSide,
      tunnel: a.tunnel,
      bridge: a.bridge,
      width: lerp(a.width, b.width, t)
    });
  }
  for (let i = 0; i < out.length; i++) out[i].s = i / count * total;
  return out;
}
function assignMetrics(pts, closed) {
  const n = pts.length;
  const out = [];
  let elevation = 980;
  const prevY = new Array(n).fill(0);
  prevY[0] = elevation;
  for (let i = 1; i < n; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dist = Math.hypot(b.x - a.x, b.z - a.z) || 1e-3;
    elevation -= Math.tan(b.grade) * dist;
    prevY[i] = elevation;
  }
  for (let i = 0; i < n; i++) {
    const i0 = Math.max(0, i - 1);
    const i2 = Math.min(n - 1, i + 1);
    const a = pts[i0];
    const b = pts[i];
    const c = pts[i2];
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
      k = 4 * area / (la * lb * lc);
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
      grade: b.grade
    });
  }
  const src = out.map((p) => p.curvature);
  let cur = src;
  const win = 6;
  for (let pass2 = 0; pass2 < 5; pass2++) {
    const next = new Array(src.length);
    for (let i = 0; i < src.length; i++) {
      let sum = 0;
      let c = 0;
      for (let k = -win; k <= win; k++) {
        let j = i + k;
        if (closed) j = (j % src.length + src.length) % src.length;
        else if (j < 0 || j >= src.length) continue;
        sum += cur[j];
        c++;
      }
      next[i] = c > 0 ? sum / c : 0;
    }
    cur = next;
  }
  for (let i = 0; i < out.length; i++) out[i].curvature = cur[i];
  return out;
}
function buildGunmaPass() {
  const GL = 0.123;
  const segments = [
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
    { kind: "straight", length: 150, grade: 0 }
  ];
  return new TrackSpline(segments, false);
}

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
  constructor(spec, x, z, heading) {
    this.spec = spec;
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
    const spec = this.spec;
    this.input = input;
    this.time += dt;
    st.hitWall = false;
    st.hitStrength = 0;
    const m = spec.mass;
    const g = PHYSICS.GRAVITY;
    const Lf = spec.wheelbase * 0.47;
    const Lr = spec.wheelbase * 0.53;
    const maxSteer = spec.steerLockDeg * Math.PI / 180;
    const speedAbs = Math.hypot(st.vx, st.vz);
    const speedFactor = 1 - clamp(speedAbs / 220, 0, 0.62);
    const steerTarget = clamp(input.steer, -1, 1) * maxSteer * speedFactor;
    const steerRate = 7;
    st.steerAngle += clamp(steerTarget - st.steerAngle, -steerRate * dt, steerRate * dt);
    this.updateDrivetrain(dt, input, Math.abs(st.vLong));
    const baseFront = m * g * INTERNAL.frontWeightBias;
    const baseRear = m * g * (1 - INTERNAL.frontWeightBias);
    const dLong = m * this.lastALong * spec.cgHeight / spec.wheelbase;
    const dLat = m * this.lastALat * spec.cgHeight / spec.track;
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
    let yawAccel = yawMoment / spec.inertiaYaw;
    if (st.handbrakeTimer > 0) {
      const k = st.handbrakeTimer / (PHYSICS.HANDBRAKE_YAW_TIME + PHYSICS.HANDBRAKE_RECOVER);
      const dir = Math.sign(input.steer) || Math.sign(st.yawRate) || 1;
      const inject = PHYSICS.HANDBRAKE_YAW_INJECT * spec.driftBias * Math.sign(input.steer || 0);
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
    const yawLimit = clamp(speedAbs / Math.max(1, spec.wheelbase) * PHYSICS.YAW_SLIP_FACTOR, 1.2, 4.6);
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
    const spec = this.spec;
    if (st.shiftTimer > 0) st.shiftTimer = Math.max(0, st.shiftTimer - dt);
    if (st.shiftTimer <= 0) {
      const curIdx = clamp(st.gear, 1, spec.gears.length) - 1;
      const nextRatio = spec.gears[curIdx + 1];
      const wheelRps2 = Math.abs(st.vLong) / (2 * Math.PI * spec.wheelRadius);
      if (nextRatio !== void 0) {
        const nextRpm = wheelRps2 * nextRatio * spec.finalDrive * 60;
        if (st.rpm > PHYSICS.AUTO_SHIFT_UP_RPM && nextRpm > IDLE * 1.6) {
          st.gear = curIdx + 2;
          st.shiftTimer = PHYSICS.SHIFT_UP_TIME;
          this.pendingShift = 1;
        }
      }
      if (curIdx > 0) {
        const prevRatio = spec.gears[curIdx - 1] ?? 1;
        const prevRpm = wheelRps2 * prevRatio * spec.finalDrive * 60;
        if (st.rpm < PHYSICS.AUTO_SHIFT_DOWN_RPM && prevRpm < PHYSICS.REDLINE_RPM * 0.92) {
          st.gear = curIdx;
          st.shiftTimer = PHYSICS.SHIFT_DOWN_TIME;
          this.pendingShift = -1;
        }
      }
    }
    const gearIdx = clamp(st.gear, 1, spec.gears.length) - 1;
    const gearRatio = spec.gears[gearIdx] ?? 1;
    const wheelRps = vAbs / (2 * Math.PI * spec.wheelRadius);
    const rpmFromWheel = wheelRps * gearRatio * spec.finalDrive * 60;
    const targetRpm = Math.max(rpmFromWheel, IDLE + input.throttle * 500);
    st.rpm += (targetRpm - st.rpm) * Math.min(1, dt * 10);
    if (st.rpm < IDLE) st.rpm = IDLE;
    st.limiter = st.rpm >= PHYSICS.LIMITER_RPM - 60;
    if (st.rpm > PHYSICS.LIMITER_RPM) st.rpm = PHYSICS.LIMITER_RPM;
    const torque = engineTorque(spec, st.rpm);
    let wheelForce = torque * gearRatio * spec.finalDrive * INTERNAL.drivetrain / spec.wheelRadius;
    wheelForce *= this.powerMod * input.throttle;
    const driveAxleLoad = spec.drive === "fwd" ? spec.mass * PHYSICS.GRAVITY * INTERNAL.frontWeightBias : spec.mass * PHYSICS.GRAVITY * (1 - INTERNAL.frontWeightBias);
    const tractionCap = PHYSICS.TIRE_PEAK_MU * driveAxleLoad * (spec.drive === "awd" ? 1.6 : 1.02);
    this.driveForce = Math.min(wheelForce, tractionCap);
    if (st.limiter) {
      const cut = Math.sin(this.time * Math.PI * 2 * PHYSICS.LIMITER_CUT_HZ) > 0;
      if (cut) this.driveForce *= 0.15;
    }
    if (st.shiftTimer > 0) this.driveForce *= 0.1;
    if (input.throttle < 0.05 && vAbs > 1) {
      this.driveForce -= Math.sign(st.vLong) * 260 * (st.rpm / PHYSICS.REDLINE_RPM);
    }
    this.brakeForce = input.brake * spec.mass * 9.4;
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
function engineTorque(spec, rpm) {
  const peak = spec.torqueNm;
  if (rpm <= spec.torqueRpm) {
    const t = clamp((rpm - IDLE) / Math.max(1, spec.torqueRpm - IDLE), 0, 1);
    return peak * (0.55 + 0.45 * t);
  }
  const over = clamp((rpm - spec.torqueRpm) / Math.max(1, PHYSICS.LIMITER_RPM - spec.torqueRpm), 0, 1);
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

// src/core/Save.ts
var SeededRng = class {
  s;
  constructor(seed = 2654435769) {
    this.s = seed >>> 0 || 1;
  }
  /** xorshift32 — cepat, cukup untuk AI & partikel. */
  next() {
    let x = this.s;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.s = x >>> 0;
    return this.s / 4294967296;
  }
  range(min, max) {
    return min + (max - min) * this.next();
  }
  int(min, maxInclusive) {
    return Math.floor(this.range(min, maxInclusive + 1));
  }
  pick(arr) {
    if (arr.length === 0) throw new Error("pick() dari array kosong");
    return arr[Math.floor(this.next() * arr.length)];
  }
  reseed(seed) {
    this.s = seed >>> 0 || 1;
  }
};

// src/sim/AIOpponent.ts
var AIOpponent = class {
  state;
  track;
  line;
  rng;
  skillBase;
  messageQueue = [];
  /** Jarak tempuh untuk sorting. */
  totalProgress = 0;
  constructor(profile, spec, track, line, startS, lateral, seed) {
    this.track = track;
    this.line = line;
    this.rng = new SeededRng(seed);
    this.skillBase = profile.skill;
    const p = track.pointAtOffset(startS, lateral);
    this.state = {
      name: profile.name,
      carId: profile.carId,
      car: new VehiclePhysics(spec, p.x, p.z, p.heading),
      profile,
      skill: profile.skill,
      progress: startS,
      finished: false,
      finishTime: 0,
      lineOffset: profile.gutterLove > 0.6 ? 0.5 : 0,
      lastLineIdx: 0,
      dialogueCooldown: 0,
      gutterTimer: 0
    };
    this.state.car.setSafePose(p.x, p.z, p.heading);
    this.totalProgress = startS;
  }
  reset(startS, lateral) {
    const p = this.track.pointAtOffset(startS, lateral);
    this.state.car.reset(p.x, p.z, p.heading, 0);
    this.state.car.setSafePose(p.x, p.z, p.heading);
    this.state.finished = false;
    this.state.finishTime = 0;
    this.state.progress = startS;
    this.state.dialogueCooldown = 0;
    this.totalProgress = startS;
  }
  /** Rubber-band: sesuaikan skill berdasarkan selisih waktu. */
  applyRubberBand(playerProgress, playerTime, _aiTime) {
    const gapMeters = playerProgress - this.state.progress;
    const gapSeconds = gapMeters / 30;
    let skill = this.skillBase;
    if (gapSeconds > AI.RUBBERBAND_BEHIND_S) {
      skill -= AI.RUBBERBAND_SKILL_DOWN;
    } else if (gapSeconds < -AI.RUBBERBAND_AHEAD_S) {
      skill += AI.RUBBERBAND_SKILL_UP;
    }
    this.state.skill = clamp(skill, 0.7, 1.02);
    void playerTime;
  }
  step(dt) {
    const st = this.state;
    const car = st.car;
    const track = this.track;
    const proj = track.project(car.state.x, car.state.z, car.state.trackIndex);
    car.state.trackS = proj.s;
    const sample = track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    car.resolveBarrier(track, sample.halfWidth, sample.gutter);
    const look = Math.max(AI.LOOKAHEAD_MIN, car.state.speed * AI.LOOKAHEAD_PER_SPEED);
    const targetS = proj.s + look;
    const idx = this.lineIndex(targetS);
    st.lastLineIdx = idx;
    const lateral = (this.line[idx] ?? 0) + this.personalOffset(targetS);
    const target = track.pointAtOffset(targetS, lateral);
    const desiredHeading = Math.atan2(target.z - car.state.z, target.x - car.state.x);
    let err = desiredHeading - car.state.heading;
    while (err > Math.PI) err -= Math.PI * 2;
    while (err < -Math.PI) err += Math.PI * 2;
    const steer = clamp(err * 2.3, -1, 1);
    const lookCurv = track.sampleAt(proj.s + Math.max(8, car.state.speed * 0.5)).curvature;
    const mu = PHYSICS.TIRE_PEAK_MU * car.spec.gripScale;
    const vTarget = Math.sqrt(mu * PHYSICS.GRAVITY / Math.max(16e-4, Math.abs(lookCurv))) * st.skill;
    const vNow = car.state.speed;
    const throttle = vNow < vTarget * 0.97 ? 0.95 : vNow < vTarget * 1.04 ? 0.35 : 0;
    const brake = vNow > vTarget * 1.06 ? clamp((vNow - vTarget) / 6, 0.1, 0.8) : 0;
    const wantDrift = Math.abs(lookCurv) > 0.035 && st.skill > 0.88 && this.rng.next() > 0.94;
    const handbrake = wantDrift && Math.abs(steer) > 0.5 && car.state.speed > 10 && st.gutterTimer <= 0;
    const input = { throttle, brake, steer, handbrake, isAI: true };
    car.step(dt, input);
    st.progress = proj.s;
    this.totalProgress = proj.s;
    if (st.dialogueCooldown > 0) st.dialogueCooldown -= dt;
    if (st.gutterTimer > 0) st.gutterTimer -= dt;
    if (car.state.inGutter) st.gutterTimer = 0.8;
    return input;
  }
  lineIndex(s) {
    const n = this.line.length;
    const wrapped = Math.max(0, Math.min(this.track.length, s));
    return Math.max(0, Math.min(n - 1, Math.round(wrapped / this.track.length * (n - 1))));
  }
  /** Offset pribadi per karakter (gutter lover masuk lebih dalam). */
  personalOffset(s) {
    const idx = this.lineIndex(s);
    const base = this.line[idx] ?? 0;
    const love = this.state.profile.gutterLove;
    if (love <= 0) return 0;
    const sample = this.track.sampleAt(s);
    if (sample.gutter <= 0) return 0;
    return Math.sign(base || 1) * love * (sample.halfWidth * 0.32);
  }
  /** Ambil baris dialog (dengan cooldown supaya tidak spam). */
  say(kind) {
    const st = this.state;
    if (st.dialogueCooldown > 0) return null;
    const lines = st.profile.lines[kind];
    if (!lines || lines.length === 0) return null;
    st.dialogueCooldown = 9;
    return this.rng.pick(lines);
  }
  drainMessages() {
    const out = this.messageQueue.map((m) => m.text);
    this.messageQueue.length = 0;
    return out;
  }
};

// src/sim/RaceLogic.ts
var TOFU_CUPS = 3;
var RaceLogic = class {
  track;
  config;
  racers = [];
  player;
  time = 0;
  started = false;
  finished = false;
  result = null;
  /** 0..1 — intensitas drift untuk musik & efek. */
  driftIntensity = 0;
  racingLine;
  finishS;
  countdown = RACE.COUNTDOWN_SEC;
  /** Mode tofu: level "tumpah". */
  tofuSpill = 0;
  tofuCupsRemaining = TOFU_CUPS;
  lastLateralSign = 0;
  lateralAccum = 0;
  constructor(track, config) {
    this.track = track;
    this.config = config;
    this.racingLine = track.buildRacingLine(AI.LINE_OFFSET);
    this.finishS = track.length - 8;
    const playerStartS = config.mode === "uphill" ? 16 : 12;
    const pp = track.pointAtOffset(playerStartS, 0);
    this.player = new VehiclePhysics(config.playerSpec, pp.x, pp.z, pp.heading);
    this.player.setSafePose(pp.x, pp.z, pp.heading);
    this.player.state.trackS = playerStartS;
    this.racers.push({
      name: config.playerName,
      carId: config.playerSpec.id,
      isPlayer: true,
      progress: playerStartS,
      finishTime: null,
      finished: false,
      color: config.playerSpec.color,
      car: this.player,
      ai: null,
      gapToPlayer: 0
    });
    const count = config.mode === "timeattack" || config.mode === "tofu" ? 0 : 1;
    for (let i = 0; i < Math.min(count, config.rivals.length); i++) {
      const profile = config.rivals[i];
      const spec = carSpecForRival(profile, config);
      const startS = Math.min(track.length - 60, playerStartS + 14 + i * 6);
      const lateral = i % 2 === 0 ? -2.2 : 2.2;
      const ai = new AIOpponent(
        profile,
        spec,
        track,
        this.racingLine,
        startS,
        lateral,
        config.seed + i * 977
      );
      ai.state.skill = profile.skill * config.difficulty;
      this.racers.push({
        name: profile.name,
        carId: spec.id,
        isPlayer: false,
        progress: startS,
        finishTime: null,
        finished: false,
        color: spec.color,
        car: ai.state.car,
        ai,
        gapToPlayer: 0
      });
    }
  }
  get countdownValue() {
    return Math.max(0, Math.ceil(this.countdown));
  }
  get countdownDone() {
    return this.countdown <= 0;
  }
  get raceTimeSec() {
    return this.time;
  }
  /** Jumlah racers sudah finish. */
  get finishedCount() {
    return this.racers.filter((r) => r.finished).length;
  }
  get playerEntry() {
    return this.racers.find((r) => r.isPlayer);
  }
  get rivalEntry() {
    return this.racers.find((r) => !r.isPlayer) ?? null;
  }
  get playerPosition() {
    const sorted = this.sortedRacers();
    const idx = sorted.findIndex((r) => r.isPlayer);
    return idx < 0 ? 1 : idx + 1;
  }
  sortedRacers() {
    return [...this.racers].sort((a, b) => {
      if (a.finished && b.finished) return (a.finishTime ?? 0) - (b.finishTime ?? 0);
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.progress - a.progress;
    });
  }
  /** Dipanggil dari fixed step. dt = 1/120. */
  step(dt, input) {
    if (this.finished) return;
    if (this.countdown > 0) {
      this.countdown -= dt;
      this.player.step(dt, { throttle: 0, brake: 1, steer: 0, handbrake: true });
      this.applyTrack(this.player);
      return;
    }
    this.started = true;
    this.time += dt;
    this.player.slope = this.slopeAt(this.player.state.trackS);
    this.player.step(dt, input);
    this.applyTrack(this.player);
    if (this.player.state.hitWall) this.player.state.hitStrength = this.player.state.hitStrength;
    const playerEntry = this.playerEntry;
    playerEntry.progress = this.player.state.trackS;
    for (const r of this.racers) {
      if (r.isPlayer || !r.ai) continue;
      r.ai.applyRubberBand(playerEntry.progress, this.time, this.time);
      r.ai.step(dt);
      r.progress = r.ai.state.car.state.trackS;
      r.gapToPlayer = r.progress - this.player.state.trackS;
      if (r.ai.state.car.state.hitWall && Math.random() < 0.05) {
      }
    }
    if (this.config.mode === "tofu") {
      this.updateTofu(dt);
    }
    for (const r of this.racers) {
      if (r.finished) continue;
      if (r.progress >= this.finishS) {
        r.finished = true;
        r.finishTime = this.time;
      }
    }
    if (this.playerEntry.finished) {
      this.finished = true;
      this.result = this.buildResult();
    }
  }
  updateTofu(dt) {
    const lat = this.player.state.lateral;
    if (Math.sign(lat) !== this.lastLateralSign && Math.abs(lat) > 0.4) {
      this.lateralAccum += Math.abs(lat);
      this.lastLateralSign = Math.sign(lat);
    }
    const tilt = Math.abs(this.player.state.vLat) * 0.5 + Math.abs(this.player.state.yawRate) * 4;
    if (tilt > 4.2 || this.player.state.hitStrength > 0.6) {
      this.tofuSpill = Math.min(1, this.tofuSpill + dt * 0.9);
      if (this.tofuSpill >= 1) this.tofuCupsRemaining = Math.max(0, this.tofuCupsRemaining - 1);
    } else {
      this.tofuSpill = Math.max(0, this.tofuSpill - dt * 0.5);
    }
  }
  applyTrack(car) {
    const proj = this.track.project(car.state.x, car.state.z, car.state.trackIndex);
    const sample = this.track.sampleAt(proj.s);
    car.applyTrackInfo(proj.lateral, sample.halfWidth, sample.gutter, sample.gutterSide, proj.s, proj.index);
    car.resolveBarrier(this.track, sample.halfWidth, sample.gutter);
  }
  /** Kemiringan jalan (rad, positif menanjak) dari grade spline. */
  slopeAt(s) {
    const p = this.track.sampleAt(s);
    return -Math.atan(p.grade);
  }
  /** Gap waktu (detik) antara pemain dan rival. + = pemain unggul. */
  gapSeconds() {
    const rival = this.rivalEntry;
    if (!rival) return 0;
    const diff = this.player.state.trackS - rival.progress;
    const v = Math.max(20, (this.player.state.speed + rival.car.state.speed) * 0.5);
    return diff / v;
  }
  /** Gap meter untuk aturan "kuncup" 60 m. */
  gapMeters() {
    const rival = this.rivalEntry;
    if (!rival) return 0;
    return this.player.state.trackS - rival.progress;
  }
  /** Cek kemenangan aturan gap 60 m. */
  isGapWin() {
    return this.gapMeters() > AI.WIN_GAP_M;
  }
  buildResult() {
    const sorted = this.sortedRacers();
    const pos = sorted.findIndex((r) => r.isPlayer) + 1;
    const won = pos === 1;
    const mm = Math.floor(this.time / 60);
    const ss = (this.time % 60).toFixed(3).padStart(6, "0");
    return {
      mode: this.config.mode,
      timeMs: Math.round(this.time * 1e3),
      position: pos,
      totalRacers: this.racers.length,
      driftPoints: 0,
      bestDrift: 0,
      topSpeedKmh: Math.round(this.player.telemetry.topSpeedKmh),
      gapText: `${mm}:${ss}`,
      won,
      entries: sorted
    };
  }
};
function carSpecForRival(profile, config) {
  for (const spec of rivalSpecs) {
    if (spec.id === profile.carId) return spec;
  }
  void config;
  return rivalSpecs[0];
}
var rivalSpecs = [];
function registerRivalSpecs(specs) {
  rivalSpecs = specs;
}

// src/sim/DriftScore.ts
var DriftScore = class {
  state = {
    points: 0,
    current: 0,
    combo: 1,
    multiplier: 1,
    label: "",
    intensity: 0,
    best: 0,
    driftTime: 0,
    banked: 0
  };
  reset() {
    Object.assign(this.state, {
      points: 0,
      current: 0,
      combo: 1,
      multiplier: 1,
      label: "",
      intensity: 0,
      best: 0,
      driftTime: 0,
      banked: 0
    });
  }
  /**
   * Update per frame.
   * @param slipRear rad
   * @param speedKmh
   * @param hit true bila menabrak frame ini (reset combo)
   * @param inGutter true bila di gutter
   */
  update(dt, slipRear, speedKmh, hit, inGutter) {
    const st = this.state;
    const slipAbs = Math.abs(slipRear);
    const drifting = slipAbs > 0.16 && speedKmh > 25;
    if (hit) {
      st.current = 0;
      st.combo = 1;
      st.driftTime = 0;
      st.label = "";
      st.intensity = 0;
      return;
    }
    if (drifting) {
      st.driftTime += dt;
      st.intensity += (Math.min(1, slipAbs / 0.8) - st.intensity) * Math.min(1, dt * 6);
      const rate = (slipAbs * 2.6 + 0.5) * (speedKmh / 60) * 90;
      st.current += rate * dt;
      st.multiplier = 1 + Math.min(3, Math.floor(st.driftTime / 1.2)) * 0.5;
      if (inGutter) st.multiplier += 0.25;
      st.combo = Math.min(9, 1 + Math.floor(st.driftTime / 1.5));
      st.label = st.driftTime > 3.2 ? "PERFECT!" : st.driftTime > 1.9 ? "GREAT!" : "DRIFT!";
    } else {
      if (st.current > 1) {
        st.points += Math.round(st.current * st.multiplier);
        st.banked += Math.round(st.current * st.multiplier);
        st.best = Math.max(st.best, Math.round(st.current * st.multiplier));
      }
      st.current = Math.max(0, st.current - dt * 400);
      st.driftTime = Math.max(0, st.driftTime - dt * 3);
      st.intensity = Math.max(0, st.intensity - dt * 2.4);
      st.label = "";
      st.multiplier = 1;
      st.combo = 1;
    }
  }
  get displayPoints() {
    return Math.round(this.state.points + this.state.current * this.state.multiplier);
  }
  get intensity() {
    return this.state.intensity;
  }
};

// src/sim/RubberBand.ts
var DEFAULT_BAND = {
  behindThreshold: 6,
  aheadThreshold: 8,
  skillDown: 0.04,
  skillUp: 0.03,
  minSkill: 0.7,
  maxSkill: 1.02
};
function applyBand(baseSkill, playerBehindSeconds, cfg = DEFAULT_BAND) {
  let skill = baseSkill;
  if (playerBehindSeconds > cfg.behindThreshold) skill -= cfg.skillDown;
  else if (playerBehindSeconds < -cfg.aheadThreshold) skill += cfg.skillUp;
  return Math.max(cfg.minSkill, Math.min(cfg.maxSkill, skill));
}
function speedScale(playerBehindSeconds, cfg = DEFAULT_BAND) {
  if (playerBehindSeconds > cfg.behindThreshold) return 0.97;
  if (playerBehindSeconds < -cfg.aheadThreshold) return 1.03;
  return 1;
}

// tools/race-entry.ts
registerRivalSpecs(CARS);
var DT = PHYSICS.DT;
var results = [];
function check(name, pass2, detail) {
  results.push({ name, pass: pass2, detail });
  console.log(`${pass2 ? "PASS" : "FAIL"}  ${name} \u2014 ${detail}`);
}
function drivePlayer(race) {
  const car = race.player;
  const st = car.state;
  const line = race.racingLine;
  const look = Math.max(9, st.speed * 0.6);
  const targetS = st.trackS + look;
  const idx = Math.max(0, Math.min(line.length - 1, Math.round(targetS / race.track.length * (line.length - 1))));
  const target = race.track.pointAtOffset(targetS, line[idx] ?? 0);
  const desired = Math.atan2(target.z - st.z, target.x - st.x);
  let err = desired - st.heading;
  while (err > Math.PI) err -= Math.PI * 2;
  while (err < -Math.PI) err += Math.PI * 2;
  const steer = Math.max(-1, Math.min(1, err * 2 - Math.abs(st.slipRear) * 0.6));
  const curv = race.track.sampleAt(st.trackS + 14).curvature;
  const vTarget = Math.sqrt(1.02 * PHYSICS.GRAVITY / Math.max(16e-4, Math.abs(curv)));
  const throttle = st.speed < vTarget * 0.97 ? 0.95 : st.speed > vTarget * 1.05 ? 0.1 : 0.45;
  const brake = st.speed > vTarget * 1.1 ? 0.5 : 0;
  return { throttle, brake, steer, handbrake: false };
}
function runRace(mode, rivalId, maxSeconds = 420) {
  const track = buildGunmaPass();
  const profile = RIVALS.find((r) => r.id === rivalId);
  const race = new RaceLogic(track, {
    mode,
    playerSpec: carById("hachi86"),
    playerName: "KAMU",
    rivals: [profile],
    seed: 12345,
    difficulty: 1
  });
  const drift = new DriftScore();
  let t = 0;
  let nan = 0;
  let hits = 0;
  let maxSpeed = 0;
  while (!race.finished && t < maxSeconds) {
    const inp = drivePlayer(race);
    race.step(DT, inp);
    drift.update(DT, race.player.state.slipRear, race.player.speedKmh, race.player.state.hitWall, race.player.state.inGutter);
    if (race.player.state.hitWall) hits++;
    if (!Number.isFinite(race.player.state.x)) nan++;
    maxSpeed = Math.max(maxSpeed, race.player.speedKmh);
    t += DT;
  }
  return { race, drift, t, nan, hits, maxSpeed };
}
console.log("=== EUROBEAT DRIFT LEGEND \u2014 INTEGRASI RACE ===");
var down = runRace("downhill", "ryo");
check(
  "Downhill battle selesai (pemain finish)",
  down.race.finished && down.t < 420,
  `${down.t.toFixed(1)} s \xB7 posisi ${down.race.result?.position} \xB7 gap ${down.race.gapMeters().toFixed(0)} m`
);
check("Tanpa NaN sepanjang race", down.nan === 0, `${down.nan} NaN`);
check(
  "Drift score terakumulasi",
  down.drift.displayPoints > 0,
  `${down.drift.displayPoints} poin \xB7 terbaik ${down.drift.state.best}`
);
check(
  "Rival AI juga menempuh sirkuit",
  (down.race.rivalEntry?.progress ?? 0) > 2e3,
  `rival ${Math.round(down.race.rivalEntry?.progress ?? 0)} m dari ${Math.round(down.race.track.length)} m`
);
check(
  "Waktu balapan masuk akal (3:00\u20137:00)",
  down.t > 180 && down.t < 420,
  `${Math.floor(down.t / 60)}:${(down.t % 60).toFixed(1).padStart(4, "0")}`
);
var ta = runRace("timeattack", "ryo");
check("Time attack selesai tanpa rival", ta.race.finished && ta.race.racers.length === 1, `${ta.t.toFixed(1)} s`);
check("Time attack: gap timer tidak meledak", Math.abs(ta.race.gapSeconds()) === 0, `gap ${ta.race.gapSeconds()}`);
var tofu = runRace("tofu", "ryo", 200);
check("Tofu delivery berjalan", tofu.nan === 0 && tofu.race.track.length > 4e3, `cup tersisa ${tofu.race.tofuCupsRemaining}`);
var up = runRace("uphill", "ayu");
check("Uphill battle selesai", up.race.finished, `${up.t.toFixed(1)} s`);
var neutral = applyBand(0.9, 0, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.04, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 });
var behind = applyBand(0.9, 10, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.04, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 });
var ahead = applyBand(0.9, -12, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.04, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 });
check(
  "Rubber-band: turun saat tertinggal, naik saat memimpin, clamp",
  neutral === 0.9 && behind === 0.86 && ahead === 0.93 && applyBand(0.9, 999, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.5, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 }) === 0.7,
  `netral=${neutral} tertinggal=${behind} memimpin=${ahead} clamp=0.7`
);
check("Rubber-band speed scale", speedScale(10) === 0.97 && speedScale(-12) === 1.03 && speedScale(0) === 1, "0.97 / 1.03 / 1.0");
var beforeStep = down.race.time;
down.race.step(DT, { throttle: 1, brake: 0, steer: 0, handbrake: false });
check("Step setelah finish diabaikan (tidak nyangkut)", down.race.time === beforeStep, `waktu tetap ${beforeStep.toFixed(1)} s`);
var raceGap = down.race;
var gapWinActive = raceGap.isGapWin();
check("Aturan gap 60 m dapat dievaluasi", typeof gapWinActive === "boolean", `isGapWin=${gapWinActive} \xB7 gap=${raceGap.gapMeters().toFixed(0)} m`);
console.log("\n=== RINGKASAN ===");
var pass = results.filter((r) => r.pass).length;
console.log(`${pass}/${results.length} lulus`);
if (pass < results.length) {
  for (const r of results.filter((x) => !x.pass)) console.log(` - ${r.name}: ${r.detail}`);
  process.exitCode = 1;
}
