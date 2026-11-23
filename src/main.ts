import './style.css';
import * as THREE from 'three';
import { GameScene } from './render/Scene';
import { InputController } from './core/Input';
import { AudioEngine } from './core/Audio';
import { loadSave, persistSave, save, getUpgrades } from './core/Save';
import { cheats, loadCheats, persistCheats, resetCheats, setCheatFlag, isDirtyRace } from './core/Cheats';
import { TrackSpline } from './sim/TrackSpline';
import { AIOpponent, RIVALS } from './sim/AIOpponent';
import { AutoDrive } from './sim/AutoDrive';
import { DriftScore } from './sim/DriftScore';
import { RaceLogic, RacerEntry } from './sim/RaceLogic';
import { CARS, carById, MU_DRY, MU_WET, PhysicsEnv, VehiclePhysics } from './sim/VehiclePhysics';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const spline = new TrackSpline();
const canvas = $('game-canvas') as HTMLCanvasElement;
const game = new GameScene(canvas, spline);
const input = new InputController();
const audio = new AudioEngine();
loadSave(); loadCheats();
audio.setVolumes(save.settings.volMusic, save.settings.volSfx);
let player = new VehiclePhysics(carById(save.selectedCar));
const attractPlayer = new VehiclePhysics(carById('hachi86'));
const attractAuto = new AutoDrive(spline); attractAuto.setMode('pro');
let opponents: AIOpponent[] = [];
let rivalMeshes: THREE.Group[] = [];
let logic = new RaceLogic(spline);
let auto = new AutoDrive(spline);
let drift = new DriftScore();
let raceLive = false, paused = false, last = performance.now(), raceSeed = 0, runTime = 0;
let camIndex = 0, toastTimer = 0, muted = false, lastWallSfx = 0;
const held = new Map<string, boolean>();

const baseEnv = (): PhysicsEnv => ({ mu: cheats.weather === 'rain' ? MU_WET : MU_DRY, gripMul: cheats.gripMul, noSpin: cheats.noSpin, ghostMode: cheats.ghostMode, infiniteBoost: cheats.infiniteBoost, assists: { ...save.settings.assists }, upgrades: { ...getUpgrades(save.selectedCar) }, tuningPreset: save.tuningPreset, paceTorqueMul: auto.paceTorqueMul });
const setScreen = (name: string) => document.querySelectorAll('.screen').forEach(x => x.classList.toggle('active', x.id === `screen-${name}`));
function showToast(text: string) { const el = $('hud-toast'); el.textContent = text; el.classList.remove('hidden'); toastTimer = 2.2; }
function fmtTime(t: number | null) { if (t === null || !Number.isFinite(t)) return '--:--.--'; const m = Math.floor(t / 60); return `${m}:${(t % 60).toFixed(2).padStart(5, '0')}`; }
function positionCar(physics: VehiclePhysics, s: number, lat: number, speed = 0) {
  const p = spline.sampleAt(s), heading = Math.atan2(p.tx, -p.tz);
  physics.reset(p.x + p.rx * lat, p.z + p.rz * lat, heading, spline, speed);
}

positionCar(attractPlayer, spline.startS, 0, 16);

