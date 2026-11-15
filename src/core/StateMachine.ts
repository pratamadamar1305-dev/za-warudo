/**
 * StateMachine.ts — Boot → Menu → Garage → Race → Results → Pause (§2, §13.5).
 *
 * Setiap state punya timeout bila perlu; ESC selalu bisa pause.
 */

export type GameState =
  | "Boot"
  | "Menu"
  | "Garage"
  | "Settings"
  | "Controls"
  | "Credits"
  | "Race"
  | "Pause"
  | "Results";

type Handler = (from: GameState, to: GameState) => void;

export class StateMachine {
  private state: GameState = "Boot";
  private prev: GameState = "Boot";
  private enteredAt = 0;
  private listeners = new Map<GameState, Handler[]>();
  private anyListeners: Handler[] = [];

  get current(): GameState {
    return this.state;
  }

  get previous(): GameState {
    return this.prev;
  }

  get timeInState(): number {
    return (performance.now() - this.enteredAt) / 1000;
  }

  on(state: GameState, fn: Handler): () => void {
    const arr = this.listeners.get(state) ?? [];
    arr.push(fn);
    this.listeners.set(state, arr);
    return () => {
      const cur = this.listeners.get(state);
      if (cur) this.listeners.set(state, cur.filter((f) => f !== fn));
    };
  }

  onAny(fn: Handler): () => void {
    this.anyListeners.push(fn);
    return () => {
      this.anyListeners = this.anyListeners.filter((f) => f !== fn);
    };
  }

  canTransition(to: GameState): boolean {
    const from = this.state;
    if (from === to) return false;
    // Aturan transisi keras supaya tidak ada state nyangkut.
    switch (to) {
      case "Race":
        return from === "Menu" || from === "Garage" || from === "Results" || from === "Pause";
      case "Pause":
        return from === "Race";
      case "Results":
        return from === "Race";
      case "Boot":
        return false;
      default:
        return true;
    }
  }

  go(to: GameState): void {
    if (!this.canTransition(to)) return;
    const from = this.state;
    this.prev = from;
    this.state = to;
    this.enteredAt = performance.now();
    for (const fn of this.listeners.get(to) ?? []) fn(from, to);
    for (const fn of this.anyListeners) fn(from, to);
  }

  /** Paksa kembali ke state (untuk recover dari error). */
  force(to: GameState): void {
    const from = this.state;
    this.prev = from;
    this.state = to;
    this.enteredAt = performance.now();
    for (const fn of this.listeners.get(to) ?? []) fn(from, to);
    for (const fn of this.anyListeners) fn(from, to);
  }
}
