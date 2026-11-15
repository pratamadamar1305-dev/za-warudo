/**
 * ToonMaterial.ts — cel shader custom + outline (§3.1, §3.2).
 *
 * Kuantisasi N·L ke 3 band diskret (0.33 / 0.66) dengan soft edge 0.02,
 * rim light biru dingin, hemat biaya (tanpa texture lookup).
 */

import * as THREE from "three";
import { VISUAL } from "../sim/Tuning";

/** Shader cel-shading: 3 band + rim light. */
export function makeToonMaterial(opts: {
  color: number;
  rimColor?: number;
  rimStrength?: number;
  emissive?: number;
  emissiveIntensity?: number;
  /** Tambahan untuk marka / lampu. */
  unlit?: boolean;
}): THREE.ShaderMaterial {
  const base = new THREE.Color(opts.color);
  const rim = new THREE.Color(opts.rimColor ?? VISUAL.RIM_COLOR);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uBase: { value: base },
      uRim: { value: rim },
      uRimStrength: { value: opts.rimStrength ?? VISUAL.RIM_STRENGTH },
      uEmissive: { value: new THREE.Color(opts.emissive ?? 0x000000) },
      uEmissiveIntensity: { value: opts.emissiveIntensity ?? 0 },
      uThresholdA: { value: VISUAL.CELL_THRESHOLD_A },
      uThresholdB: { value: VISUAL.CELL_THRESHOLD_B },
      uSoft: { value: VISUAL.CELL_SOFT },
      uUnlit: { value: opts.unlit ? 1 : 0 },
      uAmbient: { value: VISUAL.AMBIENT_INTENSITY },
      uMoonDir: { value: new THREE.Vector3(0.35, 0.82, 0.45).normalize() },
      uMoonColor: { value: new THREE.Color(VISUAL.MOON_COLOR) },
      uMoonIntensity: { value: VISUAL.MOON_INTENSITY },
      uFogColor: { value: new THREE.Color(VISUAL.FOG_COLOR) },
      uFogDensity: { value: VISUAL.FOG_DENSITY * 1000 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormalW;
      varying vec3 vViewDirW;
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewDirW = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBase;
      uniform vec3 uRim;
      uniform float uRimStrength;
      uniform vec3 uEmissive;
      uniform float uEmissiveIntensity;
      uniform float uThresholdA;
      uniform float uThresholdB;
      uniform float uSoft;
      uniform float uUnlit;
      uniform float uAmbient;
      uniform vec3 uMoonDir;
      uniform vec3 uMoonColor;
      uniform float uMoonIntensity;
      uniform vec3 uFogColor;
      uniform float uFogDensity;

      varying vec3 vNormalW;
      varying vec3 vViewDirW;
      varying vec3 vWorldPos;

      // ambang dengan soft edge sempit → band tegas tapi tidak jaggies
      float band(float x, float threshold) {
        return smoothstep(threshold - uSoft, threshold + uSoft, x);
      }

      void main() {
        if (uUnlit > 0.5) {
          gl_FragColor = vec4(uBase + uEmissive * uEmissiveIntensity, 1.0);
          return;
        }
        vec3 n = normalize(vNormalW);
        float ndl = max(0.0, dot(n, normalize(uMoonDir)));

        // 3 band diskret
        float b1 = band(ndl, uThresholdA);
        float b2 = band(ndl, uThresholdB);
        float shade = 0.34 + 0.30 * b1 + 0.36 * b2;

        vec3 lit = uBase * (uMoonColor * uMoonIntensity * shade + uAmbient);

        // rim light dingin dari belakang
        float rim = pow(1.0 - max(0.0, dot(n, normalize(vViewDirW))), 2.6);
        lit += uRim * rim * uRimStrength * 0.9;

        lit += uEmissive * uEmissiveIntensity;

        // fog eksponensial berbasis jarak kamera
        float dist = length(cameraPosition - vWorldPos);
        float fogFactor = 1.0 - exp(-pow(dist * uFogDensity / 1000.0 * 1.0, 2.0) * 2.0);
        lit = mix(lit, uFogColor, clamp(fogFactor, 0.0, 1.0));

        gl_FragColor = vec4(lit, 1.0);
      }
    `,
    depthWrite: true,
  });
  return material;
}

/** Pasang rim light beranimasi pada material toon (untuk lampu dinamis). */
export function setMaterialRim(mat: THREE.ShaderMaterial, color: THREE.Color, strength: number): void {
  mat.uniforms.uRim?.value.copy(color);
  mat.uniforms.uRimStrength!.value = strength;
}

/** Material outline: inverted hull, tebal konstan di screen-space. */
export function makeOutlineMaterial(thicknessPx = VISUAL.OUTLINE_PX): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uThickness: { value: thicknessPx },
      uColor: { value: new THREE.Color(0x05070d) },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
    },
    vertexShader: /* glsl */ `
      uniform float uThickness;
      uniform vec2 uResolution;
      void main() {
        vec3 n = normalize(normalMatrix * normal);
        vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        // geser 1.6px di screen space
        vec2 offset = n.xy * (uThickness * 2.0 / uResolution);
        clip.xy += offset * clip.w;
        gl_Position = clip;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 1.0);
      }
    `,
    side: THREE.BackSide,
  });
}

/**
 * Julukan outline: kembalikan klon mesh dengan material outline.
 * Dipakai untuk mobil & karakter (bukan jalan).
 */
export function outlineOf(mesh: THREE.Mesh, thickness = VISUAL.OUTLINE_PX): THREE.Mesh {
  const clone = new THREE.Mesh(mesh.geometry, makeOutlineMaterial(thickness));
  clone.position.copy(mesh.position);
  clone.rotation.copy(mesh.rotation);
  clone.scale.copy(mesh.scale);
  clone.renderOrder = (mesh.renderOrder ?? 0) - 1;
  return clone;
}