function setupRace() {
  game.clearRivals();
  raceSeed++;
  player = new VehiclePhysics(carById(save.selectedCar));
  positionCar(player, 38, 0);
  auto = new AutoDrive(spline); auto.setMode(cheats.autoDriveProfile);
  opponents = RIVALS.map((r, i) => {
    const op = new AIOpponent(r, spline, raceSeed * 7919 + i * 97);
    op.setPhysics(new VehiclePhysics(carById(r.carId)));
    positionCar(op.physics, 31 - i * 9, (i % 2 ? 1 : -1) * 1.9);
    return op;
  });
  rivalMeshes = opponents.map((o, i) => game.addRival(CARS.find(c => c.id === o.def.carId)?.color ?? o.def.color));
  const entries: RacerEntry[] = [{ id: 'player', name: 'YOU', isPlayer: true, s: player.state.s, speedMs: 0, finished: false, finishTime: 0, sectorIdx: 0, sectorStartTime: 0 }, ...opponents.map(o => ({ id: o.def.id, name: o.def.name, isPlayer: false, s: o.physics.state.s, speedMs: 0, finished: false, finishTime: 0, sectorIdx: 0, sectorStartTime: 0 }))];
  logic = new RaceLogic(spline); logic.reset(entries); drift.reset(); runTime = 0; raceLive = true; paused = false;
  $('hud').classList.remove('hidden'); $('touch-ui').classList.toggle('hidden', !('ontouchstart' in window));
  $('hud-dirty').classList.toggle('hidden', !isDirtyRace()); $('hud-ad-badge').classList.toggle('hidden', !cheats.autoDrive);
  setScreen('');
}

function finishRace() {
  if (!raceLive) return;
  raceLive = false; $('hud').classList.add('hidden'); $('touch-ui').classList.add('hidden'); setScreen('results');
  const pos = logic.playerPosition, dirty = isDirtyRace();
  const prize = pos === 1 ? 5000 : pos === 2 ? 3000 : pos === 3 ? 1800 : 900;
  const best = save.bestTime === null ? runTime : Math.min(save.bestTime, runTime);
  if (!dirty && (save.bestTime === null || runTime < save.bestTime)) save.bestTime = runTime;
  if (pos === 1) { save.wins++; save.week = Math.min(6, Math.max(save.week, save.wins + 1)); }
  save.cuan += prize; save.bestDrift = Math.max(save.bestDrift, drift.displayPoints); persistSave();
  $('results-title').textContent = pos === 1 ? 'FINISH! — VICTORY' : 'FINISH!';
  $('results-position').textContent = `P${pos}`; $('results-time').textContent = fmtTime(runTime); $('results-best').textContent = dirty ? 'DIRTY RUN' : fmtTime(best);
  $('results-drift').textContent = drift.displayPoints.toLocaleString(); $('results-cuan').textContent = `+¥${prize.toLocaleString()}`;
  $('results-standings').textContent = [...logic.entries].sort((a,b) => a.finished && b.finished ? a.finishTime-b.finishTime : a.finished ? -1 : b.finished ? 1 : b.s-a.s).map((e,i) => `P${i+1} ${e.name}`).join(' · ');
  $('results-dirty').classList.toggle('hidden', !dirty);
  refreshMenu();
}

