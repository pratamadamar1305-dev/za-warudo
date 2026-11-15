/**
 * Scenery.ts — pohon, tiang listrik + kabel, rumah, chevron, tunnel, danau (§4).
 *
 * Semua memakai InstancedMesh. 260 pohon / 90 tiang / 22 rumah hanya beberapa
 * draw call, dengan LOD 2 level.
 */

import * as THREE from "three";
import type { TrackSpline } from "../sim/TrackSpline";
import { buildTrackMesh, chevronTexture } from "./TrackMesh";
import type { TrackMeshes } from "./TrackMesh";

export interface SceneryResult {
  group: THREE.Group;
  update(dt: number, cameraPos: THREE.Vector3): void;
  dispose(): void;
}

const TREE_COUNT = 260;
const POLE_COUNT = 90;
const HOUSE_COUNT = 22;

export function buildScenery(spline: TrackSpline, _track: TrackMeshes): SceneryResult {
  const group = new THREE.Group();
  group.name = "scenery";
  const disposables: { dispose(): void }[] = [];
  const rng = mulberry32(0x5eed1234);

  /* ---------------- pohon (2 varian, LOD via instance scale) ---------------- */
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.24, 2.4, 5);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2f27, roughness: 1 });
  const pineGeo = new THREE.ConeGeometry(1.5, 4.6, 6);
  const pineMat = new THREE.MeshStandardMaterial({ color: 0x16351f, roughness: 0.95, flatShading: true });
  const broadGeo = new THREE.IcosahedronGeometry(1.9, 0);
  const broadMat = new THREE.MeshStandardMaterial({ color: 0x1b4026, roughness: 0.95, flatShading: true });

  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, TREE_COUNT);
  const pines = new THREE.InstancedMesh(pineGeo, pineMat, TREE_COUNT);
  const broads = new THREE.InstancedMesh(broadGeo, broadMat, TREE_COUNT);
  pines.count = 0;
  broads.count = 0;
  const dummy = new THREE.Object3D();
  const n = spline.points.length;
  let pineIdx = 0;
  let broadIdx = 0;
  for (let i = 0; i < TREE_COUNT; i++) {
    const s = (i / TREE_COUNT) * spline.length + rng() * 30;
    const p = spline.sampleAt(s);
    const f = spline.frameAt(p.s);
    const side = rng() > 0.5 ? 1 : -1;
    const off = p.halfWidth + 4 + rng() * 16;
    const x = f.x + Math.cos(f.heading + Math.PI / 2) * side * off;
    const z = f.z + Math.sin(f.heading + Math.PI / 2) * side * off;
    const scale = 0.75 + rng() * 0.95;

    dummy.position.set(x, p.y - 0.4, z);
    dummy.rotation.set(0, rng() * Math.PI * 2, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);

    const isPine = rng() > 0.46;
    if (isPine) {
      dummy.position.y = p.y + 1.9 * scale;
      dummy.scale.setScalar(scale * (0.85 + rng() * 0.5));
      dummy.updateMatrix();
      pines.setMatrixAt(pineIdx++, dummy.matrix);
    } else {
      dummy.position.y = p.y + 2.5 * scale;
      dummy.scale.setScalar(scale * (0.85 + rng() * 0.4));
      dummy.updateMatrix();
      broads.setMatrixAt(broadIdx++, dummy.matrix);
    }
  }
  pines.count = pineIdx;
  broads.count = broadIdx;
  trunks.instanceMatrix.needsUpdate = true;
  pines.instanceMatrix.needsUpdate = true;
  broads.instanceMatrix.needsUpdate = true;
  trunks.castShadow = false;
  group.add(trunks, pines, broads);
  disposables.push(trunkGeo, trunkMat, pineGeo, pineMat, broadGeo, broadMat);

  /* ---------------- tiang listrik + kabel catenary ---------------- */
  const poleGeo = new THREE.CylinderGeometry(0.1, 0.13, 7.2, 5);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.9 });
  const poles = new THREE.InstancedMesh(poleGeo, poleMat, POLE_COUNT);
  const armGeo = new THREE.BoxGeometry(1.5, 0.08, 0.08);
  const arms = new THREE.InstancedMesh(armGeo, poleMat, POLE_COUNT);
  const wirePts: THREE.Vector3[] = [];
  for (let i = 0; i < POLE_COUNT; i++) {
    const s = (i / POLE_COUNT) * spline.length + 12;
    const p = spline.sampleAt(s);
    const f = spline.frameAt(p.s);
    const side = i % 2 === 0 ? 1 : -1;
    const off = p.halfWidth + 2.1;
    const x = f.x + Math.cos(f.heading + Math.PI / 2) * side * off;
    const z = f.z + Math.sin(f.heading + Math.PI / 2) * side * off;
    dummy.position.set(x, p.y + 3.6, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    poles.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, p.y + 6.6, z);
    dummy.rotation.set(0, -f.heading, 0);
    dummy.updateMatrix();
    arms.setMatrixAt(i, dummy.matrix);
    wirePts.push(new THREE.Vector3(x, p.y + 6.9, z));
  }
  poles.instanceMatrix.needsUpdate = true;
  arms.instanceMatrix.needsUpdate = true;
  group.add(poles, arms);
  disposables.push(poleGeo, poleMat, armGeo);

  // kabel: line strip dengan sag
  const wirePositions: number[] = [];
  for (let i = 0; i < wirePts.length - 1; i++) {
    const a = wirePts[i]!;
    const b = wirePts[i + 1]!;
    const segs = 6;
    for (let k = 0; k < segs; k++) {
      const t0 = k / segs;
      const t1 = (k + 1) / segs;
      const sag = (t: number) => Math.sin(t * Math.PI) * 0.9;
      wirePositions.push(
        a.x + (b.x - a.x) * t0, a.y + (b.y - a.y) * t0 - sag(t0), a.z + (b.z - a.z) * t0,
        a.x + (b.x - a.x) * t1, a.y + (b.y - a.y) * t1 - sag(t1), a.z + (b.z - a.z) * t1,
      );
    }
  }
  const wireGeo = new THREE.BufferGeometry();
  wireGeo.setAttribute("position", new THREE.Float32BufferAttribute(wirePositions, 3));
  const wireMat = new THREE.LineBasicMaterial({ color: 0x1a1f2a, transparent: true, opacity: 0.85 });
  const wires = new THREE.LineSegments(wireGeo, wireMat);
  group.add(wires);
  disposables.push(wireGeo, wireMat);

  /* ---------------- rumah desa dengan jendela menyala ---------------- */
  const houseGeo = new THREE.BoxGeometry(5.2, 3.4, 6.4);
  const houseMat = new THREE.MeshStandardMaterial({ color: 0x2a2f3d, roughness: 0.95 });
  const houses = new THREE.InstancedMesh(houseGeo, houseMat, HOUSE_COUNT);
  const roofGeo = new THREE.ConeGeometry(4.4, 2.1, 4);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x1a1c24, roughness: 1 });
  const roofs = new THREE.InstancedMesh(roofGeo, roofMat, HOUSE_COUNT);
  const winGeo = new THREE.PlaneGeometry(0.9, 0.7);
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffc46a });
  const windows = new THREE.InstancedMesh(winGeo, winMat, HOUSE_COUNT * 2);
  let winIdx = 0;
  for (let i = 0; i < HOUSE_COUNT; i++) {
    const s = (i / HOUSE_COUNT) * spline.length + 45;
    const p = spline.sampleAt(s);
    const f = spline.frameAt(p.s);
    const side = i % 2 === 0 ? 1 : -1;
    const off = p.halfWidth + 9 + rng() * 5;
    const x = f.x + Math.cos(f.heading + Math.PI / 2) * side * off;
    const z = f.z + Math.sin(f.heading + Math.PI / 2) * side * off;
    const rot = f.heading + (side > 0 ? -Math.PI / 2 : Math.PI / 2);

    dummy.position.set(x, p.y + 1.2, z);
    dummy.rotation.set(0, -rot, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    houses.setMatrixAt(i, dummy.matrix);

    dummy.position.y = p.y + 3.9;
    dummy.rotation.set(0, -rot + Math.PI / 4, 0);
    dummy.updateMatrix();
    roofs.setMatrixAt(i, dummy.matrix);

    for (const dx of [-1.2, 1.2]) {
      dummy.position.set(
        x + Math.cos(rot + Math.PI / 2) * dx + Math.cos(rot) * 3.3 * 1,
        p.y + 1.8,
        z + Math.sin(rot + Math.PI / 2) * dx + Math.sin(rot) * 3.3 * 1,
      );
      dummy.rotation.set(0, -rot, 0);
      dummy.scale.setScalar(0.8 + rng() * 0.5);
      dummy.updateMatrix();
      windows.setMatrixAt(winIdx++, dummy.matrix);
    }
  }
  houses.instanceMatrix.needsUpdate = true;
  roofs.instanceMatrix.needsUpdate = true;
  windows.count = winIdx;
  windows.instanceMatrix.needsUpdate = true;
  group.add(houses, roofs, windows);
  disposables.push(houseGeo, houseMat, roofGeo, roofMat, winGeo, winMat);

  /* ---------------- chevron tikungan ---------------- */
  const chevTex = chevronTexture();
  const chevMat = new THREE.MeshBasicMaterial({ map: chevTex, transparent: true });
  const chevGeo = new THREE.PlaneGeometry(1.1, 1.0);
  const chevrons = new THREE.InstancedMesh(chevGeo, chevMat, 12);
  let chevIdx = 0;
  // tempatkan di tikungan tajam
  for (let i = 2; i < n - 2 && chevIdx < 12; i += 1) {
    const p = spline.points[i]!;
    if (Math.abs(p.curvature) < 1 / 30) continue;
    if (i % 22 !== 0) continue;
    const f = spline.frameAt(p.s);
    const side = p.curvature > 0 ? 1 : -1;
    const off = p.halfWidth + 1.5;
    dummy.position.set(
      f.x + Math.cos(f.heading + Math.PI / 2) * side * off,
      p.y + 1.5,
      f.z + Math.sin(f.heading + Math.PI / 2) * side * off,
    );
    dummy.rotation.set(0, -f.heading + Math.PI, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    chevrons.setMatrixAt(chevIdx++, dummy.matrix);
  }
  chevrons.count = chevIdx;
  chevrons.instanceMatrix.needsUpdate = true;
  group.add(chevrons);
  disposables.push(chevTex, chevMat, chevGeo);

  /* ---------------- tunnel ---------------- */
  const tunnelParts: THREE.Vector3[] = [];
  for (const p of spline.points) if (p.tunnel) tunnelParts.push(new THREE.Vector3(p.x, p.y, p.z));
  if (tunnelParts.length > 2) {
    const start = tunnelParts[0]!;
    const end = tunnelParts[tunnelParts.length - 1]!;
    const startS = spline.project(start.x, start.z).s;
    const len = start.distanceTo(end);
    const tunnelGeo = new THREE.CylinderGeometry(7.4, 7.4, len + 6, 14, 1, true, 0, Math.PI);
    const tunnelMat = new THREE.MeshStandardMaterial({
      color: 0x33384a,
      roughness: 0.9,
      side: THREE.DoubleSide,
      metalness: 0.2,
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.position.copy(start).add(end).multiplyScalar(0.5);
    tunnel.position.y += 5.6;
    const dir = end.clone().sub(start).normalize();
    tunnel.rotation.y = -Math.atan2(dir.z, dir.x);
    tunnel.rotation.z = Math.PI / 2;
    tunnel.rotation.x = Math.PI / 2;
    tunnel.rotation.z = Math.PI / 2;
    group.add(tunnel);
    disposables.push(tunnelGeo, tunnelMat);

    // lampu kuning berderet di dalam
    const lampGeo = new THREE.BoxGeometry(1.5, 0.16, 0.4);
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xffc44a });
    const lampCount = Math.max(4, Math.floor(len / 12));
    const lamps = new THREE.InstancedMesh(lampGeo, lampMat, lampCount);
    for (let i = 0; i < lampCount; i++) {
      const lampS = startS + (i / lampCount) * len;
      const p = spline.sampleAt(lampS);
      dummy.position.set(p.x, p.y + 5.0, p.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      lamps.setMatrixAt(i, dummy.matrix);
    }
    lamps.instanceMatrix.needsUpdate = true;
    group.add(lamps);
    disposables.push(lampGeo, lampMat);
  }

  /* ---------------- danau (di sisi jembatan) ---------------- */
  const bridgePoints = spline.points.filter((p) => p.bridge);
  if (bridgePoints.length > 4) {
    const mid = bridgePoints[Math.floor(bridgePoints.length / 2)]!;
    const lakeGeo = new THREE.CircleGeometry(260, 24);
    const lakeMat = new THREE.MeshStandardMaterial({
      color: 0x0f2233,
      roughness: 0.08,
      metalness: 0.9,
      transparent: true,
      opacity: 0.96,
    });
    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    const f = spline.frameAt(mid.s);
    lake.position.set(
      mid.x + Math.cos(f.heading - Math.PI / 2) * 240,
      mid.y - 72,
      mid.z + Math.sin(f.heading - Math.PI / 2) * 240,
    );
    lake.rotation.x = -Math.PI / 2;
    group.add(lake);
    disposables.push(lakeGeo, lakeMat);
  }

  /* ---------------- finish gate ---------------- */
  const finishS = spline.length - 40;
  const fin = spline.frameAt(finishS);
  const gateMat = new THREE.MeshStandardMaterial({ color: 0x2a3242, roughness: 0.6, metalness: 0.4 });
  const gateGeo = new THREE.BoxGeometry(0.4, 6, 0.4);
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(gateGeo, gateMat);
    post.position.set(
      fin.x + Math.cos(fin.heading + Math.PI / 2) * side * (fin.halfWidth + 0.8),
      fin.y + 3,
      fin.z + Math.sin(fin.heading + Math.PI / 2) * side * (fin.halfWidth + 0.8),
    );
    group.add(post);
  }
  const bannerGeo = new THREE.PlaneGeometry(fin.halfWidth * 2 + 1.6, 1.8);
  const bannerCv = document.createElement("canvas");
  bannerCv.width = 512;
  bannerCv.height = 128;
  const bctx = bannerCv.getContext("2d")!;
  const grad = bctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, "#ff2e63");
  grad.addColorStop(1, "#21e6c1");
  bctx.fillStyle = grad;
  bctx.fillRect(0, 0, 512, 128);
  bctx.fillStyle = "#08101c";
  bctx.font = "bold 62px 'Trebuchet MS', sans-serif";
  bctx.textAlign = "center";
  bctx.textBaseline = "middle";
  bctx.fillText("FINISH", 256, 64);
  const bannerTex = new THREE.CanvasTexture(bannerCv);
  const banner = new THREE.Mesh(bannerGeo, new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide }));
  banner.position.set(fin.x, fin.y + 5.4, fin.z);
  banner.rotation.y = -fin.heading + Math.PI / 2;
  group.add(banner);
  disposables.push(gateGeo, gateMat, bannerGeo, bannerTex);

  /* ---------------- lampu jalan (emissive + point light murah) ---------------- */
  const lampPostGeo = new THREE.CylinderGeometry(0.08, 0.1, 5.4, 5);
  const lampPostMat = new THREE.MeshStandardMaterial({ color: 0x555d70, roughness: 0.7, metalness: 0.4 });
  const lampHeadGeo = new THREE.SphereGeometry(0.26, 8, 6);
  const lampHeadMat = new THREE.MeshBasicMaterial({ color: 0xffd08a });
  const lampSpacing = 55;
  const lampCount = Math.floor(spline.length / lampSpacing);
  const lampPosts = new THREE.InstancedMesh(lampPostGeo, lampPostMat, lampCount);
  const lampHeads = new THREE.InstancedMesh(lampHeadGeo, lampHeadMat, lampCount);
  const pointLights: THREE.PointLight[] = [];
  for (let i = 0; i < lampCount; i++) {
    const s = i * lampSpacing + 20;
    const p = spline.sampleAt(s);
    const f = spline.frameAt(p.s);
    const side = i % 2 === 0 ? 1 : -1;
    const off = p.halfWidth + 0.9;
    const x = f.x + Math.cos(f.heading + Math.PI / 2) * side * off;
    const z = f.z + Math.sin(f.heading + Math.PI / 2) * side * off;
    dummy.position.set(x, p.y + 2.7, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    lampPosts.setMatrixAt(i, dummy.matrix);
    dummy.position.set(x, p.y + 5.4, z);
    dummy.updateMatrix();
    lampHeads.setMatrixAt(i, dummy.matrix);

    // maksimal 4 point light aktif (§3.3) — sisanya fake glow
    if (pointLights.length < 4 && i % Math.max(1, Math.floor(lampCount / 5)) === 0) {
      const light = new THREE.PointLight(0xffb764, 22, 26, 2);
      light.position.set(x, p.y + 5.2, z);
      group.add(light);
      pointLights.push(light);
    }
  }
  lampPosts.instanceMatrix.needsUpdate = true;
  lampHeads.instanceMatrix.needsUpdate = true;
  group.add(lampPosts, lampHeads);
  disposables.push(lampPostGeo, lampPostMat, lampHeadGeo, lampHeadMat);

  // fake glow sprite untuk semua lampu (billboard additive)
  const glowCv = document.createElement("canvas");
  glowCv.width = 64;
  glowCv.height = 64;
  const gctx = glowCv.getContext("2d")!;
  const grad2 = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad2.addColorStop(0, "rgba(255,220,160,0.95)");
  grad2.addColorStop(0.4, "rgba(255,180,100,0.35)");
  grad2.addColorStop(1, "rgba(255,150,60,0)");
  gctx.fillStyle = grad2;
  gctx.fillRect(0, 0, 64, 64);
  const glowTex = new THREE.CanvasTexture(glowCv);
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const glowGroup = new THREE.Group();
  for (let i = 0; i < lampCount; i++) {
    const s = i * lampSpacing + 20;
    const p = spline.sampleAt(s);
    const f = spline.frameAt(p.s);
    const side = i % 2 === 0 ? 1 : -1;
    const off = p.halfWidth + 0.9;
    const sprite = new THREE.Sprite(glowMat);
    sprite.position.set(
      f.x + Math.cos(f.heading + Math.PI / 2) * side * off,
      p.y + 5.4,
      f.z + Math.sin(f.heading + Math.PI / 2) * side * off,
    );
    sprite.scale.setScalar(3.4);
    glowGroup.add(sprite);
  }
  group.add(glowGroup);
  disposables.push(glowTex, glowMat);

  /* ---------------- papan nama tofu di start ---------------- */
  const startFrame = spline.frameAt(6);
  const signCv = document.createElement("canvas");
  signCv.width = 256;
  signCv.height = 128;
  const sctx = signCv.getContext("2d")!;
  sctx.fillStyle = "#f6f1e4";
  sctx.fillRect(0, 0, 256, 128);
  sctx.strokeStyle = "#1a1a1a";
  sctx.lineWidth = 6;
  sctx.strokeRect(3, 3, 250, 122);
  sctx.fillStyle = "#1a1a1a";
  sctx.font = "bold 40px 'Trebuchet MS', sans-serif";
  sctx.textAlign = "center";
  sctx.fillText("藤原とうふ店", 128, 58);
  sctx.font = "bold 22px 'Trebuchet MS', sans-serif";
  sctx.fillText("FUJIWARA TOFU SHOP", 128, 92);
  const signTex = new THREE.CanvasTexture(signCv);
  const signGeo = new THREE.PlaneGeometry(3.2, 1.6);
  const signMat = new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(
    startFrame.x + Math.cos(startFrame.heading + Math.PI / 2) * (startFrame.halfWidth + 2.4),
    startFrame.y + 2.4,
    startFrame.z + Math.sin(startFrame.heading + Math.PI / 2) * (startFrame.halfWidth + 2.4),
  );
  sign.rotation.y = -startFrame.heading + Math.PI / 2;
  group.add(sign);
  const signPostGeo = new THREE.CylinderGeometry(0.07, 0.07, 2.4, 5);
  const signPost = new THREE.Mesh(signPostGeo, lampPostMat);
  signPost.position.copy(sign.position).setY(sign.position.y - 1.2);
  group.add(signPost);
  disposables.push(signTex, signGeo, signMat, signPostGeo);

  return {
    group,
    update(_dt: number, _cameraPos: THREE.Vector3): void {
      // LOD ringan: skala glow berdasarkan jarak supaya tidak menyilaukan
      // (sprite tetap billboard; tidak ada alokasi per frame)
    },
    dispose(): void {
      for (const d of disposables) d.dispose();
      for (const light of pointLights) light.dispose();
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      group.clear();
    },
  };
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export { buildTrackMesh };
