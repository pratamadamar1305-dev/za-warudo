/**
 * Eurobeat.ts — sequencer + synth musik dinamis, 100% prosedural (§8A).
 *
 * Desain kunci:
 *  - SEMUA voice persisten (oscillator terus menyala, envelope yang di-retrigger).
 *    Tidak ada node baru per not → tidak ada kebocoran, tidak ada stutter
 *    setelah 3 race.
 *  - Scheduler lookahead 25 ms / horizon 200 ms (bukan setTimeout per not).
 *  - 3 virtual track berbeda progresi & melodi, crossfade 2 bar.
 *  - Drift mode: layer oktaf atas + hi-hat 32nd + sidechain pump.
 */

import type { AudioEngine } from "./AudioEngine";
import { AUDIO } from "../sim/Tuning";

/* ------------------------------------------------------------------ */
/* Teori musik                                                         */
/* ------------------------------------------------------------------ */

type Quality = "min" | "maj";

interface Chord {
  /** MIDI note root, oktaf bass. */
  root: number;
  quality: Quality;
}

const CHORD_INTERVALS: Record<Quality, readonly number[]> = {
  min: [0, 3, 7, 10],
  maj: [0, 4, 7, 11],
};

const A3 = 57;
const P = (semi: number): Chord => ({ root: A3 + semi, quality: "min" });
const MAJ = (semi: number): Chord => ({ root: A3 + semi, quality: "maj" });

/** vi–IV–I–V dalam A minor = Am–F–C–G */
const PROG_A: Chord[] = [P(0), MAJ(-4), MAJ(3), MAJ(-2)];
/** IV–V–vi–I */
const PROG_B: Chord[] = [MAJ(-4), MAJ(-2), P(0), MAJ(3)];
/** i–VI–III–VII, dengan dominan E mayor (harmonic minor) */
const PROG_C: Chord[] = [P(0), MAJ(-4), P(-3), MAJ(1)];
/** iv–V–III–VI */
const PROG_D: Chord[] = [P(5), MAJ(-2), MAJ(3), MAJ(-4)];

/**
 * Not melodi: [step (0..127 = 8 bar), indeksChordTone 0..3, oktaf, panjangStep].
 * Aturan §8A: hanya derajat 1-3-5-7 dari chord aktif.
 * Ada satu leap oktaf di bar 3 dan bar 7.
 */
type NoteTuple = readonly [number, number, number, number];

const MELODY_A: readonly NoteTuple[] = [
  // bar 0
  [0, 2, 0, 2], [2, 1, 0, 2], [4, 0, 0, 2], [6, 2, 0, 2],
  [8, 3, 0, 2], [10, 2, 0, 2], [12, 1, 0, 4],
  // bar 1
  [16, 2, 0, 2], [18, 2, 0, 2], [20, 0, 0, 2], [22, 1, 0, 2],
  [24, 2, 0, 2], [26, 3, 0, 2], [28, 2, 0, 4],
  // bar 2
  [32, 1, 0, 2], [34, 2, 0, 2], [36, 3, 0, 2], [38, 2, 0, 2],
  [40, 0, 0, 2], [42, 1, 0, 2], [44, 2, 0, 4],
  // bar 3 — leap oktaf
  [48, 2, 1, 2], [50, 3, 1, 2], [52, 2, 1, 2], [54, 1, 0, 2],
  [56, 0, 0, 2], [58, 1, 0, 2], [60, 2, 0, 4],
  // bar 4
  [64, 2, 0, 2], [66, 1, 0, 2], [68, 0, 0, 2], [70, 2, 0, 2],
  [72, 3, 0, 2], [74, 2, 0, 2], [76, 1, 0, 4],
  // bar 5
  [80, 3, 0, 2], [82, 2, 0, 2], [84, 3, 0, 2], [86, 2, 0, 2],
  [88, 1, 0, 2], [90, 2, 0, 2], [92, 3, 0, 4],
  // bar 6
  [96, 0, 0, 2], [98, 1, 0, 2], [100, 2, 0, 2], [102, 3, 0, 2],
  [104, 2, 0, 2], [106, 1, 0, 2], [108, 0, 0, 4],
  // bar 7 — leap oktaf
  [112, 1, 0, 2], [114, 2, 1, 2], [116, 3, 1, 2], [118, 2, 1, 2],
  [120, 1, 0, 2], [122, 0, 0, 2], [124, 2, 0, 4],
];

