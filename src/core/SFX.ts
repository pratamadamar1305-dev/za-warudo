/**
 * SFX.ts — engine, tire, BOV, impact, gutter, wind, UI, countdown (§8B).
 *
 * Semua sumber suara persisten: dibangun sekali, nilainya digerakkan per frame
 * via AudioParam. Hanya one-shot (impact, shift, UI blip) yang membuat node
 * sementara, dan itu selalu stop() + disconnect() lewat onended.
 */

import type { AudioEngine } from "./AudioEngine";
import { PHYSICS } from "../sim/Tuning";

const SMOOTH = 0.035;

export class SFX {
  private engine: AudioEngine;
  private ctx: AudioContext | null = null;
  private built = false;

  /* engine */
  private engOscs: OscillatorNode[] = [];
  private engGains: GainNode[] = [];
  private engFilter!: BiquadFilterNode;
  private engGain!: GainNode;
  private engBreathSrc!: AudioBufferSourceNode;
  private engBreathFilter!: BiquadFilterNode;
  private engBreathGain!: GainNode;
  private engWobble!: OscillatorNode;
  private engWobbleGain!: GainNode;
  private limiterGate!: GainNode;

  /* tire */
  private tireSrc!: AudioBufferSourceNode;
  private tireBp!: BiquadFilterNode;
  private tireGain!: GainNode;
  private tireRes1!: OscillatorNode;
  private tireRes1Gain!: GainNode;
  private tireRes2!: OscillatorNode;
  private tireRes2Gain!: GainNode;
  private tireGrowl!: OscillatorNode;
  private tireGrowlGain!: GainNode;

  /* wind */
  private windSrc!: AudioBufferSourceNode;
  private windFilter!: BiquadFilterNode;
  private windGain!: GainNode;

  /* ambience */
  private ambSrc!: AudioBufferSourceNode;
  private ambFilter!: BiquadFilterNode;
  private ambGain!: GainNode;
  private cricketTimer = 0;

  /* turbo */
  private bovSrc!: AudioBufferSourceNode;
  private bovFilter!: BiquadFilterNode;
  private bovGain!: GainNode;

  /* gutter */
  private gutterClickSrc!: AudioBufferSourceNode;
  private gutterFilter!: BiquadFilterNode;
  private gutterGain!: GainNode;
  private gutterNextTick = 0;

  /* state */
  lastRpm = 0;
  private lastThrottle = 0;
  private limiterPhase = 0;
  private boostLfo: OscillatorNode | null = null;

  constructor(engine: AudioEngine) {
    this.engine = engine;
  }

  get isBuilt(): boolean {
    return this.built;
  }

  build(): void {
    if (this.built) return;
    const ctx = this.engine.ctx;
    if (!ctx) throw new Error("AudioEngine belum di-unlock.");
    this.ctx = ctx;

    const noise = this.engine.createNoiseSource();
    if (!noise) throw new Error("Noise buffer gagal dibuat.");
    const noise2 = this.engine.createNoiseSource();
    const noise3 = this.engine.createNoiseSource();
    const noise4 = this.engine.createNoiseSource();
    const noise5 = this.engine.createNoiseSource();
    const noise6 = this.engine.createNoiseSource();
    noise.start(0);
    noise2!.start(0);
    noise3!.start(0);
    noise4!.start(0);
    noise5!.start(0);
    noise6!.start(0);

    /* ---------------- ENGINE ---------------- */
    this.engFilter = ctx.createBiquadFilter();
    this.engFilter.type = "lowpass";
    this.engFilter.frequency.value = 900;
    this.engFilter.Q.value = 1.6;
    this.engGain = ctx.createGain();
    this.engGain.gain.value = 0.0001;
    this.limiterGate = ctx.createGain();
    this.limiterGate.gain.value = 1;
    this.engFilter.connect(this.engGain);
    this.engGain.connect(this.limiterGate);
    this.limiterGate.connect(this.engine.sfxBus);

    // harmonic 1, 2, 3 dengan gain menurun
    const harmonicGains = [0.3, 0.14, 0.07];
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sawtooth" : "square";
      o.frequency.value = 60;
      const g = ctx.createGain();
      g.gain.value = harmonicGains[i] ?? 0.1;
      o.connect(g);
      g.connect(this.engFilter);
      o.start();
      this.engOscs.push(o);
      this.engGains.push(g);
    }

