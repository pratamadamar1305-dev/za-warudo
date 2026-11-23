// AIOpponent.ts — AI rivals driven exclusively through DrivingBrain.
// Seeded RNG for blunders (deterministic per race seed).

import { DrivingBrain, DrivingProfile, BrainCarState } from './DrivingBrain';
import { VehiclePhysics, PhysicsEnv } from './VehiclePhysics';
import { TrackSpline } from './TrackSpline';
import { RubberBand } from './RubberBand';

export interface RivalDef {
  id: string; name: string; carId: string;
  profile: DrivingProfile; color: number; blunderRate: number;
  lines: { overtake: string; drift: string; lose: string; win: string };
}

export const RIVALS: RivalDef[] = [
  {
    id: 'ryo', name: 'RYO', carId: 'fd7', color: 0xff5533, blunderRate: 0.14,
    profile: { skill: 0.97, aggression: 0.9, lineOffsetMax: 3.2, driftAffinity: 0.8, brakeMargin: 0.02, lookaheadGain: 1.05, gripAwareness: 0.97 },
    lines: {
      overtake: 'Mada mada! Aku yang duluan!',
      drift: 'Lihat drift-ku! Ini namanya FD!',
      lose: 'Sori... kali ini kau menang. Lain kali!',
      win: 'Yosha! Gunma malam ini milikku!',
    },
  },
  {
    id: 'kenji', name: 'KENJI', carId: 's13', color: 0x3399ff, blunderRate: 0.05,
    profile: { skill: 0.9, aggression: 0.5, lineOffsetMax: 2.0, driftAffinity: 0.5, brakeMargin: 0.1, lookaheadGain: 0.95, gripAwareness: 0.9 },
    lines: {
      overtake: 'Jalan sempit... aku blok line-mu!',
      drift: 'Gutter itu kuncinya. Pelajari!',
      lose: 'Hmph. S13-ku tidak seimbang hari ini.',
      win: 'Defensive driving menang. Selalu.',
    },
  },
  {
    id: 'ayu', name: 'AYU', carId: 'ek9', color: 0xff66cc, blunderRate: 0.03,
    profile: { skill: 0.94, aggression: 0.6, lineOffsetMax: 3.2, driftAffinity: 0.3, brakeMargin: 0.05, lookaheadGain: 1.0, gripAwareness: 0.98 },
    lines: {
      overtake: 'Halus dan cepat. Itu gayaku.',
      drift: 'Bagian cepat ini kelebihanku.',
      lose: 'Kau cepat juga... hormat.',
      win: 'Konsistensi mengalahkan keberuntungan.',
    },
  },
];

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class AIOpponent {
  brain: DrivingBrain;
  physics: VehiclePhysics;
  rubber = new RubberBand();
  brakeLight = false;
  finished = false;
  finishTime = 0;
  blunderTimer = 0;
  blundering = false;
  paceCap = 1; // set by PRO Unbeatable Guarantee (0.96 while PRO active)
  private rng: () => number;
  private baseProfile: DrivingProfile;

  constructor(public def: RivalDef, spline: TrackSpline, seed: number) {
    this.physics = new VehiclePhysics({} as never); // replaced by caller with real params
    this.brain = new DrivingBrain(spline, def.profile);
    this.baseProfile = def.profile;
    this.rng = mulberry32(seed);
  }

  setPhysics(physics: VehiclePhysics) { this.physics = physics; }

  update(dt: number, spline: TrackSpline, env: PhysicsEnv, others: BrainCarState[], player: BrainCarState, mu: number) {
    const st = this.physics.state;
    // rubber band vs player
    const gap = (player.s - st.s) / Math.max(player.speedMs, 10);
    this.rubber.update(gap, dt);
    const skill = Math.min(1.02, Math.max(0.5, this.baseProfile.skill * this.rubber.skillMod * this.paceCap));
    this.brain.setProfile({ ...this.baseProfile, skill });

    // blunders: occasionally brake too early or late (humanization)
    this.blunderTimer -= dt;
    if (this.blunderTimer <= 0) {
      this.blundering = this.rng() < this.def.blunderRate;
      this.blunderTimer = 6 + this.rng() * 10;
    }

    const car: BrainCarState = {
      x: st.x, y: st.y, z: st.z, heading: st.heading,
      vx: st.vx, vz: st.vz, speedMs: st.speedMs,
      slipAngle: st.beta, yawRate: st.yawRate, gear: st.gear, rpm: st.rpm, s: st.s, lateral: st.lateral,
    };
    const intent = this.brain.update(car, dt, others, mu);
    if (this.blundering) {
      intent.brake = Math.min(1, intent.brake + 0.5);
      intent.throttle *= 0.6;
    }
    this.brakeLight = intent.brake > 0.3;
    this.physics.step(intent, dt, spline, env);
  }
}
