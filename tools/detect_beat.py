#!/usr/bin/env python3
"""
detect_beat.py — cari BPM + offset beat dari file audio/video.

Dipakai render_jj.py (--auto-beat) biar preset tetap sinkron walau audionya
diganti. Metodenya: spectral flux (onset strength) dari STFT, lalu cari
tempo & fase yang paling banyak "kena" onset.

    python3 tools/detect_beat.py assets/source/audio-source.mp4
    -> BEAT 0.42268  BEAT_PHASE 0.115  BPM 141.95

Butuh numpy + ffmpeg (imageio-ffmpeg boleh, dipakai otomatis).
"""

import json
import subprocess
import sys

import numpy as np

SR = 22050
HOP = 512
WIN = 1024
BPM_RANGE = (70.0, 180.0)


def ffmpeg_exe():
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return "ffmpeg"


def decode_mono(path):
    cmd = [ffmpeg_exe(), "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR),
           "-f", "f32le", "-"]
    p = subprocess.run(cmd, capture_output=True, check=True)
    return np.frombuffer(p.stdout, dtype=np.float32)


def onset_envelope(x):
    if len(x) < WIN * 2:
        return np.zeros(1, dtype=np.float32)
    frames = np.lib.stride_tricks.sliding_window_view(x, WIN)[::HOP]
    spec = np.abs(np.fft.rfft(frames * np.hanning(WIN), axis=1))
    spec = np.log1p(spec * 100.0)
    flux = np.maximum(0.0, np.diff(spec, axis=0)).sum(axis=1)
    return flux - flux.mean()


def estimate(x):
    """Balikin dict: bpm, beat_period, beat_phase, score."""
    flux = onset_envelope(x)
    if flux.size < 10:
        return {"bpm": 120.0, "beat_period": 0.5, "beat_phase": 0.0, "score": 0.0}

    fr = SR / HOP
    t = np.arange(len(flux)) / fr
    smooth = np.convolve(flux, np.hanning(3) / np.hanning(3).sum(), "same")

    best = (-1e18, 120.0, 0.0)
    # tempo kasar dulu, lalu halus
    for bpm in np.arange(BPM_RANGE[0], BPM_RANGE[1], 0.5):
        period = 60.0 / bpm
        for phase in np.arange(0.0, period, 0.02):
            idx = np.arange(phase, t[-1], period)
            ii = np.clip((idx * fr).astype(int), 0, len(smooth) - 1)
            score = float(smooth[ii].mean()) * np.sqrt(len(ii))
            if score > best[0]:
                best = (score, bpm, phase)
    _, bpm0, phase0 = best
    period0 = 60.0 / bpm0

    # refine (grid lebih halus di sekitar kandidat terbaik)
    for bpm in np.arange(bpm0 - 1.0, bpm0 + 1.0, 0.05):
        period = 60.0 / bpm
        for phase in np.arange(max(0.0, phase0 - period / 2), phase0 + period / 2, 0.005):
            idx = np.arange(phase, t[-1], period)
            ii = np.clip((idx * fr).astype(int), 0, len(smooth) - 1)
            score = float(smooth[ii].mean()) * np.sqrt(len(ii))
            if score > best[0]:
                best = (score, bpm, phase)

    score, bpm, phase = best
    return {
        "bpm": round(float(bpm), 2),
        "beat_period": round(60.0 / float(bpm), 6),
        "beat_phase": round(float(phase), 3),
        "score": round(float(score), 2),
    }


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    info = estimate(decode_mono(argv[1]))
    if "--json" in argv:
        print(json.dumps(info))
    else:
        print(f"BPM {info['bpm']}  BEAT {info['beat_period']}  "
              f"BEAT_PHASE {info['beat_phase']}  (score {info['score']})")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
