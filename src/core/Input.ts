export type SteeringMode = 'buttons' | 'tilt';
export interface PlayerControls { steer: number; throttle: number; brake: number; handbrake: number; active: boolean; }

export class InputController {
  private keys = new Set<string>();
  private pointers = new Map<string, Set<number>>();
  private steeringMode: SteeringMode = 'buttons';
  private tiltZero: number | null = null;
  private gamma: number | null = null;
  private readonly onOrientation = (e: DeviceOrientationEvent) => { if (e.gamma !== null) this.gamma = e.gamma; };

  constructor() {
    addEventListener('keydown', e => { this.keys.add(e.code); if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault(); });
    addEventListener('keyup', e => this.keys.delete(e.code));
    addEventListener('blur', () => { this.keys.clear(); this.clearPointers(); });
    addEventListener('deviceorientation', this.onOrientation, { passive: true });

    document.querySelectorAll<HTMLElement>('[data-control]').forEach(el => {
      const control = el.dataset.control!;
      const down = (e: PointerEvent) => {
        e.preventDefault();
        try { el.setPointerCapture(e.pointerId); } catch { /* pointer may already be cancelled */ }
        let ids = this.pointers.get(control); if (!ids) { ids = new Set(); this.pointers.set(control, ids); }
        ids.add(e.pointerId); el.classList.add('pressed');
      };
      const up = (e: PointerEvent) => {
        e.preventDefault();
        const ids = this.pointers.get(control); ids?.delete(e.pointerId);
        if (!ids?.size) { this.pointers.delete(control); el.classList.remove('pressed'); }
      };
      el.addEventListener('pointerdown', down); el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
    });
    const preventTouchScroll = (e: TouchEvent) => { if ((e.target as HTMLElement | null)?.closest('#game-canvas, #touch-ui')) e.preventDefault(); };
    document.addEventListener('touchstart', preventTouchScroll, { passive: false });
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });
  }

  setSteeringMode(mode: SteeringMode, zero: number | null) { this.steeringMode = mode; this.tiltZero = zero; }
  async calibrateTilt(): Promise<number | null> { this.tiltZero = this.gamma; return this.tiltZero; }
  resetTilt() { this.tiltZero = null; }
  get tiltAvailable() { return this.gamma !== null; }

  private down(code: string) { return this.keys.has(code); }
  private touched(name: string) { return (this.pointers.get(name)?.size ?? 0) > 0; }
  private clearPointers() {
    this.pointers.clear();
    document.querySelectorAll<HTMLElement>('[data-control]').forEach(el => el.classList.remove('pressed'));
  }

  read(): PlayerControls {
    const gp = navigator.getGamepads?.()[0];
    const keySteer = Number(this.down('KeyD') || this.down('ArrowRight')) - Number(this.down('KeyA') || this.down('ArrowLeft'));
    let steer = this.steeringMode === 'tilt' && this.gamma !== null && this.tiltZero !== null
      ? Math.max(-1, Math.min(1, (this.gamma - this.tiltZero) / 25))
      : this.steeringMode === 'tilt' && this.gamma !== null && this.tiltZero === null
        ? Math.max(-1, Math.min(1, this.gamma / 25))
        : keySteer + Number(this.touched('right')) - Number(this.touched('left'));
    if (Math.abs(steer) < 0.055) steer = 0;

    let throttle = Math.max(Number(this.down('KeyW') || this.down('ArrowUp')), Number(this.touched('gas')));
    let brake = Math.max(Number(this.down('KeyS') || this.down('ArrowDown')), Number(this.touched('brake')));
    let handbrake = Math.max(Number(this.down('Space')), Number(this.touched('hb')));
    let gpActive = false;
    if (gp) {
      const axis = Math.abs(gp.axes[0] ?? 0) > 0.12 ? gp.axes[0] : 0;
      if (axis) { steer = axis; gpActive = true; }
      const rt = gp.buttons[7]?.value ?? 0, lt = gp.buttons[6]?.value ?? 0;
      if (rt > .08) { throttle = Math.max(throttle, rt); gpActive = true; }
      if (lt > .08) { brake = Math.max(brake, lt); gpActive = true; }
      if (gp.buttons[0]?.pressed) { handbrake = 1; gpActive = true; }
    }
    const active = !!(steer || throttle || brake || handbrake || gpActive);
    return { steer, throttle, brake, handbrake, active };
  }
  justPressed(code: string) { return this.keys.has(code); }
  get isDown() { return (code: string) => this.keys.has(code); }
}
