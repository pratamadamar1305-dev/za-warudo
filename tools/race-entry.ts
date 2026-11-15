/**
 * tools/race-entry.ts — uji integrasi RaceLogic + AI + DriftScore + RubberBand
 * tanpa browser. Menjalankan race penuh 6 menit dengan input sintetis.
 */
import { PHYSICS, RIVALS, carById, AI } from "../src/sim/Tuning";
import { buildGunmaPass } from "../src/sim/TrackSpline";
import { RaceLogic, registerRivalSpecs, type RaceMode } from "../src/sim/RaceLogic";
import { DriftScore } from "../src/sim/DriftScore";
import { applyBand, speedScale } from "../src/sim/RubberBand";
import { CARS } from "../src/sim/Tuning";

registerRivalSpecs(CARS);
const DT = PHYSICS.DT;
const results: { name: string; pass: boolean; detail: string }[] = [];
function check(name: string, pass: boolean, detail: string): void {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name} — ${detail}`);
}

/** Driver AI-proxy untuk pemain (mengikuti racing line). */
function drivePlayer(race: RaceLogic): { throttle: number; brake: number; steer: number; handbrake: boolean } {
  const car = race.player;
  const st = car.state;
  const line = race.racingLine;
  const look = Math.max(9, st.speed * 0.6);
  const targetS = st.trackS + look;
  const idx = Math.max(0, Math.min(line.length - 1, Math.round((targetS / race.track.length) * (line.length - 1))));
  const target = race.track.pointAtOffset(targetS, line[idx] ?? 0);
  const desired = Math.atan2(target.z - st.z, target.x - st.x);
  let err = desired - st.heading;
  while (err > Math.PI) err -= Math.PI * 2;
  while (err < -Math.PI) err += Math.PI * 2;
  const steer = Math.max(-1, Math.min(1, err * 2.0 - Math.abs(st.slipRear) * 0.6));
  const curv = race.track.sampleAt(st.trackS + 14).curvature;
  const vTarget = Math.sqrt((1.02 * PHYSICS.GRAVITY) / Math.max(0.0016, Math.abs(curv)));
  const throttle = st.speed < vTarget * 0.97 ? 0.95 : st.speed > vTarget * 1.05 ? 0.1 : 0.45;
  const brake = st.speed > vTarget * 1.1 ? 0.5 : 0;
  return { throttle, brake, steer, handbrake: false };
}

function runRace(mode: RaceMode, rivalId: string, maxSeconds = 420) {
  const track = buildGunmaPass();
  const profile = RIVALS.find((r) => r.id === rivalId)!;
  const race = new RaceLogic(track, {
    mode,
    playerSpec: carById("hachi86"),
    playerName: "KAMU",
    rivals: [profile],
    seed: 12345,
    difficulty: 1,
  });
  const drift = new DriftScore();
  let t = 0;
  let nan = 0;
  let hits = 0;
  let maxSpeed = 0;
  while (!race.finished && t < maxSeconds) {
    const inp = drivePlayer(race);
    race.step(DT, inp);
    drift.update(DT, race.player.state.slipRear, race.player.speedKmh, race.player.state.hitWall, race.player.state.inGutter);
    if (race.player.state.hitWall) hits++;
    if (!Number.isFinite(race.player.state.x)) nan++;
    maxSpeed = Math.max(maxSpeed, race.player.speedKmh);
    t += DT;
  }
  return { race, drift, t, nan, hits, maxSpeed };
}

console.log("=== EUROBEAT DRIFT LEGEND — INTEGRASI RACE ===");

// 1. Downhill battle penuh
const down = runRace("downhill", "ryo");
check(
  "Downhill battle selesai (pemain finish)",
  down.race.finished && down.t < 420,
  `${down.t.toFixed(1)} s · posisi ${down.race.result?.position} · gap ${down.race.gapMeters().toFixed(0)} m`,
);
check("Tanpa NaN sepanjang race", down.nan === 0, `${down.nan} NaN`);
check(
  "Drift score terakumulasi",
  down.drift.displayPoints > 0,
  `${down.drift.displayPoints} poin · terbaik ${down.drift.state.best}`,
);
check(
  "Rival AI juga menempuh sirkuit",
  (down.race.rivalEntry?.progress ?? 0) > 2000,
  `rival ${Math.round(down.race.rivalEntry?.progress ?? 0)} m dari ${Math.round(down.race.track.length)} m`,
);
check(
  "Waktu balapan masuk akal (3:00–7:00)",
  down.t > 180 && down.t < 420,
  `${Math.floor(down.t / 60)}:${(down.t % 60).toFixed(1).padStart(4, "0")}`,
);

// 2. Time attack (tanpa rival)
const ta = runRace("timeattack", "ryo");
check("Time attack selesai tanpa rival", ta.race.finished && ta.race.racers.length === 1, `${ta.t.toFixed(1)} s`);
check("Time attack: gap timer tidak meledak", Math.abs(ta.race.gapSeconds()) === 0, `gap ${ta.race.gapSeconds()}`);

// 3. Tofu delivery
const tofu = runRace("tofu", "ryo", 200);
check("Tofu delivery berjalan", tofu.nan === 0 && tofu.race.track.length > 4000, `cup tersisa ${tofu.race.tofuCupsRemaining}`);

// 4. Uphill
const up = runRace("uphill", "ayu");
check("Uphill battle selesai", up.race.finished, `${up.t.toFixed(1)} s`);

// 5. Rubber-band
const neutral = applyBand(0.9, 0, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.04, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 });
const behind = applyBand(0.9, 10, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.04, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 });
const ahead = applyBand(0.9, -12, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.04, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 });
check(
  "Rubber-band: turun saat tertinggal, naik saat memimpin, clamp",
  neutral === 0.9 && behind === 0.86 && ahead === 0.93 && applyBand(0.9, 999, { behindThreshold: 6, aheadThreshold: 8, skillDown: 0.5, skillUp: 0.03, minSkill: 0.7, maxSkill: 1.02 }) === 0.7,
  `netral=${neutral} tertinggal=${behind} memimpin=${ahead} clamp=0.7`,
);
check("Rubber-band speed scale", speedScale(10) === 0.97 && speedScale(-12) === 1.03 && speedScale(0) === 1, "0.97 / 1.03 / 1.0");

// 6. RaceLogic: tidak ada state nyangkut setelah finish
const beforeStep = down.race.time;
down.race.step(DT, { throttle: 1, brake: 0, steer: 0, handbrake: false });
check("Step setelah finish diabaikan (tidak nyangkut)", down.race.time === beforeStep, `waktu tetap ${beforeStep.toFixed(1)} s`);

// 7. Gap win rule
const raceGap = down.race;
const gapWinActive = raceGap.isGapWin();
check("Aturan gap 60 m dapat dievaluasi", typeof gapWinActive === "boolean", `isGapWin=${gapWinActive} · gap=${raceGap.gapMeters().toFixed(0)} m`);

console.log("\n=== RINGKASAN ===");
const pass = results.filter((r) => r.pass).length;
console.log(`${pass}/${results.length} lulus`);
if (pass < results.length) {
  for (const r of results.filter((x) => !x.pass)) console.log(` - ${r.name}: ${r.detail}`);
  process.exitCode = 1;
}
void AI;
