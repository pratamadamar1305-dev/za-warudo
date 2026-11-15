/**
 * HUD.ts — speedometer 80-an, drift meter, gap timer, minimap, now playing (§10).
 *
 * Semua elemen dibuat sekali, hanya nilai yang di-update (tanpa reflow DOM).
 */

import type { TrackSpline } from "../sim/TrackSpline";

export interface HudData {
  speedKmh: number;
  rpm: number;
  gear: number;
  driftPoints: number;
  driftLabel: string;
  driftIntensity: number;
  multiplier: number;
  gapSeconds: number;
  hasRival: boolean;
  timeText: string;
  position: number;
  totalRacers: number;
  trackTitle: string;
  bpm: number;
  colorblindSafe: boolean;
}

export class HUD {
  private root: HTMLElement;
  private speedEl: HTMLElement;
  private rpmCanvas: HTMLCanvasElement;
  private rpmCtx: CanvasRenderingContext2D;
  private gearEl: HTMLElement;
  private driftFill: HTMLElement;
  private driftLabel: HTMLElement;
  private driftPoints: HTMLElement;
  private driftMult: HTMLElement;
  private gapEl: HTMLElement;
  private timeEl: HTMLElement;
  private mapCanvas: HTMLCanvasElement;
  private mapCtx: CanvasRenderingContext2D;
  private nowTitle: HTMLElement;
  private nowBpm: HTMLElement;
  private toastEl: HTMLElement;
  private roleEl: HTMLElement;
  private countdownEl: HTMLElement;
  private mapPath: Path2D | null = null;
  private mapBounds = { minX: 0, maxX: 1, minZ: 0, maxZ: 1 };
  private toastTimer = 0;
  private lastCountdown = -1;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.root.className = "hud hidden";
    this.root.innerHTML = `
      <canvas class="hud-map" width="300" height="300"></canvas>
      <div class="hud-now"><b>—</b><span>— BPM</span></div>
      <div class="hud-gap"><span class="arrow">▲</span><span class="val">+0.000</span></div>
      <div class="hud-time"><div class="lbl">WAKTU</div><div class="val">0:00.000</div></div>
      <div class="hud-drift">
        <div class="drift-label"></div>
        <div class="drift-bar"><div class="drift-fill"></div></div>
        <div class="row between" style="margin-top:6px">
          <span class="drift-points">0</span>
          <span class="drift-mult">x1.0</span>
        </div>
      </div>
      <div class="hud-speed">
        <canvas class="rpm-arc" width="420" height="68"></canvas>
        <div class="digit">0</div>
        <div class="gear-row"><span class="unit">KM/H</span><span class="gear">1</span></div>
      </div>
      <div class="hud-toast"></div>
      <div class="hud-role"></div>
      <div class="countdown hidden"></div>`;
    parent.appendChild(this.root);

