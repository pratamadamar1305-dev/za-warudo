/**
 * Tuning.ts — semua konstanta "rasa" game di satu tempat.
 *
 * Ini file yang kamu buka kalau mau mengubah feel tanpa membaca seluruh kode.
 * Lihat §15.5 di dokumen spesifikasi untuk penjelasan efek naik/turun.
 */

/* ------------------------------------------------------------------ */
/* FISIKA — inti feel drift (§6)                                       */
/* ------------------------------------------------------------------ */

export const PHYSICS = {
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
  HANDBRAKE_YAW_INJECT: 4.0,
  /** Durasi injeksi (detik). */
  HANDBRAKE_YAW_TIME: 0.25,
  /** Pemulihan grip belakang setelah injeksi (detik). */
  HANDBRAKE_RECOVER: 0.55,

  /* --- countersteer assist (§6.7) --- */
  /** Slip angle belakang (rad) yang memicu assist. */
  COUNTERSTEER_SLIP_TRIGGER: (25 * Math.PI) / 180,
  /** Damping yaw tambahan (Nm·s/rad) saat assist aktif. */
  COUNTERSTEER_DAMPING: 2.0,
  /** Faktor konversi damping → percepatan yaw (1/inertia efektif). */
  COUNTERSTEER_SCALE: 0.0012,

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
  GUTTER_MAX_ANGLE: (15 * Math.PI) / 180,
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
  MAX_WEIGHT_TRANSFER: 0.75,
} as const;

/** Parameter kendaraan per mobil. */
export interface CarSpec {
  id: string;
  name: string;
  subtitle: string;
  color: number;
  accent: number;
  /** kg */
  mass: number;
  /** m */
  wheelbase: number;
  /** m */
  track: number;
  /** m */
  cgHeight: number;
  /** kg·m² */
  inertiaYaw: number;
  /** hp */
  powerHp: number;
  powerRpm: number;
  torqueNm: number;
  torqueRpm: number;
  /** Rasio gigi, index 0 = gigi 1. */
  gears: readonly number[];
  finalDrive: number;
  /** 0..1 — clutch-type LSD lock. */
  lsdLock: number;
  /** derajat — steering lock */
  steerLockDeg: number;
  /** 13:1 */
  steerRatio: number;
  drive: "rwd" | "fwd" | "awd";
  /** radius ban m */
  wheelRadius: number;
  /** Skala grip AI × pemain. */
  gripScale: number;
  /** Potensi drift (0..1) — pengaruh ke yaw inject. */
  driftBias: number;
}

const HACHI_86: CarSpec = {
  id: "hachi86",
  name: "HACHI 86",
  subtitle: "1.6L NA · RWD · 940 kg",
  color: 0xf2f4f7,
  accent: 0x1a1d22,
  mass: 940,
  wheelbase: 2.4,
  track: 1.35,
  cgHeight: 0.52,
  inertiaYaw: 1250,
  powerHp: 130,
  powerRpm: 6600,
  torqueNm: 149,
  torqueRpm: 5200,
  gears: [3.58, 2.02, 1.38, 1.0, 0.79],
  finalDrive: 4.3,
  lsdLock: 0.6,
  steerLockDeg: 34,
  steerRatio: 13,
  drive: "rwd",
  wheelRadius: 0.3,
  gripScale: 1.0,
  driftBias: 1.0,
};

const FD7: CarSpec = {
  id: "fd7",
  name: "FD-7 SAVANNA",
  subtitle: "1.3L TWIN-TURBO · RWD · 1270 kg",
  color: 0xffd400,
  accent: 0x1a1d22,
  mass: 1270,
  wheelbase: 2.43,
  track: 1.46,
  cgHeight: 0.5,
  inertiaYaw: 1680,
  powerHp: 255,
  powerRpm: 6500,
  torqueNm: 294,
  torqueRpm: 5000,
  gears: [3.48, 2.02, 1.39, 1.0, 0.72],
  finalDrive: 4.1,
  lsdLock: 0.72,
  steerLockDeg: 33,
  steerRatio: 13.5,
  drive: "rwd",
  wheelRadius: 0.32,
  gripScale: 1.06,
  driftBias: 1.08,
};

const EK9: CarSpec = {
  id: "ek9",
  name: "EK-9 TYPE-R",
  subtitle: "1.6L VTEC · FWD · 1070 kg",
  color: 0xffffff,
  accent: 0xd81b2c,
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
  driftBias: 0.86,
};

const S13: CarSpec = {
  id: "s13",
  name: "NISSAN-KAI S13",
  subtitle: "2.0L TURBO · RWD · 1180 kg",
  color: 0x2f6bff,
  accent: 0x0d1424,
  mass: 1180,
  wheelbase: 2.47,
  track: 1.46,
  cgHeight: 0.51,
  inertiaYaw: 1520,
  powerHp: 205,
  powerRpm: 6400,
  torqueNm: 265,
  torqueRpm: 4800,
  gears: [3.32, 1.9, 1.31, 1.0, 0.76],
  finalDrive: 4.36,
  lsdLock: 0.68,
  steerLockDeg: 34,
  steerRatio: 13.2,
  drive: "rwd",
  wheelRadius: 0.31,
  gripScale: 1.02,
  driftBias: 1.05,
};

export const CARS: readonly CarSpec[] = [HACHI_86, FD7, EK9, S13];

export function carById(id: string): CarSpec {
  return CARS.find((c) => c.id === id) ?? HACHI_86;
}

/* ------------------------------------------------------------------ */
/* AI (§7)                                                             */
/* ------------------------------------------------------------------ */

export const AI = {
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
  WIN_GAP_M: 60,
} as const;

