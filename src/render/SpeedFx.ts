/**
 * SpeedFx.ts — post-processing penuh: bloom, ACES, chromatic aberration,
 * speed lines anime, vignette, radial blur di tepi frame (§3.4, §3.5).
 *
 * Alur render:
 *   scene → sceneRT (linear, tanpa tonemap)
 *   sceneRT → bright pass (1/4 res)
 *   bright → blur H → blur V (dua pass, 9 tap)
 *   composite: CA + ACES + bloom + speed lines + vignette → layar
 *
 * Semua render target dialokasikan sekali dan dirilis di dispose(); ukuran
 * diperbarui saat resize tanpa membuat yang baru bila dimensinya sama.
 */

import * as THREE from "three";
import { VISUAL } from "../sim/Tuning";

const BLUR_SCALE = 4;

export class SpeedFx {
  private renderer: THREE.WebGLRenderer;
  private sceneRT: THREE.WebGLRenderTarget;
  private brightRT: THREE.WebGLRenderTarget;
  private blurRT: THREE.WebGLRenderTarget;
  private quadScene: THREE.Scene;
  private quad: THREE.Mesh;
  private brightMat: THREE.ShaderMaterial;
  private blurMat: THREE.ShaderMaterial;
  private compositeMat: THREE.ShaderMaterial;
  private quadCam: THREE.OrthographicCamera;
  private width = 1;
  private height = 1;
  /** Statistik untuk QA. */
  readonly stats = { bloomEnabled: true, passes: 3 };

