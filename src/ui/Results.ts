/**
 * Results.ts — layar hasil balapan + auto-timeout 60 s (§10, §13.5).
 */

import type { RaceResult } from "../sim/RaceLogic";

export interface ResultsCallbacks {
  onRestart(): void;
  onGarage(): void;
  onMenu(): void;
  onConfirm(): void;
}

export class Results {
  private root: HTMLElement;
  private timer = 0;
  private timeoutS = 60;
  private visible = false;

  constructor(parent: HTMLElement, private cb: ResultsCallbacks) {
    this.root = document.createElement("div");
    this.root.className = "screen hidden";
    this.root.style.zIndex = "30";
    this.root.style.alignItems = "center";
    this.root.style.justifyContent = "center";
    parent.appendChild(this.root);
  }

  get isVisible(): boolean {
    return this.visible;
  }

  show(result: RaceResult, bestLapMs: number | null): void {
    this.visible = true;
    this.timer = 0;
    const rank = result.totalRacers > 1 ? result.position : 1;
    const headline =
      result.totalRacers === 1
        ? "TIME ATTACK SELESAI"
        : result.won
          ? "KAMU MENANG!"
          : "KALAH — COBA LAGI";
    const rows = result.entries
      .map(
        (e, i) => `<tr class="${e.isPlayer ? "me" : ""}">
          <td>${i + 1}. ${e.name}</td>
          <td>${e.finished ? formatTime((e.finishTime ?? 0) * 1000) : `${Math.round(e.progress)} m`}</td>
        </tr>`,
      )
      .join("");

    const bestText =
      bestLapMs === null ? "—" : formatTime(bestLapMs) + (result.timeMs <= bestLapMs ? " · NEW!" : "");

    this.root.innerHTML = `
      <div class="panel results-card">
        <div class="results-rank">${result.totalRacers > 1 ? `P${rank}` : `${(result.timeMs / 1000).toFixed(2)}s`}</div>
        <div class="results-headline">${headline}</div>
        <table class="results-table">
          <tr><td>Waktu</td><td>${formatTime(result.timeMs)}</td></tr>
          <tr><td>Best time</td><td>${bestText}</td></tr>
          <tr><td>Drift score</td><td>${result.driftPoints.toLocaleString("id-ID")}</td></tr>
          <tr><td>Drift terbaik</td><td>${result.bestDrift.toLocaleString("id-ID")}</td></tr>
          <tr><td>Top speed</td><td>${result.topSpeedKmh} km/h</td></tr>
        </table>
        <table class="results-table">
          ${rows}
        </table>
        <div class="row" style="justify-content:center;gap:10px">
          <button class="btn btn-primary" data-act="restart">Race lagi</button>
          <button class="btn" data-act="garage">Garage</button>
          <button class="btn" data-act="menu">Menu</button>
        </div>
        <p style="font-size:10px;color:var(--dim);margin-top:14px">ENTER untuk race lagi · ESC untuk menu</p>
      </div>`;
    this.root.classList.remove("hidden");
    this.root.querySelector('[data-act="restart"]')!.addEventListener("click", () => {
      this.cb.onConfirm();
      this.cb.onRestart();
    });
    this.root.querySelector('[data-act="garage"]')!.addEventListener("click", () => {
      this.cb.onConfirm();
      this.cb.onGarage();
    });
    this.root.querySelector('[data-act="menu"]')!.addEventListener("click", () => {
      this.cb.onConfirm();
      this.cb.onMenu();
    });
  }

  hide(): void {
    this.visible = false;
    this.root.classList.add("hidden");
  }

  /** Kembalikan true bila timeout tercapai. */
  update(dt: number): boolean {
    if (!this.visible) return false;
    this.timer += dt;
    return this.timer > this.timeoutS;
  }

  /** Tampilkan cuan yang didapat pada layar hasil. */
  toastCash(amount: number): void {
    const card = this.root.querySelector(".results-card");
    if (!card) return;
    const el = document.createElement("p");
    el.style.cssText = "margin-top:10px;font-size:13px;letter-spacing:.1em;color:#ffb703";
    el.textContent = `+ ¥${amount.toLocaleString("id-ID")} cuan`;
    card.appendChild(el);
  }

  get remaining(): number {
    return Math.max(0, this.timeoutS - this.timer);
  }
}

export function formatTime(ms: number): string {
  const total = Math.max(0, Math.round(ms));
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const cs = Math.floor((total % 1000) / 10);
  return `${m}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}
