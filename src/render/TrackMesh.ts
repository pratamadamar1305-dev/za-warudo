/**
 * TrackMesh.ts — generasi jalan dari spline (§4).
 *
 * Semua geometri dibangun dari buffer (bukan scene.add per segmen), sehingga
 * 5 km jalan hanya = beberapa mesh. Road, marka, gutter, embankment, dan
 * guardrail semua prosedural.
 */

import * as THREE from "three";
import type { TrackSpline } from "../sim/TrackSpline";
import { VISUAL } from "../sim/Tuning";

export interface TrackMeshes {
  group: THREE.Group;
  road: THREE.Mesh;
  lines: THREE.Mesh;
  gutter: THREE.Mesh;
  embankment: THREE.Mesh;
  guardrails: THREE.InstancedMesh;
  /** Untuk dispose(). */
  dispose(): void;
}

/** Tekstur marka jalan dibuat dari canvas 2D (nol aset eksternal). */
function makeRoadTexture(): THREE.Texture {
  const size = 512;
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const ctx = cv.getContext("2d")!;
  // aspal dasar
  ctx.fillStyle = "#1a1f2a";
  ctx.fillRect(0, 0, size, size);
  // grain aspal
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 26;
    img.data[i] = Math.max(0, Math.min(255, img.data[i]! + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1]! + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2]! + n));
  }
  ctx.putImageData(img, 0, 0);
  // retakan
  ctx.strokeStyle = "rgba(10,12,18,0.55)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    let x = Math.random() * size;
    let y = Math.random() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 5; s++) {
      x += (Math.random() - 0.5) * 60;
      y += (Math.random() - 0.5) * 60;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // patch aspal lebih gelap
  ctx.fillStyle = "rgba(14,17,24,0.65)";
  for (let i = 0; i < 8; i++) {
    const w = 40 + Math.random() * 90;
    const h = 30 + Math.random() * 70;
    ctx.fillRect(Math.random() * size, Math.random() * size, w, h);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeMarkTexture(): THREE.Texture {
  const w = 64;
  const h = 1024;
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  // marka tepi putih putus-putus
  ctx.fillStyle = "rgba(235,240,255,0.92)";
  for (let y = 0; y < h; y += 120) {
    ctx.fillRect(4, y, 8, 70);
    ctx.fillRect(w - 12, y, 8, 70);
  }
  // marka tengah kuning putus-putus
  ctx.fillStyle = "rgba(255,196,64,0.9)";
  for (let y = 0; y < h; y += 140) {
    ctx.fillRect(w / 2 - 3, y, 6, 80);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildTrackMesh(spline: TrackSpline): TrackMeshes {
  const group = new THREE.Group();
  group.name = "track";

  const n = spline.points.length;
  const roadPositions = new Float32Array(n * 2 * 3);
  const roadNormals = new Float32Array(n * 2 * 3);
  const roadUvs = new Float32Array(n * 2 * 2);
  const linePositions = new Float32Array(n * 2 * 3);
  const lineUvs = new Float32Array(n * 2 * 2);
  const gutterPositions = new Float32Array(n * 2 * 3);
  const embankPositions = new Float32Array(n * 2 * 2 * 3);

  const halfW = new Float32Array(n);
  const headings = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = spline.points[i]!;
    const b = spline.points[Math.min(n - 1, i + 1)]!;
    headings[i] = Math.atan2(b.z - a.z, b.x - a.x);
    halfW[i] = a.halfWidth;
  }

  let vAccum = 0;
  for (let i = 0; i < n; i++) {
    const p = spline.points[i]!;
    const h = headings[i]!;
    const nx = Math.cos(h + Math.PI / 2);
    const nz = Math.sin(h + Math.PI / 2);
    const w = halfW[i]!;
    const i2 = i * 2;

    if (i > 0) vAccum += Math.hypot(p.x - spline.points[i - 1]!.x, p.z - spline.points[i - 1]!.z);

    // road: tepi kiri & kanan
    roadPositions[i2 * 3 + 0] = p.x - nx * w;
    roadPositions[i2 * 3 + 1] = p.y;
    roadPositions[i2 * 3 + 2] = p.z - nz * w;
    roadPositions[(i2 + 1) * 3 + 0] = p.x + nx * w;
    roadPositions[(i2 + 1) * 3 + 1] = p.y;
    roadPositions[(i2 + 1) * 3 + 2] = p.z + nz * w;

    // normal menghadap atas (jalan sedikit mengikuti grade, tapi cukup)
    roadNormals[i2 * 3 + 1] = 1;
    roadNormals[(i2 + 1) * 3 + 1] = 1;

    roadUvs[i2 * 2 + 0] = 0;
    roadUvs[i2 * 2 + 1] = vAccum / 8;
    roadUvs[(i2 + 1) * 2 + 0] = 1;
    roadUvs[(i2 + 1) * 2 + 1] = vAccum / 8;

    // marka: hanya di jalan utama (bukan gutter) — pakai lebar dalam
    const lw = w - 0.35;
    linePositions[i2 * 3 + 0] = p.x - nx * lw;
    linePositions[i2 * 3 + 1] = p.y + 0.02;
    linePositions[i2 * 3 + 2] = p.z - nz * lw;
    linePositions[(i2 + 1) * 3 + 0] = p.x + nx * (w - 0.05);
    linePositions[(i2 + 1) * 3 + 1] = p.y + 0.02;
    linePositions[(i2 + 1) * 3 + 2] = p.z + nz * (w - 0.05);
    lineUvs[i2 * 2 + 0] = 0;
    lineUvs[i2 * 2 + 1] = vAccum / 10;
    lineUvs[(i2 + 1) * 2 + 0] = 1;
    lineUvs[(i2 + 1) * 2 + 1] = vAccum / 10;

    // gutter: pita sempit di sisi dalam
    const gs = p.gutterSide || 1;
    const gx = p.x + nx * gs * (w + 0.22);
    const gz = p.z + nz * gs * (w + 0.22);
    gutterPositions[i2 * 3 + 0] = gx - nx * gs * 0.24;
    gutterPositions[i2 * 3 + 1] = p.y - (p.gutter > 0 ? 0.18 : 0.0);
    gutterPositions[i2 * 3 + 2] = gz - nz * gs * 0.24;
    gutterPositions[(i2 + 1) * 3 + 0] = gx + nx * gs * 0.24;
    gutterPositions[(i2 + 1) * 3 + 1] = p.y - (p.gutter > 0 ? 0.18 : 0.0);
    gutterPositions[(i2 + 1) * 3 + 2] = gz + nz * gs * 0.24;

    // embankment: turun 1.6 m dari tepi jalan
    const b2 = i * 4;
    embankPositions[b2 * 3 + 0] = p.x - nx * w;
    embankPositions[b2 * 3 + 1] = p.y;
    embankPositions[b2 * 3 + 2] = p.z - nz * w;
    embankPositions[(b2 + 1) * 3 + 0] = p.x - nx * (w + 2.4);
    embankPositions[(b2 + 1) * 3 + 1] = p.y - 1.7;
    embankPositions[(b2 + 1) * 3 + 2] = p.z - nz * (w + 2.4);
    embankPositions[(b2 + 2) * 3 + 0] = p.x + nx * w;
    embankPositions[(b2 + 2) * 3 + 1] = p.y;
    embankPositions[(b2 + 2) * 3 + 2] = p.z + nz * w;
    embankPositions[(b2 + 3) * 3 + 0] = p.x + nx * (w + 2.4);
    embankPositions[(b2 + 3) * 3 + 1] = p.y - 1.7;
    embankPositions[(b2 + 3) * 3 + 2] = p.z + nz * (w + 2.4);
  }

  const roadGeo = new THREE.BufferGeometry();
  roadGeo.setAttribute("position", new THREE.BufferAttribute(roadPositions, 3));
  roadGeo.setAttribute("normal", new THREE.BufferAttribute(roadNormals, 3));
  roadGeo.setAttribute("uv", new THREE.BufferAttribute(roadUvs, 2));
  roadGeo.setIndex(buildStripIndices(n));
  roadGeo.computeVertexNormals();

  const roadTex = makeRoadTexture();
  const roadMat = new THREE.MeshStandardMaterial({
    map: roadTex,
    color: 0xbfc9db,
    roughness: 0.72,
    metalness: 0.06,
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.receiveShadow = true;
  road.name = "road";
  group.add(road);

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute("uv", new THREE.BufferAttribute(lineUvs, 2));
  lineGeo.setIndex(buildStripIndices(n));
  lineGeo.computeVertexNormals();
  const lineTex = makeMarkTexture();
  const lineMat = new THREE.MeshBasicMaterial({
    map: lineTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.85,
  });
  const lines = new THREE.Mesh(lineGeo, lineMat);
  lines.renderOrder = 1;
  lines.name = "lines";
  group.add(lines);

  const gutterGeo = new THREE.BufferGeometry();
  gutterGeo.setAttribute("position", new THREE.BufferAttribute(gutterPositions, 3));
  gutterGeo.setIndex(buildStripIndices(n));
  gutterGeo.computeVertexNormals();
  const gutterMat = new THREE.MeshStandardMaterial({
    color: 0x3a4152,
    roughness: 0.85,
    metalness: 0.25,
    side: THREE.DoubleSide,
  });
  const gutter = new THREE.Mesh(gutterGeo, gutterMat);
  gutter.name = "gutter";
  group.add(gutter);

  const embankGeo = new THREE.BufferGeometry();
  embankGeo.setAttribute("position", new THREE.BufferAttribute(embankPositions, 3));
  embankGeo.setIndex(buildEmbankIndices(n));
  embankGeo.computeVertexNormals();
  const embankMat = new THREE.MeshStandardMaterial({
    color: 0x1b2a22,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  const embankment = new THREE.Mesh(embankGeo, embankMat);
  embankment.name = "embankment";
  group.add(embankment);

  /* ---------- guardrail: InstancedMesh post + rel ---------- */
  const railCount = Math.max(1, Math.floor(n / 3));
  const postGeo = new THREE.BoxGeometry(0.12, 0.85, 0.12);
  const railMat = new THREE.MeshStandardMaterial({ color: 0xa8b4c8, roughness: 0.5, metalness: 0.65 });
  const guardrails = new THREE.InstancedMesh(postGeo, railMat, railCount * 2);
  const dummy = new THREE.Object3D();
  let gi = 0;
  for (let i = 0; i < n && gi < railCount * 2; i += 3) {
    const p = spline.points[i]!;
    const h = headings[i]!;
    const nx = Math.cos(h + Math.PI / 2);
    const nz = Math.sin(h + Math.PI / 2);
    const w = halfW[i]! + (p.gutter > 0 ? 0.65 : 0.15);
    for (const side of [-1, 1]) {
      dummy.position.set(p.x + nx * side * w, p.y + 0.42, p.z + nz * side * w);
      dummy.rotation.set(0, -h, 0);
      dummy.updateMatrix();
      guardrails.setMatrixAt(gi++, dummy.matrix);
    }
  }
  guardrails.count = gi;
  guardrails.instanceMatrix.needsUpdate = true;
  guardrails.name = "guardrails";
  group.add(guardrails);

  return {
    group,
    road,
    lines,
    gutter,
    embankment,
    guardrails,
    dispose(): void {
      roadGeo.dispose();
      lineGeo.dispose();
      gutterGeo.dispose();
      embankGeo.dispose();
      postGeo.dispose();
      roadMat.dispose();
      lineMat.dispose();
      gutterMat.dispose();
      embankMat.dispose();
      railMat.dispose();
      roadTex.dispose();
      lineTex.dispose();
      group.clear();
    },
  };
}

function buildStripIndices(n: number): number[] {
  const idx: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    idx.push(a, c, b, b, c, d);
  }
  return idx;
}

function buildEmbankIndices(n: number): number[] {
  const idx: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const base = i * 4;
    const next = base + 4;
    // sisi kiri
    idx.push(base, next, base + 1, base + 1, next, next + 1);
    // sisi kanan
    idx.push(base + 2, base + 3, next + 2, base + 3, next + 3, next + 2);
  }
  return idx;
}

/** Material marka tepi untuk dipakai di tikungan (chevron). */
export function chevronTexture(): THREE.Texture {
  const size = 128;
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#111722";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#ffd400";
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(108, 64);
  ctx.lineTo(20, 108);
  ctx.lineTo(20, 84);
  ctx.lineTo(66, 64);
  ctx.lineTo(20, 44);
  ctx.closePath();
  ctx.fill();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const NIGHT_FOG = new THREE.Color(VISUAL.FOG_COLOR);
