from __future__ import annotations

import json
import logging
import os
import subprocess
import sys
import threading
from collections import deque
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_file

from app.agents.naukri_discovery import DEFAULT_LOCATIONS
from app.agents.naukri_login import configure_logging


ROOT_DIR = Path(__file__).resolve().parent
DATA_DIR = ROOT_DIR / "app" / "data"
JOBS_PATH = DATA_DIR / "jobs.json"
STATE_PATH = ROOT_DIR / "state.json"
DISCOVERY_STATUS_PATH = DATA_DIR / "discovery_status.json"
PUBLIC_STATIC_FILES = {
    ROOT_DIR / "index.html",
    ROOT_DIR / "app.js",
    ROOT_DIR / "styles.css",
}


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def safe_read_json(path: Path, fallback: Any) -> Any:
    try:
        if not path.exists():
            return fallback
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return fallback


def safe_write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = path.with_suffix(f"{path.suffix}.tmp")
    temp_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    temp_path.replace(path)


def default_discovery_status() -> dict[str, Any]:
    return {
        "running": False,
        "startedAt": None,
        "finishedAt": None,
        "lastResult": None,
        "lastError": "",
        "locations": list(DEFAULT_LOCATIONS),
        "pid": None,
        "progress": {
            "currentLocation": None,
            "currentPage": 0,
            "jobsFound": 0,
            "jobsSaved": 0,
            "lastMessage": "",
            "updatedAt": None,
        },
    }


def is_process_alive(pid: int | None) -> bool:
    if not pid:
        return False
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


def ensure_runtime_files() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not JOBS_PATH.exists():
        JOBS_PATH.write_text("[]\n", encoding="utf-8")
    if not DISCOVERY_STATUS_PATH.exists():
        safe_write_json(DISCOVERY_STATUS_PATH, default_discovery_status())


def get_file_meta(path: Path, relative_path: str) -> dict[str, Any]:
    if not path.exists():
        return {
            "path": relative_path,
            "exists": False,
            "updatedAt": None,
            "size": 0,
        }

    stats = path.stat()
    return {
        "path": relative_path,
        "exists": True,
        "updatedAt": datetime.fromtimestamp(stats.st_mtime, tz=timezone.utc).isoformat().replace("+00:00", "Z"),
        "size": stats.st_size,
    }


class RuntimeLogHandler(logging.Handler):
    def __init__(self, max_entries: int = 250) -> None:
        super().__init__(level=logging.INFO)
        self.entries: deque[dict[str, str]] = deque(maxlen=max_entries)
        self._lock = threading.Lock()

    def emit(self, record: logging.LogRecord) -> None:
        entry = {
            "time": datetime.fromtimestamp(record.created, tz=timezone.utc).isoformat().replace("+00:00", "Z"),
            "level": record.levelname.lower(),
            "text": record.getMessage(),
        }
        with self._lock:
            self.entries.appendleft(entry)

    def dump(self) -> list[dict[str, str]]:
        with self._lock:
            return list(self.entries)


class DiscoveryManager:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self.process: subprocess.Popen[str] | None = None

    def start(self, locations: list[str] | None = None) -> tuple[bool, dict[str, Any]]:
        normalized_locations = normalize_locations(locations)
        with self._lock:
            current = self._snapshot_locked()
            if current.get("running"):
                return False, current

            status = default_discovery_status()
            status["running"] = True
            status["startedAt"] = utcnow_iso()
            status["locations"] = normalized_locations
            status["progress"] = {
                **status["progress"],
                "lastMessage": "Discovery queued",
                "updatedAt": utcnow_iso(),
            }

            try:
                process = subprocess.Popen(
                    [
                        sys.executable,
                        "-m",
                        "app.discovery_worker",
                        "--locations-json",
                        json.dumps(normalized_locations),
                    ],
                    cwd=str(ROOT_DIR),
                )
            except Exception as exc:
                status["running"] = False
                status["finishedAt"] = utcnow_iso()
                status["lastError"] = str(exc)
                status["progress"] = {
                    **status["progress"],
                    "lastMessage": str(exc),
                    "updatedAt": utcnow_iso(),
                }
                safe_write_json(DISCOVERY_STATUS_PATH, status)
                return False, status

            status["pid"] = process.pid
            safe_write_json(DISCOVERY_STATUS_PATH, status)
            self.process = process
            return True, status

    def snapshot(self) -> dict[str, Any]:
        with self._lock:
            return self._snapshot_locked()

    def _snapshot_locked(self) -> dict[str, Any]:
        status = safe_read_json(DISCOVERY_STATUS_PATH, default_discovery_status())
        if not isinstance(status, dict):
            status = default_discovery_status()

        process = self.process
        if process and process.poll() is not None:
            if status.get("running"):
                status["running"] = False
                status["finishedAt"] = status.get("finishedAt") or utcnow_iso()
                if process.returncode not in (0, None) and not status.get("lastError"):
                    status["lastError"] = f"Discovery process exited with code {process.returncode}"
                    progress = status.get("progress", {}) or {}
                    status["progress"] = {
                        **progress,
                        "lastMessage": status["lastError"],
                        "updatedAt": utcnow_iso(),
                    }
                safe_write_json(DISCOVERY_STATUS_PATH, status)
            self.process = None
        elif status.get("running") and not process and not is_process_alive(status.get("pid")):
            status["running"] = False
            status["finishedAt"] = status.get("finishedAt") or utcnow_iso()
            if not status.get("lastError"):
                status["lastError"] = "Discovery worker is no longer running."
                progress = status.get("progress", {}) or {}
                status["progress"] = {
                    **progress,
                    "lastMessage": status["lastError"],
                    "updatedAt": utcnow_iso(),
                }
            safe_write_json(DISCOVERY_STATUS_PATH, status)

        return status