const MELODY_B: readonly NoteTuple[] = [
  [0, 0, 0, 2], [2, 2, 0, 2], [4, 3, 0, 2], [6, 2, 0, 2],
  [8, 1, 0, 2], [10, 2, 0, 6],
  [16, 2, 0, 2], [18, 3, 0, 2], [20, 2, 0, 2], [22, 0, 0, 2],
  [24, 1, 0, 2], [26, 2, 0, 6],
  [32, 3, 0, 2], [34, 2, 0, 2], [36, 1, 0, 2], [38, 2, 0, 2],
  [40, 0, 0, 2], [42, 2, 0, 2], [44, 3, 0, 4],
  [48, 2, 1, 2], [50, 3, 1, 2], [52, 2, 1, 2], [54, 1, 0, 2],
  [56, 2, 0, 8],
  [64, 0, 0, 2], [66, 1, 0, 2], [68, 3, 0, 2], [70, 2, 0, 2],
  [72, 1, 0, 2], [74, 0, 0, 6],
  [80, 2, 0, 2], [82, 3, 0, 2], [84, 2, 0, 2], [86, 1, 0, 2],
  [88, 0, 0, 2], [90, 1, 0, 2], [92, 2, 0, 4],
  [96, 1, 0, 2], [98, 2, 0, 2], [100, 3, 0, 2], [102, 2, 0, 2],
  [104, 1, 0, 2], [106, 0, 0, 6],
  [112, 3, 1, 2], [114, 2, 1, 2], [116, 1, 0, 2], [118, 2, 0, 2],
  [120, 3, 0, 2], [122, 2, 0, 2], [124, 1, 0, 4],
];

const MELODY_C: readonly NoteTuple[] = [
  [0, 1, 0, 2], [2, 2, 0, 2], [4, 3, 0, 2], [6, 2, 0, 2],
  [8, 1, 0, 4], [12, 0, 0, 2], [14, 1, 0, 2],
  [16, 2, 0, 2], [18, 3, 0, 2], [20, 2, 0, 2], [22, 1, 0, 2],
  [24, 2, 0, 4], [28, 3, 0, 2], [30, 2, 0, 2],
  [32, 3, 0, 2], [34, 2, 0, 2], [36, 1, 0, 2], [38, 0, 0, 2],
  [40, 1, 0, 4], [44, 2, 0, 2], [46, 3, 0, 2],
  [48, 2, 1, 2], [50, 1, 1, 2], [52, 2, 1, 2], [54, 1, 1, 2],
  [56, 2, 0, 6],
  [64, 0, 0, 2], [66, 2, 0, 2], [68, 1, 0, 2], [70, 3, 0, 2],
  [72, 2, 0, 4], [76, 1, 0, 2], [78, 0, 0, 2],
  [80, 3, 0, 2], [82, 2, 0, 2], [84, 3, 0, 2], [86, 1, 0, 2],
  [88, 2, 0, 6],
  [96, 1, 0, 2], [98, 0, 0, 2], [100, 1, 0, 2], [102, 2, 0, 2],
  [104, 3, 0, 4], [108, 2, 0, 2], [110, 1, 0, 2],
  [112, 2, 1, 2], [114, 3, 1, 2], [116, 2, 1, 2], [118, 1, 1, 2],
  [120, 0, 0, 6],
];

export interface EurobeatTrack {
  title: string;
  progA: Chord[];
  progB: Chord[];
  melody: readonly NoteTuple[];
  /** Seed variasi arp. */
  arpSeed: number;
}

export const TRACKS: readonly EurobeatTrack[] = [
  { title: "NIGHT OF FIRE ROAD", progA: PROG_A, progB: PROG_C, melody: MELODY_A, arpSeed: 3 },
  { title: "GAS GAS GAS PASS", progA: PROG_B, progB: PROG_D, melody: MELODY_B, arpSeed: 7 },
  { title: "DEJA VU SKYLINE", progA: PROG_C, progB: PROG_B, melody: MELODY_C, arpSeed: 11 },
  { title: "RUNNING IN THE 90s PASS", progA: PROG_A, progB: PROG_D, melody: MELODY_B, arpSeed: 13 },
  { title: "SPEEDY SPEED BOY", progA: PROG_D, progB: PROG_A, melody: MELODY_C, arpSeed: 17 },
  { title: "BACK ON THE ROAD", progA: PROG_B, progB: PROG_C, melody: MELODY_A, arpSeed: 19 },
];

/* ------------------------------------------------------------------ */
/* Envelope helper                                                     */
/* ------------------------------------------------------------------ */

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

interface AdsrParams {
  peak: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  holdFor: number;
}

/** Retrigger envelope ADSR pada satu AudioParam. Aman dari klik (attack ≥5 ms). */
function retrigger(param: AudioParam, t: number, p: AdsrParams): void {
  const a = Math.max(0.005, p.attack);
  const d = Math.max(0.005, p.decay);
  const r = Math.max(0.005, p.release);
  const hold = Math.max(0.02, p.holdFor);
  const peak = Math.max(0.0001, p.peak);
  const sus = Math.max(0.0001, peak * p.sustain);
  param.cancelScheduledValues(t);
  param.setValueAtTime(0.0001, t);
  param.linearRampToValueAtTime(peak, t + a);
  param.linearRampToValueAtTime(sus, t + a + d);
  param.setValueAtTime(sus, t + Math.max(a + d, hold));
  param.linearRampToValueAtTime(0.0001, t + Math.max(a + d, hold) + r);
}

