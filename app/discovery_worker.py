from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from app.agents.naukri_discovery import DiscoveryConfig, NaukriDiscoveryAgent
from app.agents.naukri_login import configure_logging, parse_env_bool


ROOT_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT_DIR / "app" / "data"
JOBS_PATH = DATA_DIR / "jobs.json"
STATE_PATH = ROOT_DIR / "state.json"
DISCOVERY_STATUS_PATH = DATA_DIR / "discovery_status.json"


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


def load_status() -> dict[str, Any]:
    fallback = {
        "running": False,
        "startedAt": None,
        "finishedAt": None,
        "lastResult": None,
        "lastError": "",
        "locations": [],
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
    payload = safe_read_json(DISCOVERY_STATUS_PATH, fallback)
    return payload if isinstance(payload, dict) else fallback


def update_status(**updates: Any) -> None:
    status = load_status()
    progress_update = updates.pop("progress", None)
    status = {**status, **updates}
    if progress_update:
        current_progress = status.get("progress", {}) or {}
        status["progress"] = {
            **current_progress,
            **progress_update,
            "updatedAt": utcnow_iso(),
        }
    safe_write_json(DISCOVERY_STATUS_PATH, status)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--locations-json", required=True)
    args = parser.parse_args()

    locations = json.loads(args.locations_json)
    configure_logging()
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not JOBS_PATH.exists():
        JOBS_PATH.write_text("[]\n", encoding="utf-8")

    update_status(
        running=True,
        lastError="",
        lastResult=None,
        finishedAt=None,
        locations=locations,
        progress={"lastMessage": "Worker started"},
    )

    try:
        config = DiscoveryConfig(
            locations=locations,
            jobs_path=JOBS_PATH,
            state_path=STATE_PATH,
            headless=parse_env_bool("PLAYWRIGHT_HEADLESS", False),
        )
        result = NaukriDiscoveryAgent(
            config,
            progress_callback=lambda payload: update_status(progress=payload),
        ).run()
        update_status(
            running=False,
            finishedAt=utcnow_iso(),
            lastError="",
            lastResult=result,
            progress={
                "jobsFound": result.get("total_jobs_found", 0),
                "jobsSaved": result.get("total_jobs_saved", 0),
                "lastMessage": "Discovery completed",
            },
        )
        return 0
    except Exception as exc:
        update_status(
            running=False,
            finishedAt=utcnow_iso(),
            lastError=str(exc),
            progress={"lastMessage": str(exc)},
        )
        raise


if __name__ == "__main__":
    raise SystemExit(main())
