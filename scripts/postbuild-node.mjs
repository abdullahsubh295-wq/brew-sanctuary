// Bundle the TanStack Start SSR server entry for Node.js (self-hosting).
// Produces dist/server/server.node.mjs which exports the same `{ fetch }` handler
// but built for the Node platform (uses node:* built-ins natively).
import { existsSync } from "node:fs";
import { join } from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const serverEntry = join(root, "dist", "server", "server.js");

if (!existsSync(serverEntry)) {
  console.error("[postbuild-node] dist/server/server.js missing — did `vite build` run?");
  process.exit(1);
}

await build({
  entryPoints: [serverEntry],
  outfile: join(root, "dist", "server", "server.node.mjs"),
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node20",
  minify: false,
  external: ["node:*"],
  banner: {
    // Some bundled deps reference these CommonJS globals; provide ESM shims.
    js: [
      "import { createRequire as __lvCreateRequire } from 'node:module';",
      "import { fileURLToPath as __lvFileURLToPath } from 'node:url';",
      "import { dirname as __lvDirname } from 'node:path';",
      "const require = __lvCreateRequire(import.meta.url);",
      "const __filename = __lvFileURLToPath(import.meta.url);",
      "const __dirname = __lvDirname(__filename);",
    ].join("\n"),
  },
  logLevel: "warning",
});

console.log("[postbuild-node] wrote dist/server/server.node.mjs");
