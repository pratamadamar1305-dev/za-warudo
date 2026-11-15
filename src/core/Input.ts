/**
 * Input.ts — keyboard (Event.code), gamepad, touch, remap, haptic (§13.6/§13.7).
 *
 * Prinsip: state selalu boolean yang jelas, tidak pernah macet karena blur.
 */

export type Action =
  | "throttle"
  | "brake"
  | "handbrake"
  | "steerLeft"
  | "steerRight"
  | "shiftUp"
  | "shiftDown"
  | "pause"
  | "camera"
  | "confirm"
  | "up"
  | "down"
  | "left"
  | "right"
  | "back";

const DEFAULT_BINDINGS: Record<string, Action> = {
  KeyW: "throttle",
  ArrowUp: "throttle",
  KeyS: "brake",
  ArrowDown: "brake",
  Space: "handbrake",
  KeyA: "steerLeft",
  ArrowLeft: "steerLeft",
  KeyD: "steerRight",
  ArrowRight: "steerRight",
  ShiftLeft: "shiftUp",
  KeyE: "shiftUp",
  ShiftRight: "shiftDown",
  KeyQ: "shiftDown",
  Escape: "pause",
  KeyP: "pause",
  KeyC: "camera",
  Enter: "confirm",
  NumpadEnter: "confirm",
  KeyR: "back",
};

/** Tombol game yang harus preventDefault (jangan sampai scroll halaman). */
const PREVENT = new Set([
  "Space",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
]);

export class Input {
  private down = new Set<string>();
  private pressedThisFrame = new Set<Action>();
  private releasedThisFrame = new Set<Action>();
  private bindings: Record<string, Action> = { ...DEFAULT_BINDINGS };
  private touchState = new Set<Action>();
  private padPrevButtons: boolean[] = [];
  private padIndex = -1;
  private target: HTMLElement | EventTarget | null = null;
  private onBlur = () => this.releaseAll();
  private onVis = () => {
    if (document.hidden) this.releaseAll();
  };

  /** Deadzone gamepad. */
  readonly PAD_DEADZONE = 0.12;

  attach(target: HTMLElement | Document = document): void {
    this.target = target;
    const el = target as HTMLElement;
    el.addEventListener?.("keydown", this.handleKeyDown as EventListener);
    el.addEventListener?.("keyup", this.handleKeyUp as EventListener);
    window.addEventListener("blur", this.onBlur);
    document.addEventListener("visibilitychange", this.onVis);
  }

  detach(): void {
    const el = this.target as HTMLElement | null;
    el?.removeEventListener?.("keydown", this.handleKeyDown as EventListener);
    el?.removeEventListener?.("keyup", this.handleKeyUp as EventListener);
    window.removeEventListener("blur", this.onBlur);
    document.removeEventListener("visibilitychange", this.onVis);
  }

  private handleKeyDown = (ev: KeyboardEvent): void => {
    if (PREVENT.has(ev.code)) ev.preventDefault();
    if (ev.repeat) return;
    this.down.add(ev.code);
    const action = this.bindings[ev.code];
    if (action) this.pressedThisFrame.add(action);
  };

  private handleKeyUp = (ev: KeyboardEvent): void => {
    this.down.delete(ev.code);
    const action = this.bindings[ev.code];
    if (action) this.releasedThisFrame.add(action);
  };

  releaseAll(): void {
    this.down.clear();
    this.touchState.clear();
    for (const a of Object.values(this.bindings)) this.releasedThisFrame.add(a);
    for (const a of ["throttle", "brake", "handbrake", "steerLeft", "steerRight"] as Action[]) {
      this.releasedThisFrame.add(a);
    }
  }

  setBinding(code: string, action: Action): void {
    for (const k of Object.keys(this.bindings)) {
      if (this.bindings[k] === action) delete this.bindings[k];
    }
    this.bindings[code] = action;
  }

  getBindings(): Record<string, Action> {
    return { ...this.bindings };
  }

  /** Dipanggil HUD touch untuk set state tombol on-screen. */
  setTouch(action: Action, on: boolean): void {
    if (on) {
      if (!this.touchState.has(action)) this.pressedThisFrame.add(action);
      this.touchState.add(action);
    } else {
      if (this.touchState.has(action)) this.releasedThisFrame.add(action);
      this.touchState.delete(action);
    }
  }