  constructor(renderer: THREE.WebGLRenderer, width: number, height: number) {
    this.renderer = renderer;
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    const type = THREE.HalfFloatType;

    this.sceneRT = new THREE.WebGLRenderTarget(this.width, this.height, {
      type,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
    });
    const bw = Math.max(1, Math.floor(this.width / BLUR_SCALE));
    const bh = Math.max(1, Math.floor(this.height / BLUR_SCALE));
    this.brightRT = new THREE.WebGLRenderTarget(bw, bh, {
      type,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });
    this.blurRT = new THREE.WebGLRenderTarget(bw, bh, {
      type,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    });

    this.quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadScene = new THREE.Scene();

    this.brightMat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: this.sceneRT.texture },
        uThreshold: { value: VISUAL.BLOOM_THRESHOLD },
        uTexel: { value: new THREE.Vector2(1 / this.width, 1 / this.height) },
      },
      vertexShader: VERT,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform sampler2D uTex;
        uniform float uThreshold;
        uniform vec2 uTexel;
        varying vec2 vUv;
        void main() {
          // 4-tap downsample, hanya bagian terang
          vec3 sum = vec3(0.0);
          sum += texture2D(uTex, vUv + vec2(-1.0, -1.0) * uTexel).rgb;
          sum += texture2D(uTex, vUv + vec2( 1.0, -1.0) * uTexel).rgb;
          sum += texture2D(uTex, vUv + vec2(-1.0,  1.0) * uTexel).rgb;
          sum += texture2D(uTex, vUv + vec2( 1.0,  1.0) * uTexel).rgb;
          vec3 c = sum * 0.25;
          float l = max(max(c.r, c.g), c.b);
          float k = max(0.0, l - uThreshold) / max(1e-4, l);
          gl_FragColor = vec4(c * k, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    this.blurMat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: this.brightRT.texture },
        uDir: { value: new THREE.Vector2(1, 0) },
        uTexel: { value: new THREE.Vector2(1 / bw, 1 / bh) },
      },
      vertexShader: VERT,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform sampler2D uTex;
        uniform vec2 uDir;
        uniform vec2 uTexel;
        varying vec2 vUv;
        void main() {
          vec2 step = uDir * uTexel * 1.35;
          vec3 c = texture2D(uTex, vUv).rgb * 0.227027;
          c += texture2D(uTex, vUv + step * 1.3846).rgb * 0.316216;
          c += texture2D(uTex, vUv - step * 1.3846).rgb * 0.316216;
          c += texture2D(uTex, vUv + step * 3.2308).rgb * 0.070270;
          c += texture2D(uTex, vUv - step * 3.2308).rgb * 0.070270;
          gl_FragColor = vec4(c, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    this.compositeMat = new THREE.ShaderMaterial({
      uniforms: {
        uScene: { value: this.sceneRT.texture },
        uBloom: { value: this.blurRT.texture },
        uBloomStrength: { value: VISUAL.BLOOM_STRENGTH },
        uThreshold: { value: VISUAL.BLOOM_THRESHOLD },
        uTime: { value: 0 },
        uSpeed: { value: 0 },
        uDrift: { value: 0 },
        uCA: { value: 0 },
        uVignette: { value: VISUAL.VIGNETTE },
        uExposure: { value: 1.06 },
        uReduceMotion: { value: 0 },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
      },
      vertexShader: VERT,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform sampler2D uScene;
        uniform sampler2D uBloom;
        uniform float uBloomStrength;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uDrift;
        uniform float uCA;
        uniform float uVignette;
        uniform float uExposure;
        uniform float uReduceMotion;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // ACES filmic (versi ringkas, sama seperti three)
        vec3 aces(vec3 x) {
          const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
          return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
        }
        vec3 toSrgb(vec3 c) {
          return mix(c * 12.92, 1.055 * pow(max(c, vec3(1e-5)), vec3(1.0/2.4)) - 0.055, step(0.0031308, c));
        }
        float hash(float n) { return fract(sin(n) * 43758.5453123); }

        void main() {
          vec2 uv = vUv;
          vec2 c = uv - 0.5;
          float r = length(c);

          // ---------- chromatic aberration (radial, naik dgn kecepatan) ----------
          vec2 dir = c / max(r, 1e-5);
          float caPx = uCA * (0.25 + r * 1.9);
          vec3 col;
          if (caPx > 0.00002) {
            col.r = texture2D(uScene, uv + dir * caPx).r;
            col.g = texture2D(uScene, uv).g;
            col.b = texture2D(uScene, uv - dir * caPx).b;
          } else {
            col = texture2D(uScene, uv).rgb;
          }

          // ---------- bloom ----------
          vec3 bloom = texture2D(uBloom, uv).rgb;
          col += bloom * uBloomStrength;

          // ---------- radial speed blur di tepi frame ----------
          if (uSpeed > 0.15 && uReduceMotion < 0.5) {
            vec3 blur = vec3(0.0);
            float amt = uSpeed * 0.022;
            for (int i = 0; i < 4; i++) {
              float k = float(i) / 4.0;
              blur += texture2D(uScene, uv - dir * (amt * k * r)).rgb;
            }
            blur *= 0.25;
            float edge = smoothstep(0.34, 0.82, r);
            col = mix(col, blur + bloom * uBloomStrength, edge * min(1.0, uSpeed * 1.4));
          }

          // ---------- tonemap + exposure ----------
          col = aces(col * uExposure);

          // ---------- speed lines anime ----------
          if (uReduceMotion < 0.5) {
            float lines = 0.0;
            if (uSpeed > 0.1) {
              float ang = atan(c.y, c.x);
              float spokes = 40.0;
              float a = ang / 6.28318 * spokes;
              float id = floor(a);
              float seed = hash(id * 1.37 + floor(uTime * 20.0));
              float mask = step(0.74, seed);
              float thin = smoothstep(0.44, 0.0, abs(fract(a) - 0.5));
              float radial = smoothstep(0.14, 0.66, r);
              lines = mask * thin * radial * smoothstep(0.1, 0.45, uSpeed) * 0.9;
            }
            float diag = 0.0;
            if (uDrift > 0.06) {
              float d = fract((uv.x + uv.y * 1.6) * 30.0 + uTime * 3.1);
              diag = smoothstep(0.88, 1.0, d) * smoothstep(0.06, 0.42, uDrift) * 0.45;
              diag *= smoothstep(0.12, 0.42, r);
            }
            col += vec3(0.92, 0.96, 1.0) * (lines + diag);
          }

          // ---------- vignette ----------
          float vig = smoothstep(0.36, 0.95, r) * uVignette;
          col *= 1.0 - vig;

          // ---------- grain halus (film) ----------
          float g = hash(floor(uv.x * uResolution.x) + floor(uv.y * uResolution.y) * 3.17 + floor(uTime * 24.0));
          col += (g - 0.5) * 0.012;

          gl_FragColor = vec4(toSrgb(clamp(col, 0.0, 1.0)), 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMat);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);
  }

  setSize(width: number, height: number): void {
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    this.sceneRT.setSize(w, h);
    const bw = Math.max(1, Math.floor(w / BLUR_SCALE));
    const bh = Math.max(1, Math.floor(h / BLUR_SCALE));
    this.brightRT.setSize(bw, bh);
    this.blurRT.setSize(bw, bh);
    this.brightMat.uniforms.uTexel!.value.set(1 / w, 1 / h);
    this.blurMat.uniforms.uTexel!.value.set(1 / bw, 1 / bh);
    this.compositeMat.uniforms.uResolution!.value.set(w, h);
  }

  setQuality(level: "low" | "medium" | "high"): void {
    this.stats.bloomEnabled = level !== "low";
    this.compositeMat.uniforms.uBloomStrength!.value =
      level === "low" ? 0 : level === "medium" ? VISUAL.BLOOM_STRENGTH * 0.7 : VISUAL.BLOOM_STRENGTH;
  }

  update(dt: number, speedKmh: number, driftIntensity: number, reduceMotion: boolean): void {
    const u = this.compositeMat.uniforms;
    u.uTime!.value += dt;
    u.uReduceMotion!.value = reduceMotion ? 1 : 0;
    const target = Math.min(1, speedKmh / 200);
    u.uSpeed!.value += (target - u.uSpeed!.value) * Math.min(1, dt * 6);
    u.uDrift!.value += (driftIntensity - u.uDrift!.value) * Math.min(1, dt * 7);
    u.uCA!.value = (speedKmh / VISUAL.CA_REF_KMH) * VISUAL.CA_MAX;
  }

  /** Render seluruh frame: scene → bloom → composite ke layar. */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    const r = this.renderer;
    const prevTarget = r.getRenderTarget();
    const prevAutoClear = r.autoClear;
    r.autoClear = true;

    // 1. scene ke RT (linear, tanpa tonemap karena render target)
    r.setRenderTarget(this.sceneRT);
    r.clear();
    r.render(scene, camera);

    if (this.stats.bloomEnabled) {
      // 2. bright pass
      this.quad.material = this.brightMat;
      r.setRenderTarget(this.brightRT);
      r.clear();
      r.render(this.quadScene, this.quadCam);

      // 3. blur H → blurRT
      this.quad.material = this.blurMat;
      this.blurMat.uniforms.uTex!.value = this.brightRT.texture;
      this.blurMat.uniforms.uDir!.value.set(1, 0);
      r.setRenderTarget(this.blurRT);
      r.clear();
      r.render(this.quadScene, this.quadCam);

      // 4. blur V → brightRT (bolak-balik, hasil akhir di brightRT)
      this.blurMat.uniforms.uTex!.value = this.blurRT.texture;
      this.blurMat.uniforms.uDir!.value.set(0, 1);
      r.setRenderTarget(this.brightRT);
      r.clear();
      r.render(this.quadScene, this.quadCam);
      this.compositeMat.uniforms.uBloom!.value = this.brightRT.texture;
    } else {
      this.compositeMat.uniforms.uBloomStrength!.value = 0;
    }

    // 5. composite ke layar
    this.quad.material = this.compositeMat;
    r.setRenderTarget(prevTarget);
    r.render(this.quadScene, this.quadCam);
    r.autoClear = prevAutoClear;
  }

  /** Dipanggil saat canvas/resolusi berubah drastis — aman walau sudah dispose. */
  dispose(): void {
    if (!this.sceneRT) return;
    this.sceneRT.dispose();
    this.brightRT.dispose();
    this.blurRT.dispose();
    this.brightMat.dispose();
    this.blurMat.dispose();
    this.compositeMat.dispose();
    this.quad.geometry.dispose();
    this.quadScene.clear();
  }
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
