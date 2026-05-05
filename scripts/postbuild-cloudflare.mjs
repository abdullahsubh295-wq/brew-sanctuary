// Generates a static index.html + SPA fallback inside dist/client so the
// client bundle can be served from Cloudflare Pages (or any static host)
// without relying on the TanStack Start SSR worker.
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
if (!existsSync(clientDir)) {
  console.error("[postbuild] dist/client not found — did `vite build` run?");
  process.exit(1);
}

const assetsDir = join(clientDir, "assets");
const files = readdirSync(assetsDir);
const jsEntry = files.find((f) => /^index-.*\.js$/.test(f));
const cssEntry = files.find((f) => /^styles-.*\.css$/.test(f));

if (!jsEntry) {
  console.error("[postbuild] could not find client JS entry in dist/client/assets");
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Brew & Bean Café</title>
    <meta name="description" content="A modern café experience — menu, gallery, and reviews." />
    ${cssEntry ? `<link rel="stylesheet" href="/assets/${cssEntry}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsEntry}"></script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
writeFileSync(join(clientDir, "_redirects"), "/*    /index.html   200\n");
writeFileSync(
  join(clientDir, "_headers"),
  "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n",
);

console.log("[postbuild] wrote dist/client/index.html, _redirects, _headers");