export interface RivalProfile {
  id: string;
  name: string;
  carId: string;
  skill: number;
  aggression: number;
  /** 0 = rail-smooth, 1 = ragged. */
  blunder: number;
  /** Pemakaian gutter di hairpin. */
  gutterLove: number;
  /** Warna dialog. */
  tone: string;
  lines: {
    intro: string[];
    overtaken: string[];
    overtaking: string[];
    winning: string[];
    losing: string[];
    finishWin: string[];
    finishLose: string[];
  };
}

export const RIVALS: readonly RivalProfile[] = [
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
        "Downhill ini milikku. Kamu cuma numpang lewat.",
      ],
      overtaken: ["Hah? Kamu lewat? Nggak mungkin!", "Yosha... tapi ini belum selesai."],
      overtaking: ["Mada mada! Masih jauh, kawan.", "See ya di bawah, sori ya."],
      winning: ["Kamu masih di belakang? Kasihan.", "Tekanan ban aja belum panas, bro."],
      losing: ["Sial... FD-7 ini kok ngadat?!", "Jangan senang dulu, masih jauh."],
      finishWin: ["Gampang. Balik lagi kalau sudah bisa drift beneran.", "Sori, kamu telat dua tikungan."],
      finishLose: ["...Apa? Aku kalah sama AE86? Tidak mungkin!", "Yosha... kamu hebat. Lain kali aku balas."],
    },
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
        "S13-ku paling jago di gutter. Lihat sendiri nanti.",
      ],
      overtaken: ["Heh, line itu punyaku.", "Nggak boleh lewat situ, bre!"],
      overtaking: ["Blok kanan-kiri, silakan coba.", "Defensif itu seni, kawan."],
      winning: ["Aman. Santai dulu.", "Kamu terlalu jauh, bro."],
      losing: ["Kok bisa... line-ku kunci!", "Jangan di dalam gutter terus, dang!"],
      finishWin: ["Told you. Line itu milikku.", "Latihan gutter dulu, baru tantang aku."],
      finishLose: ["Ah... kalah. Tapi teknik gutter-ku tetap terbaik.", "Kamu licik. Aku suka itu."],
    },
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
        "EK-9 ini halus. Kamu bakal kaget di bagian cepat.",
      ],
      overtaken: ["Eh? Cepat juga kamu.", "Aku harus lebih halus lagi."],
      overtaking: ["Sori, aku lewat ya.", "VTEC sudah buka. Dadah!"],
      winning: ["Masih nyaman di sini.", "Smooth is fast, kawan."],
      losing: ["Hmm... aku harus naikkan ritme.", "Jangan salahkan aku kalau aku balap sekarang."],
      finishWin: ["Smooth selalu menang.", "Terima kasih sudah balapan. Kamu kuat di hairpin."],
      finishLose: ["Kamu lebih halus dari dugaanku. Respect.", "Aku kalah. Tapi besok aku balas, ya."],
    },
  },
];

/* ------------------------------------------------------------------ */
/* KAMERA (§11)                                                        */
/* ------------------------------------------------------------------ */

export const CAMERA = {
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
  DRIFT_ROLL_MAX: (5 * Math.PI) / 180,
  /** Getar kamera per unit impact. */
  SHAKE_PER_IMPACT: 0.06,
} as const;

/* ------------------------------------------------------------------ */
/* VISUAL (§3)                                                         */
/* ------------------------------------------------------------------ */

export const VISUAL = {
  SKY_TOP: 0x0b1026,
  SKY_MID: 0x1b2a4a,
  SKY_BOTTOM: 0x2c3e63,
  FOG_COLOR: 0x16202f,
  FOG_DENSITY: 0.0035,
  AMBIENT_INTENSITY: 0.25,
  AMBIENT_COLOR: 0x7391c9,
  MOON_INTENSITY: 0.55,
  MOON_COLOR: 0xc9dcff,
  STREETLIGHT_COLOR: 0xffb764,
  CELL_THRESHOLD_A: 0.33,
  CELL_THRESHOLD_B: 0.66,
  CELL_SOFT: 0.02,
  RIM_COLOR: 0x5b8cff,
  RIM_STRENGTH: 0.55,
  OUTLINE_PX: 1.6,
  BLOOM_STRENGTH: 0.6,
  BLOOM_RADIUS: 0.4,
  BLOOM_THRESHOLD: 0.85,
  CA_MAX: 0.0018,
  CA_REF_KMH: 200,
  VIGNETTE: 0.35,
  SPEED_LINE_COUNT: 40,
  SMOKE_POOL: 80,
  SKID_FADE_TIME: 12,
} as const;

/* ------------------------------------------------------------------ */
/* RACE (§4)                                                           */
/* ------------------------------------------------------------------ */

export const RACE = {
  TRACK_LENGTH_M: 5200,
  START_ALTITUDE: 980,
  FINISH_ALTITUDE: 340,
  ROAD_WIDTH: 9,
  /** Lebar gutter. */
  GUTTER_WIDTH: 0.45,
  COUNTDOWN_SEC: 3,
  RESULTS_TIMEOUT_S: 60,
  GHOST_SAMPLE_HZ: 10,
} as const;

export const AUDIO = {
  MASTER_GAIN: 0.85,
  COMP_THRESHOLD_DB: -14,
  COMP_RATIO: 6,
  COMP_ATTACK: 0.003,
  COMP_RELEASE: 0.25,
  MUSIC_BUS: 0.62,
  SFX_BUS: 0.9,
  DUCK_DB: -3.5,
  DUCK_TIME: 0.25,
  BPM_MIN: 150,
  BPM_MAX: 160,
  BPM_BASE: 156,
} as const;
