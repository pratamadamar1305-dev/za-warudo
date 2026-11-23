import * as THREE from 'three';
import { TrackSpline, ROAD_HALF_WIDTH } from '../sim/TrackSpline';
import { VehiclePhysics } from '../sim/VehiclePhysics';

export class GameScene {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(68, 1, 0.1, 5000);
  readonly playerRoot: THREE.Group;
  private playerBody: THREE.Group;
  private rivals: THREE.Group[] = [];
  private spline: TrackSpline;
  private clock = 0;
  private camMode = 0;
  private roadMat: THREE.MeshStandardMaterial;

  constructor(canvas: HTMLCanvasElement, spline: TrackSpline) {
    this.spline = spline;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.7));
    this.renderer.shadowMap.enabled = true;
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

  private setSize = () => {
    const w = innerWidth, h = innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  private buildWorld() {
    this.scene.add(new THREE.HemisphereLight(0x9bb8ff, 0x18120d, 1.25));
    const moon = new THREE.DirectionalLight(0x95adff, 1.5);
    moon.position.set(-200, 350, -80); moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048); this.scene.add(moon);
    const fill = new THREE.PointLight(0xffa15c, 800, 500); fill.position.set(0, 90, -500); this.scene.add(fill);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshStandardMaterial({ color: 0x101722, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -15; ground.receiveShadow = true; this.scene.add(ground);
    this.addStrip(ROAD_HALF_WIDTH * 2, 0.025, this.roadMat);
    this.addStrip(ROAD_HALF_WIDTH * 2 + 2.2, -0.03, new THREE.MeshStandardMaterial({ color: 0x766d62, roughness: 1 }));
    this.addGuardrails(); this.addScenery(); this.addTunnelBridge(); this.addStars();
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
    for (const side of [-1, 1]) {
      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= this.spline.length; s += 6) {
        const p = this.spline.sampleAt(s); points.push(new THREE.Vector3(p.x + p.rx * side * 5.4, p.y + 0.85, p.z + p.rz * side * 5.4));
        if (s % 24 === 0) {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.12), postMat);
          post.position.set(p.x + p.rx * side * 5.4, p.y + 0.4, p.z + p.rz * side * 5.4); this.scene.add(post);
        }
      }
      const rail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), points.length * 2, 0.09, 6, false), railMat);
      rail.castShadow = true; this.scene.add(rail);
    }
  }

  private addScenery() {
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x172d29, roughness: 1 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2a21 });
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x353a43, roughness: 1 });
    for (let s = 20; s < this.spline.length; s += 22) {
      const p = this.spline.sampleAt(s);
      for (const side of [-1, 1]) {
        const dist = 12 + ((Math.floor(s * 7 + side * 19) % 23 + 23) % 23);
        const x = p.x + p.rx * side * dist, z = p.z + p.rz * side * dist;
        if (Math.floor(s / 22) % 5 === 0) {
          const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(2 + (s % 3), 0), rockMat);
          rock.position.set(x, p.y + 0.5, z); rock.scale.set(1.8, 1.1, 1.2); rock.castShadow = true; this.scene.add(rock);
        } else {
          const h = 7 + (s % 11), tree = new THREE.Mesh(new THREE.ConeGeometry(2.5 + (s % 4) * 0.2, h, 6), treeMat);
          tree.position.set(x, p.y + h / 2, z); tree.castShadow = true; this.scene.add(tree);
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 2.2, 6), trunkMat);
          trunk.position.set(x, p.y + 1, z); this.scene.add(trunk);
        }
      }
      if (s % 180 < 22) {
        const lamp = new THREE.PointLight(0xffc980, 38, 42); lamp.position.set(p.x + p.rx * 7, p.y + 8, p.z + p.rz * 7); this.scene.add(lamp);
      }
    }
  }

  private addTunnelBridge() {
    const tunnel = this.spline.sampleAt(1835);
    const archMat = new THREE.MeshStandardMaterial({ color: 0x252b38, roughness: 0.85 });
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
  clearRivals() { for (const car of this.rivals) this.scene.remove(car); this.rivals = []; }
  setCamMode(mode: number) { this.camMode = (mode + 3) % 3; }

  update(player: VehiclePhysics, rivals: VehiclePhysics[], dt: number) {
    this.clock += dt;
    const st = player.state, p = this.spline.sampleAt(st.s);
    this.playerRoot.position.set(st.x, p.y, st.z); this.playerRoot.rotation.y = -st.heading;
    this.playerBody.rotation.z = -st.yawRate * 0.025;
    this.rivals.forEach((obj, i) => {
      const r = rivals[i]?.state; if (!r) return;
      obj.position.set(r.x, this.spline.sampleAt(r.s).y, r.z); obj.rotation.y = -r.heading;
    });
    const forward = new THREE.Vector3(Math.sin(st.heading), 0, -Math.cos(st.heading));
    const target = new THREE.Vector3(st.x, p.y + 0.8, st.z);
    let camPos: THREE.Vector3, look: THREE.Vector3;
    if (this.camMode === 1) { camPos = target.clone().add(forward.clone().multiplyScalar(0.25)).add(new THREE.Vector3(0, 1.15, 0)); look = target.clone().add(forward.clone().multiplyScalar(30)); }
    else if (this.camMode === 2) { camPos = target.clone().add(new THREE.Vector3(0, 2.2, 5.2)); look = target.clone().add(forward.clone().multiplyScalar(12)); }
    else { camPos = target.clone().add(forward.clone().multiplyScalar(8)).add(new THREE.Vector3(0, 4.5, 0)); look = target.clone().add(forward.clone().multiplyScalar(15)); }
    this.camera.position.lerp(camPos, 1 - Math.exp(-dt * 4.5)); this.camera.lookAt(look);
    this.camera.fov = 68 + Math.min(13, st.speedKmh * 0.035); this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
}
