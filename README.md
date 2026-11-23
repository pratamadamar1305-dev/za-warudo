# Eurobeat Drift Legend — Gunma Downhill

Browser-first downhill touge racer: Vite + TypeScript + Three.js + Web Audio API, wrapped by **Capacitor 6** for Android. Rendering uses WebGL2 in Android System WebView. Track, scenery, soundtrack, and arcade effects are generated locally; no third-party art or licensed music is bundled.

## Web development

```sh
npm ci
npm run dev
```

## Android target

- Minimum Android **8.0 / API 26**; target SDK **34**.
- Landscape game, immersive fullscreen, local HTTPS WebView scheme.
- Native architectures: **arm64-v8a** and **armeabi-v7a**.
- Android permissions: vibration only. The app does not require internet access.

## Build

```sh
npm ci
npm run build
npx cap sync android
```

Debug APK:

```sh
cd android && ./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`. Debug builds are installable test builds, not Play Store releases.

Signed Play Store AAB:

1. Generate a private upload key and keep it backed up securely:
   ```sh
   keytool -genkeypair -v -keystore android/release-key.jks -alias eurobeat-release -keyalg RSA -keysize 4096 -validity 10000
   ```
2. Copy `android/keystore.properties.example` to `android/keystore.properties`, then set the correct store file, passwords and alias. `android/keystore.properties` and `*.jks`/`*.keystore` are git-ignored. **Never commit or share the keystore or its passwords.**
3. Build the bundle (the release signing config reads that properties file):
   ```sh
   cd android && ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`.

Set a unique, increasing version for each store upload with Gradle properties, e.g. `./gradlew bundleRelease -PVERSION_CODE=2 -PVERSION_NAME=1.0.1`. The CI debug build uses the GitHub run number for `versionCode`; local defaults are `1` / `1.0.0`.

The APK workflow publishes the latest installable debug APK at [GitHub Releases](https://github.com/pratamadamar1305-dev/za-warudo/releases/tag/android-debug-latest). CI also builds an **unsigned validation AAB** and checks it is below 40 MB; it is not Play Store uploadable until built with your private release keystore.

## Mobile controls & settings

Touch controls are multi-pointer safe: left/right steering, right-side throttle/brake paddles and a left handbrake. Settings switch steering between buttons and calibrated device tilt, toggle haptics, and choose Speaker or Headphone audio voicing. Bluetooth gamepads remain supported. Back during a race opens Pause; while paused, two Back presses within two seconds exit. Returning from background keeps a race paused, suspends Web Audio while inactive, and does not restart its scheduler.

## Play Store preparation

- **Category:** Racing. **Content rating target:** 3+ (no blood or adult content).
- **Short description (under 80 characters):** “Downhill touge malam, drift arcade, dan eurobeat orisinal.”
- **Long description:** Race a fictional mountain pass after dark in a fast, arcade-style downhill driving game. Learn the corners, tune your car, chase clean sectors and build drift combos with keyboard, touch, calibrated tilt, or a Bluetooth controller. Procedural scenery and an original synthesized eurobeat-inspired soundtrack bring Gunma Night Pass to life. Progress and settings are stored locally on your device. No account, analytics, ads, or personal-data collection.
- Store listing assets: the original **512×512 icon** is at `android/store-assets/icon-512.png`; still to capture/design are **4 landscape 16:9 gameplay screenshots** and a **1024×500 feature graphic**.
- **Data safety:** game progress/settings/cheats are saved on-device only; no personal data is collected or transmitted.
- App/listing identity is **Eurobeat Drift Legend**. Cars and visuals are original fictional designs, including a generic car silhouette and tofu parcel; no Initial D or AE86 branding/assets. Music and scenery are procedural/original, with no third-party licensed assets.

## QA

Headless simulation: `npm run simtest`. Current desktop headless checks were 5/5 PRO P1, zero wall hits, max slip 7°, 0–100 km/h in 9.46 s, CHILL average 86 km/h. The measured downhill speed remains about 174 km/h versus the tuning target near 185 km/h.

Android acceptance items requiring real hardware (emulator/phone install, three-finger play test, tilt sensor, notch layouts, 15-minute thermal run, system audio routing, app-kill persistence, and release signing) must be verified on devices before claiming final store readiness. The CI APK build itself is automated and verified; no Android device is attached to this workspace.
