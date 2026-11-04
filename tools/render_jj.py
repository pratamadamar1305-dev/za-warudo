#!/usr/bin/env python3
"""
render_jj.py — bikin preset JJ (jedag-jedug) 9:16 dari 3 foto.

Layout niru preset referensi:
  - frame kiri  9:16 (portrait, label "9:16")
  - kartu kanan 1:1  (square,  label "1:1")
  - badge kecil di bawah kartu 1:1

Cut & effect-nya di-lock ke beat audio (141.95 BPM -> 0.42268 s/beat),
jadi tiap "jedug" = satu ganti shot + 1 shake + 1 flash + 1 zoom punch.

Semua di-render pakai PIL lalu di-pipe ke ffmpeg (rawvideo -> H.264),
audio dari sources/ di-mux balik. Nggak butuh lib selain Pillow + ffmpeg.

Contoh:
    python3 tools/render_jj.py \
        --foto assets/source/foto-1-bangku.jpg \
        --foto assets/source/foto-2-batik.jpg \
        --foto assets/source/foto-3-jam.jpg \
        --audio assets/source/audio-source.mp4 \
        --out output/jj-9x16.mp4
"""

import argparse
import math
import os
import random
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:  # pragma: no cover - fallback kalau ffmpeg ada di PATH
    FFMPEG = "ffmpeg"

# ----------------------------------------------------------------------------
# Kanvas & grid (1080x1920, semua angka di bawah dalam piksel kanvas)
# ----------------------------------------------------------------------------
W, H = 1080, 1920
FPS = 30
MARGIN = 34

PAD = 24                                   # bantalan buat shake, dipotong di akhir
CW, CH = W + PAD * 2, H + PAD * 2           # kanvas kerja (lebih besar dari output)
OX = OY = PAD                               # offset semua layout di kanvas kerja

FRAME_X0, FRAME_Y0, FRAME_X1, FRAME_Y1 = 18, 560, 464, 1354   # 9:16 -> 446x794
CARD_X0, CARD_Y0, CARD_X1, CARD_Y1 = 544, 730, 1030, 1216     # 1:1  -> 486x486
CARD_R = 30          # radius sudut kartu
FRAME_R = 34         # radius sudut frame 9:16

# Timing
BEAT = 0.4226837879629925           # 60 / 141.95 (hasil analisa onset audio)
BEAT_PHASE = 0.115                  # onset pertama nggak di 0.0 -> grid digeser segini
BAR = BEAT * 4
END = 15.90                         # total durasi output (audio abis senyap di 16.5 s)
INTRO_BEATS = 4                     # beat 0: frame kosong, beat 1: kiri ngisi, beat 2+: dua-duanya
DROP_BEAT = 36                      # beat 36 (15.22 s): masuk drop
DROP_T = 15.50                      # "boom" bass di audio -> di sini frame di-freeze + judul
OUTRO_START = DROP_T

TXT_FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

# Palet aksen preset (mint + coral, nyonjol di atas foto warm/kuning)
ACCENT = (255, 255, 255)
MINT = (168, 236, 232)
CORAL = (255, 143, 120)


# ----------------------------------------------------------------------------
# Helper gambar
# ----------------------------------------------------------------------------
def load_font(size):
    return ImageFont.truetype(TXT_FONT, size)


def cover_fit(img, w, h, zoom=1.0, focus=(0.5, 0.5)):
    """Scale + crop ala object-fit: cover, boleh zoom & geser titik fokus."""
    iw, ih = img.size
    scale = max(w / iw, h / ih) * zoom
    nw, nh = max(1, int(round(iw * scale))), max(1, int(round(ih * scale)))
    resized = img.resize((nw, nh), Image.LANCZOS)
    fx = min(max(focus[0], 0.0), 1.0)
    fy = min(max(focus[1], 0.0), 1.0)
    max_x = max(0, nw - w)
    max_y = max(0, nh - h)
    left = int(round(max_x * fx))
    top = int(round(max_y * fy))
    return resized.crop((left, top, left + w, top + h))


def rounded_mask(w, h, r):
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, w - 1, h - 1], radius=r, fill=255)
    return m


