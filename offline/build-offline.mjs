// Bundles the shared catalogue + retrieval logic and the vanilla UI into a
// single self-contained offline .html file (SVG assets become data URLs).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || resolve(here, "../dist-offline/ecommerce-concierge-demo.html");

const result = await build({
  entryPoints: [resolve(here, "demo.js")],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2022"],
  minify: true,
  write: false,
  tsconfig: resolve(here, "../tsconfig.json"),
  loader: { ".svg": "dataurl" },
});
const js = result.outputFiles[0]?.text;
if (!js) throw new Error("Offline JavaScript bundle was not generated.");
const css = readFileSync(resolve(here, "demo.css"), "utf8");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Ecommerce Concierge — Offline Catalogue Demo</title>
<meta name="description" content="Offline ecommerce concierge prototype using a synthetic ten-piece catalogue. Works fully in the browser." />
<style>
${css}
</style>
</head>
<body>
<div id="app"></div>
<script>
${js}
</script>
</body>
</html>
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log("wrote", out, (html.length / 1024).toFixed(0) + " KB");
