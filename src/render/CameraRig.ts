/**
 * CameraRig.ts — chase / bumper / hood / cinematic (§11).
 *
 * Spring-damper pada posisi, look-ahead ke arah velocity (bukan heading),
 * FOV dinamis, roll saat drift, dan getar yang bisa dimatikan.
 */

import * as THREE from "three";
import { CAMERA } from "../sim/Tuning";

export type CameraMode = "chase" | "bumper" | "hood" | "cinematic";

export class CameraRig {
  camera: THREE.PerspectiveCamera;
  mode: CameraMode = "chase";
  private pos = new THREE.Vector3();
  private vel = new THREE.Vector3();
  private lookAt = new THREE.Vector3();
  private targetFov = CAMERA.FOV_MIN;
  private roll = 0;
  private shake = new THREE.Vector3();
  private shakeAmp = 0;
  private time = 0;
  reduceMotion = false;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  reset(): void {
    this.pos.set(0, 3, 8);
    this.vel.set(0, 0, 0);
    this.lookAt.set(0, 0, 0);
    this.roll = 0;
    this.shakeAmp = 0;
  }

  addShake(amount: number): void {
    if (this.reduceMotion) return;
    this.shakeAmp = Math.min(1.6, this.shakeAmp + amount * CAMERA.SHAKE_PER_IMPACT * 12);
  }

  /**
   * @param carX/Z/Y posisi mobil
   * @param carHeading heading mobil
   * @param vx/vz kecepatan dunia
   * @param slipAngle slip belakang (rad)
   */
  update(
    dt: number,
    carX: number, carY: number, carZ: number,
    carHeading: number,
    vx: number, vz: number,
    slipAngle: number,
    speedKmh: number,
  ): void {
    this.time += dt;
    const speed = Math.hypot(vx, vz);
    const offset =
      this.mode === "bumper"
        ? CAMERA.BUMPER_OFFSET
        : this.mode === "hood"
          ? CAMERA.HOOD_OFFSET
          : CAMERA.CHASE_OFFSET;

    // basis mobil
    const cosH = Math.cos(carHeading);
    const sinH = Math.sin(carHeading);
    const rightX = -sinH;
    const rightZ = cosH;
    const fwdX = cosH;
    const fwdZ = sinH;

    // posisi target: offset di local space mobil
    const targetX = carX + rightX * offset.x + fwdX * -offset.z;
    const targetZ = carZ + rightZ * offset.x + fwdZ * -offset.z;
    const targetY = carY + offset.y;

    // spring-damper
    const k = CAMERA.CAM_SPRING_K;
    const d = CAMERA.CAM_DAMPING * 2 * Math.sqrt(k);
    const ax = (targetX - this.pos.x) * k - this.vel.x * d;
    const ay = (targetY - this.pos.y) * k - this.vel.y * d;
    const az = (targetZ - this.pos.z) * k - this.vel.z * d;
    this.vel.x += ax * dt;
    this.vel.y += ay * dt;
    this.vel.z += az * dt;
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    this.pos.z += this.vel.z * dt;

    if (!Number.isFinite(this.pos.x) || !Number.isFinite(this.pos.y) || !Number.isFinite(this.pos.z)) {
      this.pos.set(targetX, targetY, targetZ);
      this.vel.set(0, 0, 0);
    }

    // look-ahead ke arah velocity (bukan heading) supaya drift terasa
    const vNorm = speed > 1.2 ? 1 / speed : 0;
    const lookAheadDist = 6 + Math.min(10, speed * 0.28);
    const lx = carX + (vx * vNorm || fwdX) * lookAheadDist;
    const lz = carZ + (vz * vNorm || fwdZ) * lookAheadDist;
    this.lookAt.x += (lx - this.lookAt.x) * Math.min(1, dt * 9);
    this.lookAt.z += (lz - this.lookAt.z) * Math.min(1, dt * 9);
    this.lookAt.y += (carY + 0.75 - this.lookAt.y) * Math.min(1, dt * 6);

    // roll akibat slip
    const targetRoll = this.reduceMotion
      ? 0
      : Math.max(
          -CAMERA.DRIFT_ROLL_MAX,
          Math.min(CAMERA.DRIFT_ROLL_MAX, slipAngle * CAMERA.DRIFT_ROLL_PER_SLIP),
        );
    this.roll += (targetRoll - this.roll) * Math.min(1, dt * 5);

    // shake
    this.shakeAmp = Math.max(0, this.shakeAmp - dt * 2.6);
    const s = this.shakeAmp * this.shakeAmp;
    this.shake.set(
      Math.sin(this.time * 41.7) * 0.09 * s,
      Math.cos(this.time * 33.3) * 0.07 * s,
      Math.sin(this.time * 28.9) * 0.06 * s,
    );

    // posisi akhir
    this.camera.position.set(
      this.pos.x + this.shake.x,
      this.pos.y + this.shake.y,
      this.pos.z + this.shake.z,
    );
    this.camera.up.set(Math.sin(this.roll), Math.cos(this.roll), 0);
    this.camera.lookAt(this.lookAt);

    // FOV dinamis
    const fovTarget =
      CAMERA.FOV_MIN + (CAMERA.FOV_MAX - CAMERA.FOV_MIN) * Math.min(1, speedKmh / 190);
    this.targetFov += (fovTarget - this.targetFov) * CAMERA.FOV_LERP;
    this.camera.fov += (this.targetFov - this.camera.fov) * 0.12;
    this.camera.updateProjectionMatrix();
  }

  /** Untuk cutscene: set langsung tanpa spring. */
  snapTo(x: number, y: number, z: number, lookX: number, lookY: number, lookZ: number): void {
    this.pos.set(x, y, z);
    this.vel.set(0, 0, 0);
    this.lookAt.set(lookX, lookY, lookZ);
    this.camera.position.set(x, y, z);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(lookX, lookY, lookZ);
  }
}
