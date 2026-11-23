// Procedural eurobeat-inspired score and arcade SFX; no licensed audio/assets.
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private timer = 0;
  private step = 0;
  private nextTime = 0;
  private bpm = 156;
  private musicVol = 0.8;
  private sfxVol = 0.9;
  private muted = false;
  private readonly melody = [76, 79, 83, 86, 83, 79, 76, 74, 76, 79, 83, 88, 86, 83, 79, 74];
  private readonly bass = [40, 40, 47, 40, 43, 43, 50, 43, 36, 36, 43, 36, 38, 38, 45, 38];

  setVolumes(music: number, sfx: number) { this.musicVol = music / 100; this.sfxVol = sfx / 100; this.applyVolumes(); }
  setBpm(bpm: number) { this.bpm = Math.max(120, Math.min(190, bpm)); }
  setMuted(muted: boolean) { this.muted = muted; this.applyVolumes(); }

  async start() {
    if (!this.ctx) {
      const Ctx = window.AudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain(); this.master.connect(this.ctx.destination);
      this.music = this.ctx.createGain(); this.music.connect(this.master);
      this.sfx = this.ctx.createGain(); this.sfx.connect(this.master);
      const filter = this.ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 850; filter.connect(this.sfx);
      this.engineGain = this.ctx.createGain(); this.engineGain.gain.value = 0.0001; this.engineGain.connect(filter);
      this.engineOsc = this.ctx.createOscillator(); this.engineOsc.type = 'sawtooth'; this.engineOsc.frequency.value = 45; this.engineOsc.connect(this.engineGain); this.engineOsc.start();
      this.nextTime = this.ctx.currentTime + 0.1;
      this.timer = window.setInterval(() => this.schedule(), 35);
    }
    await this.ctx.resume();
    this.applyVolumes();
  }

  private applyVolumes() {
    if (!this.ctx || !this.master || !this.music || !this.sfx) return;
    const now = this.ctx.currentTime, mute = this.muted ? 0 : 1;
    this.master.gain.setTargetAtTime(mute, now, 0.04);
    this.music.gain.setTargetAtTime(this.musicVol, now, 0.04);
    this.sfx.gain.setTargetAtTime(this.sfxVol, now, 0.04);
  }

  update(speedKmh: number, bpm = this.bpm) {
    this.setBpm(bpm);
    if (!this.ctx || !this.engineOsc || !this.engineGain) return;
    const now = this.ctx.currentTime;
    this.engineOsc.frequency.setTargetAtTime(42 + Math.min(135, speedKmh * 1.08), now, 0.06);
    this.engineGain.gain.setTargetAtTime((speedKmh > 2 ? 0.035 + speedKmh / 4500 : 0.0001), now, 0.08);
  }

  shift() { this.tone(940, 0.055, 'square', 0.035); }
  collision(intensity: number) { this.tone(95 + Math.min(70, intensity * 5), 0.18, 'sawtooth', 0.11); }
  gutter() { this.tone(310, 0.11, 'triangle', 0.05); }

  private tone(freq: number, duration: number, type: OscillatorType, gain: number) {
    if (!this.ctx || !this.sfx || this.muted) return;
    const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), amp = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, now); osc.frequency.exponentialRampToValueAtTime(Math.max(45, freq * 0.55), now + duration);
    amp.gain.setValueAtTime(0.0001, now); amp.gain.exponentialRampToValueAtTime(gain, now + 0.008); amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(amp); amp.connect(this.sfx); osc.start(now); osc.stop(now + duration + 0.02);
  }

  private schedule() {
    const ctx = this.ctx; if (!ctx || !this.music) return;
    const beat = 60 / this.bpm / 2;
    while (this.nextTime < ctx.currentTime + 0.12) {
      const t = this.nextTime, i = this.step % 16;
      if (i % 2 === 0) this.note(this.bass[i], t, beat * 0.82, 'triangle', 0.065);
      this.note(this.melody[i], t, beat * (i % 4 === 3 ? 0.48 : 0.78), 'sawtooth', 0.045);
      if (i % 4 === 0) this.kick(t);
      if (i === 4 || i === 12) this.snare(t);
      this.step++; this.nextTime += beat;
    }
  }

  private note(midi: number, time: number, duration: number, type: OscillatorType, volume: number) {
    if (!this.ctx || !this.music) return;
    const osc = this.ctx.createOscillator(), amp = this.ctx.createGain(), filter = this.ctx.createBiquadFilter();
    osc.type = type; osc.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
    filter.type = 'lowpass'; filter.frequency.setValueAtTime(type === 'sawtooth' ? 1900 : 1100, time);
    amp.gain.setValueAtTime(0.0001, time); amp.gain.linearRampToValueAtTime(volume, time + 0.012); amp.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(filter); filter.connect(amp); amp.connect(this.music); osc.start(time); osc.stop(time + duration + 0.02);
  }

  private kick(time: number) {
    if (!this.ctx || !this.music) return;
    const osc = this.ctx.createOscillator(), amp = this.ctx.createGain(); osc.type = 'sine';
    osc.frequency.setValueAtTime(135, time); osc.frequency.exponentialRampToValueAtTime(42, time + 0.13);
    amp.gain.setValueAtTime(0.18, time); amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.17);
    osc.connect(amp); amp.connect(this.music); osc.start(time); osc.stop(time + 0.18);
  }

  private snare(time: number) {
    if (!this.ctx || !this.music) return;
    const length = Math.floor(this.ctx.sampleRate * 0.11), buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate), data = buffer.getChannelData(0);
    for (let i=0;i<length;i++) data[i] = (Math.random()*2-1) * (1-i/length);
    const noise = this.ctx.createBufferSource(), filter = this.ctx.createBiquadFilter(), amp = this.ctx.createGain();
    noise.buffer=buffer; filter.type='highpass';filter.frequency.value=900;amp.gain.setValueAtTime(0.09,time);amp.gain.exponentialRampToValueAtTime(0.0001,time+0.1);
    noise.connect(filter);filter.connect(amp);amp.connect(this.music);noise.start(time);
  }
}
