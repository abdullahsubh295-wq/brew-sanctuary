// Minimal Node.js host for the TanStack Start app.
// Serves static assets from dist/client, then delegates everything else to the
// SSR fetch handler bundled at dist/server/server.node.mjs.
//
// Run with:  node server.mjs   (after `npm run build`)
// Env:       PORT (default 3000), HOST (default 0.0.0.0)

import { createServer } from "node:http";
import { createReadStream, statSync, existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { Readable } from "node:stream";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const ROOT = resolve(process.cwd());
const CLIENT_DIR = join(ROOT, "dist", "client");
const SERVER_ENTRY = join(ROOT, "dist", "server", "server.node.mjs");

if (!existsSync(CLIENT_DIR) || !existsSync(SERVER_ENTRY)) {
  console.error("[server] Build artifacts missing. Run `npm run build` first.");
  process.exit(1);
}

const { default: handler } = await import(SERVER_ENTRY);
if (!handler?.fetch) {
  console.error("[server] SSR entry has no default { fetch } export.");
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function tryStaticFile(urlPath) {
  // Strip query string and decode.
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  if (clean === "/" || clean === "") return null;
  // Prevent path traversal.
  const safe = normalize(clean).replace(/^(\.\.[\/\\])+/, "");
  const filePath = join(CLIENT_DIR, safe);
  if (!filePath.startsWith(CLIENT_DIR)) return null;
  try {
    const st = statSync(filePath);
    if (st.isFile()) return { filePath, size: st.size };
  } catch {}
  return null;
}

function nodeReqToWebRequest(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host || `${HOST}:${PORT}`;
  const url = new URL(req.url || "/", `${proto}://${host}`);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv));
    else if (v != null) headers.set(k, String(v));
  }
  const init = { method: req.method, headers };
  if (req.method && !["GET", "HEAD"].includes(req.method)) {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }
  return new Request(url.toString(), init);
}

async function writeWebResponse(res, webRes) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((v, k) => res.setHeader(k, v));
  if (!webRes.body) return res.end();
  const reader = webRes.body.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }
  res.end();
}

const server = createServer(async (req, res) => {
  try {
    const hit = tryStaticFile(req.url || "/");
    if (hit) {
      const ext = extname(hit.filePath).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      res.setHeader("Content-Length", hit.size);
      if (hit.filePath.includes(`${join("dist", "client", "assets")}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
      createReadStream(hit.filePath).pipe(res);
      return;
    }
    const webReq = nodeReqToWebRequest(req);
    const webRes = await handler.fetch(webReq, process.env, {});
    await writeWebResponse(res, webRes);
  } catch (err) {
    console.error("[server] Request error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
    }
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[server] Listening on http://${HOST}:${PORT}`);
});
