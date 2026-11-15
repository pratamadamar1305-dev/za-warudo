/**
 * CarModel.ts — mesh mobil prosedural coupe 80-an (§5).
 *
 * Dibangun dari BoxGeometry & ExtrudeGeometry dengan bevel. Siluet: hidung
 * kotak, kabin trapesium, lampu pop-up opsional, spoiler kecil, papan nama.
 * Outline inverted-hull hanya untuk body (bukan jalan).
 */

import * as THREE from "three";
import type { CarSpec } from "../sim/Tuning";
import { makeOutlineMaterial, makeToonMaterial } from "./ToonMaterial";

export interface CarModel {
  root: THREE.Group;
  /** Pivot bodi untuk roll/pitch visual. */
  body: THREE.Group;
  wheels: THREE.Mesh[];
  steerWheels: THREE.Object3D[];
  brakeLights: THREE.Mesh[];
  headlights: THREE.Mesh[];
  taillights: THREE.Mesh[];
  smokeAnchors: THREE.Object3D[];
  dispose(): void;
}

/** Membuat bodi dari profil samping yang di-extrude (bevel = pinggiran membulat). */
function buildBodyShape(spec: CarSpec): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const L = spec.wheelbase + 0.85; // panjang total
  const noseX = L * 0.5;
  const tailX = -L * 0.5;
  const beltH = 0.62;
  const roofH = 0.62 + spec.cgHeight * 0.72;

  // mulai dari depan bawah
  shape.moveTo(noseX, 0.18);
  shape.lineTo(noseX - 0.06, beltH * 0.72);
  shape.lineTo(noseX - 0.42, 0.78); // kap mesin
  shape.lineTo(noseX - 0.78, 0.86);
  shape.lineTo(noseX - 1.12, roofH); // A-pillar
  shape.lineTo(-0.16, roofH + 0.035);
  shape.lineTo(-0.72, beltH + 0.2); // C-pillar
  shape.lineTo(tailX + 0.5, 0.82);
  shape.lineTo(tailX + 0.04, 0.72);
  shape.lineTo(tailX, 0.34);
  shape.lineTo(tailX + 0.04, 0.2);
  // kembali ke depan lewat bawah
  shape.lineTo(noseX, 0.18);
  return new THREE.ExtrudeGeometry(shape, {
    depth: spec.track + 0.14,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.05,
    bevelSegments: 2,
    curveSegments: 6,
  });
}

function wheel(spec: CarSpec, material: THREE.Material): THREE.Mesh {
  const r = spec.wheelRadius;
  const geo = new THREE.CylinderGeometry(r, r, 0.24, 14, 1);
  geo.rotateZ(Math.PI / 2);
  const mesh = new THREE.Mesh(geo, material);
  return mesh;
}

