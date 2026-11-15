/**
 * tools/sim-test.mjs — harness QA headless untuk fisika & AI.
 *
 * Cara pakai: node tools/sim-test.mjs
 * Meng-compile src/ dengan esbuild (bundled bersama vite), lalu menjalankan
 * skenario §6.9 dan mencetak PASS/FAIL. Tidak butuh browser/WebGL.
 */

import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import path from "node:path";

const OUT = "tools/.build/simtest.mjs";
mkdirSync("tools/.build", { recursive: true });

await build({
  entryPoints: ["tools/sim-entry.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node20",
  outfile: OUT,
  logLevel: "warning",
  sourcemap: false,
});

const mod = await import(pathToFileURL(path.resolve(OUT)).href);
mod.runAll();
