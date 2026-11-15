/**
 * DialogSystem.ts — potret karakter prosedural di canvas + typewriter (§3.8, §10).
 *
 * Potret digambar murni dengan Canvas 2D: siluet, rambut spike, mata tajam.
 * Tidak ada font atau gambar eksternal.
 */

export interface PortraitStyle {
  skin: string;
  hair: string;
  hairStyle: "spike" | "long" | "short";
  eye: string;
  jacket: string;
  accessory?: "bandana" | "none" | "headband";
}

const PORTRAITS: Record<string, PortraitStyle> = {
  RYO: {
    skin: "#e8b98f",
    hair: "#151a24",
    hairStyle: "spike",
    eye: "#ffd400",
    jacket: "#2a1c14",
    accessory: "headband",
  },
  KENJI: {
    skin: "#dcae83",
    hair: "#241a12",
    hairStyle: "short",
    eye: "#5b9bff",
    jacket: "#132a52",
    accessory: "bandana",
  },
  AYU: {
    skin: "#f0c8a4",
    hair: "#3a2430",
    hairStyle: "long",
    eye: "#21e6c1",
    jacket: "#3a1030",
    accessory: "none",
  },
  PLAYER: {
    skin: "#e6b78d",
    hair: "#181c26",
    hairStyle: "short",
    eye: "#eaf2ff",
    jacket: "#1b2130",
    accessory: "none",
  },
};

const CHAR_RATE = 40; // karakter/detik

export class DialogSystem {
  private root: HTMLElement;
  private portrait: HTMLCanvasElement;
  private nameEl: HTMLElement;
  private textEl: HTMLElement;
  private hintEl: HTMLElement;
  private queue: { speaker: string; text: string }[] = [];
  private active = false;
  private fullText = "";
  private shown = 0;
  private timer = 0;
  private onBlip?: () => void;
  private subtitles = true;

  constructor(parent: HTMLElement, opts: { onBlip?: () => void } = {}) {
    this.onBlip = opts.onBlip;
    this.root = document.createElement("div");
    this.root.className = "dialog-wrap panel hidden";
    this.root.innerHTML = `
      <canvas class="dialog-portrait" width="216" height="216"></canvas>
      <div class="dialog-body">
        <div class="dialog-name"></div>
        <div class="dialog-text"></div>
        <div class="dialog-hint">SPACE / TAP untuk lanjut</div>
      </div>`;
    parent.appendChild(this.root);
    this.portrait = this.root.querySelector("canvas")!;
    this.nameEl = this.root.querySelector(".dialog-name")!;
    this.textEl = this.root.querySelector(".dialog-text")!;
    this.hintEl = this.root.querySelector(".dialog-hint")!;
  }

  setSubtitles(on: boolean): void {
    this.subtitles = on;
    if (!on && this.active) this.textEl.textContent = "";
  }

  get isActive(): boolean {
    return this.active;
  }

  get hasQueue(): boolean {
    return this.queue.length > 0;
  }

  say(speaker: string, text: string): void {
    this.queue.push({ speaker, text });
    if (!this.active) this.advance();
  }

  sayMany(speaker: string, lines: string[]): void {
    for (const l of lines) this.queue.push({ speaker, text: l });
    if (!this.active) this.advance();
  }

  private advance(): void {
    const next = this.queue.shift();
    if (!next) {
      this.hide();
      return;
    }
    this.active = true;
    this.root.classList.remove("hidden");
    this.fullText = next.text;
    this.shown = 0;
    this.timer = 0;
    this.nameEl.textContent = next.speaker;
    this.nameEl.style.color = PORTRAITS[next.speaker]?.eye ?? "#21e6c1";
    this.drawPortrait(next.speaker);
  }

  hide(): void {
    this.active = false;
    this.root.classList.add("hidden");
  }

  /** Space / tap: lanjutkan atau selesaikan teks. */
  skip(): void {
    if (!this.active) return;
    if (this.shown < this.fullText.length) {
      this.shown = this.fullText.length;
      this.textEl.textContent = this.fullText;
      return;
    }
    this.advance();
  }

  update(dt: number): void {
    if (!this.active) return;
    if (!this.subtitles) return;
    if (this.shown >= this.fullText.length) {
      this.hintEl.style.opacity = "1";
      return;
    }
    this.hintEl.style.opacity = "0.45";
    this.timer += dt;
    const target = Math.min(this.fullText.length, Math.floor(this.timer * CHAR_RATE));
    if (target > this.shown) {
      const prev = this.shown;
      this.shown = target;
      this.textEl.textContent = this.fullText.slice(0, this.shown);
      // blip per karakter, tapi maksimal 14/detik supaya tidak jadi buzz
      if (this.shown - prev > 0 && Math.floor(this.shown / 3) > Math.floor(prev / 3)) {
        this.onBlip?.();
      }
    }
  }

