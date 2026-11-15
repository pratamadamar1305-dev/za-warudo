/**
 * Cutscene.ts — intro dolly 6 detik mengelilingi mobil + overlay kanji (§3.7).
 *
 * Kamera bergerak di jalur dolly (bukan animasi CSS), overlay digambar di
 * canvas 2D. Bisa di-skip dengan tombol apa pun.
 */

import * as THREE from "three";

const DURATION = 6.2;

export class Cutscene {
  private active = false;
  private t = 0;
  private overlay: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private onDone: (() => void) | null = null;
  private camPos = new THREE.Vector3();
  private camLook = new THREE.Vector3();
  private carPos = new THREE.Vector3();
  private carYaw = 0;

  constructor(parent: HTMLElement) {
    this.overlay = document.createElement("canvas");
    this.overlay.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:19;opacity:0;transition:opacity .4s ease";
    parent.appendChild(this.overlay);
    this.ctx = this.overlay.getContext("2d")!;
  }

  get isActive(): boolean {
    return this.active;
  }

  start(carPosition: THREE.Vector3, carYaw: number, onDone: () => void): void {
    this.active = true;
    this.t = 0;
    this.carPos.copy(carPosition);
    this.carYaw = carYaw;
    this.onDone = onDone;
    this.overlay.style.opacity = "1";
    this.resize();
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.overlay.width = Math.max(1, Math.floor(window.innerWidth * dpr));
    this.overlay.height = Math.max(1, Math.floor(window.innerHeight * dpr));
  }

  skip(): void {
    if (!this.active) return;
    this.finish();
  }

  private finish(): void {
    this.active = false;
    this.overlay.style.opacity = "0";
    this.ctx.clearRect(0, 0, this.overlay.width, this.overlay.height);
    const cb = this.onDone;
    this.onDone = null;
    cb?.();
  }

  /** Update; kembalikan true bila cutscene masih mengambil alih kamera. */
  update(dt: number, camera: THREE.PerspectiveCamera): boolean {
    if (!this.active) return false;
    this.t += dt;
    const k = Math.min(1, this.t / DURATION);

    // dolly: setengah lingkaran dari depan-bawah ke belakang-atas
    const angle = -0.85 + k * 2.6;
    const radius = 5.6 - Math.sin(k * Math.PI) * 1.6;
    const yaw = this.carYaw + angle;
    const x = this.carPos.x + Math.cos(yaw) * radius;
    const z = this.carPos.z + Math.sin(yaw) * radius;
    const y = this.carPos.y + 0.55 + Math.sin(k * Math.PI * 0.9) * 1.5;

    this.camPos.set(x, y, z);
    this.camLook.set(this.carPos.x, this.carPos.y + 0.72, this.carPos.z);
    camera.position.copy(this.camPos);
    camera.up.set(0, 1, 0);
    camera.lookAt(this.camLook);
    const fov = 46 + Math.sin(k * Math.PI) * 12;
    camera.fov = fov;
    camera.updateProjectionMatrix();

    this.drawOverlay(k);

    if (this.t >= DURATION) {
      this.finish();
      return false;
    }
    return true;
  }

  /** Kanji + motion line manga + judul. */
  private drawOverlay(k: number): void {
    const ctx = this.ctx;
    const w = this.overlay.width;
    const h = this.overlay.height;
    ctx.clearRect(0, 0, w, h);

    // motion lines diagonal ala manga
    const alpha = Math.min(1, k * 3) * (1 - Math.max(0, (k - 0.82) * 5.5));
    ctx.strokeStyle = `rgba(220,235,255,${0.13 * alpha})`;
    ctx.lineWidth = Math.max(1, w * 0.0016);
    for (let i = 0; i < 26; i++) {
      const seed = (i * 97.31) % 1;
      const x0 = seed * w;
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0 - h * 0.55, h);
      ctx.stroke();
    }

    // kanji vertikal
    ctx.save();
    ctx.globalAlpha = alpha;
    const fontSize = Math.round(Math.min(w, h) * 0.052);
    ctx.font = `600 ${fontSize}px "Hiragino Mincho ProN", "Yu Mincho", serif`;
    ctx.fillStyle = "rgba(235,245,255,0.92)";
    ctx.textAlign = "center";
    const kanji = ["群", "馬", "峠", "夜", "走"];
    const startX = w * 0.88;
    const startY = h * 0.2;
    for (let i = 0; i < kanji.length; i++) {
      ctx.fillText(kanji[i]!, startX, startY + i * fontSize * 1.12);
    }
    ctx.restore();

    // judul saat fase akhir
    const titleAlpha = Math.max(0, Math.min(1, (k - 0.35) * 4)) * Math.max(0, 1 - (k - 0.9) * 8);
    if (titleAlpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = titleAlpha;
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = `900 ${Math.round(Math.min(w * 0.06, h * 0.085))}px "Trebuchet MS", sans-serif`;
      ctx.shadowColor = "rgba(255,46,99,0.75)";
      ctx.shadowBlur = 32;
      ctx.fillText("GUNMA DOWNHILL", w / 2, h * 0.52);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ff2e63";
      ctx.font = `700 ${Math.round(Math.min(w * 0.024, h * 0.032))}px "Trebuchet MS", sans-serif`;
      ctx.fillText("EUROBEAT DRIFT LEGEND", w / 2, h * 0.52 + h * 0.075);
      ctx.restore();
    }

    // hint skip
    ctx.save();
    ctx.globalAlpha = 0.5 * alpha;
    ctx.textAlign = "right";
    ctx.fillStyle = "#cfe0ff";
    ctx.font = `600 ${Math.round(Math.min(w * 0.013, 16))}px "Trebuchet MS", sans-serif`;
    ctx.fillText("Tekan tombol apa pun untuk skip", w - 24, h - 24);
    ctx.restore();
  }

  dispose(): void {
    this.overlay.remove();
  }
}