def normalize_locations(locations: list[str] | None) -> list[str]:
    cleaned = []
    seen: set[str] = set()
    for location in locations or DEFAULT_LOCATIONS:
        value = str(location).strip()
        if not value:
            continue
        lower_value = value.lower()
        if lower_value in seen:
            continue
        seen.add(lower_value)
        cleaned.append(value)
    return cleaned or list(DEFAULT_LOCATIONS)


def build_runtime_payload() -> dict[str, Any]:
    ensure_runtime_files()
    state_data = safe_read_json(STATE_PATH, {})
    jobs = safe_read_json(JOBS_PATH, [])
    discovery = DISCOVERY_MANAGER.snapshot()
    cookies = state_data.get("cookies", []) if isinstance(state_data, dict) else []
    origins = state_data.get("origins", []) if isinstance(state_data, dict) else []
    authenticated = any(
        cookie
        and (
            (cookie.get("name") == "is_login" and str(cookie.get("value")) == "1")
            or cookie.get("name") == "nauk_at"
        )
        for cookie in cookies
    )

    return {
        "generatedAt": utcnow_iso(),
        "jobs": jobs if isinstance(jobs, list) else [],
        "jobsCount": len(jobs) if isinstance(jobs, list) else 0,
        "session": {
            "connected": authenticated,
            "authenticated": authenticated,
            "hasState": STATE_PATH.exists(),
            "cookieCount": len(cookies) if isinstance(cookies, list) else 0,
            "originCount": len(origins) if isinstance(origins, list) else 0,
        },
        "files": {
            "jobs": get_file_meta(JOBS_PATH, "app/data/jobs.json"),
            "state": get_file_meta(STATE_PATH, "state.json"),
            "discovery": get_file_meta(DISCOVERY_STATUS_PATH, "app/data/discovery_status.json"),
        },
        "discovery": discovery,
        "logs": LOG_HANDLER.dump(),
    }


def resolve_static_path(request_path: str) -> Path:
    target_name = (request_path or "index.html").strip("/\\")
    target = (ROOT_DIR / target_name).resolve()
    if target in PUBLIC_STATIC_FILES:
        return target
    return ROOT_DIR / "index.html"


configure_logging()
LOG_HANDLER = RuntimeLogHandler()
root_logger = logging.getLogger()
if not any(isinstance(handler, RuntimeLogHandler) for handler in root_logger.handlers):
    root_logger.addHandler(LOG_HANDLER)

DISCOVERY_MANAGER = DiscoveryManager()
ensure_runtime_files()
APP = Flask(__name__, static_folder=None)


@APP.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@APP.get("/api/runtime")
def api_runtime():
    response = jsonify(build_runtime_payload())
    response.headers["Cache-Control"] = "no-store"
    return response


@APP.post("/api/discovery/start")
def api_discovery_start():
    payload = request.get_json(silent=True) or {}
    locations = payload.get("locations") if isinstance(payload, dict) else None
    started, snapshot = DISCOVERY_MANAGER.start(locations if isinstance(locations, list) else None)
    status_code = 202 if started else 200
    response = jsonify(
        {
            "started": started,
            "discovery": snapshot,
        }
    )
    response.headers["Cache-Control"] = "no-store"
    return response, status_code


@APP.get("/")
def serve_index():
    return send_file(ROOT_DIR / "index.html")


@APP.get("/<path:request_path>")
def serve_static(request_path: str):
    return send_file(resolve_static_path(request_path))


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    APP.run(host="127.0.0.1", port=port, debug=False, threaded=True, use_reloader=False)