def paste_rounded(base, img, box, radius):
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    base.paste(img.crop((0, 0, w, h)), (x0, y0), rounded_mask(w, h, radius))


def make_bokeh(bg, radius=26, boost=1.15):
    """Background blur + vignette ala preset (foto di belakang, rada gelap)."""
    small = bg.resize((CW // 8, CH // 8), Image.LANCZOS)
    blur = small.filter(ImageFilter.GaussianBlur(radius / 8 * 4))
    blur = blur.resize((CW, CH), Image.BICUBIC)
    from PIL import ImageEnhance
    blur = ImageEnhance.Brightness(blur).enhance(0.52)
    blur = ImageEnhance.Color(blur).enhance(boost)
    # vignette
    vig = Image.new("L", (CW, CH), 0)
    vd = ImageDraw.Draw(vig)
    for i in range(60):
        a = int(255 * (i / 60) ** 2.2)
        vd.ellipse([-CW * 0.35 + i * 4, -CH * 0.3 + i * 6,
                    CW * 1.35 - i * 4, CH * 1.3 - i * 6], outline=None, fill=255 - a)
    dark = Image.new("RGB", (CW, CH), (8, 6, 14))
    blur = Image.composite(blur, dark, vig.point(lambda p: 255 - p))
    return blur


def label_chip(draw, xy, text, size=34, fg=ACCENT, pad=(18, 10)):
    """Teks kecil ala label '9:16' / '1:1' di pojok frame."""
    f = load_font(size)
    d = draw
    x, y = xy
    bbox = d.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    rect = [x, y, x + tw + pad[0] * 2, y + th + pad[1] * 2 + 4]
    d.rounded_rectangle(rect, radius=(rect[3] - rect[1]) // 2, fill=(0, 0, 0, 105))
    d.text((x + pad[0], y + pad[1] - bbox[1] + 2), text, font=f, fill=fg)


# ----------------------------------------------------------------------------
# Shot list — urutan foto per beat
# ----------------------------------------------------------------------------
# urutan shot per beat; kartu 1:1 selalu pakai foto berikutnya (nggak pernah kembar)
SHOT_ORDER = [0, 1, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1]
# tiap beat dapet "rasa" beda: zoom in, zoom out, pan kiri, pan kanan, shake keras
BEAT_MOOD = ["punch_in", "pan_left", "punch_out", "pan_right", "whip", "punch_in"]


def mood_for(beat_idx):
    return BEAT_MOOD[beat_idx % len(BEAT_MOOD)]


def motion_params(mood, phase, beat_idx):
    """phase 0..1 dalam satu beat -> (zoom, focus_x, focus_y)."""
    e = 1 - (1 - phase) ** 3  # ease-out
    if mood == "punch_in":
        z = 1.16 - 0.10 * e
        return z, 0.5, 0.5
    if mood == "punch_out":
        z = 1.04 + 0.14 * e
        return z, 0.5, 0.55
    if mood == "pan_left":
        z = 1.14
        return z, 0.72 - 0.42 * e, 0.5
    if mood == "pan_right":
        z = 1.14
        return z, 0.28 + 0.42 * e, 0.5
    if mood == "whip":
        z = 1.10 + 0.05 * math.sin(phase * math.pi)
        return z, 0.5 + 0.10 * math.sin(phase * math.pi * 2), 0.5
    return 1.10, 0.5, 0.5


# ----------------------------------------------------------------------------
# Render frame
# ----------------------------------------------------------------------------
class Renderer:
    def __init__(self, fotos, watermark="@za-warudo"):
        self.fotos = [Image.open(p).convert("RGB") for p in fotos]
        self.watermark = watermark
        # versi sharpen kecil biar ada "crunch" khas preset
        self.bgs = [make_bokeh(cover_fit(f, CW, CH, 1.0)) for f in self.fotos]

    def photo(self, idx, w, h, zoom, focus):
        return cover_fit(self.fotos[idx], w, h, zoom, focus)

    def draw(self, t, beat_idx, phase, drop=False, outro=False, label_extra=None):
        shot = SHOT_ORDER[beat_idx % len(SHOT_ORDER)]
        mood = mood_for(beat_idx)
        zoom, fx, fy = motion_params(mood, phase, beat_idx)

        # ---- latar: bokeh foto aktif, dikit gerak biar nggak mati
        bg = self.bgs[shot]
        if drop or outro:
            bg = bg.copy()
        canvas = bg.copy()

        # ---- intro: frame masih kosong (cuma outline + label), ala preset
        if beat_idx < INTRO_BEATS:
            d0 = ImageDraw.Draw(canvas, "RGBA")
            d0.rounded_rectangle([OX + FRAME_X0, OY + FRAME_Y0, OX + FRAME_X1 - 1,
                                  OY + FRAME_Y1 - 1], radius=FRAME_R, fill=(0, 0, 0, 235),
                                 outline=(255, 255, 255, 110), width=3)
            d0.rounded_rectangle([OX + CARD_X0, OY + CARD_Y0, OX + CARD_X1 - 1,
                                  OY + CARD_Y1 - 1], radius=CARD_R, fill=(0, 0, 0, 235),
                                 outline=(255, 255, 255, 110), width=3)
            label_chip(d0, (OX + FRAME_X0 + 16, OY + FRAME_Y0 + 14), "9:16")
            label_chip(d0, (OX + CARD_X0 + 14, OY + CARD_Y0 + 12), "1:1")
            f_small = load_font(26)
            if beat_idx == 0:
                d0.text((OX + FRAME_X0 + (FRAME_X1 - FRAME_X0) // 2, OY + FRAME_Y1 - 60),
                        "ready?", font=f_small, fill=(255, 255, 255, 130), anchor="mm")
            if beat_idx < 1:
                # beat 0: dua-duanya kosong -> langsung balik, biar "gantung"
                canvas = canvas.crop((PAD, PAD, PAD + W, PAD + H))
                return canvas
            # ---- beat 1..3: kiri udah keisi, kartu nyusul di beat 2
            fw, fh = FRAME_X1 - FRAME_X0, FRAME_Y1 - FRAME_Y0
            fimg = self.photo(shot, fw, fh, 1.06, (0.5, 0.5))
            paste_rounded(canvas, fimg, (OX + FRAME_X0, OY + FRAME_Y0,
                                         OX + FRAME_X1, OY + FRAME_Y1), FRAME_R)
            d = ImageDraw.Draw(canvas, "RGBA")
            d.rounded_rectangle([OX + FRAME_X0, OY + FRAME_Y0, OX + FRAME_X1 - 1,
                                 OY + FRAME_Y1 - 1], radius=FRAME_R,
                                outline=(255, 255, 255, 120), width=3)
            label_chip(d, (OX + FRAME_X0 + 16, OY + FRAME_Y0 + 14), "9:16")
            if beat_idx < 2:
                d.rounded_rectangle([OX + CARD_X0, OY + CARD_Y0, OX + CARD_X1 - 1,
                                     OY + CARD_Y1 - 1], radius=CARD_R, fill=(0, 0, 0, 235),
                                    outline=(255, 255, 255, 110), width=3)
                label_chip(d, (OX + CARD_X0 + 14, OY + CARD_Y0 + 12), "1:1")
            self._badge(d)
            canvas = canvas.crop((PAD, PAD, PAD + W, PAD + H))
            return canvas

        # ---- frame 9:16
        fw, fh = FRAME_X1 - FRAME_X0, FRAME_Y1 - FRAME_Y0
        fimg = self.photo(shot, fw, fh, zoom * 1.02, (fx, fy))
        paste_rounded(canvas, fimg, (OX + FRAME_X0, OY + FRAME_Y0, OX + FRAME_X1, OY + FRAME_Y1), FRAME_R)

        # ---- kartu 1:1 (foto sebelahnya, gerak dikit beda biar ada depth)
        shot2 = SHOT_ORDER[(beat_idx + 1) % len(SHOT_ORDER)]   # selalu foto lain
        cz, cfx, cfy = motion_params("pan_right" if mood == "pan_left" else "pan_left",
                                     phase, beat_idx)
        cw, ch = CARD_X1 - CARD_X0, CARD_Y1 - CARD_Y0
        cimg = self.photo(shot2, cw, ch, cz * 1.05, (cfx, cfy))
        paste_rounded(canvas, cimg, (OX + CARD_X0, OY + CARD_Y0, OX + CARD_X1, OY + CARD_Y1), CARD_R)

        # ---- outline tipis di frame & kartu
        d = ImageDraw.Draw(canvas, "RGBA")
        d.rounded_rectangle([OX + FRAME_X0, OY + FRAME_Y0, OX + FRAME_X1 - 1, OY + FRAME_Y1 - 1],
                            radius=FRAME_R, outline=(255, 255, 255, 120), width=3)
        d.rounded_rectangle([OX + CARD_X0, OY + CARD_Y0, OX + CARD_X1 - 1, OY + CARD_Y1 - 1],
                            radius=CARD_R, outline=(255, 255, 255, 120), width=3)

        # ---- label
        label_chip(d, (OX + FRAME_X0 + 16, OY + FRAME_Y0 + 14), "9:16")
        label_chip(d, (OX + CARD_X0 + 14, OY + CARD_Y0 + 12), "1:1")

        # ---- badge bawah kartu 1:1
        self._badge(d)

        # ---- flash + shake + vignette keras saat drop
        if drop or outro:
            layer = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
            ld = ImageDraw.Draw(layer)
            if label_extra:
                f = load_font(72)
                ld.text((CW // 2, OY + 1418), label_extra, font=f,
                        fill=(255, 255, 255, 255), anchor="mm")
                f2 = load_font(28)
                ld.text((CW // 2, OY + 1482), "JJ PRESET  /  9:16 + 1:1", font=f2,
                        fill=(255, 255, 255, 175), anchor="mm")
            canvas = Image.alpha_composite(canvas.convert("RGBA"), layer).convert("RGB")

        return canvas

    def _badge(self, d):
        x = OX + CARD_X0 + 2
        y = OY + CARD_Y1 + 22
        f = load_font(46)
        d.text((x, y), "55", font=f, fill=(255, 255, 255, 235))
        d.rounded_rectangle([x + 58, y + 4, x + 96, y + 26], radius=4,
                            outline=(255, 255, 255, 170), width=3)
        d.rounded_rectangle([x + 78, y + 16, x + 116, y + 38], radius=4,
                            outline=(255, 255, 255, 110), width=3)

        f2 = load_font(25)
        d.text((x + 136, y + 1), "JJ PRESET", font=f2, fill=(255, 255, 255, 230))
        d.text((x + 136, y + 31), self.watermark, font=f2, fill=(255, 255, 255, 150))

        f3 = load_font(22)
        d.text((OX + CARD_X1 - 2, y + 3), "9:16 + 1:1", font=f3,
               fill=(255, 255, 255, 205), anchor="ra")
        d.text((OX + CARD_X1 - 2, y + 33), "141.95 bpm", font=f3,
               fill=(255, 255, 255, 145), anchor="ra")


# ----------------------------------------------------------------------------
# Pipeline: render semua frame -> pipe ke ffmpeg
# ----------------------------------------------------------------------------
def render(fotos, audio, out, watermark, crf=19, preset="medium"):
    r = Renderer(fotos, watermark=watermark)
    total = int(round(END * FPS))
    audio_in = os.path.abspath(audio)
    out = os.path.abspath(out)
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)

    cmd = [
        FFMPEG, "-y", "-hide_banner", "-loglevel", "warning",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
        "-r", str(FPS), "-i", "pipe:0",
        "-ss", "0", "-t", f"{END:.3f}", "-i", audio_in,
        "-map", "0:v:0", "-map", "1:a:0",
        "-vf", "scale=1080:1920:flags=lanczos,format=yuv420p",
        "-c:v", "libx264", "-preset", preset, "-crf", str(crf),
        "-profile:v", "high", "-level", "4.1",
        "-c:a", "aac", "-b:a", "192k", "-ar", "44100",
        "-movflags", "+faststart", "-shortest",
        "-t", f"{END:.3f}",
        out,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    try:
        for n in range(total):
            t = n / FPS
            t_real = t
            if t >= OUTRO_START:            # outro: freeze di frame terakhir drop
                t = OUTRO_START - 1.0 / FPS
            tb = max(0.0, t - BEAT_PHASE)   # waktu relatif ke onset pertama
            beat_idx = int(tb // BEAT)
            phase = (tb % BEAT) / BEAT
            drop = beat_idx >= DROP_BEAT
            outro = t >= OUTRO_START
            frame = r.draw(t, beat_idx, phase, drop=drop, outro=outro,
                           label_extra="za-warudo")
            # shake: geser kanvas beberapa px pas awal beat
            amp = 0
            if not outro:
                if phase < 0.18:
                    amp = 7 if mood_for(beat_idx) == "whip" else 4
            if amp:
                rnd = random.Random(n)
                dx = rnd.uniform(-amp, amp)
                dy = rnd.uniform(-amp, amp)
                frame = frame.transform(
                    (CW, CH), Image.AFFINE, (1, 0, dx, 0, 1, dy),
                    resample=Image.BILINEAR)
            # flash putih tipis di 2 frame pertama tiap beat keras
            if phase < 0.05 and beat_idx % 4 == 0 and not outro and beat_idx >= INTRO_BEATS:
                frame = Image.blend(frame, Image.new("RGB", (CW, CH), "white"), 0.11)
            frame = frame.crop((PAD, PAD, PAD + W, PAD + H))
            # fade to black 0.3 s terakhir
            if t_real > END - 0.30:
                k = min(1.0, max(0.0, (t_real - (END - 0.30)) / 0.30))
                frame = Image.blend(frame, Image.new("RGB", (W, H), "black"), k * 0.92)
            proc.stdin.write(frame.tobytes())
    finally:
        if proc.stdin:
            proc.stdin.close()
        rc = proc.wait()
    if rc != 0:
        raise SystemExit(f"ffmpeg gagal (exit {rc})")
    print(f"OK -> {out}  ({os.path.getsize(out)/1e6:.1f} MB, {END:.2f}s)")


def main():
    global BEAT, BEAT_PHASE, END, DROP_T, OUTRO_START
    ap = argparse.ArgumentParser(description="Render preset JJ 9:16 dari foto")
    ap.add_argument("--foto", action="append", required=True, help="foto sumber (boleh >1)")
    ap.add_argument("--audio", required=True, help="video/audio sumber beat")
    ap.add_argument("--out", default="output/jj-9x16.mp4")
    ap.add_argument("--watermark", default="@za-warudo")
    ap.add_argument("--crf", type=int, default=19)
    ap.add_argument("--preset", default="medium")
    ap.add_argument("--auto-beat", action="store_true",
                    help="deteksi BPM + offset beat dari audio (tools/detect_beat.py)")
    ap.add_argument("--end", type=float, default=None, help="override durasi output (detik)")
    ap.add_argument("--drop-t", type=float, default=None,
                    help="override detik drop/freeze terakhir")
    a = ap.parse_args()

    if a.auto_beat:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import detect_beat
        x = detect_beat.decode_mono(a.audio)
        info = detect_beat.estimate(x)
        BEAT = info["beat_period"]
        BEAT_PHASE = info["beat_phase"]
        # buang ekor senyap: cari sample terakhir yang masih ada suara
        import numpy as np
        loud = np.abs(x[int(0.2 * len(x)):])
        nz = np.nonzero(loud > 0.01)[0]
        if nz.size:
            last = (len(x) - loud.size + int(nz[-1])) / 22050.0
            END = min(END, last + 0.30)
        print(f"[auto-beat] bpm={info['bpm']} beat={BEAT:.5f}s phase={BEAT_PHASE}s "
              f"end={END:.2f}s (score {info['score']})")
    if a.end is not None:
        END = a.end
    if a.drop_t is not None:
        DROP_T = a.drop_t
    OUTRO_START = DROP_T
    if END <= DROP_T:
        END = DROP_T + 0.4
    render(a.foto, a.audio, a.out, a.watermark, a.crf, a.preset)
    return 0


if __name__ == "__main__":
    sys.exit(main())