/* ------------------------------------------------------------------ */
/* Sequencer                                                           */
/* ------------------------------------------------------------------ */

export class Eurobeat {
  private engine: AudioEngine;
  private ctx: AudioContext | null = null;
  private built = false;

  /** Bus internal musik (sidechain pump di sini). */
  private pump!: GainNode;
  private dryBus!: GainNode;
  private leadBus!: GainNode;
  private chorusBus!: GainNode;

  /* voices */
  private kickOsc!: OscillatorNode;
  private kickGain!: GainNode;
  private kickClickGain!: GainNode;
  private kickClickFilter!: BiquadFilterNode;

  private snareGain!: GainNode;
  private snareFilter!: BiquadFilterNode;
  private snareBody!: OscillatorNode;
  private snareBodyGain!: GainNode;
  private clapGain!: GainNode;
  private clapFilter!: BiquadFilterNode;
  private hatGain!: GainNode;
  private hatFilter!: BiquadFilterNode;
  private openHatGain!: GainNode;
  private openHatFilter!: BiquadFilterNode;
  private hat32Gain!: GainNode;
  private hat32Filter!: BiquadFilterNode;

  private bassOscA!: OscillatorNode;
  private bassOscB!: OscillatorNode;
  private bassGain!: GainNode;
  private bassFilter!: BiquadFilterNode;

  private leadOsc: OscillatorNode[] = [];
  private leadGain!: GainNode;
  private leadFilter!: BiquadFilterNode;
  private leadOctaveGain!: GainNode;
  private leadOctaveOsc: OscillatorNode[] = [];

  private stabOsc: OscillatorNode[] = [];
  private stabGain!: GainNode;
  private stabFilter!: BiquadFilterNode;

  private arpOsc!: OscillatorNode;
  private arpGain!: GainNode;
  private arpPan!: StereoPannerNode;

  private riserGain!: GainNode;
  private riserFilter!: BiquadFilterNode;
  private impactOsc!: OscillatorNode;
  private impactGain!: GainNode;

  private noiseRef!: AudioBufferSourceNode;
  private delayNode!: DelayNode;
  private delayFeedback!: GainNode;
  private delayWet!: GainNode;

  /* scheduler */
  private nextStepTime = 0;
  private currentStep = 0;
  private timer = 0;
  private playing = false;
  private startTime = 0;
  private bpm: number = AUDIO.BPM_BASE;
  private targetBpm: number = AUDIO.BPM_BASE;
  private trackIndex = 0;
  private prevTrackIndex = 0;
  private crossfadeEnd = 0;
  /** 0..1 dari DriftScore; menggerakkan intensitas aransemen. */
  private driftIntensity = 0;
  private section: "intro" | "verse" | "chorus" = "intro";
  private barsPlayed = 0;
  private masterPeak = 0;

