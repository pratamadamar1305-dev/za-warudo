import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import path from "node:path";
mkdirSync("tools/.build", { recursive: true });
await build({
  entryPoints: ["tools/race-entry.ts"],
  bundle: true, format: "esm", platform: "node", target: "node20",
  outfile: "tools/.build/race.mjs", logLevel: "warning",
});
await import(pathToFileURL(path.resolve("tools/.build/race.mjs")).href);
