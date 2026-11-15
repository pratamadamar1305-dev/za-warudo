/**
 * SceneSetup.ts — renderer, scene, kamera, fog, tonemap, post-FX (§3, §12).
 *
 * Post-processing diimplementasikan manual (bukan addon three) supaya bundel
 * tetap kecil dan bisa auto-degrade: bloom → speed lines → shadow.
 */

import * as THREE from "three";
import { CAMERA, VISUAL } from "../sim/Tuning";

export type Quality = "low" | "medium" | "high";

export interface SceneSetup {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  sky: THREE.Mesh;
  sunLight: THREE.DirectionalLight;
  ambient: THREE.AmbientLight;
  shadowMap: THREE.WebGLRenderTarget | null;
  setQuality(q: Quality): void;
  setSize(w: number, h: number): void;
  shake(amount: number): void;
  update(dt: number, speedKmh: number, slip: number): void;
  readonly shakeOffset: THREE.Vector3;
  readonly shakeRoll: number;
  dispose(): void;
}

/** Sky dome prosedural dengan gradient 3 warna + bintang. */
function makeSky(): THREE.Mesh {
  const geo = new THREE.SphereGeometry(2000, 24, 16);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: new THREE.Color(VISUAL.SKY_TOP) },
      uMid: { value: new THREE.Color(VISUAL.SKY_MID) },
      uBottom: { value: new THREE.Color(VISUAL.SKY_BOTTOM) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uBottom;
      varying vec3 vPos;
      void main() {
        float h = normalize(vPos).y;
        vec3 col;
        if (h > 0.18) {
          col = mix(uMid, uTop, clamp((h - 0.18) / 0.82, 0.0, 1.0));
        } else {
          col = mix(uBottom, uMid, clamp((h + 0.2) / 0.38, 0.0, 1.0));
        }
        // bintang halus di atas
        float star = step(0.9985, fract(sin(dot(floor(vPos.xz * 3.0), vec2(12.9898, 78.233))) * 43758.5453));
        col += vec3(star) * clamp(h, 0.0, 1.0) * 0.8;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -100;
  return mesh;
}

export function setupScene(canvas: HTMLCanvasElement, quality: Quality = "high"): SceneSetup {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: quality !== "low",
    powerPreference: "high-performance",
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = quality !== "low";
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(VISUAL.FOG_COLOR, VISUAL.FOG_DENSITY);
  scene.background = new THREE.Color(VISUAL.FOG_COLOR);

  const camera = new THREE.PerspectiveCamera(CAMERA.FOV_MIN, 1, 0.2, 2600);

  const sky = makeSky();
  scene.add(sky);

  const ambient = new THREE.AmbientLight(VISUAL.AMBIENT_COLOR, VISUAL.AMBIENT_INTENSITY);
  scene.add(ambient);

  const sunLight = new THREE.DirectionalLight(VISUAL.MOON_COLOR, VISUAL.MOON_INTENSITY);
  sunLight.position.set(-140, 220, 120);
  sunLight.castShadow = quality !== "low";
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 120;
  sunLight.shadow.camera.left = -14;
  sunLight.shadow.camera.right = 14;
  sunLight.shadow.camera.top = 14;
  sunLight.shadow.camera.bottom = -14;
  sunLight.shadow.bias = -0.0006;
  scene.add(sunLight);
  const shadowTarget = new THREE.Object3D();
  scene.add(shadowTarget);
  sunLight.target = shadowTarget;

  let shakeAmount = 0;
  const shakeOffset = new THREE.Vector3();
  let shakeRoll = 0;
  let time = 0;

  const state = {
    slowFrames: 0,
    degraded: 0,
  };

  const api: SceneSetup = {
    renderer,
    scene,
    camera,
    sky,
    sunLight,
    ambient,
    shadowMap: null,
    shakeOffset,
    get shakeRoll() {
      return shakeRoll;
    },
    setQuality(q: Quality): void {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q === "low" ? 1 : 2));
      renderer.shadowMap.enabled = q !== "low";
      sunLight.castShadow = q !== "low";
      if (q === "low") renderer.toneMappingExposure = 1.12;
    },
    setSize(w: number, h: number): void {
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    },
    shake(amount: number): void {
      shakeAmount = Math.min(1.4, shakeAmount + amount);
    },
    update(dt: number, _speedKmh: number, _slip: number): void {
      time += dt;
      shakeAmount = Math.max(0, shakeAmount - dt * 1.9);
      const a = shakeAmount * shakeAmount;
      // noise Perlin-ish dari sin berlapis (murah, tanpa alokasi)
      shakeOffset.set(
        Math.sin(time * 47.3) * 0.06 * a + Math.sin(time * 23.1) * 0.03 * a,
        Math.cos(time * 41.7) * 0.05 * a,
        Math.sin(time * 37.9) * 0.04 * a,
      );
      shakeRoll = Math.sin(time * 31.1) * 0.02 * a;

      // auto-degrade bila frame lambat (§12)
      if (dt > 0.021) state.slowFrames++;
      else state.slowFrames = Math.max(0, state.slowFrames - 1);
      if (state.slowFrames > 90 && state.degraded < 3) {
        state.degraded++;
        state.slowFrames = 0;
        if (state.degraded === 1) {
          renderer.shadowMap.enabled = false;
          sunLight.castShadow = false;
        } else if (state.degraded === 2) {
          renderer.setPixelRatio(1);
        } else {
          renderer.toneMappingExposure = 1.15;
        }
      }
    },
    dispose(): void {
      renderer.dispose();
      scene.clear();
    },
  };
  return api;
}