export function buildCar(spec: CarSpec, opts: { outline?: boolean; toon?: boolean } = {}): CarModel {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const bodyMat = opts.toon === false
    ? new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.38, metalness: 0.35 })
    : makeToonMaterial({ color: spec.color, rimStrength: 0.6 });

  const bodyGeo = buildBodyShape(spec);
  const width = spec.track + 0.14;
  bodyGeo.translate(0, 0, -width / 2);
  // Extrude menghasilkan sumbu Z sebagai lebar → rotasikan ke X
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.rotation.y = Math.PI / 2;
  bodyMesh.castShadow = true;
  body.add(bodyMesh);

  /* outline inverted hull untuk body */
  if (opts.outline !== false) {
    const outlineMesh = new THREE.Mesh(bodyGeo, makeOutlineMaterial());
    outlineMesh.rotation.y = Math.PI / 2;
    outlineMesh.scale.set(1.012, 1.012, 1.012);
    outlineMesh.renderOrder = -1;
    body.add(outlineMesh);
  }

  /* ---------- kaca (depan, samping, belakang) ---------- */
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0c1626,
    roughness: 0.14,
    metalness: 0.85,
    transparent: true,
    opacity: 0.86,
  });
  const roofH = 0.62 + spec.cgHeight * 0.72;
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.46, width * 0.8), glassMat);
  windshield.position.set(spec.wheelbase * 0.19, roofH - 0.12, 0);
  windshield.rotation.z = -0.42;
  body.add(windshield);

  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, width * 0.76), glassMat);
  rearGlass.position.set(-spec.wheelbase * 0.32, roofH - 0.16, 0);
  rearGlass.rotation.z = 0.5;
  body.add(rearGlass);

  /* ---------- spoiler kecil ---------- */
  const spoilerMat = new THREE.MeshStandardMaterial({ color: spec.accent, roughness: 0.5, metalness: 0.2 });
  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, width * 0.85), spoilerMat);
  spoiler.position.set(-(spec.wheelbase + 0.85) * 0.5 + 0.12, 0.95, 0);
  body.add(spoiler);
  const spoilerStandL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.06), spoilerMat);
  spoilerStandL.position.set(-(spec.wheelbase + 0.85) * 0.5 + 0.12, 0.86, width * 0.3);
  body.add(spoilerStandL);
  const spoilerStandR = spoilerStandL.clone();
  spoilerStandR.position.z = -width * 0.3;
  body.add(spoilerStandR);

  /* ---------- lampu ---------- */
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfff3d0 });
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xff2b3d });
  const brakeMat = new THREE.MeshBasicMaterial({ color: 0x5a0f18 });
  const headlights: THREE.Mesh[] = [];
  const taillights: THREE.Mesh[] = [];
  const brakeLights: THREE.Mesh[] = [];
  const noseX = (spec.wheelbase + 0.85) * 0.5;

  // pop-up headlight (AE86 vibe): kotak kecil terangkat
  for (const side of [-1, 1]) {
    const popup = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.1, 0.26), bodyMat);
    popup.position.set(noseX - 0.45, 0.82, side * width * 0.28);
    body.add(popup);
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.075, 0.2), headlightMat);
    lens.position.set(noseX - 0.33, 0.82, side * width * 0.28);
    body.add(lens);
    headlights.push(lens);

    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.16, 0.4), taillightMat);
    tail.position.set(-noseX + 0.05, 0.62, side * width * 0.28);
    body.add(tail);
    taillights.push(tail);

    const brake = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.1, 0.3), brakeMat);
    brake.position.set(-noseX + 0.04, 0.62, side * width * 0.28);
    body.add(brake);
    brakeLights.push(brake);

    // lampu depan menyorot (spot light murah, hanya pemain)
    if (opts.outline !== false) {
      const spot = new THREE.SpotLight(0xfff0cc, 55, 60, 0.34, 0.42, 1.2);
      spot.position.set(noseX - 0.3, 0.82, side * width * 0.26);
      spot.target.position.set(noseX + 24, 0.1, side * width * 0.5);
      root.add(spot);
      root.add(spot.target);
    }
  }

  /* ---------- papan nama tofu di pintu ---------- */
  const doorCv = document.createElement("canvas");
  doorCv.width = 256;
  doorCv.height = 128;
  const dctx = doorCv.getContext("2d")!;
  dctx.fillStyle = spec.accent === 0xffffff ? "#1a1d22" : "#f4f7ff";
  dctx.fillRect(0, 0, 256, 128);
  dctx.fillStyle = spec.color === 0xffffff ? "#1a1d22" : "#ff2e63";
  dctx.fillRect(0, 0, 256, 26);
  dctx.fillStyle = "#101423";
  dctx.font = "bold 34px 'Trebuchet MS', sans-serif";
  dctx.textAlign = "center";
  dctx.fillText("藤原とうふ店", 128, 66);
  dctx.font = "bold 18px 'Trebuchet MS', sans-serif";
  dctx.fillText("(自家用)", 128, 96);
  const doorTex = new THREE.CanvasTexture(doorCv);
  doorTex.colorSpace = THREE.SRGBColorSpace;
  const doorMat = new THREE.MeshBasicMaterial({ map: doorTex });
  for (const side of [-1, 1]) {
    const decal = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.34), doorMat);
    decal.position.set(-0.1, 0.6, side * (width * 0.5 + 0.012));
    decal.rotation.y = side > 0 ? 0 : Math.PI;
    body.add(decal);
  }

  /* ---------- roda ---------- */
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x15181f, roughness: 0.85, metalness: 0.1 });
  const wheels: THREE.Mesh[] = [];
  const steerWheels: THREE.Object3D[] = [];
  const halfTrack = spec.track / 2;
  const halfWb = spec.wheelbase / 2;
  for (const [x, z, steerable] of [
    [halfWb, halfTrack, true],
    [halfWb, -halfTrack, true],
    [-halfWb, halfTrack, false],
    [-halfWb, -halfTrack, false],
  ] as const) {
    const pivot = new THREE.Object3D();
    pivot.position.set(x, spec.wheelRadius, z);
    const w = wheel(spec, wheelMat);
    pivot.add(w);
    root.add(pivot);
    wheels.push(w);
    if (steerable) steerWheels.push(pivot);
  }

  /* ---------- anchor asap ban belakang ---------- */
  const smokeAnchors: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const a = new THREE.Object3D();
    a.position.set(-halfWb, 0.06, side * halfTrack);
    root.add(a);
    smokeAnchors.push(a);
  }

  return {
    root,
    body,
    wheels,
    steerWheels,
    brakeLights,
    headlights,
    taillights,
    smokeAnchors,
    dispose(): void {
      root.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      doorTex.dispose();
      root.clear();
    },
  };
}