function refreshMenu() {
  $('menu-cuan').textContent = save.cuan.toLocaleString(); $('garage-cuan').textContent = save.cuan.toLocaleString();
  $('menu-week-label').textContent = `WEEK ${save.week} — GUNMA NIGHT PASS`;
}
function renderGarage() {
  const list = $('garage-cars'); list.innerHTML = '';
  for (const c of CARS) {
    const owned = save.unlockedCars.includes(c.id) || cheats.unlockAll;
    const eligible = save.wins >= c.unlockWins || cheats.unlockAll;
    const button = document.createElement('button'); button.className = `garage-car-card${save.selectedCar === c.id ? ' selected' : ''}`;
    button.innerHTML = `<span class="car-swatch" style="--car:${new THREE.Color(c.color).getStyle()}" ></span><b>${c.name}</b><small>${owned ? c.drive : eligible ? `BUY · ¥${c.price.toLocaleString()}` : `LOCKED · ${c.unlockWins} WIN`}</small>`;
    button.onclick = () => {
      if (!owned && !eligible) { showToast(`MENANG ${Math.max(0,c.unlockWins-save.wins)} KALI LAGI`); return; }
      if (!owned && save.cuan < c.price) { showToast(`BUTUH ¥${c.price.toLocaleString()}`); return; }
      if (!owned && !cheats.unlockAll) { save.cuan -= c.price; save.unlockedCars.push(c.id); }
      save.selectedCar = c.id; persistSave(); renderGarage(); refreshMenu();
    };
    list.append(button);
  }
  const c = carById(save.selectedCar), up = getUpgrades(c.id);
  $('garage-car-name').textContent = c.name; $('garage-car-tag').textContent = `${c.drive} · ${c.desc}`;
  $('garage-wins').textContent = String(save.wins);
  $('garage-stats').innerHTML = `<div><span>POWER</span><b>${c.powerHp + up.engine * 8} HP</b></div><div><span>WEIGHT</span><b>${c.mass} KG</b></div><div><span>GRIP</span><b>${(c.grip + up.tires * .05).toFixed(2)}</b></div><div><span>DRIVE</span><b>${c.drive}</b></div>`;
  $('garage-upgrades').innerHTML = (['tires','suspension','lsd','engine'] as const).map(key => {
    const level = up[key], cost = (level + 1) * 3500;
    return `<button data-upgrade="${key}" ${level >= 4 ? 'disabled' : ''}><span>${key.toUpperCase()}</span><b>LV ${level}/4</b><small>${level < 4 ? `UPGRADE ¥${cost}` : 'MAX LEVEL'}</small></button>`;
  }).join('');
  list.querySelectorAll<HTMLButtonElement>('[data-upgrade]').forEach(btn => btn.onclick = () => {
    const key = btn.dataset.upgrade as keyof typeof up, price = (up[key] + 1) * 3500;
    if (save.cuan < price) { showToast('CUAN TIDAK CUKUP'); return; }
    if (up[key] < 4) { save.cuan -= price; up[key]++; persistSave(); renderGarage(); refreshMenu(); }
  });
  $('garage-tuning').innerHTML = ['balanced','grip','drift'].map(x => `<button data-tune="${x}" class="${save.tuningPreset === x ? 'active' : ''}" ${save.wins < 3 ? 'disabled' : ''}>${x.toUpperCase()}</button>`).join('');
  list.querySelectorAll<HTMLButtonElement>('[data-tune]').forEach(b => b.onclick = () => { if (save.wins >= 3) { save.tuningPreset = b.dataset.tune!; persistSave(); renderGarage(); } });
}
function populateSettings() {
  const s = save.settings;
  ($('set-vol-music') as HTMLInputElement).value = String(s.volMusic); ($('set-vol-sfx') as HTMLInputElement).value = String(s.volSfx);
  ($('set-quality') as HTMLSelectElement).value = s.quality; ($('set-cam-sens') as HTMLInputElement).value = String(s.camSens);
  ($('set-motion-reduce') as HTMLInputElement).checked = s.motionReduce; ($('set-subtitles') as HTMLInputElement).checked = s.subtitles;
  ($('set-invert-y') as HTMLInputElement).checked = s.invertY; ($('set-assist-steer') as HTMLInputElement).checked = s.assists.steer;
  ($('set-assist-brake') as HTMLInputElement).checked = s.assists.brake; ($('set-assist-recover') as HTMLInputElement).checked = s.assists.recover; ($('set-assist-drift') as HTMLInputElement).checked = s.assists.drift;
  document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('#screen-settings input, #screen-settings select').forEach(el => el.onchange = () => {
    s.volMusic = +($('set-vol-music') as HTMLInputElement).value; s.volSfx = +($('set-vol-sfx') as HTMLInputElement).value;
    s.quality = ($('set-quality') as HTMLSelectElement).value as typeof s.quality; s.camSens = +($('set-cam-sens') as HTMLInputElement).value;
    s.motionReduce = ($('set-motion-reduce') as HTMLInputElement).checked; s.subtitles = ($('set-subtitles') as HTMLInputElement).checked; s.invertY = ($('set-invert-y') as HTMLInputElement).checked;
    s.assists.steer = ($('set-assist-steer') as HTMLInputElement).checked; s.assists.brake = ($('set-assist-brake') as HTMLInputElement).checked;
    s.assists.recover = ($('set-assist-recover') as HTMLInputElement).checked; s.assists.drift = ($('set-assist-drift') as HTMLInputElement).checked; persistSave();
    audio.setVolumes(s.volMusic, s.volSfx);
  });
}