  /** Polling gamepad — panggil sekali per frame sebelum baca state. */
  pollGamepad(): void {
    const pads = navigator.getGamepads?.() ?? [];
    let pad: Gamepad | null = null;
    for (const p of pads) {
      if (p && p.connected) {
        pad = p;
        break;
      }
    }
    if (!pad) {
      this.padIndex = -1;
      this.padPrevButtons = [];
      return;
    }
    this.padIndex = pad.index;
    const btns = pad.buttons;
    for (let i = 0; i < btns.length; i++) {
      const now = btns[i]?.pressed ?? false;
      const was = this.padPrevButtons[i] ?? false;
      if (now && !was) {
        const a = PAD_MAP[i];
        if (a) this.pressedThisFrame.add(a);
      } else if (!now && was) {
        const a = PAD_MAP[i];
        if (a) this.releasedThisFrame.add(a);
      }
      this.padPrevButtons[i] = now;
    }
  }

  getConnectedPadName(): string | null {
    if (this.padIndex < 0) return null;
    const pad = navigator.getGamepads?.()[this.padIndex];
    return pad?.id ?? null;
  }

  /** Haptic kecil — diabaikan bila tidak didukung. */
  rumble(durationMs = 60, strong = 0.4, weak = 0.2): void {
    if (this.padIndex < 0) return;
    const pad = navigator.getGamepads?.()[this.padIndex] as Gamepad & {
      vibrationActuator?: { playEffect(t: string, p: { duration: number; strongMagnitude: number; weakMagnitude: number }): Promise<unknown> };
    };
    try {
      pad?.vibrationActuator
        ?.playEffect("dual-rumble", { duration: durationMs, strongMagnitude: strong, weakMagnitude: weak })
        .catch(() => undefined);
    } catch {
      /* tidak didukung — abaikan */
    }
  }

  /* ------------ query API ------------ */

  isDown(a: Action): boolean {
    if (this.anyKeyFor(a)) return true;
    if (this.touchState.has(a)) return true;
    if (this.padAnalogAxis) {
      const pad = this.padAnalogAxis.pad;
      if (a === "throttle" && (pad.buttons[7]?.value ?? 0) > 0.08) return true;
      if (a === "brake" && (pad.buttons[6]?.value ?? 0) > 0.08) return true;
    }
    return false;
  }

  justPressed(a: Action): boolean {
    return this.pressedThisFrame.has(a);
  }

  justReleased(a: Action): boolean {
    return this.releasedThisFrame.has(a);
  }

  /** Harus dipanggil di akhir setiap frame. */
  endFrame(): void {
    this.pressedThisFrame.clear();
    this.releasedThisFrame.clear();
  }

  /** -1..1, sudah termasuk axis gamepad analog. */
  steerAxis(): number {
    let v = 0;
    if (this.anyKeyFor("steerLeft")) v -= 1;
    if (this.anyKeyFor("steerRight")) v += 1;
    if (this.touchState.has("steerLeft")) v -= 1;
    if (this.touchState.has("steerRight")) v += 1;
    const pad = this.padAnalogAxis?.pad;
    if (pad) {
      const ax = pad.axes[0] ?? 0;
      if (Math.abs(ax) > this.PAD_DEADZONE) v += this.signScale(ax);
    }
    return Math.max(-1, Math.min(1, v));
  }

  throttleAxis(): number {
    let v = 0;
    if (this.anyKeyFor("throttle")) v = 1;
    if (this.touchState.has("throttle")) v = 1;
    const pad = this.padAnalogAxis?.pad;
    if (pad?.buttons[7]) v = Math.max(v, pad.buttons[7].value);
    return Math.max(0, Math.min(1, v));
  }

  brakeAxis(): number {
    let v = 0;
    if (this.anyKeyFor("brake")) v = 1;
    if (this.touchState.has("brake")) v = 1;
    const pad = this.padAnalogAxis?.pad;
    if (pad?.buttons[6]) v = Math.max(v, pad.buttons[6].value);
    return Math.max(0, Math.min(1, v));
  }

  /** True kalau ada input steering analog aktif (gamepad). */
  private get padAnalogAxis(): { pad: Gamepad; index: number } | null {
    const pads = navigator.getGamepads?.() ?? [];
    for (const p of pads) if (p && p.connected) return { pad: p, index: p.index };
    return null;
  }

  private anyKeyFor(a: Action): boolean {
    for (const code of Object.keys(this.bindings)) {
      if (this.bindings[code] === a && this.down.has(code)) return true;
    }
    return false;
  }

  private signScale(v: number): number {
    const s = Math.sign(v);
    const m = (Math.abs(v) - this.PAD_DEADZONE) / (1 - this.PAD_DEADZONE);
    return s * Math.min(1, Math.max(0, m));
  }
}

const PAD_MAP: Record<number, Action> = {
  0: "confirm",
  1: "back",
  2: "handbrake",
  3: "camera",
  4: "shiftDown",
  5: "shiftUp",
  6: "brake",
  7: "throttle",
  9: "pause",
  12: "up",
  13: "down",
  14: "left",
  15: "right",
};