    // pitch wobble LFO 6 Hz depth 0.6%
    this.engWobble = ctx.createOscillator();
    this.engWobble.type = "sine";
    this.engWobble.frequency.value = 6;
    this.engWobbleGain = ctx.createGain();
    this.engWobbleGain.gain.value = 0.6;
    this.engWobble.connect(this.engWobbleGain);
    for (const o of this.engOscs) this.engWobbleGain.connect(o.detune);
    this.engWobble.start();

    // breath noise — gain naik sesuai throttle
    this.engBreathSrc = noise;
    this.engBreathFilter = ctx.createBiquadFilter();
    this.engBreathFilter.type = "bandpass";
    this.engBreathFilter.frequency.value = 420;
    this.engBreathFilter.Q.value = 0.8;
    this.engBreathGain = ctx.createGain();
    this.engBreathGain.gain.value = 0.0001;
    this.engBreathSrc.connect(this.engBreathFilter);
    this.engBreathFilter.connect(this.engBreathGain);
    this.engBreathGain.connect(this.engine.sfxBus);

    /* ---------------- TIRE ---------------- */
    this.tireSrc = noise2!;
    this.tireBp = ctx.createBiquadFilter();
    this.tireBp.type = "bandpass";
    this.tireBp.frequency.value = 1600;
    this.tireBp.Q.value = 6;
    this.tireGain = ctx.createGain();
    this.tireGain.gain.value = 0.0001;
    this.tireSrc.connect(this.tireBp);
    this.tireBp.connect(this.tireGain);
    this.tireGain.connect(this.engine.sfxBus);

    this.tireRes1 = ctx.createOscillator();
    this.tireRes1.type = "sine";
    this.tireRes1.frequency.value = 2100;
    this.tireRes1Gain = ctx.createGain();
    this.tireRes1Gain.gain.value = 0.0001;
    this.tireRes1.connect(this.tireRes1Gain);
    this.tireRes1Gain.connect(this.engine.sfxBus);
    this.tireRes1.start();

    this.tireRes2 = ctx.createOscillator();
    this.tireRes2.type = "sine";
    this.tireRes2.frequency.value = 3400;
    this.tireRes2Gain = ctx.createGain();
    this.tireRes2Gain.gain.value = 0.0001;
    this.tireRes2.connect(this.tireRes2Gain);
    this.tireRes2Gain.connect(this.engine.sfxBus);
    this.tireRes2.start();

    this.tireGrowl = ctx.createOscillator();
    this.tireGrowl.type = "sawtooth";
    this.tireGrowl.frequency.value = 320;
    this.tireGrowlGain = ctx.createGain();
    this.tireGrowlGain.gain.value = 0.0001;
    const growlFilter = ctx.createBiquadFilter();
    growlFilter.type = "lowpass";
    growlFilter.frequency.value = 700;
    this.tireGrowl.connect(growlFilter);
    growlFilter.connect(this.tireGrowlGain);
    this.tireGrowlGain.connect(this.engine.sfxBus);
    this.tireGrowl.start();