function drawMinimap() {
  const c = $('hud-minimap') as HTMLCanvasElement, ctx = c.getContext('2d'); if (!ctx) return;
  const w = c.width, h = c.height; ctx.clearRect(0,0,w,h); ctx.fillStyle = 'rgba(4,9,22,.78)'; ctx.fillRect(0,0,w,h);
  const points: {x:number;y:number}[] = [];
  for (let s=0;s<=spline.length;s+=12) { const p=spline.sampleAt(s); points.push({x:p.x,y:p.z}); }
  const xs=points.map(p=>p.x), ys=points.map(p=>p.y), minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys), maxY=Math.max(...ys), scale=Math.min((w-22)/(maxX-minX||1),(h-22)/(maxY-minY||1));
  const xy=(p:{x:number;y:number})=>({x:11+(p.x-minX)*scale,y:11+(p.y-minY)*scale});
  ctx.strokeStyle='#32d5f4'; ctx.lineWidth=3; ctx.beginPath(); points.forEach((p,i)=>{const q=xy(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)}); ctx.stroke();
  const p=xy({x:player.state.x,y:player.state.z}); ctx.fillStyle='#ffdf46';ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();
}

function updateHUD(dt: number) {
  const st=player.state; $('hud-speed').textContent=String(Math.round(st.speedKmh)); $('hud-gear').textContent=String(st.gear);
  $('hud-rpm-fill').style.width=`${Math.min(100,st.rpm / carById(save.selectedCar).redline * 100)}%`;
  $('hud-drift-points').textContent=drift.displayPoints.toLocaleString(); $('hud-drift-combo').textContent=`×${drift.combo.toFixed(1)}`;
  $('hud-drift-grade').textContent=drift.grade(); $('hud-drift-bar').style.width=`${drift.driftMeter*100}%`;
  $('hud-gap-value').textContent=`${logic.gapToLeader >= 0 ? '+' : ''}${logic.gapToLeader.toFixed(1)}`;
  $('hud-gap-arrow').textContent=`P${logic.playerPosition}`;
  $('hud-ad-text').textContent=`AUTO DRIVE · ${cheats.autoDriveProfile.toUpperCase()}`;
  $('hud-ad-tag').textContent=cheats.autoDriveProfile==='pro'?'UNBEATABLE':'ASSIST';
  const countdown=$('hud-countdown'); if(logic.phase==='countdown'){countdown.textContent=logic.countdownValue>0?String(logic.countdownValue):'GO!';countdown.classList.remove('hidden')}else countdown.classList.add('hidden');
  const corner=spline.nearest(st.x,st.z,st.s).sample; const ci=spline.corners.find(c=>Math.abs(c.sApex-st.s)<120);
  const ce=$('hud-corner'); if(ci){ce.textContent=`${ci.name} · ${ci.dir>0?'KANAN':'KIRI'}`;ce.classList.remove('hidden')}else ce.classList.add('hidden');
  $('hud-manual').classList.toggle('hidden',!auto.manualOverride); $('hud-sectors').textContent=`SEKTOR ${logic.entries[0]?.sectorIdx??0}/5 · ${fmtTime(logic.raceTime)}`;
  $('hud-nowplaying').classList.toggle('hidden',false); $('hud-np-bpm').textContent=String(cheats.bpmOverride ?? 156); drawMinimap();
  const rpm = $('hud-rpm-fill'); rpm.style.background=st.rpm/carById(save.selectedCar).redline>.88?'#ff3158':'linear-gradient(90deg,#19d5ff,#ff3c86)';
  if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)$('hud-toast').classList.add('hidden')}
  void corner;
}