    this.speedEl = this.root.querySelector(".digit")!;
    this.rpmCanvas = this.root.querySelector(".rpm-arc")!;
    this.rpmCtx = this.rpmCanvas.getContext("2d")!;
    this.gearEl = this.root.querySelector(".gear")!;
    this.driftFill = this.root.querySelector(".drift-fill")!;
    this.driftLabel = this.root.querySelector(".drift-label")!;
    this.driftPoints = this.root.querySelector(".drift-points")!;
    this.driftMult = this.root.querySelector(".drift-mult")!;
    this.gapEl = this.root.querySelector(".hud-gap")!;
    this.timeEl = this.root.querySelector(".hud-time .val")!;
    this.mapCanvas = this.root.querySelector(".hud-map")!;
    this.mapCtx = this.mapCanvas.getContext("2d")!;
    this.nowTitle = this.root.querySelector(".hud-now b")!;
    this.nowBpm = this.root.querySelector(".hud-now span")!;
    this.toastEl = this.root.querySelector(".hud-toast")!;
    this.roleEl = this.root.querySelector(".hud-role")!;
    this.countdownEl = this.root.querySelector(".countdown")!;
    this.driftLabel.textContent = "";
  }

  setTrack(track: TrackSpline): void {
    const n = track.points.length;
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (const p of track.points) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minZ = Math.min(minZ, p.z);
      maxZ = Math.max(maxZ, p.z);
    }
    this.mapBounds = { minX, maxX, minZ, maxZ };
    const path = new Path2D();
    for (let i = 0; i < n; i += 4) {
      const p = track.points[i]!;
      const [x, y] = this.mapProject(p.x, p.z);
      if (i === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    }
    this.mapPath = path;
  }

  private mapProject(x: number, z: number): [number, number] {
    const b = this.mapBounds;
    const pad = 22;
    const size = 300;
    const w = Math.max(1, b.maxX - b.minX);
    const h = Math.max(1, b.maxZ - b.minZ);
    const scale = Math.min((size - pad * 2) / w, (size - pad * 2) / h);
    return [
      pad + (x - b.minX) * scale,
      size - pad - (z - b.minZ) * scale,
    ];
  }

  show(): void {
    this.root.classList.remove("hidden");
  }

  hide(): void {
    this.root.classList.add("hidden");
    this.countdownEl.classList.add("hidden");
  }

  toast(text: string, ms = 2600): void {
    this.toastEl.textContent = text;
    this.toastEl.classList.add("show");
    this.toastTimer = ms / 1000;
  }

  setRole(text: string): void {
    this.roleEl.textContent = text;
  }

  update(dt: number, data: HudData, entities: { x: number; z: number; color: number; isPlayer: boolean }[]): void {
    // speed & gear
    this.speedEl.textContent = String(Math.round(data.speedKmh));
    this.gearEl.textContent = data.speedKmh < 1 ? "N" : String(data.gear);

    // rpm arc
    const ctx = this.rpmCtx;
    const w = this.rpmCanvas.width;
    const h = this.rpmCanvas.height;
    ctx.clearRect(0, 0, w, h);
    const rpmNorm = Math.max(0, Math.min(1, (data.rpm - 900) / (8200 - 900)));
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(30,44,70,0.85)";
    ctx.beginPath();
    ctx.arc(w / 2, h + 8, w / 2 - 14, Math.PI * 1.06, Math.PI * 1.94);
    ctx.stroke();
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#21e6c1");
    grad.addColorStop(0.68, "#7f9fff");
    grad.addColorStop(0.86, "#ffb703");
    grad.addColorStop(1, "#ff2e63");
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.arc(w / 2, h + 8, w / 2 - 14, Math.PI * 1.06, Math.PI * (1.06 + 0.88 * rpmNorm));
    ctx.stroke();
    // redline tick
    ctx.strokeStyle = "rgba(255,46,99,0.85)";
    ctx.lineWidth = 3;
    const redA = Math.PI * (1.06 + 0.88 * 0.86);
    ctx.beginPath();
    ctx.arc(w / 2, h + 8, w / 2 - 14, redA, Math.PI * 1.94);
    ctx.stroke();

    // drift
    const pct = Math.min(100, (data.driftPoints % 5000) / 50);
    this.driftFill.style.width = `${pct}%`;
    this.driftFill.style.opacity = data.driftIntensity > 0.05 ? "1" : "0.7";
    this.driftLabel.textContent = data.driftLabel;
    this.driftLabel.style.color =
      data.driftLabel === "PERFECT!" ? "#ff2e63" : data.driftLabel === "GREAT!" ? "#ffb703" : "#21e6c1";
    this.driftPoints.textContent = String(data.driftPoints);
    this.driftMult.textContent = `x${data.multiplier.toFixed(1)}`;

    // gap
    if (data.hasRival) {
      this.gapEl.style.display = "";
      const gap = data.gapSeconds;
      const ahead = gap >= 0;
      this.gapEl.classList.toggle("ahead", ahead);
      this.gapEl.classList.toggle("behind", !ahead);
      const arrow = this.gapEl.querySelector(".arrow")!;
      arrow.textContent = data.colorblindSafe ? (ahead ? "▲" : "▼") : ahead ? "▲" : "▼";
      const val = this.gapEl.querySelector(".val")!;
      val.textContent = `${ahead ? "+" : "−"}${Math.abs(gap).toFixed(3)}`;
    } else {
      this.gapEl.style.display = "none";
    }

    // waktu
    this.timeEl.textContent = data.timeText;

    // now playing
    this.nowTitle.textContent = data.trackTitle;
    this.nowBpm.textContent = `${data.bpm} BPM · POS ${data.position}/${data.totalRacers}`;

    // minimap
    this.drawMap(entities);

    // countdown
    const cd = Math.ceil(this.countdown) as number;
    void cd;

    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.toastEl.classList.remove("show");
    }
  }

  private countdown = 0;

  setCountdown(value: number): void {
    this.countdown = value;
    if (value <= 0) {
      if (this.lastCountdown !== 0) {
        this.countdownEl.textContent = "GO!";
        this.countdownEl.className = "countdown";
        const span = document.createElement("span");
        span.className = "go";
        span.textContent = "GO!";
        this.countdownEl.innerHTML = "";
        this.countdownEl.appendChild(span);
        this.lastCountdown = 0;
        window.setTimeout(() => {
          if (this.lastCountdown === 0) this.countdownEl.classList.add("hidden");
        }, 900);
      }
      return;
    }
    if (this.lastCountdown === value) return;
    this.lastCountdown = value;
    this.countdownEl.className = "countdown";
    const span = document.createElement("span");
    span.textContent = String(value);
    this.countdownEl.innerHTML = "";
    this.countdownEl.appendChild(span);
  }

  showCountdown(): void {
    this.countdownEl.classList.remove("hidden");
  }

  private drawMap(entities: { x: number; z: number; color: number; isPlayer: boolean }[]): void {
    const ctx = this.mapCtx;
    const size = this.mapCanvas.width;
    ctx.clearRect(0, 0, size, size);
    if (!this.mapPath) return;
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(110,150,210,0.28)";
    ctx.stroke(this.mapPath);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(140,190,255,0.6)";
    ctx.stroke(this.mapPath);

    for (const e of entities) {
      const [x, y] = this.mapProject(e.x, e.z);
      ctx.beginPath();
      ctx.arc(x, y, e.isPlayer ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = `#${e.color.toString(16).padStart(6, "0")}`;
      ctx.fill();
      if (e.isPlayer) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
    }
  }
}
