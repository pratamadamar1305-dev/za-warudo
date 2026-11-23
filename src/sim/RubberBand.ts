// RubberBand.ts — gentle AI pace adjustment based on gap to player. Pure logic.

export class RubberBand {
  skillMod = 1;

  // gapSeconds > 0 means the player is AHEAD of this AI (in seconds).
  update(gapSeconds: number, dt: number) {
    let target = 1;
    if (gapSeconds > 6) target = 1.03; // player ahead -> AI slightly faster
    else if (gapSeconds < -8) target = 0.96; // player behind -> AI slightly slower
    // smooth approach, clamped
    this.skillMod += (target - this.skillMod) * Math.min(1, dt * 0.5);
    this.skillMod = Math.min(1.06, Math.max(0.94, this.skillMod));
  }
}