function togglePause() { if(!raceLive)return; paused=!paused; setScreen(paused?'pause':''); if(paused) $('hud').classList.add('hidden'); else $('hud').classList.remove('hidden'); }
function bind(id: string, fn: () => void) { $(id).addEventListener('click',fn); }
bind('boot-tap',()=>{ void audio.start(); setScreen('menu'); }); bind('btn-start-race',()=>{setScreen('dialog'); $('dialog-name').textContent='RYO'; $('dialog-text').textContent='Yokoso, Gunma no yoru e. Tunjukkan line terbaikmu di downhill!'; $('dialog-race-btn').classList.remove('hidden');});
bind('dialog-race-btn',()=>{setupRace();}); bind('btn-garage',()=>{renderGarage();setScreen('garage')}); bind('btn-garage-back',()=>setScreen('menu'));bind('btn-garage-race',()=>setupRace());
bind('btn-settings',()=>{populateSettings();setScreen('settings')});bind('btn-settings-back',()=>setScreen('menu'));bind('btn-credits',()=>setScreen('credits'));bind('btn-credits-back',()=>setScreen('menu'));
bind('btn-pause-resume',()=>togglePause()); bind('btn-pause-restart',()=>setupRace());bind('btn-pause-quit',()=>{raceLive=false;paused=false;$('hud').classList.add('hidden');setScreen('menu');refreshMenu()});bind('hud-pause-btn',togglePause);
bind('btn-results-menu',()=>setScreen('menu'));bind('btn-results-again',()=>setupRace());

// Touch buttons use the same input path as keyboard and controller.
[['touch-left','left'],['touch-right','right'],['touch-gas','gas'],['touch-brake','brake'],['touch-handbrake','hb']].forEach(([id,key])=>{const el=$(id);el.dataset.control=key;});
const cheatMenu=$('cheat-menu');
document.querySelectorAll<HTMLButtonElement>('[data-ad]').forEach(b=>b.onclick=()=>{
  const mode=b.dataset.ad!; if(mode==='off'){setCheatFlag('autoDrive',false);showToast('AUTO DRIVE OFF');} else {setCheatFlag('autoDrive',true);setCheatFlag('autoDriveProfile',mode as 'chill'|'normal'|'pro');auto.setMode(mode as 'chill'|'normal'|'pro');showToast(`AUTO DRIVE ${mode.toUpperCase()}`);}
  $('hud-ad-badge').classList.toggle('hidden',!cheats.autoDrive);
});
document.querySelectorAll<HTMLButtonElement>('[data-line]').forEach(b=>b.onclick=()=>{const v=b.dataset.line!;setCheatFlag('driveLine',v!=='off');if(v!=='off')setCheatFlag('driveLineStyle',v as 'speed'|'apex'|'gear'|'ghost');});
$('cheat-menu-close').onclick=()=>cheatMenu.classList.add('hidden');$('btn-pause-cheats').onclick=()=>cheatMenu.classList.toggle('hidden');$('cheat-reset-all').onclick=()=>{resetCheats();showToast('CHEATS RESET')};
const sliderMap:[string,string,string,number][]=[['cheat-grip','gripMul','cheat-grip-val',2],['cheat-slowmo','slowmo','cheat-slowmo-val',2],['cheat-score','scoreMul','cheat-score-val',0],['cheat-bpm','bpmOverride','cheat-bpm-val',0],['cheat-line-intensity','driveLineIntensity','cheat-line-intensity-val',0]];
for(const [id,key,label,dec] of sliderMap){const el=$(id) as HTMLInputElement;el.oninput=()=>{const value=+(el.value);setCheatFlag(key as keyof typeof cheats,(key==='bpmOverride'&&value===156?null:value) as never);$(label).textContent=value.toFixed(dec);};}
const toggleDefs:[string,string,string][]=[['noSpin','NO SPIN','noSpin'],['ghostMode','GHOST CAR','ghostMode'],['infiniteBoost','INFINITE BOOST','infiniteBoost'],['unlockAll','UNLOCK ALL','unlockAll'],['rain','RAIN WEATHER','weather'],['traffic','TRAFFIC','traffic'],['freezeTimer','FREEZE TIMER','freezeTimer'],['freecam','FREE CAMERA','freecam']];
$('cheat-toggles').innerHTML=toggleDefs.map(([key,label])=>`<button class="cheat-toggle" data-flag="${key}">${label}<b>OFF</b></button>`).join('');
document.querySelectorAll<HTMLButtonElement>('[data-flag]').forEach(b=>b.onclick=()=>{const k=b.dataset.flag!; const val=(cheats as unknown as Record<string,unknown>)[k]; const next=k==='rain'?(cheats.weather==='clear'?'rain':'clear'):!val;setCheatFlag(k as keyof typeof cheats,next as never);b.classList.toggle('active',Boolean(next)&&next!=='clear');b.querySelector('b')!.textContent=String(next).toUpperCase();});
$('cheat-console-input').addEventListener('keydown',e=>{if(e.key==='Enter'){const el=e.currentTarget as HTMLInputElement, cmd=el.value.trim().toLowerCase();const log=$('cheat-console-log');const row=document.createElement('div');row.textContent=`EDL> ${cmd}`;log.append(row);el.value='';if(cmd==='help')log.insertAdjacentHTML('beforeend','<div>help · ad pro|normal|chill|off · grip 0.5-3 · nospin · boost · rain · reset</div>');else if(cmd.startsWith('ad ')){const m=cmd.slice(3);if(m==='off')setCheatFlag('autoDrive',false);else if(['pro','normal','chill'].includes(m)){setCheatFlag('autoDrive',true);setCheatFlag('autoDriveProfile',m as 'pro'|'normal'|'chill');auto.setMode(m as 'pro'|'normal'|'chill');}}else if(cmd.startsWith('grip '))setCheatFlag('gripMul',+cmd.slice(5));else if(cmd==='nospin')setCheatFlag('noSpin',!cheats.noSpin);else if(cmd==='boost')setCheatFlag('infiniteBoost',!cheats.infiniteBoost);else if(cmd==='rain')setCheatFlag('weather',cheats.weather==='rain'?'clear':'rain');else if(cmd==='reset')resetCheats();else {const err=document.createElement('div');err.textContent='Unknown command';log.append(err);}log.scrollTop=log.scrollHeight;}});

