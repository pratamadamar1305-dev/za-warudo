// DriftScore.ts — drift combo + multiplier scoring. Pure logic.

export class DriftScore {
  banked = 0;
  combo = 1;
  drifting = false;
  private current = 0;
  private driftTime = 0;
  private idleTime = 0;

  update(dt: number, slipDeg: number, speedKmh: number, hitWall: boolean, scoreMul: number) {
    if (hitWall) {
      this.combo = 1; this.current = 0; this.drifting = false; this.driftTime = 0; this.idleTime = 0;
      return;
    }
    const isDrifting = Math.abs(slipDeg) > 14 && speedKmh > 28;
    if (isDrifting) {
      this.drifting = true;
      this.driftTime += dt;
      this.idleTime = 0;
      this.combo = Math.min(2.5, 1 + this.driftTime * 0.22);
      this.current += Math.abs(slipDeg) * speedKmh * dt * 0.55 * this.combo * scoreMul;
    } else {
      this.idleTime += dt;
      if (this.drifting && this.idleTime > 0.6) {
        this.banked += this.current;
        this.current = 0;
        this.drifting = false;
      }
      if (this.idleTime > 3) { this.combo = 1; this.driftTime = 0; }
    }
  }

  get displayPoints(): number { return Math.floor(this.banked + this.current); }
  get driftMeter(): number { return Math.min(1, this.driftTime / 4); }

  grade(): string {
    if (!this.drifting) return '';
    if (this.combo >= 2.2) return 'PERFECT!';
    if (this.combo >= 1.6) return 'GREAT!';
    return 'DRIFT!';
  }

  reset() {
    this.banked = 0; this.current = 0; this.combo = 1;
    this.drifting = false; this.driftTime = 0; this.idleTime = 0;
  }
}
