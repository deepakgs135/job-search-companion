const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

function safeReadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function getFileMeta(filePath, relativePath) {
  if (!fs.existsSync(filePath)) {
    return {
      path: relativePath,
      exists: false,
      updatedAt: null,
      size: 0
    };
  }

  const stats = fs.statSync(filePath);
  return {
    path: relativePath,
    exists: true,
    updatedAt: stats.mtime.toISOString(),
    size: stats.size
  };
}

function buildRuntimePayload() {
  const statePath = path.join(root, "state.json");
  const jobsPath = path.join(root, "app", "data", "jobs.json");
  const stateData = safeReadJson(statePath, {});
  const jobs = safeReadJson(jobsPath, []);
  const cookies = Array.isArray(stateData.cookies) ? stateData.cookies : [];
  const origins = Array.isArray(stateData.origins) ? stateData.origins : [];
  const authenticated = cookies.some(
    (cookie) =>
      cookie &&
      (
        (cookie.name === "is_login" && String(cookie.value) === "1")
        || cookie.name === "nauk_at"
      )
  );

  return {
    generatedAt: new Date().toISOString(),
    jobs: Array.isArray(jobs) ? jobs : [],
    jobsCount: Array.isArray(jobs) ? jobs.length : 0,
    session: {
      connected: authenticated,
      authenticated,
      hasState: fs.existsSync(statePath),
      cookieCount: cookies.length,
      originCount: origins.length
    },
    files: {
      jobs: getFileMeta(jobsPath, "app/data/jobs.json"),
      state: getFileMeta(statePath, "state.json")
    }
  };
}

function resolveFile(urlPath) {
  const requestPath = urlPath === "/" ? "/index.html" : urlPath;
  const normalized = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const candidate = path.join(root, normalized);

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }

  return path.join(root, "index.html");
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/runtime") {
    const payload = buildRuntimePayload();
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(JSON.stringify(payload));
    return;
  }

  const filePath = resolveFile(url.pathname);
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`JARVIS UI running at http://localhost:${port}`);
});
