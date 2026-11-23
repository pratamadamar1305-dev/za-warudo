// RaceLogic.ts — checkpoints, sectors, positions, timer, countdown. Pure logic.

import { TrackSpline } from './TrackSpline';

export type RacePhase = 'countdown' | 'racing' | 'finished';

export interface RacerEntry {
  id: string; name: string; isPlayer: boolean;
  s: number; speedMs: number;
  finished: boolean; finishTime: number;
  sectorIdx: number; sectorStartTime: number;
}

export class RaceLogic {
  phase: RacePhase = 'countdown';
  countdownT = 3.2;
  countdownValue = 3;
  raceTime = 0;
  entries: RacerEntry[] = [];
  sectorTimes: number[] = []; // player sector times
  bestSector: number[] = [];
  lastSectorDelta = 0; // + behind best, - ahead
  positions: number[] = [];
  gapToLeader = 0; // seconds, + = behind leader
  playerPosition = 4;
  private sectorBounds: number[] = [];

  constructor(private spline: TrackSpline) {
    this.sectorBounds = spline.sectorBounds;
    this.bestSector = [Infinity, Infinity, Infinity, Infinity, Infinity];
  }

  reset(entries: RacerEntry[]) {
    this.phase = 'countdown';
    this.countdownT = 3.2;
    this.countdownValue = 3;
    this.raceTime = 0;
    this.entries = entries;
    this.sectorTimes = [];
    this.lastSectorDelta = 0;
    for (const e of entries) { e.finished = false; e.finishTime = 0; e.sectorIdx = 0; e.sectorStartTime = 0; }
    this.updatePositions();
  }

  update(dt: number, freezeTimer: boolean) {
    if (this.phase === 'countdown') {
      this.countdownT -= dt;
      const v = Math.ceil(this.countdownT);
      if (v !== this.countdownValue && v >= 0) this.countdownValue = v;
      if (this.countdownT <= 0) { this.phase = 'racing'; this.countdownValue = 0; }
      return;
    }
    if (this.phase === 'racing' && !freezeTimer) this.raceTime += dt;

    // sector crossings for player
    const player = this.entries.find((e) => e.isPlayer);
    if (player && !player.finished && this.phase === 'racing') {
      while (player.sectorIdx < this.sectorBounds.length && player.s >= this.sectorBounds[player.sectorIdx]) {
        const t = this.raceTime - player.sectorStartTime;
        this.sectorTimes.push(t);
        const best = this.bestSector[player.sectorIdx];
        this.lastSectorDelta = t - best;
        if (t < best) this.bestSector[player.sectorIdx] = t;
        player.sectorStartTime = this.raceTime;
        player.sectorIdx++;
      }
    }

    // finish detection
    for (const e of this.entries) {
      if (!e.finished && e.s >= this.spline.finishS) {
        e.finished = true;
        e.finishTime = this.raceTime;
      }
    }
    if (player && player.finished && this.phase === 'racing') this.phase = 'finished';

    this.updatePositions();
  }

  private updatePositions() {
    const sorted = [...this.entries].sort((a, b) => {
      if (a.finished && b.finished) return a.finishTime - b.finishTime;
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.s - a.s;
    });
    this.positions = sorted.map((e) => this.entries.indexOf(e));
    const playerIdx = this.entries.findIndex((e) => e.isPlayer);
    this.playerPosition = this.positions.indexOf(playerIdx) + 1;
    // gap to leader (seconds)
    const leader = sorted[0];
    const player = this.entries[playerIdx];
    if (leader && player && leader !== player) {
      if (player.finished && leader.finished) this.gapToLeader = player.finishTime - leader.finishTime;
      else this.gapToLeader = (leader.s - player.s) / Math.max(leader.speedMs, 8);
    } else this.gapToLeader = 0;
  }

  get playerFinished(): boolean {
    const p = this.entries.find((e) => e.isPlayer);
    return !!p && p.finished;
  }
}
