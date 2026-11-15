# EUROBEAT DRIFT LEGEND — Gunma Downhill

Arcade drift racer 3D bertema touge Jepang malam hari. Semua aset — mesh, tekstur,
musik, dan efek suara — dibuat **prosedural di dalam kode**. Tidak ada file
`.glb`, `.mp3`, `.png`, CDN, atau permintaan jaringan apa pun, sehingga game
tetap jalan di lingkungan offline.

## Cara main

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit + vite build
```

Klik **TAP TO START** (wajib — browser baru mengizinkan audio setelah gesture),
lalu pilih mode. Kontrol:

| Aksi | Keyboard | Gamepad |
|---|---|---|
| Gas | `W` / `↑` | RT |
| Rem | `S` / `↓` | LT |
| Setir | `A` `D` / `←` `→` | Stick kiri |
| Handbrake / drift | `SPACE` | X |
| Ganti kamera | `C` | Y |
| Restart | `R` | — |
| Pause | `ESC` | START |

Di mobile: setir di kiri, gas/rem di kanan, tombol drift besar di tengah.

**Teknik drift:** tarik handbrake sambil belok (0.25 s), lalu tahan dengan
countersteer proporsional terhadap slip dan throttle ~60%. Kalau gas ditahan
penuh, mobil akan over-rotate — itu disengaja.

## Struktur

```
index.html
src/
  main.ts                  bootstrap, loop, state machine, wiring
  style.css
  core/  AudioEngine Eurobeat SFX Loop Input StateMachine Save
  render/ SceneSetup ToonMaterial TrackMesh Scenery CarModel FX
          SpeedFx CameraRig Cutscene
  sim/   Tuning TrackSpline VehiclePhysics AIOpponent RaceLogic
          DriftScore RubberBand
  ui/    HUD Menu Results DialogSystem Settings
tools/   sim-test.mjs race-test.mjs audio-test.mjs   (harness QA headless)
```

## Gate yang dijalankan

| Gate | Perintah | Hasil |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | 0 error |
| Build | `npm run build` | sukses |
| Fisika §6.9 | `node tools/sim-test.mjs` | **20/20** |
| Integrasi race | `node tools/race-test.mjs` | **13/13** |
| Audio graph | `node tools/audio-test.mjs` | **10/10** |

Angka terukur (bukan klaim): 0–100 km/h **9.93 s**, top speed **171 km/h** flat /
**190 km/h** turunan 7%, hairpin 18 m stabil di **49–57 km/h tanpa spin**,
handbrake drift bertahan **9.6 s**, guardrail **0 tembus** dalam 240 s
hantam-hantaman, **0 NaN** dalam 10 menit simulasi, AI finish **3:39.7**.

## Cara tuning feel

Semua konstanta "rasa" ada di **`src/sim/Tuning.ts`**:

| Konstanta | Naikkan | Turunkan |
|---|---|---|
| `TIRE_PEAK_MU` (1.05) | mobil lebih nempel, drift lebih susah dimulai | lebih licin, drift liar |
| `HANDBRAKE_YAW_INJECT` (4.0) | entry drift lebih agresif, mudah over-rotate | entry halus, butuh teknik |
| `COUNTERSTEER_DAMPING` (2.0) | drift lebih gampang diselamatkan (lebih "assist") | lebih menantang, mudah spin |
| `AI_SKILL_BASE` (0.94) | rival lebih cepat | rival lebih santai |
| `CAM_SPRING_K` (14) / `CAM_DAMPING` (0.86) | kamera menempel ketat | kamera lebih "melayang" sinematik |
| `YAW_SLIP_FACTOR` (1.35) | mobil bisa berputar lebih liar | lebih jinak, hampir tak bisa spin |

Tuning audio juga 3 baris: `AUDIO.BPM_BASE` (tempo), `TRACKS[i].progA/progB`
(progresi chord), `VISUAL` + `driftIntensity` di `Eurobeat` (intensitas layer).

## Catatan deviasi dari spesifikasi

1. **Elevasi vs grade.** Spesifikasi meminta turun 980 m → 340 m (640 m) pada
   panjang 5.2 km, *dan* rata-rata 7%. Dua angka itu tidak konsisten: 640 m pada
   5.2 km = 12.3%. Yang diprioritaskan adalah titik elevasi (memengaruhi gravity
   assist & top speed), jadi grade dibuat 12.3% dan jarak 5.06 km. Jika kamu mau
   rata-rata 7% yang ketat, ubah `GL` di `buildGunmaPass()` ke `0.07` — elevasi
   akhir akan menjadi ±648 m, bukan 340 m.
2. **Spline terbuka.** Race hanya 1 putaran puncak → kaki, jadi spline tidak
   ditutup; loop tertutup akan memaksa tanjakan 640 m di sambungan.
3. **Bloom & ACES** diimplementasikan sebagai pipeline shader sendiri di
   `SpeedFx.ts` (bukan `EffectComposer` addon) agar bundel kecil dan bisa
   auto-degrade.
4. **Hairpin 52–62 km/h** diuji tanpa drag aerodinamis (spesifikasi tidak
   menyebutnya). Dengan drag, drift stabil terjadi di 49–57 km/h — dilaporkan
   apa adanya di harness, bukan disamarkan.

## Yang BELUM diverifikasi

Sandbox ini tidak punya browser (unduhan Chromium diblokir), jadi item QA yang
butuh mata dan telinga manusia **belum saya jalankan** dan saya tidak
mengklaimnya lulus:

- tampilan visual nyata (cel shading, bloom, speed lines) di GPU
- kualitas audio yang terdengar (timbre Eurobeat, screech ban)
- pause/resume audio 5× benar-benar tanpa dobel
- gamepad fisik & touch di perangkat nyata
- FPS terukur di 1080p

Semua itu sudah dirancang dan bisa kamu cek dengan membuka preview. Kalau ada
yang meleset (mis. musik terlalu keras, kamera terlalu jauh), tuning point-nya
sudah disebut di tabel di atas.
