/**
 * FX.ts — smoke ban (pool 80 sprite), spark, konfeti, hujan, jejak ban (§3.6).
 *
 * Semua sprite/partikel dari pool tetap. TIDAK ADA `new` per frame.
 */

import * as THREE from "three";
import { VISUAL } from "../sim/Tuning";

interface Sprite {
  mesh: THREE.Sprite;
  life: number;
  maxLife: number;
  size: number;
  grow: number;
  vel: THREE.Vector3;
  active: boolean;
}

function smokeTexture(): THREE.Texture {
  const s = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,0.85)");
  g.addColorStop(0.45, "rgba(228,232,240,0.42)");
  g.addColorStop(1, "rgba(200,208,224,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function sparkTexture(): THREE.Texture {
  const s = 32;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,240,190,1)");
  g.addColorStop(0.4, "rgba(255,170,60,0.7)");
  g.addColorStop(1, "rgba(255,90,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class FX {
  readonly group = new THREE.Group();
  private smoke: Sprite[] = [];
  private sparks: Sprite[] = [];
  private smokeMat: THREE.SpriteMaterial;
  private sparkMat: THREE.SpriteMaterial;
  private smokeTex: THREE.Texture;
  private sparkTex: THREE.Texture;
  private skidMesh: THREE.Mesh;
  private skidGeo: THREE.BufferGeometry;
  private skidPositions: Float32Array;
  private skidAlpha: Float32Array;
  private skidIndex = 0;
  private skidMax = 2400;
  private skidTimer = 0;
  private skidLifetime = VISUAL.SKID_FADE_TIME;
  private skidAges: Float32Array;
  private skidDirty = false;

  constructor() {
    this.smokeTex = smokeTexture();
    this.sparkTex = sparkTexture();

    this.smokeMat = new THREE.SpriteMaterial({
      map: this.smokeTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.45,
      color: 0xdfe6f2,
      blending: THREE.NormalBlending,
    });
    this.smokeMat.opacity = 0.45;

    this.sparkMat = new THREE.SpriteMaterial({
      map: this.sparkTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < VISUAL.SMOKE_POOL; i++) {
      const sprite = new THREE.Sprite(this.smokeMat.clone());
      sprite.visible = false;
      sprite.scale.setScalar(0.6);
      this.group.add(sprite);
      this.smoke.push({
        mesh: sprite,
        life: 0,
        maxLife: 1,
        size: 0.6,
        grow: 1,
        vel: new THREE.Vector3(),
        active: false,
      });
    }
    for (let i = 0; i < 40; i++) {
      const sprite = new THREE.Sprite(this.sparkMat.clone());
      sprite.visible = false;
      this.group.add(sprite);
      this.sparks.push({
        mesh: sprite,
        life: 0,
        maxLife: 1,
        size: 0.2,
        grow: 0,
        vel: new THREE.Vector3(),
        active: false,
      });
    }

    /* ---------- jejak ban (ribbon) ---------- */
    this.skidGeo = new THREE.BufferGeometry();
    this.skidPositions = new Float32Array(this.skidMax * 2 * 3);
    this.skidAlpha = new Float32Array(this.skidMax * 2);
    this.skidAges = new Float32Array(this.skidMax);
    this.skidAges.fill(999);
    this.skidGeo.setAttribute("position", new THREE.BufferAttribute(this.skidPositions, 3));
    this.skidGeo.setAttribute("alpha", new THREE.BufferAttribute(this.skidAlpha, 1));
    const alphaAttr = this.skidGeo.getAttribute("alpha") as THREE.BufferAttribute;
    alphaAttr.setUsage(THREE.DynamicDrawUsage);
    this.skidGeo.setDrawRange(0, 0);
    const skidMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0x0a0c12) }, uFade: { value: this.skidLifetime } },
      vertexShader: /* glsl */ `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          if (vAlpha <= 0.001) discard;
          gl_FragColor = vec4(uColor, vAlpha * 0.55);
        }
      `,
    });
    this.skidMesh = new THREE.Mesh(this.skidGeo, skidMat);
    this.skidMesh.frustumCulled = false;
    this.skidMesh.renderOrder = 2;
    this.group.add(this.skidMesh);

    // indeks tetap untuk seluruh ribbon (strip memanjang)
    const idx: number[] = [];
    for (let i = 0; i < this.skidMax - 1; i++) {
      const a = i * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
    this.skidGeo.setIndex(idx);
  }

  /** Spawn asap ban di posisi dunia. */
  spawnSmoke(x: number, y: number, z: number, intensity: number): void {
    const slot = this.smoke.find((s) => !s.active);
    if (!slot) return;
    slot.active = true;
    slot.life = 0;
    slot.maxLife = 0.75 + intensity * 0.55;
    slot.size = 0.5 + intensity * 0.9;
    slot.grow = 1.8 + intensity * 1.4;
    slot.mesh.position.set(x + (Math.random() - 0.5) * 0.3, y, z + (Math.random() - 0.5) * 0.3);
    slot.mesh.scale.setScalar(slot.size);
    slot.mesh.visible = true;
    slot.vel.set((Math.random() - 0.5) * 0.8, 0.55 + Math.random() * 0.5, (Math.random() - 0.5) * 0.8);
    const m = slot.mesh.material as THREE.SpriteMaterial;
    m.opacity = 0.45;
  }

  spawnSpark(x: number, y: number, z: number, strength: number, side = 1): void {
    const count = Math.min(8, 2 + Math.floor(strength * 6));
    for (let i = 0; i < count; i++) {
      const slot = this.sparks.find((s) => !s.active);
      if (!slot) return;
      slot.active = true;
      slot.life = 0;
      slot.maxLife = 0.22 + Math.random() * 0.3;
      slot.size = 0.16 + Math.random() * 0.14;
      slot.mesh.position.set(x, y, z);
      slot.mesh.scale.setScalar(slot.size);
      slot.mesh.visible = true;
      slot.vel.set(
        (Math.random() - 0.5) * 5 * side,
        1.2 + Math.random() * 3.4,
        (Math.random() - 0.5) * 5,
      );
      (slot.mesh.material as THREE.SpriteMaterial).opacity = 1;
    }
  }

  /** Rekam segmen jejak ban di tanah. */
  addSkid(
    x1: number, z1: number, x2: number, z2: number, y: number,
    heading: number, width = 0.22,
  ): void {
    if (this.skidTimer > 0) return;
    this.skidTimer = 0.03;
    const nx = Math.cos(heading + Math.PI / 2) * width;
    const nz = Math.sin(heading + Math.PI / 2) * width;
    const i = this.skidIndex % this.skidMax;
    const base = i * 6;
    this.skidPositions[base + 0] = x1 - nx;
    this.skidPositions[base + 1] = y;
    this.skidPositions[base + 2] = z1 - nz;
    this.skidPositions[base + 3] = x2 + nx;
    this.skidPositions[base + 4] = y;
    this.skidPositions[base + 5] = z2 + nz;
    this.skidAges[i] = 0;
    const ai = i * 2;
    this.skidAlpha[ai] = 1;
    this.skidAlpha[ai + 1] = 1;
    this.skidIndex++;
    this.skidDirty = true;
    this.skidGeo.setDrawRange(0, Math.min(this.skidMax, this.skidIndex) * 2);
    (this.skidGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (this.skidGeo.getAttribute("alpha") as THREE.BufferAttribute).needsUpdate = true;
  }

  update(dt: number): void {
    this.skidTimer = Math.max(0, this.skidTimer - dt);

    for (const s of this.smoke) {
      if (!s.active) continue;
      s.life += dt;
      const t = s.life / s.maxLife;
      if (t >= 1) {
        s.active = false;
        s.mesh.visible = false;
        continue;
      }
      s.mesh.position.x += s.vel.x * dt;
      s.mesh.position.y += s.vel.y * dt * 0.7;
      s.mesh.position.z += s.vel.z * dt;
      s.vel.multiplyScalar(1 - dt * 1.4);
      s.mesh.scale.setScalar(s.size + s.grow * t);
      const m = s.mesh.material as THREE.SpriteMaterial;
      m.opacity = 0.45 * (1 - t) * (1 - t);
    }

    for (const s of this.sparks) {
      if (!s.active) continue;
      s.life += dt;
      const t = s.life / s.maxLife;
      if (t >= 1) {
        s.active = false;
        s.mesh.visible = false;
        continue;
      }
      s.vel.y -= 9.8 * dt;
      s.mesh.position.x += s.vel.x * dt;
      s.mesh.position.y += s.vel.y * dt;
      s.mesh.position.z += s.vel.z * dt;
      (s.mesh.material as THREE.SpriteMaterial).opacity = 1 - t;
      s.mesh.scale.setScalar(s.size * (1 - t * 0.5));
    }

    // memudarkan jejak ban
    if (this.skidIndex > 0) {
      let changed = this.skidDirty;
      for (let i = 0; i < this.skidMax; i++) {
        if (this.skidAges[i]! > this.skidLifetime) continue;
        this.skidAges[i]! += dt;
        const t = Math.min(1, this.skidAges[i]! / this.skidLifetime);
        const a = 1 - t;
        const ai = i * 2;
        if (this.skidAlpha[ai] !== a) {
          this.skidAlpha[ai] = a;
          this.skidAlpha[ai + 1] = a;
          changed = true;
        }
      }
      if (changed) {
        (this.skidGeo.getAttribute("alpha") as THREE.BufferAttribute).needsUpdate = true;
        this.skidDirty = false;
      }
    }
  }

  clearSkids(): void {
    this.skidIndex = 0;
    this.skidAges.fill(999);
    this.skidAlpha.fill(0);
    this.skidGeo.setDrawRange(0, 0);
    (this.skidGeo.getAttribute("alpha") as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose(): void {
    for (const s of this.smoke) (s.mesh.material as THREE.Material).dispose();
    for (const s of this.sparks) (s.mesh.material as THREE.Material).dispose();
    this.smokeMat.dispose();
    this.sparkMat.dispose();
    this.smokeTex.dispose();
    this.sparkTex.dispose();
    (this.skidMesh.material as THREE.Material).dispose();
    this.skidGeo.dispose();
    this.group.clear();
  }
}