window.addEventListener('keydown',e=>{
  if(e.code==='Escape'||e.code==='KeyP'){if(raceLive){e.preventDefault();togglePause();}}
  if(e.code==='KeyR'&&raceLive)setupRace();
  if(e.code==='KeyM'){muted=!muted;audio.setMuted(muted);}
  if(e.code==='KeyC'||e.code==='ShiftLeft'||e.code==='ShiftRight'){camIndex=(camIndex+1)%3;game.setCamMode(camIndex);}
  if(e.code==='Digit1'||e.code==='Digit2'||e.code==='Digit3'){camIndex=Number(e.code.slice(-1))-1;game.setCamMode(camIndex);}
  if(e.code==='Backquote'||e.code==='F1'){$('cheat-console').classList.toggle('hidden');if(!$('cheat-console').classList.contains('hidden'))$('cheat-console-input').focus();}
  if(e.code==='F2')cheatMenu.classList.toggle('hidden');
  if(e.code==='Space'&&$('screen-dialog').classList.contains('active'))setupRace();
});

function frame(now:number){requestAnimationFrame(frame);let dt=Math.min(.05,(now-last)/1000);last=now;
  if(raceLive&&!paused){dt*=cheats.slowmo;const c=input.read();let intent;
    if(cheats.autoDrive){const p=player.state,near=spline.nearest(p.x,p.z,p.s);const brainState={x:p.x,y:p.y,z:p.z,heading:p.heading,vx:p.vx,vz:p.vz,speedMs:p.speedMs,slipAngle:p.beta,yawRate:p.yawRate,gear:p.gear,rpm:p.rpm,s:p.s,lateral:p.lateral};const others=opponents.map(o=>{const q=o.physics.state;return{x:q.x,y:q.y,z:q.z,heading:q.heading,vx:q.vx,vz:q.vz,speedMs:q.speedMs,slipAngle:q.beta,yawRate:q.yawRate,gear:q.gear,rpm:q.rpm,s:q.s,lateral:q.lateral};});intent=auto.update(brainState,dt,others,(cheats.weather==='rain'?MU_WET:MU_DRY)*cheats.gripMul*auto.gripEnvelope,c.active,logic.gapToLeader,spline.finishS-p.s,showToast)??c;
    }else intent=c;
    const env=baseEnv(); if(cheats.autoDriveProfile==='pro'&&cheats.autoDrive)env.mu*=auto.gripEnvelope;env.paceTorqueMul=auto.paceTorqueMul;
    player.step(intent,dt,spline,env);
    const playerState=()=>{const p=player.state;return{x:p.x,y:p.y,z:p.z,heading:p.heading,vx:p.vx,vz:p.vz,speedMs:p.speedMs,slipAngle:p.beta,yawRate:p.yawRate,gear:p.gear,rpm:p.rpm,s:p.s,lateral:p.lateral};};
    const others=opponents.map(o=>{const p=o.physics.state;return{x:p.x,y:p.y,z:p.z,heading:p.heading,vx:p.vx,vz:p.vz,speedMs:p.speedMs,slipAngle:p.beta,yawRate:p.yawRate,gear:p.gear,rpm:p.rpm,s:p.s,lateral:p.lateral};});
    opponents.forEach(o=>{o.paceCap=auto.aiPaceCap;o.update(dt,spline,env,others,playerState(),env.mu);});
    const entries=logic.entries;entries[0].s=player.state.s;entries[0].speedMs=player.state.speedMs;opponents.forEach((o,i)=>{entries[i+1].s=o.physics.state.s;entries[i+1].speedMs=o.physics.state.speedMs;});
    logic.update(dt,cheats.freezeTimer);if(logic.phase==='racing')runTime=logic.raceTime;
    drift.update(dt,player.slipDeg,player.state.speedKmh,player.events.hitWall,cheats.scoreMul);
    if(player.events.hitWall){auto.notifyCollision();if(now-lastWallSfx>350){audio.collision(player.events.hitIntensity);lastWallSfx=now;}}
    if(player.events.shifted)audio.shift(); if(player.events.gutterEntered)audio.gutter(); updateHUD(dt);
    if(logic.phase==='finished')finishRace();
  }
  audio.update(raceLive&&!paused?player.state.speedKmh:0, cheats.bpmOverride ?? 156);
  if(raceLive){game.update(player,opponents.map(o=>o.physics),Math.max(.001,dt));}
  else {
    if (attractPlayer.state.s >= spline.finishS - 30) positionCar(attractPlayer, spline.startS, 0, 16);
    const p=attractPlayer.state;
    const demoIntent=attractAuto.update({x:p.x,y:p.y,z:p.z,heading:p.heading,vx:p.vx,vz:p.vz,speedMs:p.speedMs,slipAngle:p.beta,yawRate:p.yawRate,gear:p.gear,rpm:p.rpm,s:p.s,lateral:p.lateral},dt,[],MU_DRY*attractAuto.gripEnvelope,false,0,spline.finishS-p.s,()=>{}) ?? {steer:0,throttle:0,brake:0,handbrake:0};
    const env=baseEnv();env.mu=MU_DRY*attractAuto.gripEnvelope;env.paceTorqueMul=attractAuto.paceTorqueMul;env.gripMul=1;
    attractPlayer.step(demoIntent,dt,spline,env);game.update(attractPlayer,[],Math.max(.001,dt));
  }
}

refreshMenu();requestAnimationFrame(frame);
