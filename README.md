# za-warudo — preset JJ 9:16

Repo kecil buat bikin **preset JJ (jedag-jedug)** ala CapCut dari foto biasa:
frame **9:16** di kiri, kartu **1:1** di kanan, cut + shake + zoom punch yang
dikunci ke beat audio.

```
output/jj-9x16.mp4   <- hasil jadi, 1080x1920, 15.9 s, 30 fps
tools/render_jj.py   <- renderer-nya (Pillow -> pipe ke ffmpeg)
tools/detect_beat.py <- deteksi BPM + offset beat dari audio
assets/source/       <- bahan mentah (3 foto + audio/video beat)
```

## Hasil

`output/jj-9x16.mp4`

- 1080x1920 (9:16), 30 fps, H.264 + AAC, ~6 MB
- 3 foto: `foto-1-bangku`, `foto-2-batik`, `foto-3-jam`
- Beat 141.95 BPM → 1 cut per beat (0.4227 s)
- Struktur: intro frame kosong ("ready?") → 1 bar shot kiri → cut penuh →
  drop hit terakhir di 15.5 s (freeze + judul) → fade to black

## Cara pakai

Butuh Python 3.9+, Pillow, numpy, dan ffmpeg (auto-download lewat `imageio-ffmpeg`).

```bash
pip install --break-system-packages pillow numpy imageio-ffmpeg

# render ulang persis kayak output/jj-9x16.mp4
python3 tools/render_jj.py \
    --foto assets/source/foto-1-bangku.jpg \
    --foto assets/source/foto-2-batik.jpg \
    --foto assets/source/foto-3-jam.jpg \
    --audio assets/source/audio-source.mp4 \
    --out output/jj-9x16.mp4 \
    --auto-beat
```

Ganti beat lagu? tinggal ganti `--audio`, `--auto-beat` yang nyari BPM + offset
sendiri:

```bash
python3 tools/detect_beat.py lagu-baru.mp3
# BPM 141.95  BEAT 0.422684  BEAT_PHASE 0.115
```

Opsi lain:

| flag | fungsi |
|---|---|
| `--foto` (boleh diulang) | foto sumber, urutan dipakai buat shot list |
| `--audio` | video/mp3 sumber beat |
| `--out` | path output (default `output/jj-9x16.mp4`) |
| `--watermark` | teks handle, default `@za-warudo` |
| `--auto-beat` | deteksi BPM + phase otomatis dari audio |
| `--end` / `--drop-t` | override durasi & titik drop (detik) |
| `--crf` / `--preset` | kualitas & kecepatan encode x264 |

## Layout & timing (kalau mau dioprek)

Semua angka ada di atas `tools/render_jj.py`:

```python
W, H = 1080, 1920
FRAME_X0, FRAME_Y0, FRAME_X1, FRAME_Y1 = 18, 560, 464, 1354   # 9:16 -> 446x794
CARD_X0,  CARD_Y0,  CARD_X1,  CARD_Y1  = 544, 730, 1030, 1216 # 1:1  -> 486x486

BEAT = 0.4226837879629925   # 141.95 BPM
BEAT_PHASE = 0.115          # onset pertama audio
INTRO_BEATS = 4             # beat 0-3 masih "download"/kosong
DROP_BEAT = 36              # beat masuk drop
DROP_T = 15.50              # boom terakhir -> freeze + judul
```

Per-beat "rasa" gerakannya diatur di `BEAT_MOOD`
(`punch_in`, `pan_left`, `punch_out`, `pan_right`, `whip`) dan urutan fotonya di
`SHOT_ORDER`. Kartu 1:1 selalu pakai foto selisih satu dari frame 9:16, jadi
nggak pernah nampilin foto yang sama dua kali dalam satu beat.

## Catatan teknis

- `BEAT_PHASE` penting: onset pertama audionya nggak di 0.0 s, kalau nggak
  digeser semua cut jadi telat ~1/3 beat dan kerasa "ngambang".
- Shake & flash cuma muncul di awal beat (fase < 0.05), amplitudo 4 px
  (7 px buat mood `whip`) di kanvas kerja 1128x1968, lalu di-crop ke 1080x1920 —
  jadi pinggir frame nggak pernah kosong.
- Cek sinkron: motion frame vs onset audio dikorelasi, hasilnya puncak di
  lag ≈ 0 (0.47), turun tajam di ±0.2 s. Kalau mau ngetes ulang setelah ganti
  lagu, bandingkan `fps=30` frame diff dengan spectral flux audionya.

## Struktur repo

```
README.md
Hai                                  (sisa file lama)
assets/source/audio-source.mp4       (video beat sumber, 19.6 s)
assets/source/foto-*.jpg             (3 foto sumber)
output/jj-9x16.mp4                   (hasil render)
tools/render_jj.py
tools/detect_beat.py
```
