// Bundle the TanStack Start SSR server into a single Cloudflare Pages
// `_worker.js` placed inside dist/client. This lets Pages serve static assets
// from dist/client and route everything else through the SSR worker, fixing
// the "404 on every URL" problem on Cloudflare Pages.
import { existsSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const clientDir = join(root, "dist", "client");
const serverEntry = join(root, "dist", "server", "server.js");

if (!existsSync(clientDir) || !existsSync(serverEntry)) {
  console.error("[postbuild] dist/client or dist/server/server.js missing — did `vite build` run?");
  process.exit(1);
}

// Cloudflare Pages "Advanced Mode": a single _worker.js at the output root.
// We bundle the SSR entry for the workerd runtime.
await build({
  entryPoints: [serverEntry],
  outfile: join(clientDir, "_worker.js"),
  bundle: true,
  format: "esm",
  platform: "browser",
  minify: true,
  mainFields: ["workerd", "worker", "browser", "module", "main"],
  conditions: ["workerd", "worker", "browser", "import", "module"],
  external: ["node:*", "cloudflare:*"],
  logLevel: "warning",
});

// Tell Pages: serve static files first, otherwise fall through to _worker.js.
writeFileSync(
  join(clientDir, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: ["/assets/*", "/favicon.ico", "/robots.txt"],
    },
    null,
    2,
  ),
);

writeFileSync(
  join(clientDir, "_headers"),
  "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n",
);

console.log("[postbuild] wrote dist/client/_worker.js, _routes.json, _headers");