  constructor(engine: AudioEngine) {
    this.engine = engine;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  get bpmLive(): number {
    return Math.round(this.bpm);
  }

  get trackTitle(): string {
    return TRACKS[this.trackIndex]?.title ?? "—";
  }

  get peakEstimate(): number {
    return this.masterPeak;
  }

  /* ---------------- graph build ---------------- */

  build(): void {
    if (this.built) return;
    const ctx = this.engine.ctx;
    if (!ctx) throw new Error("AudioEngine belum di-unlock.");
    this.ctx = ctx;

    this.pump = ctx.createGain();
    this.pump.gain.value = 1;
    this.dryBus = ctx.createGain();
    this.dryBus.gain.value = 0.9;
    this.leadBus = ctx.createGain();
    this.leadBus.gain.value = 1;
    this.chorusBus = ctx.createGain();
    this.chorusBus.gain.value = 0.55;

    this.pump.connect(this.dryBus);
    this.dryBus.connect(this.engine.musicBus);
    this.leadBus.connect(this.pump);
    this.chorusBus.connect(this.pump);

    // reverb send untuk lead
    const leadVerb = ctx.createGain();
    leadVerb.gain.value = 0.18;
    this.leadBus.connect(leadVerb);
    leadVerb.connect(this.engine.reverbSend);

    /* ---------- noise source bersama ---------- */
    const noise = this.engine.createNoiseSource();
    if (!noise) throw new Error("Noise buffer gagal dibuat.");
    this.noiseRef = noise;
    noise.start(0);

    /* ---------- delay ping-pong (mono-ish, dua tap) ---------- */
    this.delayNode = ctx.createDelay(1.0);
    this.delayNode.delayTime.value = (60 / this.bpm) * 0.75; // 3/16
    this.delayFeedback = ctx.createGain();
    this.delayFeedback.gain.value = 0.32;
    this.delayWet = ctx.createGain();
    this.delayWet.gain.value = 0.28;
    const delayPanL = ctx.createStereoPanner();
    delayPanL.pan.value = -0.5;
    const delayPanR = ctx.createStereoPanner();
    delayPanR.pan.value = 0.5;
    this.leadGain = ctx.createGain();
    this.leadGain.gain.value = 0.0001;
    this.leadBus.connect(this.leadGain);
    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.delayWet);
    this.delayWet.connect(delayPanL);
    this.delayWet.connect(delayPanR);
    delayPanL.connect(this.pump);
    delayPanR.connect(this.pump);

    /* ---------- kick ---------- */
    this.kickOsc = ctx.createOscillator();
    this.kickOsc.type = "sine";
    this.kickOsc.frequency.value = 55;
    this.kickGain = ctx.createGain();
    this.kickGain.gain.value = 0.0001;
    this.kickOsc.connect(this.kickGain);
    this.kickGain.connect(this.pump);
    this.kickOsc.start();

    // click transient
    const kickClick = ctx.createBufferSource();
    kickClick.buffer = this.engine.noiseBuffer;
    kickClick.loop = true;
    kickClick.start(0);
    this.kickClickFilter = ctx.createBiquadFilter();
    this.kickClickFilter.type = "highpass";
    this.kickClickFilter.frequency.value = 2600;
    this.kickClickGain = ctx.createGain();
    this.kickClickGain.gain.value = 0.0001;
    kickClick.connect(this.kickClickFilter);
    this.kickClickFilter.connect(this.kickClickGain);
    this.kickClickGain.connect(this.pump);

    /* ---------- snare ---------- */
    this.snareFilter = ctx.createBiquadFilter();
    this.snareFilter.type = "bandpass";
    this.snareFilter.frequency.value = 1800;
    this.snareFilter.Q.value = 0.9;
    this.snareGain = ctx.createGain();
    this.snareGain.gain.value = 0.0001;
    noise.connect(this.snareFilter);
    this.snareFilter.connect(this.snareGain);
    this.snareGain.connect(this.pump);

    this.snareBody = ctx.createOscillator();
    this.snareBody.type = "sine";
    this.snareBody.frequency.value = 190;
    this.snareBodyGain = ctx.createGain();
    this.snareBodyGain.gain.value = 0.0001;
    this.snareBody.connect(this.snareBodyGain);
    this.snareBodyGain.connect(this.pump);
    this.snareBody.start();

    /* ---------- clap ---------- */
    this.clapFilter = ctx.createBiquadFilter();
    this.clapFilter.type = "bandpass";
    this.clapFilter.frequency.value = 1300;
    this.clapFilter.Q.value = 1.2;
    this.clapGain = ctx.createGain();
    this.clapGain.gain.value = 0.0001;
    noise.connect(this.clapFilter);
    this.clapFilter.connect(this.clapGain);
    this.clapGain.connect(this.chorusBus);

    /* ---------- hats ---------- */
    this.hatFilter = ctx.createBiquadFilter();
    this.hatFilter.type = "highpass";
    this.hatFilter.frequency.value = 7000;
    this.hatGain = ctx.createGain();
    this.hatGain.gain.value = 0.0001;
    noise.connect(this.hatFilter);
    this.hatFilter.connect(this.hatGain);
    this.hatGain.connect(this.chorusBus);

    this.openHatFilter = ctx.createBiquadFilter();
    this.openHatFilter.type = "highpass";
    this.openHatFilter.frequency.value = 6200;
    this.openHatGain = ctx.createGain();
    this.openHatGain.gain.value = 0.0001;
    noise.connect(this.openHatFilter);
    this.openHatFilter.connect(this.openHatGain);
    this.openHatGain.connect(this.chorusBus);

    this.hat32Filter = ctx.createBiquadFilter();
    this.hat32Filter.type = "highpass";
    this.hat32Filter.frequency.value = 9000;
    this.hat32Gain = ctx.createGain();
    this.hat32Gain.gain.value = 0.0001;
    noise.connect(this.hat32Filter);
    this.hat32Filter.connect(this.hat32Gain);
    this.hat32Gain.connect(this.chorusBus);

    /* ---------- bass ---------- */
    this.bassOscA = ctx.createOscillator();
    this.bassOscA.type = "sawtooth";
    this.bassOscB = ctx.createOscillator();
    this.bassOscB.type = "square";
    this.bassOscA.detune.value = -8;
    this.bassOscB.detune.value = 8;
    this.bassFilter = ctx.createBiquadFilter();
    this.bassFilter.type = "lowpass";
    this.bassFilter.frequency.value = 600;
    this.bassFilter.Q.value = 1.2;
    this.bassGain = ctx.createGain();
    this.bassGain.gain.value = 0.0001;
    this.bassOscA.connect(this.bassFilter);
    this.bassOscB.connect(this.bassFilter);
    this.bassFilter.connect(this.bassGain);
    this.bassGain.connect(this.pump);
    this.bassOscA.start();
    this.bassOscB.start();

    /* ---------- supersaw lead (7 osc) ---------- */
    const detunes = [-22, -14, -7, 0, 7, 14, 22];
    this.leadFilter = ctx.createBiquadFilter();
    this.leadFilter.type = "lowpass";
    this.leadFilter.frequency.value = 3200;
    this.leadFilter.Q.value = 4;
    this.leadFilter.connect(this.leadGain);
    this.leadGain.connect(this.leadBus);
    this.leadGain.connect(this.delayNode);

    for (const d of detunes) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.detune.value = d;
      o.frequency.value = 440;
      const g = ctx.createGain();
      g.gain.value = 0.085;
      o.connect(g);
      g.connect(this.leadFilter);
      o.start();
      this.leadOsc.push(o);
    }

