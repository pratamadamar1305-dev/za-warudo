import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { TrackSpline, ROAD_HALF_WIDTH } from '../sim/TrackSpline';
import { VehiclePhysics } from '../sim/VehiclePhysics';

export class GameScene {
  readonly renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private bloomPass: UnrealBloomPass;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(68, 1, 0.1, 5000);
  readonly playerRoot: THREE.Group;
  private playerBody: THREE.Group;
  private rivals: THREE.Group[] = [];
  private spline: TrackSpline;
  private clock = 0;
  private camMode = 0;
  private roadMat: THREE.MeshStandardMaterial;
  private speedLineObject: THREE.LineSegments | null = null;
  private tier: 'low' | 'mid' | 'high' = 'mid';
  private renderScale = 0.85;
  private maxRenderScale = 0.85;
  private pixelRatioCap = 1.5;
  private targetFrameMs = 1000 / 50;
  private perfWindowStart = performance.now();
  private perfWindowFrames = 0;
  private perfWindowMs = 0;
  private fastTime = 0;
  private baselineFrameMs = 0;
  private baselineTimer = 0;
  private thermalTime = 0;
  private lastRenderAt = 0;

  constructor(canvas: HTMLCanvasElement, spline: TrackSpline) {
    this.spline = spline;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.composer = new EffectComposer(this.renderer);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.2, 0.35, 0.82);
    this.composer.addPass(new RenderPass(this.scene, this.camera)); this.composer.addPass(this.bloomPass);
    this.detectTier();
    this.applyTier();
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.scene.background = new THREE.Color(0x070b19);
    this.scene.fog = new THREE.FogExp2(0x10172a, 0.00115);
    this.roadMat = new THREE.MeshStandardMaterial({ color: 0x282c36, roughness: 0.92 });
    this.buildWorld();
    this.playerRoot = this.makeCar(0xd42a2a, true);
    this.playerBody = this.playerRoot;
    this.scene.add(this.playerRoot);
    this.setSize();
    addEventListener('resize', this.setSize);
  }

  private detectTier() {
    let gpu = '';
    try {
      const gl = this.renderer.getContext();
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) gpu = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)).toLowerCase();
    } catch { /* renderer info is often privacy-masked */ }
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    if (/mali[- ]?g5[0-2]|adreno[^0-9]*6(0[0-9]|1[0-9])/.test(gpu) || memory <= 3) this.tier = 'low';
    else if (/adreno[^0-9]*64[0-9]|mali[- ]?g7[0-6]/.test(gpu) || memory <= 6) this.tier = 'mid';
    else if (/adreno[^0-9]*(7[3-9][0-9]|8[0-9][0-9])|mali[- ]?g(78|7[89])/.test(gpu)) this.tier = 'high';
    else this.tier = memory >= 8 ? 'high' : 'mid';
    this.setTierBudget(); this.renderScale = this.maxRenderScale;
  }

  private setTierBudget() {
    if (this.tier === 'low') { this.maxRenderScale = 0.7; this.pixelRatioCap = 1.5; this.targetFrameMs = 1000 / 35; }
    else if (this.tier === 'mid') { this.maxRenderScale = 0.85; this.pixelRatioCap = 1.5; this.targetFrameMs = 1000 / 50; }
    else { this.maxRenderScale = 1; this.pixelRatioCap = 2; this.targetFrameMs = 1000 / 60; }
  }

  private applyTier() {
    this.renderer.shadowMap.enabled = this.tier !== 'low';
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const ratio = Math.min(devicePixelRatio || 1, this.pixelRatioCap) * this.renderScale;
    this.renderer.setPixelRatio(ratio); this.composer.setPixelRatio(ratio); this.composer.setSize(innerWidth, innerHeight);
    this.bloomPass.enabled = this.tier !== 'low'; this.bloomPass.strength = this.tier === 'high' ? 0.34 : this.tier === 'mid' ? 0.14 : 0;
    if (this.speedLineObject) (this.speedLineObject.material as THREE.LineBasicMaterial).opacity = this.tier === 'low' ? 0.11 : 0;
  }

  private demoteTier() {
    if (this.tier === 'high') this.tier = 'mid'; else this.tier = 'low';
    this.setTierBudget(); this.renderScale = Math.min(this.renderScale, this.maxRenderScale);
    this.applyTier(); document.getElementById('hud-thermal')?.classList.remove('hidden');
  }

  private setSize = () => {
    const w = innerWidth, h = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, this.pixelRatioCap) * this.renderScale;
    this.renderer.setPixelRatio(ratio); this.composer.setPixelRatio(ratio); this.composer.setSize(w, h);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  };

  private buildWorld() {
    this.scene.add(new THREE.HemisphereLight(0x9bb8ff, 0x18120d, 1.25));
    const moon = new THREE.DirectionalLight(0x95adff, 1.5);
    moon.position.set(-200, 350, -80); moon.castShadow = true;
    const shadowResolution = this.tier === 'high' ? 2048 : 1024;
    moon.shadow.mapSize.set(shadowResolution, shadowResolution); this.scene.add(moon);
    const fill = new THREE.PointLight(0xffa15c, 800, 500); fill.position.set(0, 90, -500); this.scene.add(fill);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshStandardMaterial({ color: 0x101722, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -15; ground.receiveShadow = true; this.scene.add(ground);
    this.addStrip(ROAD_HALF_WIDTH * 2, 0.025, this.roadMat);
    this.addStrip(ROAD_HALF_WIDTH * 2 + 2.2, -0.03, new THREE.MeshStandardMaterial({ color: 0x766d62, roughness: 1 }));
    this.addGuardrails(); this.addScenery(); this.addTunnelBridge(); this.addStars(); this.addSpeedLines();
  }

  private addStrip(width: number, yOffset: number, mat: THREE.Material) {
    const positions: number[] = [], indices: number[] = [];
    const step = 3, count = Math.ceil(this.spline.length / step);
    for (let i = 0; i <= count; i++) {
      const s = Math.min(i * step, this.spline.length), p = this.spline.sampleAt(s);
      positions.push(p.x - p.rx * width / 2, p.y + yOffset, p.z - p.rz * width / 2,
        p.x + p.rx * width / 2, p.y + yOffset, p.z + p.rz * width / 2);
      if (i < count) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); geo.setIndex(indices); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mat); mesh.receiveShadow = true; this.scene.add(mesh);
  }

  private addGuardrails() {
    const railMat = new THREE.MeshStandardMaterial({ color: 0x9da7b8, metalness: 0.72, roughness: 0.34 });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x5e6673, metalness: 0.5, roughness: 0.5 });
    const postStep = 24, postCount = Math.ceil(this.spline.length / postStep) * 2;
    const posts = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 1.1, 0.12), postMat, postCount);
    const dummy = new THREE.Object3D(); let index = 0;
    for (const side of [-1, 1]) {
      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= this.spline.length; s += 6) {
        const p = this.spline.sampleAt(s); points.push(new THREE.Vector3(p.x + p.rx * side * 5.4, p.y + 0.85, p.z + p.rz * side * 5.4));
        if (s % postStep === 0) {
          dummy.position.set(p.x + p.rx * side * 5.4, p.y + 0.4, p.z + p.rz * side * 5.4);
          dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); posts.setMatrixAt(index++, dummy.matrix);
        }
      }
      const rail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), points.length * 2, 0.09, 6, false), railMat);
      rail.castShadow = true; this.scene.add(rail);
    }
    posts.count = index; posts.instanceMatrix.needsUpdate = true; this.scene.add(posts);
  }

  private addScenery() {
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x172d29, roughness: 1 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2a21 });
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x353a43, roughness: 1 });
    const treeGeo = new THREE.ConeGeometry(2.8, 9, 6), trunkGeo = new THREE.CylinderGeometry(0.28, 0.38, 2.2, 6), rockGeo = new THREE.DodecahedronGeometry(2, 0);
    const treeData: Array<{x:number;y:number;z:number;h:number;radius:number;rot:number}> = [];
    const rockData: Array<{x:number;y:number;z:number;rot:number;scale:number}> = [];
    const spacing = this.tier === 'low' ? 44 : 22;
    for (let s = 20; s < this.spline.length; s += spacing) {
      const p = this.spline.sampleAt(s);
      for (const side of [-1, 1]) {
        const dist = 12 + ((Math.floor(s * 7 + side * 19) % 23 + 23) % 23);
        const x = p.x + p.rx * side * dist, z = p.z + p.rz * side * dist;
        if (Math.floor(s / spacing) % 5 === 0) rockData.push({x,y:p.y+0.5,z,rot:(s+side*7)%6,scale:1.8+(s%3)*.08});
        else treeData.push({x,y:p.y,z,h:7+(s%11),radius:2.5+(s%4)*.2,rot:(s*0.07+side)%6});
      }
    }
    const dummy = new THREE.Object3D();
    const trees = new THREE.InstancedMesh(treeGeo, treeMat, treeData.length), trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, treeData.length);
    treeData.forEach((v,i) => {
      dummy.position.set(v.x,v.y+v.h/2,v.z); dummy.rotation.set(0,v.rot,0); dummy.scale.set(v.radius/2.8,v.h/9,v.radius/2.8); dummy.updateMatrix(); trees.setMatrixAt(i,dummy.matrix);
      dummy.position.set(v.x,v.y+1,v.z); dummy.scale.set(1,1,1); dummy.updateMatrix(); trunks.setMatrixAt(i,dummy.matrix);
    });
    const rocks = new THREE.InstancedMesh(rockGeo,rockMat,rockData.length);
    rockData.forEach((v,i)=>{dummy.position.set(v.x,v.y,v.z);dummy.rotation.set(v.rot*.1,v.rot,0);dummy.scale.set(1.8,1.1,1.2);dummy.updateMatrix();rocks.setMatrixAt(i,dummy.matrix);});
    trees.instanceMatrix.needsUpdate=true; trunks.instanceMatrix.needsUpdate=true; rocks.instanceMatrix.needsUpdate=true;
    trees.castShadow=true; rocks.castShadow=true; this.scene.add(trees,trunks,rocks);
    const lampEvery = this.tier === 'low' ? 1440 : 720;
    for(let s=lampEvery;s<this.spline.length;s+=lampEvery){const p=this.spline.sampleAt(s);const lamp=new THREE.PointLight(0xffc980,this.tier==='high'?38:24,42);lamp.position.set(p.x+p.rx*7,p.y+8,p.z+p.rz*7);this.scene.add(lamp);}
  }

  private addTunnelBridge() {
    const tunnel = this.spline.sampleAt(1835), archMat = new THREE.MeshStandardMaterial({ color: 0x252b38, roughness: 0.85 });
    const arch = new THREE.Mesh(new THREE.TorusGeometry(7, 1.6, 8, 24, Math.PI), archMat);
    arch.rotation.z = Math.PI; arch.position.set(tunnel.x, tunnel.y + 1, tunnel.z); this.scene.add(arch);
    const bridge = this.spline.sampleAt(4300);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(18, 1, 430), new THREE.MeshStandardMaterial({ color: 0x3a424f, metalness: 0.45 }));
    deck.position.set(bridge.x, bridge.y - 4, bridge.z); this.scene.add(deck);
    const neon = new THREE.PointLight(0x29c5ff, 90, 120); neon.position.set(tunnel.x, tunnel.y + 5, tunnel.z); this.scene.add(neon);
  }

  private addStars() {
    const geo = new THREE.BufferGeometry(), pos: number[] = [];
    for (let i = 0; i < 600; i++) pos.push((Math.random() - .5) * 3000, 150 + Math.random() * 900, (Math.random() - .5) * 3000);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    this.scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xa8c8ff, size: 1.2, sizeAttenuation: false })));
  }

  private addSpeedLines() {
    const positions: number[] = [];
    for (let i = 0; i < 42; i++) {
      const x = (((i * 47) % 101) - 50) * 0.55, z = ((i * 29) % 58) - 24, length = 3 + (i % 5) * 1.8;
      positions.push(x, 1.5, z, x * 1.08, 1.5, z + length);
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({ color: 0x8edfff, transparent: true, opacity: this.tier === 'low' ? 0.11 : 0, depthWrite: false });
    this.speedLineObject = new THREE.LineSegments(geo, mat); this.speedLineObject.frustumCulled = false; this.scene.add(this.speedLineObject);
  }

  private makeCar(color: number, player = false) {
    const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
    const paint = new THREE.MeshStandardMaterial({ color, metalness: 0.58, roughness: 0.28 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x101d2c, metalness: 0.25, roughness: 0.16 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x111217, roughness: 0.72 });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.55, 4.15), paint); chassis.position.y = 0.66; chassis.castShadow = true; body.add(chassis);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.65, 2.0), glass); cabin.position.set(0, 1.18, 0.15); cabin.castShadow = true; body.add(cabin);
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.13, 1.2), paint); hood.position.set(0, 0.94, -1.32); body.add(hood);
    for (const x of [-0.98, 0.98]) for (const z of [-1.35, 1.35]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.25, 16), dark); wheel.rotation.z = Math.PI / 2; wheel.position.set(x, 0.4, z); wheel.castShadow = true; root.add(wheel);
    }
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xd8f0ff });
    for (const x of [-0.62, 0.62]) { const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.06), lampMat); lamp.position.set(x, 0.72, -2.1); body.add(lamp); }
    const tail = new THREE.MeshStandardMaterial({ color: 0xff173d, emissive: 0xd90026, emissiveIntensity: 2 });
    for (const x of [-0.64, 0.64]) { const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.06), tail); lamp.position.set(x, 0.72, 2.1); body.add(lamp); }
    if (player) { const beam = new THREE.SpotLight(0xd9edff, 105, 115, 0.36, 0.5, 1.4); beam.position.set(0, 1.3, -1); beam.target.position.set(0, 0, -45); root.add(beam, beam.target); }
    return root;
  }

  addRival(color: number) { const car = this.makeCar(color); this.scene.add(car); this.rivals.push(car); return car; }
  clearRivals() {
    for (const car of this.rivals) {
      this.scene.remove(car);
      car.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const mats = Array.isArray(object.material) ? object.material : [object.material]; mats.forEach(mat => mat.dispose());
      });
    }
    this.rivals = [];
  }
  resetFrameClock() { this.lastRenderAt = 0; this.perfWindowStart = performance.now(); this.perfWindowFrames = 0; this.perfWindowMs = 0; }
  setCamMode(mode: number) { this.camMode = (mode + 3) % 3; }

  private recordFrame(now: number) {
    const frameMs = this.lastRenderAt ? now - this.lastRenderAt : 1000 / 60;
    this.lastRenderAt = now; this.perfWindowFrames++; this.perfWindowMs += frameMs; this.baselineTimer += frameMs;
    if (this.baselineTimer >= 10000 && !this.baselineFrameMs) this.baselineFrameMs = this.perfWindowMs / Math.max(1, this.perfWindowFrames);
    if (now - this.perfWindowStart < 2000) return;
    const avg = this.perfWindowMs / Math.max(1, this.perfWindowFrames), windowSeconds = (now - this.perfWindowStart) / 1000;
    if (avg > 20 && this.renderScale > 0.6) { this.renderScale = Math.max(0.6, Math.round((this.renderScale - 0.05) * 100) / 100); this.setSize(); this.fastTime = 0; }
    else if (avg < 14) { this.fastTime += windowSeconds; if (this.fastTime >= 5 && this.renderScale < this.maxRenderScale) { this.renderScale = Math.min(this.maxRenderScale, Math.round((this.renderScale + 0.05) * 100) / 100); this.setSize(); this.fastTime = 0; } }
    else this.fastTime = 0;
    if (this.baselineFrameMs && avg > this.baselineFrameMs * 1.25) this.thermalTime += windowSeconds; else this.thermalTime = 0;
    if (this.thermalTime >= 10 && this.tier !== 'low') { this.demoteTier(); this.thermalTime = 0; }
    this.perfWindowStart = now; this.perfWindowFrames = 0; this.perfWindowMs = 0;
  }

  update(player: VehiclePhysics, rivals: VehiclePhysics[], dt: number) {
    const now = performance.now(); if (this.lastRenderAt && now - this.lastRenderAt < this.targetFrameMs) return;
    this.clock += dt;
    const st = player.state, p = this.spline.sampleAt(st.s);
    this.playerRoot.position.set(st.x, p.y, st.z); this.playerRoot.rotation.y = -st.heading; this.playerBody.rotation.z = -st.yawRate * 0.025;
    this.rivals.forEach((obj, i) => { const r = rivals[i]?.state; if (r) { obj.position.set(r.x, this.spline.sampleAt(r.s).y, r.z); obj.rotation.y = -r.heading; } });
    if (this.speedLineObject) {
      this.speedLineObject.position.set(st.x, p.y, st.z); this.speedLineObject.rotation.y = -st.heading;
      (this.speedLineObject.material as THREE.LineBasicMaterial).opacity = this.tier === 'low' ? Math.min(0.16, st.speedKmh / 900) : 0;
    }
    const forward = new THREE.Vector3(Math.sin(st.heading), 0, -Math.cos(st.heading)), target = new THREE.Vector3(st.x, p.y + 0.8, st.z);
    let camPos: THREE.Vector3, look: THREE.Vector3;
    if (this.camMode === 1) { camPos = target.clone().add(forward.clone().multiplyScalar(0.25)).add(new THREE.Vector3(0, 1.15, 0)); look = target.clone().add(forward.clone().multiplyScalar(30)); }
    else if (this.camMode === 2) { camPos = target.clone().add(new THREE.Vector3(0, 2.2, 5.2)); look = target.clone().add(forward.clone().multiplyScalar(12)); }
    else { camPos = target.clone().add(forward.clone().multiplyScalar(8)).add(new THREE.Vector3(0, 4.5, 0)); look = target.clone().add(forward.clone().multiplyScalar(15)); }
    this.camera.position.lerp(camPos, 1 - Math.exp(-dt * 4.5)); this.camera.lookAt(look);
    this.camera.fov = 68 + Math.min(13, st.speedKmh * 0.035); this.camera.updateProjectionMatrix();
    this.composer.render(); this.recordFrame(performance.now());
  }
}
