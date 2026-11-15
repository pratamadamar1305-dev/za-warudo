/**
 * DriftScore.ts — skor drift, multiplier, label DRIFT!/GREAT!/PERFECT! (§10).
 */

export interface DriftState {
  points: number;
  current: number;
  combo: number;
  multiplier: number;
  label: string;
  intensity: number; // 0..1 untuk musik & speed lines
  best: number;
  driftTime: number;
  banked: number;
}

export class DriftScore {
  readonly state: DriftState = {
    points: 0,
    current: 0,
    combo: 1,
    multiplier: 1,
    label: "",
    intensity: 0,
    best: 0,
    driftTime: 0,
    banked: 0,
  };

  reset(): void {
    Object.assign(this.state, {
      points: 0,
      current: 0,
      combo: 1,
      multiplier: 1,
      label: "",
      intensity: 0,
      best: 0,
      driftTime: 0,
      banked: 0,
    });
  }

  /**
   * Update per frame.
   * @param slipRear rad
   * @param speedKmh
   * @param hit true bila menabrak frame ini (reset combo)
   * @param inGutter true bila di gutter
   */
  update(dt: number, slipRear: number, speedKmh: number, hit: boolean, inGutter: boolean): void {
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
      // poin/detik tumbuh dengan slip & kecepatan
      const rate = (slipAbs * 2.6 + 0.5) * (speedKmh / 60) * 90;
      st.current += rate * dt;
      st.multiplier = 1 + Math.min(3, Math.floor(st.driftTime / 1.2)) * 0.5;
      if (inGutter) st.multiplier += 0.25;
      st.combo = Math.min(9, 1 + Math.floor(st.driftTime / 1.5));
      st.label = st.driftTime > 3.2 ? "PERFECT!" : st.driftTime > 1.9 ? "GREAT!" : "DRIFT!";
    } else {
      // bank saat drift berhenti
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

  get displayPoints(): number {
    return Math.round(this.state.points + this.state.current * this.state.multiplier);
  }

  get intensity(): number {
    return this.state.intensity;
  }
}
