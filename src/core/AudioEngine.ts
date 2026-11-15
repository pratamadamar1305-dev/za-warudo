/**
 * AudioEngine.ts — master bus, kompresor, reverb, ducking (§8).
 *
 * Aturan keras:
 *  - Satu AudioContext saja, dibuat setelah gesture pertama (autoplay policy).
 *  - Tidak ada node yang dibuat per frame. Semua voice persisten.
 *  - Setiap node yang selesai wajib stop()/disconnect() — dicek di audit.
 */

import { AUDIO } from "../sim/Tuning";

export class AudioEngine {
  ctx: AudioContext | null = null;
  master!: GainNode;
  compressor!: DynamicsCompressorNode;
  musicBus!: GainNode;
  sfxBus!: GainNode;
  reverb!: ConvolverNode;
  reverbSend!: GainNode;
  /** Noise buffer 2 detik, dipakai semua SFX. */
  noiseBuffer!: AudioBuffer;
  /** Statistik ducking — dipakai self-review/test audio. */
  duckCount = 0;
  /** Waktu (ctx) sampai kapan musik masih ter-duck. */
  duckUntil = 0;
  private started = false;

  get ready(): boolean {
    return this.ctx !== null && this.ctx.state === "running";
  }

  get currentTime(): number {
    return this.ctx?.currentTime ?? 0;
  }

  get sampleRate(): number {
    return this.ctx?.sampleRate ?? 48000;
  }

  /** Panggil dari handler klik/tap pertama. Idempotent. */
  async unlock(): Promise<void> {
    if (this.started) {
      await this.resume();
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) throw new Error("Web Audio API tidak tersedia di browser ini.");
    const ctx = new Ctor({ latencyHint: "interactive" });
    this.ctx = ctx;

    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = AUDIO.COMP_THRESHOLD_DB;
    this.compressor.ratio.value = AUDIO.COMP_RATIO;
    this.compressor.attack.value = AUDIO.COMP_ATTACK;
    this.compressor.release.value = AUDIO.COMP_RELEASE;
    this.compressor.knee.value = 6;

    this.master = ctx.createGain();
    this.master.gain.value = AUDIO.MASTER_GAIN;

    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = AUDIO.MUSIC_BUS;

    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = AUDIO.SFX_BUS;

    this.musicBus.connect(this.master);
    this.sfxBus.connect(this.master);
    this.master.connect(this.compressor);
    this.compressor.connect(ctx.destination);

    // Reverb send (dipakai musik & sfx secara selektif)
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse(2.1, 2.4);
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.28;
    this.reverbSend.connect(this.reverb);
    this.reverb.connect(this.master);

    this.noiseBuffer = this.makeNoise(2);

    await this.resume();
    this.started = true;
  }

  async resume(): Promise<void> {
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
        /* abaikan */
      }
    }
  }

  suspend(): void {
    if (!this.ctx) return;
    if (this.ctx.state === "running") void this.ctx.suspend().catch(() => undefined);
  }

  setMasterVolume(v: number): void {
    if (!this.master) return;
    this.master.gain.setTargetAtTime(clamp01(v) * AUDIO.MASTER_GAIN, this.ctx?.currentTime ?? 0, 0.02);
  }

  setMusicVolume(v: number): void {
    if (!this.musicBus) return;
    this.musicBus.gain.setTargetAtTime(clamp01(v), this.ctx?.currentTime ?? 0, 0.02);
  }

  setSfxVolume(v: number): void {
    if (!this.sfxBus) return;
    this.sfxBus.gain.setTargetAtTime(clamp01(v), this.ctx?.currentTime ?? 0, 0.02);
  }

  /** Turunkan musik 3.5 dB selama `ms` (§8 ducking). Tidak menumpuk. */
  duck(ms = 250): void {
    if (!this.ctx || !this.musicBus) return;
    const now = this.ctx.currentTime;
    const target = Math.pow(10, AUDIO.DUCK_DB / 20);
    const base = clamp01(0.62);
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(this.musicBus.gain.value, now);
    this.musicBus.gain.linearRampToValueAtTime(base * target, now + 0.03);
    this.musicBus.gain.linearRampToValueAtTime(base, now + ms / 1000);
    this.duckUntil = now + ms / 1000;
    this.duckCount += 1;
  }

  /** Generator IR sintetis: noise × exponential decay + early reflection. */
  private makeImpulse(seconds: number, decay: number): AudioBuffer {
    const ctx = this.ctx!;
    const rate = ctx.sampleRate;
    const len = Math.max(1, Math.floor(seconds * rate));
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        // sedikii lebih lambat decay di channel kanan untuk kesan stereo
        const d = Math.pow(1 - t, decay + (ch === 0 ? 0 : 0.25));
        data[i] = (Math.random() * 2 - 1) * d;
      }
      // early reflections
      const early = [0.017, 0.031, 0.047, 0.071, 0.103];
      for (const e of early) {
        const idx = Math.floor(e * rate);
        if (idx < len) data[idx] += (ch === 0 ? 0.6 : -0.45) * Math.pow(1 - e / seconds, 2);
      }
    }
    return buf;
  }

  private makeNoise(seconds: number): AudioBuffer {
    const ctx = this.ctx!;
    const rate = ctx.sampleRate;
    const len = Math.max(1, Math.floor(seconds * rate));
    const buf = ctx.createBuffer(1, len, rate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      // lowpass 1-pole ringan supaya tidak terlalu "hiss digital"
      last = last * 0.35 + white * 0.65;
      data[i] = last;
    }
    return buf;
  }

  /** Pasang noise source loop yang dipakai bersama. */
  createNoiseSource(): AudioBufferSourceNode | null {
    if (!this.ctx) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    return src;
  }
}

export function clamp01(v: unknown): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

/** Helper: buat gain node dengan nilai awal. */
export function gainNode(ctx: AudioContext, value: number): GainNode {
  const g = ctx.createGain();
  g.gain.value = value;
  return g;
}

/** Helper: exponential ramp yang aman dari 0 (Web Audio menolak 0 untuk exp). */
export function safeExpRamp(param: AudioParam, target: number, when: number): void {
  param.exponentialRampToValueAtTime(Math.max(0.0001, target), when);
}
