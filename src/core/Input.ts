export interface PlayerControls { steer: number; throttle: number; brake: number; handbrake: number; active: boolean; }

export class InputController {
  private keys = new Set<string>();
  private touch = new Set<string>();
  private previousGamepad = false;
  constructor() {
    addEventListener('keydown', e => { this.keys.add(e.code); if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault(); });
    addEventListener('keyup', e => this.keys.delete(e.code));
    addEventListener('blur', () => { this.keys.clear(); this.touch.clear(); });
    document.querySelectorAll<HTMLElement>('[data-control]').forEach(el => {
      const key = el.dataset.control!;
      const down = (e: Event) => { e.preventDefault(); this.touch.add(key); el.classList.add('pressed'); };
      const up = (e: Event) => { e.preventDefault(); this.touch.delete(key); el.classList.remove('pressed'); };
      el.addEventListener('pointerdown', down); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('pointerleave', up);
    });
  }
  read(): PlayerControls {
    const gp = navigator.getGamepads?.()[0];
    const steerKeys = (this.keys.has('KeyA') || this.keys.has('ArrowLeft') || this.touch.has('left') ? -1 : 0) + (this.keys.has('KeyD') || this.keys.has('ArrowRight') || this.touch.has('right') ? 1 : 0);
    let steer = Math.max(-1, Math.min(1, steerKeys));
    let throttle = Number(this.keys.has('KeyW') || this.keys.has('ArrowUp') || this.touch.has('gas'));
    let brake = Number(this.keys.has('KeyS') || this.keys.has('ArrowDown') || this.touch.has('brake'));
    let handbrake = Number(this.keys.has('Space') || this.touch.has('hb'));
    let gpActive = false;
    if (gp) {
      const axis = Math.abs(gp.axes[0] ?? 0) > 0.12 ? gp.axes[0] : 0;
      if (axis) { steer = axis; gpActive = true; }
      const rt = gp.buttons[7]?.value ?? 0, lt = gp.buttons[6]?.value ?? 0;
      if (rt > .08) { throttle = rt; gpActive = true; }
      if (lt > .08) { brake = lt; gpActive = true; }
      if (gp.buttons[0]?.pressed) { handbrake = 1; gpActive = true; }
    }
    const active = !!(steer || throttle || brake || handbrake || gpActive);
    this.previousGamepad = gpActive;
    return { steer, throttle, brake, handbrake, active };
  }
  justPressed(code: string) { return this.keys.has(code); }
  get isDown() { return (code: string) => this.keys.has(code); }
}
