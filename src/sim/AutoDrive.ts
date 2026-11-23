// AutoDrive.ts — player autopilot (chill / normal / pro), all via DrivingBrain.
// PRO = "TAK TERKALAHKAN": grip envelope x1.18 (through global clamp), never-spin
// guard, predictive collision shield, Unbeatable Guarantee game director.
// No teleport, no phasing, no guardrail clipping — prevention, not correction.

import { DrivingBrain, DrivingIntent, DrivingProfile, BrainCarState, PROFILES } from './DrivingBrain';
import { TrackSpline, WALL_LATERAL } from './TrackSpline';

export type AutoDriveProfile = 'chill' | 'normal' | 'pro';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export class AutoDrive {
  mode: AutoDriveProfile = 'pro';
  brain: DrivingBrain;
  paceScaler = 1;
  aiPaceCap = 1; // applied to rivals while PRO active
  rivalMistake = false; // final 300 m drama flag
  manualOverride = false;
  needsReposition = false;
  private paceTimer = 0;
  private overrideIdle = 0;
  private postOverrideHold = 0;
  private stuckTimer = 0;
  private recoveryTimer = 0;
  private recoveryCount = 0;
  private logTimer = 0;
  private smoothSlip = 0;
  private skillPenalty = 0;
  private skillPenaltyTimer = 0;
  private blendFrom: DrivingIntent | null = null;
  private blendTimer = 0;

  constructor(private spline: TrackSpline) {
    this.brain = new DrivingBrain(spline, PROFILES.pro);
  }

  setMode(mode: AutoDriveProfile) {
    this.mode = mode;
    this.brain.setProfile(PROFILES[mode]);
    this.paceScaler = 1;
    this.aiPaceCap = 1;
    this.rivalMistake = false;
    // capture current intent for a one-time 0.15 s crossfade (no continuous lag)
    if (this.blendFrom) { this.blendFrom = { ...this.blendFrom }; }
    this.blendTimer = 0.15;
  }

  // muEff: effective grip for brain target speeds (PRO envelope included by caller)
  update(
    car: BrainCarState, dt: number, others: BrainCarState[], muEff: number,
    playerInputActive: boolean, gapToLeader: number, remainingS: number,
    onLog: (msg: string) => void,
  ): DrivingIntent | null {
    // --- manual override handling
    if (playerInputActive) {
      this.manualOverride = true;
      this.overrideIdle = 0;
      this.postOverrideHold = 0;
    } else if (this.manualOverride) {
      this.overrideIdle += dt;
      if (this.overrideIdle > 2.0) {
        this.manualOverride = false;
        this.postOverrideHold = 3; // paceScaler held at 1.00 for 3 s
      }
    }
    if (this.manualOverride) return null; // caller uses player input

    // --- PRO Unbeatable Guarantee (evaluated every 2 s)
    this.paceTimer += dt;
    if (this.paceTimer >= 2) {
      this.paceTimer = 0;
      if (this.mode === 'pro') {
        this.aiPaceCap = 0.76;
        if (this.postOverrideHold > 0) {
          this.paceScaler = 1.0;
        } else if (gapToLeader > 0) {
          this.paceScaler = Math.min(1.12, this.paceScaler + 0.02);
        } else if (gapToLeader < -4) {
          this.paceScaler = 1.0;
        }
        this.rivalMistake = remainingS < 300 && gapToLeader > 0;
      } else {
        this.paceScaler = 1.0;
        this.aiPaceCap = 1;
        this.rivalMistake = false;
      }
    }
    if (this.postOverrideHold > 0) this.postOverrideHold -= dt;
    if (this.skillPenaltyTimer > 0) { this.skillPenaltyTimer -= dt; if (this.skillPenaltyTimer <= 0) this.skillPenalty = 0; }

    // --- base intent from brain (with pace-scaled skill)
    const baseProfile: DrivingProfile = { ...PROFILES[this.mode] };
    if (this.mode === 'pro') baseProfile.skill = Math.min(1.12, baseProfile.skill * this.paceScaler);
    if (this.skillPenalty > 0) baseProfile.skill *= 1 - this.skillPenalty;
    this.brain.setProfile(baseProfile);
    let intent = this.brain.update(car, dt, others, muEff);

    // --- PRO never-spin guard (lerp 0.08 s, no snap)
    this.smoothSlip += (car.slipAngle - this.smoothSlip) * Math.min(1, dt / 0.08);
    if (this.mode === 'pro' && Math.abs(this.smoothSlip) > 0.663) { // 38 deg
      intent.throttle *= 0.55;
      intent.steer = clamp(-this.smoothSlip * 1.5, -1, 1);
      if (Math.abs(this.smoothSlip) > 0.785) intent.brake = Math.max(intent.brake, 0.4); // 45 deg hard clamp
    }
    if (this.mode === 'chill') {
      // slip clamped +-18 deg: bleed throttle, never spin
      if (Math.abs(car.slipAngle) > 0.314) intent.throttle = Math.min(intent.throttle, 0.3);
    }

    // Soft per-mode pace caps keep the three assists audibly distinct and on target.
    const speedCap = this.mode === 'chill' ? 30.6 : this.mode === 'normal' ? 39.0 : 30.6; // 110 / 140 / 110 km/h
    if (car.speedMs > speedCap) {
      intent.throttle = Math.min(intent.throttle, 0.12);
      intent.brake = Math.max(intent.brake, clamp((car.speedMs - speedCap) * 0.12, 0, 0.48));
    }

    // --- PRO predictive collision shield (0.35 s corridor raycast)
    if (this.mode === 'pro') {
      const px = car.x + car.vx * 0.35, pz = car.z + car.vz * 0.35;
      const pred = this.spline.nearest(px, pz, car.s + car.speedMs * 0.35);
      if (Math.abs(pred.lateral) > WALL_LATERAL - 0.35) {
        intent.steer = clamp(intent.steer - Math.sign(pred.lateral) * 0.6, -1, 1);
        intent.brake = Math.max(intent.brake, 0.5);
      }
      // hard speed cap 210 km/h
      if (car.speedMs * 3.6 > 210) intent.throttle = 0;
    }

    // --- anti-stuck recovery (normal & pro)
    if (this.mode !== 'chill') {
      if (car.speedMs < 1.4 && intent.throttle > 0.3 && this.recoveryTimer <= 0) {
        this.stuckTimer += dt;
        if (this.stuckTimer > 1.5) {
          this.recoveryTimer = 1.2;
          this.recoveryCount++;
          this.stuckTimer = 0;
        }
      } else this.stuckTimer = 0;
      if (this.recoveryTimer > 0) {
        this.recoveryTimer -= dt;
        intent.throttle = 0;
        intent.brake = 1; // reverse gear in physics
        intent.steer = -intent.steer;
        if (this.recoveryTimer <= 0 && this.recoveryCount > 2) {
          this.needsReposition = true;
          this.recoveryCount = 0;
        }
      }
    }

    // --- one-time 0.15 s crossfade after a mode switch (never continuous lag)
    if (this.blendTimer > 0 && this.blendFrom) {
      this.blendTimer -= dt;
      const k = Math.min(1, Math.max(0, this.blendTimer / 0.15));
      intent = {
        steer: intent.steer + (this.blendFrom.steer - intent.steer) * k,
        throttle: intent.throttle + (this.blendFrom.throttle - intent.throttle) * k,
        brake: intent.brake + (this.blendFrom.brake - intent.brake) * k,
        handbrake: intent.handbrake + (this.blendFrom.handbrake - intent.handbrake) * k,
        targetGear: intent.targetGear,
      };
      if (this.blendTimer <= 0) this.blendFrom = null;
    }
    this.blendFrom = { ...intent };

    // --- periodic log (every 10 s)
    this.logTimer += dt;
    if (this.logTimer >= 10) {
      this.logTimer = 0;
      onLog(`AD[${this.mode.toUpperCase()}] t=${car.s.toFixed(0)}m v=${(car.speedMs * 3.6).toFixed(0)}km/h slip=${(car.slipAngle * 180 / Math.PI).toFixed(0)}deg gear=${car.gear} gap=${gapToLeader >= 0 ? '+' : ''}${gapToLeader.toFixed(2)}s pace=${this.paceScaler.toFixed(2)}`);
    }

    return intent;
  }

  notifyCollision() {
    // humanization: after a wall hit, skill dips briefly (not a bug)
    this.skillPenalty = 0.05;
    this.skillPenaltyTimer = 4;
  }

  get paceTorqueMul(): number {
    return this.mode === 'pro' ? 1 + (this.paceScaler - 1) * 0.67 : 1;
  }

  get gripEnvelope(): number {
    return this.mode === 'pro' ? 1.18 : 1.0;
  }
}
