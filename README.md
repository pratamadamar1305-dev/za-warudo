# EUROBEAT DRIFT LEGEND — Gunma Downhill

A browser-based, single-player downhill touge racer built with TypeScript, Vite and Three.js. The track and scenery are generated procedurally; music and arcade effects are synthesized with Web Audio, with no external asset downloads.

## Run

```sh
npm install
npm run dev
```

Open the Vite URL. Click **TAP TO START** to unlock audio, then start a race from the menu. Production build: `npm run build`. Android wrapper (Capacitor, landscape/fullscreen): `npm run android:sync`; with JDK 21 and Android SDK installed, build/installable debug APK via `npm run android:apk`.

GitHub Actions workflow `.github/workflows/android-apk.yml` builds `app-debug.apk` on pushes to the session branch or manual dispatch, publishes the `eurobeat-drift-legend-debug-apk` artifact (30-day retention), and refreshes a downloadable prerelease at `https://github.com/pratamadamar1305-dev/za-warudo/releases/tag/android-debug-latest`. Debug APKs are installable for testing but are not Play Store-signed release packages.

## Controls

- **W / Up** — throttle; **S / Down** — brake; **A/D / Left/Right** — steer
- **Space** — handbrake; **C / Shift** or **1–3** — camera
- **P / Esc** — pause; **R** — restart; **M** — mute
- **`** or **F1** — cheat console; **F2** — cheat menu
- Gamepad: left stick, RT/LT, A. Touch buttons appear on touch-capable devices.

## Simulation QA

`npm run simtest` compiles and runs the headless physics/race harness. Current results: 5/5 PRO P1 finishes (185.37–185.47 s), zero wall hits, max slip 7°, 0–100 km/h in 9.46 s, CHILL average 86 km/h. Downhill top speed currently peaks at 174 km/h against the ~185 km/h target; this remains a known tuning gap.

`fisch.lua` and `Hai` are intentionally left untouched.
