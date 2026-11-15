/**
 * Loop.ts — fixed-step accumulator + interpolasi render (§13.1).
 *
 * Fisika selalu maju di 1/120 detik. Render bisa di Hz berapa pun.
 * dt dari rAF di-clamp ke MAX_FRAME_DT supaya tab-switch tidak meledakkan fisika.
 */

export interface LoopCallbacks {
  /** Dipanggil n kali per frame dengan dt konstan. */
  fixedStep(dt: number): void;
  /** Dipanggil sekali per frame. alpha = 0..1 untuk interpolasi. */
  render(alpha: number, frameDt: number): void;
}

export class Loop {
  private accumulator = 0;
  private lastTime = 0;
  private running = false;
  private rafId = 0;
  private fixedDt: number;
  private maxSubSteps: number;
  private maxFrameDt: number;
  private cb: LoopCallbacks;

  /** Statistik frame untuk auto-degrade kualitas (§12). */
  readonly stats = {
    avgFrameMs: 16.6,
    fps: 60,
    slowMs: 0,
    totalFrames: 0,
  };

  /** Bila true, loop berhenti memperbarui fisika (pause). Render tetap jalan. */
  paused = false;

  constructor(cb: LoopCallbacks, fixedDt: number, maxSubSteps: number, maxFrameDt: number) {
    this.cb = cb;
    this.fixedDt = fixedDt;
    this.maxSubSteps = maxSubSteps;
    this.maxFrameDt = maxFrameDt;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    const tick = (now: number) => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(tick);
      this.frame(now);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  /** Paksa reset accumulator — pakai setelah pause panjang. */
  resetClock(): void {
    this.lastTime = performance.now();
    this.accumulator = 0;
  }

  private frame(now: number): void {
    let dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (!Number.isFinite(dt) || dt < 0) dt = 0;
    if (dt > this.maxFrameDt) dt = this.maxFrameDt;

    // statistik
    const ms = dt * 1000;
    this.stats.avgFrameMs += (ms - this.stats.avgFrameMs) * 0.05;
    this.stats.fps = this.stats.avgFrameMs > 0.001 ? 1000 / this.stats.avgFrameMs : 60;
    this.stats.totalFrames++;
    if (ms > 20) this.stats.slowMs += ms;
    else this.stats.slowMs = Math.max(0, this.stats.slowMs - ms * 0.5);

    if (!this.paused) {
      this.accumulator += dt;
      let steps = 0;
      while (this.accumulator >= this.fixedDt && steps < this.maxSubSteps) {
        this.cb.fixedStep(this.fixedDt);
        this.accumulator -= this.fixedDt;
        steps++;
      }
      // Kalau kita mentok maxSubSteps, buang sisa agar tidak menumpuk selamanya.
      if (steps >= this.maxSubSteps) this.accumulator = 0;
    }

    const alpha = this.accumulator / this.fixedDt;
    this.cb.render(alpha, dt);
  }
}