    /* ---------------- WIND ---------------- */
    this.windSrc = noise3!;
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = "lowpass";
    this.windFilter.frequency.value = 500;
    this.windGain = ctx.createGain();
    this.windGain.gain.value = 0.0001;
    this.windSrc.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.engine.sfxBus);

    /* ---------------- AMBIENCE ---------------- */
    this.ambSrc = noise4!;
    this.ambFilter = ctx.createBiquadFilter();
    this.ambFilter.type = "bandpass";
    this.ambFilter.frequency.value = 4000;
    this.ambFilter.Q.value = 3;
    this.ambGain = ctx.createGain();
    this.ambGain.gain.value = 0.0001;
    this.ambSrc.connect(this.ambFilter);
    this.ambFilter.connect(this.ambGain);
    this.ambGain.connect(this.engine.sfxBus);

    /* ---------------- BOV ---------------- */
    this.bovSrc = noise5!;
    this.bovFilter = ctx.createBiquadFilter();
    this.bovFilter.type = "highpass";
    this.bovFilter.frequency.value = 2500;
    this.bovGain = ctx.createGain();
    this.bovGain.gain.value = 0.0001;
    this.bovSrc.connect(this.bovFilter);
    this.bovFilter.connect(this.bovGain);
    this.bovGain.connect(this.engine.sfxBus);

    /* ---------------- GUTTER (tok-tok) ---------------- */
    this.gutterClickSrc = noise6!;
    this.gutterFilter = ctx.createBiquadFilter();
    this.gutterFilter.type = "bandpass";
    this.gutterFilter.frequency.value = 1200;
    this.gutterFilter.Q.value = 5;
    this.gutterGain = ctx.createGain();
    this.gutterGain.gain.value = 0.0001;
    this.gutterClickSrc.connect(this.gutterFilter);
    this.gutterFilter.connect(this.gutterGain);
    this.gutterGain.connect(this.engine.sfxBus);

    this.built = true;
  }

  /* ---------------- continuous update ---------------- */

  /**
   * Update engine + tire + wind tiap frame.
   * @param rpm 900..8200
   * @param throttle 0..1
   * @param slipAngleRear rad (abs)
   * @param speedKmh
   * @param inGutter
   * @param cylinders jumlah silinder (4/6)
   */
  update(dt: number, o: {
    rpm: number;
    throttle: number;
    slipRear: number;
    speedKmh: number;
    inGutter: boolean;
    inTunnel: boolean;
    limiter: boolean;
    turbo: boolean;
    active: boolean;
  }): void {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    /* ---------- ENGINE ---------- */
    const rpm = Math.max(PHYSICS.IDLE_RPM, Math.min(PHYSICS.LIMITER_RPM, o.rpm));
    const base = (rpm / 60) * 2; // 4 silinder → 2 firings per rev
    for (let i = 0; i < this.engOscs.length; i++) {
      const mul = i + 1;
      this.engOscs[i]!.frequency.setTargetAtTime(base * mul, t, SMOOTH);
    }
    const cut = 900 + (rpm / PHYSICS.REDLINE_RPM) * 5600 + o.throttle * 900;
    this.engFilter.frequency.setTargetAtTime(Math.min(6800, cut), t, SMOOTH);
    const engVol = o.active ? 0.16 + o.throttle * 0.16 : 0.0001;
    this.engGain.gain.setTargetAtTime(engVol, t, SMOOTH);
    this.engBreathGain.gain.setTargetAtTime(o.active ? 0.02 + o.throttle * 0.07 : 0.0001, t, SMOOTH);
    this.engBreathFilter.frequency.setTargetAtTime(300 + (rpm / PHYSICS.REDLINE_RPM) * 800, t, SMOOTH);

    /* ---------- REV LIMITER: gate 30 Hz ---------- */
    if (o.limiter) {
      this.limiterPhase += dt * 30;
      const on = Math.sin(this.limiterPhase * Math.PI * 2) > 0 ? 0.12 : 1;
      this.limiterGate.gain.setTargetAtTime(on, t, 0.004);
    } else {
      this.limiterGate.gain.setTargetAtTime(1, t, 0.01);
    }

    /* ---------- TIRE ---------- */
    const slip = Math.min(1, Math.abs(o.slipRear) / 0.7);
    const tireActive = o.active && slip > 0.08 && o.speedKmh > 12;
    const tireVol = tireActive ? 0.03 + slip * 0.16 : 0.0001;
    this.tireGain.gain.setTargetAtTime(tireVol, t, 0.02);
    this.tireBp.frequency.setTargetAtTime(1200 + slip * 900, t, 0.03);
    this.tireRes1Gain.gain.setTargetAtTime(tireActive ? slip * 0.035 : 0.0001, t, 0.03);
    this.tireRes2Gain.gain.setTargetAtTime(tireActive ? slip * 0.022 : 0.0001, t, 0.03);
    this.tireRes1.frequency.setTargetAtTime(1900 + slip * 700, t, 0.04);
    this.tireRes2.frequency.setTargetAtTime(3100 + slip * 900, t, 0.04);
    this.tireGrowlGain.gain.setTargetAtTime(
      tireActive && slip > 0.55 ? 0.05 * ((slip - 0.55) / 0.45) : 0.0001,
      t,
      0.04,
    );

    /* ---------- WIND ---------- */
    const windT = Math.max(0, Math.min(1, (o.speedKmh - 90) / 110));
    this.windGain.gain.setTargetAtTime(o.active ? windT * 0.085 : 0.0001, t, 0.06);
    this.windFilter.frequency.setTargetAtTime(380 + windT * 1500, t, 0.06);

    /* ---------- AMBIENCE ---------- */
    const ambTarget = o.active ? (o.inTunnel ? 0.004 : 0.014) : 0.0001;
    this.ambGain.gain.setTargetAtTime(ambTarget, t, 0.2);
    this.ambFilter.frequency.setTargetAtTime(o.inTunnel ? 900 : 3600, t, 0.3);
    if (!o.inTunnel && o.active) {
      this.cricketTimer -= dt;
      if (this.cricketTimer <= 0) {
        this.cricketTimer = 1.6 + Math.random() * 3.4;
        this.clickAt(t + 0.02, 4200, 0.05, 0.03);
      }
    }

    /* ---------- GUTTER ---------- */
    if (o.inGutter && o.speedKmh > 5) {
      if (t >= this.gutterNextTick) {
        this.gutterNextTick = t + 1 / PHYSICS.GUTTER_TICK_HZ;
        this.gutterGain.gain.cancelScheduledValues(t);
        this.gutterGain.gain.setValueAtTime(0.09, t);
        this.gutterGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
      }
    } else {
      this.gutterGain.gain.setTargetAtTime(0.0001, t, 0.02);
      this.gutterNextTick = 0;
    }

    /* ---------- BOV ---------- */
    if (o.turbo && this.lastThrottle > 0.6 && o.throttle < 0.15) {
      this.bov(t);
    }
    this.lastThrottle = o.throttle;
    this.lastRpm = rpm;
  }

  private bov(t: number): void {
    if (!this.built) return;
    this.bovGain.gain.cancelScheduledValues(t);
    this.bovGain.gain.setValueAtTime(0.0001, t);
    this.bovGain.gain.linearRampToValueAtTime(0.075, t + 0.005);
    this.bovGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    this.bovFilter.frequency.cancelScheduledValues(t);
    this.bovFilter.frequency.setValueAtTime(3200, t);
    this.bovFilter.frequency.exponentialRampToValueAtTime(1500, t + 0.14);
  }

  /* ---------------- one-shots ---------------- */

  /** Klik pendek dari noise buffer — dipakai ambience & UI. */
  private clickAt(t: number, freq: number, gain: number, dur: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = this.engine.noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value = 8;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.engine.sfxBus);
    src.start(t);
    src.stop(t + dur + 0.02);
    src.onended = () => {
      src.disconnect();
      bp.disconnect();
      g.disconnect();
    };
  }

  /** "klak" mekanis dua click, pitch naik/turun sesuai arah. */
  shift(up: boolean): void {
    if (!this.built || !this.ctx) return;
    const t = this.ctx.currentTime;
    const a = up ? 1400 : 900;
    this.clickAt(t, a, 0.1, 0.02);
    this.clickAt(t + 0.035, a * 0.75, 0.075, 0.03);
  }

  /** Impact guardrail: noise burst + metal ring 3 partial + ducking. */
  impact(strength = 1): void {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const s = Math.max(0.15, Math.min(1.6, strength));

    // noise burst
    const src = ctx.createBufferSource();
    src.buffer = this.engine.noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 900;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.22 * s, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.engine.sfxBus);
    const send = ctx.createGain();
    send.gain.value = 0.2;
    g.connect(send);
    send.connect(this.engine.reverbSend);
    src.start(t, Math.random() * 1.4);
    src.stop(t + 0.3);
    src.onended = () => {
      src.disconnect();
      bp.disconnect();
      g.disconnect();
      send.disconnect();
    };
    // jaring pengaman: kalau onended tidak pernah dipanggil (tab dibekukan),
    // node tetap dilepas lewat timer sekali pakai.
    window.setTimeout(() => {
      try {
        src.disconnect();
        bp.disconnect();
        g.disconnect();
        send.disconnect();
      } catch {
        /* sudah dilepas */
      }
    }, 900);

    // metal ring
    const partials = [480, 1150, 2300];
    for (const f of partials) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f * (0.98 + Math.random() * 0.04);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.0001, t);
      og.gain.linearRampToValueAtTime((0.05 * s) / (f / 480), t + 0.008);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      o.connect(og);
      og.connect(this.engine.sfxBus);
      o.start(t);
      o.stop(t + 0.45);
      o.onended = () => {
        o.disconnect();
        og.disconnect();
      };
    }

    this.engine.duck(240);
  }

  /** UI hover blip 880 Hz 30 ms. */
  hover(): void {
    this.blip(880, 0.03, 0.06);
  }

  /** UI confirm 1320 Hz. */
  confirm(): void {
    this.blip(1320, 0.06, 0.1);
  }

  back(): void {
    this.blip(560, 0.06, 0.07);
  }

  private blip(freq: number, dur: number, gain: number): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(this.engine.sfxBus);
    o.start(t);
    o.stop(t + dur + 0.02);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
  }

  /** Countdown: "san, ni, ichi, GO!" via formant sintetis + gong fallback. */
  countdownVoice(kind: "3" | "2" | "1" | "go"): void {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const base = kind === "go" ? 210 : kind === "3" ? 150 : kind === "2" ? 160 : 172;
    const dur = kind === "go" ? 0.5 : 0.3;
    const formants = kind === "go" ? [420, 900, 2400] : [700, 1200, 2600];

    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(base, t);
    o.frequency.linearRampToValueAtTime(base * (kind === "go" ? 1.35 : 1.02), t + dur);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.12, t + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(env);

    for (const f of formants) {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = f;
      bp.Q.value = 7;
      const g = ctx.createGain();
      g.gain.value = 0.5;
      env.connect(bp);
      bp.connect(g);
      g.connect(this.engine.sfxBus);
    }
    // tambahan gong supaya jelas walau formant kurang terbaca
    const gong = ctx.createOscillator();
    gong.type = "sine";
    gong.frequency.value = kind === "go" ? 660 : 396;
    const gg = ctx.createGain();
    gg.gain.setValueAtTime(0.0001, t);
    gg.gain.linearRampToValueAtTime(0.09, t + 0.01);
    gg.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.25);
    gong.connect(gg);
    gg.connect(this.engine.sfxBus);
    gong.start(t);
    gong.stop(t + dur + 0.3);

    o.start(t);
    o.stop(t + dur + 0.05);
    o.onended = () => {
      o.disconnect();
      env.disconnect();
      gong.disconnect();
      gg.disconnect();
    };
    if (kind === "go") this.engine.duck(300);
  }

  /** Konfeti finish: 3 letupan noise pendek. */
  finishFanfare(): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime;
    [0, 0.09, 0.18].forEach((d, i) => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = 660 * Math.pow(2, i / 3);
      const g = ctx.createGain();
      const t = t0 + d;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      o.connect(g);
      g.connect(this.engine.sfxBus);
      o.start(t);
      o.stop(t + 0.4);
      o.onended = () => {
        o.disconnect();
        g.disconnect();
      };
    });
  }

  /** Set volume master efek (dipanggil dari settings). */
  configure(_opts: { turbo: boolean }): void {
    /* turbo hanya memengaruhi BOV; tidak perlu state tambahan */
  }

  setBoostActive(on: boolean): void {
    if (!this.ctx) return;
    if (on && !this.boostLfo) {
      this.boostLfo = this.ctx.createOscillator();
      this.boostLfo.type = "sine";
      this.boostLfo.frequency.value = 0.7;
      this.boostLfo.start();
    } else if (!on && this.boostLfo) {
      try {
        this.boostLfo.stop();
      } catch {
        /* sudah berhenti */
      }
      this.boostLfo.disconnect();
      this.boostLfo = null;
    }
  }

  /** Matikan semua suara kontinu (dipanggil di pause). */
  silenceContinuous(): void {
    if (!this.built || !this.ctx) return;
    const t = this.ctx.currentTime;
    for (const p of [
      this.engGain.gain,
      this.engBreathGain.gain,
      this.tireGain.gain,
      this.tireRes1Gain.gain,
      this.tireRes2Gain.gain,
      this.tireGrowlGain.gain,
      this.windGain.gain,
      this.ambGain.gain,
      this.bovGain.gain,
      this.gutterGain.gain,
    ]) {
      p.cancelScheduledValues(t);
      p.setTargetAtTime(0.0001, t, 0.02);
    }
  }

  dispose(): void {
    if (!this.ctx) return;
    try {
      for (const o of [
        ...this.engOscs,
        this.engWobble,
        this.tireRes1,
        this.tireRes2,
        this.tireGrowl,
      ]) {
        o.stop();
      }
      for (const s of [this.engBreathSrc, this.tireSrc, this.windSrc, this.ambSrc, this.bovSrc, this.gutterClickSrc]) {
        s.stop();
      }
      this.boostLfo?.stop();
    } catch {
      /* sudah berhenti */
    }
    this.boostLfo = null;
    this.built = false;
  }
}