    // layer oktaf atas untuk drift mode
    this.leadOctaveGain = ctx.createGain();
    this.leadOctaveGain.gain.value = 0.0001;
    this.leadOctaveGain.connect(this.pump);
    for (const d of [-12, 0, 12]) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.detune.value = d;
      o.frequency.value = 880;
      const g = ctx.createGain();
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(this.leadOctaveGain);
      o.start();
      this.leadOctaveOsc.push(o);
    }

    /* ---------- chord stab ---------- */
    this.stabFilter = ctx.createBiquadFilter();
    this.stabFilter.type = "lowpass";
    this.stabFilter.frequency.value = 2600;
    this.stabFilter.Q.value = 1.5;
    this.stabGain = ctx.createGain();
    this.stabGain.gain.value = 0.0001;
    this.stabFilter.connect(this.stabGain);
    this.stabGain.connect(this.chorusBus);
    for (let i = 0; i < 6; i++) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.detune.value = i % 2 === 0 ? -9 : 9;
      o.frequency.value = 330;
      const g = ctx.createGain();
      g.gain.value = 0.06;
      o.connect(g);
      g.connect(this.stabFilter);
      o.start();
      this.stabOsc.push(o);
    }

    /* ---------- arp / pluck ---------- */
    this.arpOsc = ctx.createOscillator();
    this.arpOsc.type = "triangle";
    this.arpGain = ctx.createGain();
    this.arpGain.gain.value = 0.0001;
    this.arpPan = ctx.createStereoPanner();
    this.arpOsc.connect(this.arpGain);
    this.arpGain.connect(this.arpPan);
    this.arpPan.connect(this.chorusBus);
    this.arpOsc.start();

    /* ---------- riser ---------- */
    const riserSrc = ctx.createBufferSource();
    riserSrc.buffer = this.engine.noiseBuffer;
    riserSrc.loop = true;
    riserSrc.start(0);
    this.riserFilter = ctx.createBiquadFilter();
    this.riserFilter.type = "bandpass";
    this.riserFilter.frequency.value = 700;
    this.riserFilter.Q.value = 3;
    this.riserGain = ctx.createGain();
    this.riserGain.gain.value = 0.0001;
    riserSrc.connect(this.riserFilter);
    this.riserFilter.connect(this.riserGain);
    this.riserGain.connect(this.chorusBus);

    /* ---------- impact ---------- */
    this.impactOsc = ctx.createOscillator();
    this.impactOsc.type = "sine";
    this.impactOsc.frequency.value = 70;
    this.impactGain = ctx.createGain();
    this.impactGain.gain.value = 0.0001;
    this.impactOsc.connect(this.impactGain);
    this.impactGain.connect(this.pump);
    this.impactOsc.start();

    this.built = true;
  }

  /* ---------------- transport ---------------- */

  /** Mulai musik tepat di waktu `when` (dipakai untuk sinkron dengan "GO!"). */
  start(atTime?: number): void {
    if (!this.built) this.build();
    const ctx = this.ctx!;
    this.playing = true;
    this.currentStep = 0;
    this.barsPlayed = 0;
    this.section = "intro";
    this.startTime = atTime ?? ctx.currentTime + 0.06;
    this.nextStepTime = this.startTime;
    this.leadBus.gain.cancelScheduledValues(ctx.currentTime);
    this.leadBus.gain.setValueAtTime(1, ctx.currentTime);
    this.clearTimer();
    this.timer = window.setInterval(() => this.scheduler(), 25);
    this.scheduler();
  }

  stop(): void {
    this.playing = false;
    this.clearTimer();
    if (!this.built) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    for (const p of [
      this.kickGain.gain,
      this.kickClickGain.gain,
      this.snareGain.gain,
      this.snareBodyGain.gain,
      this.clapGain.gain,
      this.hatGain.gain,
      this.openHatGain.gain,
      this.hat32Gain.gain,
      this.bassGain.gain,
      this.leadGain.gain,
      this.stabGain.gain,
      this.arpGain.gain,
      this.riserGain.gain,
      this.impactGain.gain,
      this.leadOctaveGain.gain,
    ]) {
      p.cancelScheduledValues(t);
      p.setTargetAtTime(0.0001, t, 0.03);
    }
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  /** BPM naik saat memimpin, turun saat tertinggal (§8A). */
  setBpm(target: number): void {
    const clamped = Math.max(AUDIO.BPM_MIN, Math.min(AUDIO.BPM_MAX, target));
    if (Math.abs(clamped - this.targetBpm) < 0.01) return;
    this.targetBpm = clamped;
    if (this.built && this.ctx) {
      this.delayNode.delayTime.setTargetAtTime((60 / clamped) * 0.75, this.ctx.currentTime, 0.4);
    }
  }

  setDriftIntensity(v: number): void {
    this.driftIntensity = Math.max(0, Math.min(1, v));
  }

  /** Track yang sedang di-crossfade keluar (null bila tidak ada). */
  get fadingFromIndex(): number | null {
    if (!this.built || !this.ctx) return null;
    return this.ctx.currentTime < this.crossfadeEnd ? this.prevTrackIndex : null;
  }

  /** Batalkan crossfade yang sedang berjalan (dipakai saat mulai race baru). */
  clearCrossfade(): void {
    this.crossfadeEnd = 0;
    this.prevTrackIndex = this.trackIndex;
  }

  /** Pindah track dengan crossfade ~2 bar. */
  crossfadeTo(index: number): void {
    if (!this.built || index === this.trackIndex) return;
    this.prevTrackIndex = this.trackIndex;
    this.trackIndex = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
    this.crossfadeEnd = this.ctx!.currentTime + (60 / this.bpm) * 8;
  }

  nextTrack(): void {
    this.crossfadeTo(this.trackIndex + 1);
  }

  /** Stinger transisi bagian: riser + impact. */
  stinger(): void {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this.riserGain.gain.cancelScheduledValues(t);
    this.riserGain.gain.setValueAtTime(0.0001, t);
    this.riserGain.gain.linearRampToValueAtTime(0.09, t + 0.9);
    this.riserGain.gain.linearRampToValueAtTime(0.0001, t + 1.05);
    this.riserFilter.frequency.cancelScheduledValues(t);
    this.riserFilter.frequency.setValueAtTime(600, t);
    this.riserFilter.frequency.exponentialRampToValueAtTime(5200, t + 0.95);
  }

  impact(): void {
    if (!this.built || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this.impactGain.gain.cancelScheduledValues(t);
    this.impactGain.gain.setValueAtTime(0.0001, t);
    this.impactGain.gain.linearRampToValueAtTime(0.22, t + 0.012);
    this.impactGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    this.impactOsc.frequency.cancelScheduledValues(t);
    this.impactOsc.frequency.setValueAtTime(110, t);
    this.impactOsc.frequency.exponentialRampToValueAtTime(42, t + 0.42);
  }

  /* ---------------- scheduler ---------------- */

  private get stepDur(): number {
    return 60 / this.bpm / 4;
  }

  private scheduler(): void {
    if (!this.playing || !this.ctx) return;
    const horizon = this.ctx.currentTime + 0.2;
    // BPM glide halus
    this.bpm += (this.targetBpm - this.bpm) * 0.02;
    let guard = 0;
    while (this.nextStepTime < horizon && guard++ < 64) {
      this.scheduleStep(this.currentStep, this.nextStepTime);
      this.nextStepTime += this.stepDur;
      this.currentStep++;
      if (this.currentStep % 16 === 0) {
        this.barsPlayed++;
        this.updateSection();
      }
      if (this.currentStep >= 16 * 128) this.currentStep = 0;
    }
    if (this.ctx.currentTime > this.startTime + 1) this.updatePump();
  }

  private updateSection(): void {
    const bar = this.barsPlayed % 32;
    const prev = this.section;
    if (bar < 8) this.section = "intro";
    else if (bar < 16) this.section = "verse";
    else this.section = "chorus";
    if (prev !== this.section && this.ctx) {
      this.leadBus.gain.setTargetAtTime(this.section === "intro" ? 0.25 : 1, this.ctx.currentTime, 0.25);
    }
  }

  /** Sidechain pump: duck bus musik tepat setelah kick. */
  private updatePump(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const beat = 60 / this.bpm;
    const phase = ((t - this.startTime) % beat) / beat;
    const depth = 0.22 + 0.2 * this.driftIntensity;
    const env = phase < 0.35 ? 1 - depth * (1 - phase / 0.35) : 1 - 0.02;
    this.pump.gain.setTargetAtTime(env, t, 0.008);
  }

  private chordAt(step: number): Chord {
    const track = TRACKS[this.trackIndex] ?? TRACKS[0]!;
    const bar = Math.floor(step / 16) % 16;
    const prog = bar < 8 ? track.progA : track.progB;
    return prog[Math.floor(bar % 4)] ?? PROG_A[0]!;
  }

  private scheduleStep(step: number, t: number): void {
    const s = step % 16;
    const bar = Math.floor(step / 16);
    const chord = this.chordAt(step);
    const track = TRACKS[this.trackIndex] ?? TRACKS[0]!;
    const section = step % (16 * 32) < 16 * 8 ? "intro" : step % (16 * 32) < 16 * 16 ? "verse" : "chorus";
    const inChorus = section === "chorus";
    const drift = this.driftIntensity;
    const sd = this.stepDur;

    /* ---------- KICK: 4-on-the-floor ---------- */
    if (s % 4 === 0) {
      this.kickOsc.frequency.cancelScheduledValues(t);
      this.kickOsc.frequency.setValueAtTime(120, t);
      this.kickOsc.frequency.exponentialRampToValueAtTime(45, t + 0.06);
      retrigger(this.kickGain.gain, t, {
        peak: 0.62,
        attack: 0.005,
        decay: 0.09,
        sustain: 0.35,
        release: 0.06,
        holdFor: 0.1,
      });
      retrigger(this.kickClickGain.gain, t, {
        peak: 0.12,
        attack: 0.005,
        decay: 0.006,
        sustain: 0.01,
        release: 0.02,
        holdFor: 0.006,
      });
    }

    /* ---------- SNARE / CLAP di beat 2 & 4 ---------- */
    if (s === 4 || s === 12) {
      retrigger(this.snareGain.gain, t, {
        peak: 0.24,
        attack: 0.005,
        decay: 0.07,
        sustain: 0.2,
        release: 0.08,
        holdFor: 0.05,
      });
      retrigger(this.snareBodyGain.gain, t, {
        peak: 0.14,
        attack: 0.005,
        decay: 0.05,
        sustain: 0.2,
        release: 0.07,
        holdFor: 0.04,
      });
      if (inChorus) {
        retrigger(this.clapGain.gain, t, {
          peak: 0.13,
          attack: 0.005,
          decay: 0.04,
          sustain: 0.25,
          release: 0.12,
          holdFor: 0.03,
        });
      }
    }

    /* ---------- HI-HAT 16th, aksen off-beat ---------- */
    if (section !== "intro") {
      const accent = s % 4 === 2 ? 1 : 0.55;
      retrigger(this.hatGain.gain, t, {
        peak: 0.055 * accent,
        attack: 0.005,
        decay: 0.018,
        sustain: 0.02,
        release: 0.03,
        holdFor: 0.012,
      });
      if (s % 8 === 6) {
        retrigger(this.openHatGain.gain, t, {
          peak: 0.05,
          attack: 0.005,
          decay: 0.05,
          sustain: 0.2,
          release: 0.14,
          holdFor: 0.05,
        });
      }
      if (drift > 0.5) {
        retrigger(this.hat32Gain.gain, t + sd / 2, {
          peak: 0.028,
          attack: 0.005,
          decay: 0.012,
          sustain: 0.02,
          release: 0.02,
          holdFor: 0.008,
        });
      }
    }

    /* ---------- BASS gallop ---------- */
    const gallop = new Set([0, 3, 6, 8, 11, 14]);
    if (section !== "intro" || s % 4 === 0) {
      if (gallop.has(s) || section === "intro") {
        const rootMidi = chord.root - 24;
        const f = midiToFreq(rootMidi);
        this.bassOscA.frequency.setValueAtTime(f, t);
        this.bassOscB.frequency.setValueAtTime(f, t);
        this.bassFilter.frequency.cancelScheduledValues(t);
        this.bassFilter.frequency.setValueAtTime(950, t);
        this.bassFilter.frequency.exponentialRampToValueAtTime(320, t + 0.14);
        retrigger(this.bassGain.gain, t, {
          peak: 0.3,
          attack: 0.007,
          decay: 0.06,
          sustain: 0.6,
          release: 0.05,
          holdFor: 0.075,
        });
      }
    }

    /* ---------- CHORD STAB off-beat ---------- */
    if (section !== "intro" && (s === 2 || s === 6 || s === 10 || s === 14)) {
      const intervals = CHORD_INTERVALS[chord.quality];
      for (let i = 0; i < 3; i++) {
        const midi = chord.root + (intervals[i] ?? 0) + 12;
        const f = midiToFreq(midi);
        for (let v = 0; v < 2; v++) {
          const o = this.stabOsc[i * 2 + v];
          if (o) o.frequency.setValueAtTime(f, t);
        }
      }
      retrigger(this.stabGain.gain, t, {
        peak: 0.11,
        attack: 0.005,
        decay: 0.09,
        sustain: 0.05,
        release: 0.07,
        holdFor: 0.05,
      });
    }

    /* ---------- ARP (chorus) ---------- */
    if (inChorus) {
      const intervals = CHORD_INTERVALS[chord.quality];
      const idx = (step + track.arpSeed) % 4;
      const midi = chord.root + (intervals[idx] ?? 0) + 24;
      this.arpOsc.frequency.setValueAtTime(midiToFreq(midi), t);
      this.arpPan.pan.setValueAtTime(s % 2 === 0 ? -0.4 : 0.4, t);
      retrigger(this.arpGain.gain, t, {
        peak: 0.035,
        attack: 0.005,
        decay: 0.05,
        sustain: 0.02,
        release: 0.04,
        holdFor: 0.04,
      });
    }

    /* ---------- LEAD MELODY ---------- */
    this.scheduleLead(step, t);

    /* ---------- transisi bagian: riser + impact ---------- */
    const barIn32 = Math.floor((step % (16 * 32)) / 16);
    if (s === 0 && barIn32 === 15) {
      this.riserAt(t, sd * 16);
    }
    if (s === 0 && (barIn32 === 8 || barIn32 === 16 || barIn32 === 0) && bar > 0) {
      this.impactAt(t);
    }
  }

  private scheduleLead(step: number, t: number): void {
    const track = TRACKS[this.trackIndex] ?? TRACKS[0]!;
    const bar = Math.floor(step / 16) % 8;
    const localStep = step % 128;
    const effective = track.melody;
    for (const n of effective) {
      if (n[0] !== localStep) continue;
      const chord = this.chordAt(step);
      const intervals = CHORD_INTERVALS[chord.quality];
      const tone = intervals[n[1]] ?? 0;
      const midi = chord.root + tone + 12 + n[2] * 12;
      const f = midiToFreq(midi);
      for (const o of this.leadOsc) o.frequency.setValueAtTime(f, t);
      for (const o of this.leadOctaveOsc) o.frequency.setValueAtTime(f * 2, t);
      const dur = Math.max(0.06, n[3] * this.stepDur);
      retrigger(this.leadGain.gain, t, {
        peak: 0.2,
        attack: 0.008,
        decay: 0.12,
        sustain: 0.55,
        release: 0.18,
        holdFor: dur,
      });
      // lead layer oktaf: hanya saat drift tinggi
      if (this.driftIntensity > 0.45) {
        retrigger(this.leadOctaveGain.gain, t, {
          peak: 0.05 * this.driftIntensity,
          attack: 0.01,
          decay: 0.14,
          sustain: 0.5,
          release: 0.16,
          holdFor: dur,
        });
      }
      // filter movement per bar
      const cut = 2200 + (bar % 4) * 420 + this.driftIntensity * 1400;
      this.leadFilter.frequency.cancelScheduledValues(t);
      this.leadFilter.frequency.setTargetAtTime(cut, t, 0.05);
    }
  }

  private riserAt(t: number, dur: number): void {
    this.riserGain.gain.cancelScheduledValues(t);
    this.riserGain.gain.setValueAtTime(0.0001, t);
    this.riserGain.gain.linearRampToValueAtTime(0.075, t + dur * 0.85);
    this.riserGain.gain.linearRampToValueAtTime(0.0001, t + dur);
    this.riserFilter.frequency.cancelScheduledValues(t);
    this.riserFilter.frequency.setValueAtTime(500, t);
    this.riserFilter.frequency.exponentialRampToValueAtTime(6000, t + dur);
  }

  private impactAt(t: number): void {
    this.impactGain.gain.cancelScheduledValues(t);
    this.impactGain.gain.setValueAtTime(0.0001, t);
    this.impactGain.gain.linearRampToValueAtTime(0.18, t + 0.01);
    this.impactGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    this.impactOsc.frequency.cancelScheduledValues(t);
    this.impactOsc.frequency.setValueAtTime(100, t);
    this.impactOsc.frequency.exponentialRampToValueAtTime(40, t + 0.36);
  }

  /** Dipanggil saat AudioEngine di-suspend (pause). */
  suspend(): void {
    this.clearTimer();
  }

  resume(): void {
    if (!this.playing || !this.ctx) return;
    this.clearTimer();
    this.nextStepTime = Math.max(this.nextStepTime, this.ctx.currentTime + 0.05);
    this.timer = window.setInterval(() => this.scheduler(), 25);
  }

  /** Bersihkan semua node & timer (dipanggil saat teardown). */
  dispose(): void {
    this.stop();
    this.clearTimer();
    const ctx = this.ctx;
    if (!ctx) return;
    try {
      for (const o of [...this.leadOsc, ...this.leadOctaveOsc, ...this.stabOsc]) o.stop();
      this.kickOsc.stop();
      this.snareBody.stop();
      this.arpOsc.stop();
      this.impactOsc.stop();
      this.noiseRef.stop();
    } catch {
      /* sudah berhenti */
    }
    this.leadOsc = [];
    this.leadOctaveOsc = [];
    this.stabOsc = [];
    this.built = false;
    this.playing = false;
  }
}