  /** Gambar potret anime prosedural. */
  private drawPortrait(speaker: string): void {
    const style = PORTRAITS[speaker] ?? PORTRAITS.PLAYER!;
    const canvas = this.portrait;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // latar gradient gelap
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#111a2c");
    bg.addColorStop(1, "#070b14");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // siluet pundak / jaket
    ctx.fillStyle = style.jacket;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h);
    ctx.quadraticCurveTo(w * 0.2, h * 0.72, w * 0.38, h * 0.68);
    ctx.lineTo(w * 0.62, h * 0.68);
    ctx.quadraticCurveTo(w * 0.8, h * 0.72, w * 0.9, h);
    ctx.closePath();
    ctx.fill();

    // kerah
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.moveTo(w * 0.42, h * 0.68);
    ctx.lineTo(w * 0.5, h * 0.82);
    ctx.lineTo(w * 0.58, h * 0.68);
    ctx.closePath();
    ctx.fill();

    // kepala
    ctx.fillStyle = style.skin;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.45, w * 0.17, h * 0.21, 0, 0, Math.PI * 2);
    ctx.fill();

    // jakun + leher
    ctx.fillRect(w * 0.44, h * 0.62, w * 0.12, h * 0.1);

    // rambut
    ctx.fillStyle = style.hair;
    if (style.hairStyle === "spike") {
      ctx.beginPath();
      ctx.moveTo(w * 0.32, h * 0.43);
      for (let i = 0; i < 7; i++) {
        const x = w * (0.33 + i * 0.055);
        const tip = h * (0.2 + (i % 2 === 0 ? 0 : 0.045));
        ctx.lineTo(x, tip);
        ctx.lineTo(x + w * 0.03, h * 0.35);
      }
      ctx.lineTo(w * 0.68, h * 0.43);
      ctx.quadraticCurveTo(w * 0.5, h * 0.28, w * 0.32, h * 0.43);
      ctx.fill();
    } else if (style.hairStyle === "long") {
      ctx.beginPath();
      ctx.moveTo(w * 0.31, h * 0.72);
      ctx.quadraticCurveTo(w * 0.26, h * 0.36, w * 0.5, h * 0.24);
      ctx.quadraticCurveTo(w * 0.74, h * 0.36, w * 0.69, h * 0.72);
      ctx.lineTo(w * 0.64, h * 0.66);
      ctx.quadraticCurveTo(w * 0.5, h * 0.5, w * 0.36, h * 0.66);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(w * 0.31, h * 0.48);
      ctx.quadraticCurveTo(w * 0.3, h * 0.25, w * 0.5, h * 0.24);
      ctx.quadraticCurveTo(w * 0.7, h * 0.25, w * 0.69, h * 0.48);
      ctx.quadraticCurveTo(w * 0.62, h * 0.34, w * 0.5, h * 0.35);
      ctx.quadraticCurveTo(w * 0.38, h * 0.36, w * 0.31, h * 0.48);
      ctx.fill();
    }

    // aksesori
    if (style.accessory === "headband") {
      ctx.fillStyle = "#ff2e63";
      ctx.fillRect(w * 0.3, h * 0.34, w * 0.4, h * 0.045);
    } else if (style.accessory === "bandana") {
      ctx.fillStyle = "#21a1c1";
      ctx.beginPath();
      ctx.moveTo(w * 0.3, h * 0.33);
      ctx.lineTo(w * 0.7, h * 0.33);
      ctx.lineTo(w * 0.66, h * 0.39);
      ctx.lineTo(w * 0.34, h * 0.39);
      ctx.closePath();
      ctx.fill();
    }

    // mata tajam (cel-shaded flat)
    ctx.fillStyle = "#f7fbff";
    for (const dx of [-0.062, 0.062]) {
      ctx.beginPath();
      ctx.ellipse(w * (0.5 + dx), h * 0.44, w * 0.036, h * 0.026, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = style.eye;
    for (const dx of [-0.062, 0.062]) {
      ctx.beginPath();
      ctx.ellipse(w * (0.5 + dx), h * 0.442, w * 0.019, h * 0.022, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#05070d";
    for (const dx of [-0.062, 0.062]) {
      ctx.beginPath();
      ctx.ellipse(w * (0.5 + dx), h * 0.443, w * 0.008, h * 0.014, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // alis tegas
    ctx.strokeStyle = style.hair;
    ctx.lineWidth = w * 0.014;
    ctx.lineCap = "round";
    for (const [x1, y1, x2, y2] of [
      [0.4, 0.395, 0.47, 0.4],
      [0.53, 0.4, 0.6, 0.395],
    ] as const) {
      ctx.beginPath();
      ctx.moveTo(w * x1, h * y1);
      ctx.lineTo(w * x2, h * y2);
      ctx.stroke();
    }

    // hidung & mulut minimalis
    ctx.strokeStyle = "rgba(40,20,10,0.5)";
    ctx.lineWidth = w * 0.01;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.47);
    ctx.lineTo(w * 0.492, h * 0.51);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w * 0.455, h * 0.56);
    ctx.lineTo(w * 0.545, h * 0.56);
    ctx.stroke();

    // garis manga diagonal sebagai latar
    ctx.strokeStyle = "rgba(120,170,255,0.07)";
    ctx.lineWidth = 2;
    for (let i = -h; i < w; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }
  }
}
