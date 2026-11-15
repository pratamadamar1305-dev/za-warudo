import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import path from "node:path";
mkdirSync("tools/.build", { recursive: true });
await build({
  entryPoints: ["tools/audio-entry.ts"],
  bundle: true, format: "esm", platform: "node", target: "node20",
  outfile: "tools/.build/audio.mjs", logLevel: "warning",
});
await import(pathToFileURL(path.resolve("tools/.build/audio.mjs")).href);
