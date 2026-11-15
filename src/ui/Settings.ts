/**
 * Settings.ts — penerapan setting ke sistem yang hidup (audio, kamera, HUD).
 *
 * Layer tipis supaya main.ts tidak menyimpan logika CSS/volume sendiri.
 */

import type { Settings as SettingsData } from "../core/Save";
import type { AudioEngine } from "../core/AudioEngine";
import type { CameraRig } from "../render/CameraRig";
import { VISUAL } from "../sim/Tuning";

export interface SettingsApplyTargets {
  audio: AudioEngine | null;
  camera: CameraRig | null;
  root: HTMLElement;
  onQuality(q: SettingsData["quality"]): void;
}

export class SettingsApplier {
  constructor(private targets: SettingsApplyTargets) {}

  apply(s: SettingsData): void {
    const { audio, camera, root } = this.targets;

    audio?.setMasterVolume(s.masterVolume);
    audio?.setMusicVolume(s.musicVolume);
    audio?.setSfxVolume(s.sfxVolume);

    if (camera) {
      camera.mode = s.cameraMode === "bumper" ? "bumper" : s.cameraMode === "hood" ? "hood" : "chase";
      camera.reduceMotion = s.reduceMotion;
    }

    root.style.setProperty("--hud-scale", String(s.hudScale));
    root.classList.toggle("reduce-motion", s.reduceMotion);

    // colorblind: gap memakai segitiga + teks, tidak hanya warna
    root.style.setProperty("--accent", s.colorblindSafe ? "#ffb703" : "#ff2e63");

    this.targets.onQuality(s.quality);

    // Visibilitas efek kecepatan
    root.dataset.reduceMotion = s.reduceMotion ? "1" : "0";
    root.dataset.speedLines = s.reduceMotion ? "off" : "on";
    root.dataset.vignette = String(VISUAL.VIGNETTE);
  }
}
