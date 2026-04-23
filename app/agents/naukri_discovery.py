from __future__ import annotations

import json
import logging
import random
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from dotenv import load_dotenv
from playwright.sync_api import BrowserContext, Page, TimeoutError as PlaywrightTimeoutError, sync_playwright


ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.append(str(ROOT_DIR))

from app.agents.naukri_login import NaukriLogin, configure_logging, parse_env_bool


LOGGER = logging.getLogger(__name__)
DEFAULT_LOCATIONS = ["Bangalore", "Chennai", "Hyderabad"]
DEFAULT_JOBS_PATH = ROOT_DIR / "app" / "data" / "jobs.json"
DEFAULT_STATE_PATH = ROOT_DIR / "state.json"
DEFAULT_SCREENSHOT_DIR = ROOT_DIR / "debug_artifacts" / "naukri" / "discovery"
JOB_CARD_SELECTORS = (
    ".srp-jobtuple-wrapper",
    "article.jobTuple",
    ".jobTuple",
    "[class*='jobtuple-wrapper']",
    "[class*='jobTuple']",
    "[data-job-id]",
)
RESULT_HINT_SELECTORS = (
    "[class*='tuple-showing']",
    "[class*='count-string']",
    "[class*='pagination']",
    'a[title="Next"]',
    "a:has-text('Next')",
)
PRESERVED_QUEUE_FIELDS = {
    "score",
    "match_score",
    "relevance_score",
    "status",
    "pipeline_status",
    "apply_status",
    "decision",
    "applied_at",
    "application_id",
    "notes",
}


@dataclass
class DiscoveryConfig:
    locations: list[str] = field(default_factory=lambda: list(DEFAULT_LOCATIONS))
    jobs_path: Path = DEFAULT_JOBS_PATH
    state_path: Path = DEFAULT_STATE_PATH
    screenshot_dir: Path = DEFAULT_SCREENSHOT_DIR
    max_pages_per_location: int = 5
    max_jobs_per_run: int = 40
    max_retries: int = 2
    min_delay_seconds: float = 2.0
    max_delay_seconds: float = 6.0
    navigation_timeout_ms: int = 45000
    headless: bool = field(default_factory=lambda: parse_env_bool("PLAYWRIGHT_HEADLESS", False))


class NaukriDiscoveryAgent:
    def __init__(
        self,
        config: DiscoveryConfig | None = None,
        progress_callback: Callable[[dict[str, Any]], None] | None = None,
    ) -> None:
        load_dotenv()
        self.config = config or DiscoveryConfig()
        self.config.jobs_path.parent.mkdir(parents=True, exist_ok=True)
        self.config.screenshot_dir.mkdir(parents=True, exist_ok=True)
        self.found_job_ids: set[str] = set()
        self.new_job_ids: set[str] = set()
        self.progress_callback = progress_callback

    def run(self) -> dict[str, int]:
        merged_jobs = self.load_jobs()
        existing_by_id = self.index_jobs(merged_jobs)
        total_jobs_saved = 0
        session_path = NaukriLogin(
            state_path=self.config.state_path,
            headless=self.config.headless,
        ).ensure_session()

        LOGGER.info("Starting Naukri discovery for locations=%s", ", ".join(self.config.locations))
        self.report_progress(
            currentLocation=None,
            currentPage=0,
            jobsFound=0,
            jobsSaved=0,
            lastMessage="Session ready. Starting discovery.",
        )

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=self.config.headless)
            context = browser.new_context(storage_state=str(session_path))
            context.set_default_timeout(self.config.navigation_timeout_ms)
            page = context.new_page()

            try:
                def handle_page_complete(
                    current_location: str,
                    current_page: int,
                    page_jobs: list[dict[str, Any]],
                ) -> None:
                    nonlocal merged_jobs, existing_by_id, total_jobs_saved

                    if page_jobs:
                        merged_jobs, saved_this_page = self.merge_jobs(merged_jobs, page_jobs)
                        existing_by_id = self.index_jobs(merged_jobs)
                        total_jobs_saved += saved_this_page
                        self.save_jobs(merged_jobs)

                    self.report_progress(
                        currentLocation=current_location,
                        currentPage=current_page,
                        jobsFound=len(self.found_job_ids),
                        jobsSaved=total_jobs_saved,
                        lastMessage=f"{current_location} page {current_page}: {len(page_jobs)} jobs extracted",
                    )

                for location in self.config.locations:
                    if len(self.new_job_ids) >= self.config.max_jobs_per_run:
                        LOGGER.info("Reached run limit of %s jobs", self.config.max_jobs_per_run)
                        break

                    self.report_progress(
                        currentLocation=location,
                        currentPage=0,
                        jobsFound=len(self.found_job_ids),
                        jobsSaved=total_jobs_saved,
                        lastMessage=f"Processing {location}",
                    )
                    self.process_location(
                        page=page,
                        context=context,
                        location=location,
                        existing_by_id=existing_by_id,
                        on_page_complete=handle_page_complete,
                    )
                    self.report_progress(
                        currentLocation=location,
                        currentPage=self.config.max_pages_per_location,
                        jobsFound=len(self.found_job_ids),
                        jobsSaved=total_jobs_saved,
                        lastMessage=f"Completed {location}",
                    )

                context.storage_state(path=str(self.config.state_path))
            finally:
                browser.close()

        result = {
            "total_jobs_found": len(self.found_job_ids),
            "total_jobs_saved": total_jobs_saved,
        }
        self.report_progress(
            currentLocation=None,
            currentPage=0,
            jobsFound=result["total_jobs_found"],
            jobsSaved=result["total_jobs_saved"],
            lastMessage="Discovery completed",
        )
        LOGGER.info("Discovery completed: %s", result)
        return result

    def process_location(
        self,
        page: Page,
        context: BrowserContext,
        location: str,
        existing_by_id: dict[str, dict[str, Any]],
        on_page_complete: Callable[[str, int, list[dict[str, Any]]], None] | None = None,
    ) -> list[dict[str, Any]]:
        slug = self.slugify_location(location)
        target_url = f"https://www.naukri.com/jobs-in-{slug}"
        location_jobs: list[dict[str, Any]] = []

        LOGGER.info("Processing location=%s url=%s", location, target_url)
        try:
            page.goto(
                target_url,
                wait_until="domcontentloaded",
                timeout=self.config.navigation_timeout_ms,
            )
            self.random_delay()
            self.ensure_search_results_loaded(page)
        except Exception as exc:
            LOGGER.error("Failed to load search results for location=%s error=%s", location, exc)
            try:
                self.capture_screenshot(page, f"location-{location}")
                self.write_debug_snapshot(page, f"location-{location}")
            except Exception as screenshot_error:
                LOGGER.warning(
                    "Failed to capture location failure screenshot for location=%s error=%s",
                    location,
                    screenshot_error,
                )
            return []

        current_page = 1
        while current_page <= self.config.max_pages_per_location:
            if len(self.new_job_ids) >= self.config.max_jobs_per_run:
                break

            page_jobs = self.extract_page_jobs(
                page=page,
                context=context,
                location=location,
                existing_by_id=existing_by_id,
            )
            location_jobs.extend(page_jobs)
            LOGGER.info(
                "location=%s page=%s jobs_extracted=%s",
                location,
                current_page,
                len(page_jobs),
            )
            if on_page_complete:
                on_page_complete(location, current_page, page_jobs)

            if current_page >= self.config.max_pages_per_location:
                break
            if len(self.new_job_ids) >= self.config.max_jobs_per_run:
                break
            if not self.go_to_next_page(page):
                LOGGER.info("No additional pages found for location=%s after page=%s", location, current_page)
                break

            current_page += 1

        return location_jobs

    def extract_page_jobs(
        self,
        page: Page,
        context: BrowserContext,
        location: str,
        existing_by_id: dict[str, dict[str, Any]],
    ) -> list[dict[str, Any]]:
        page_jobs: list[dict[str, Any]] = []
        cards = self.extract_job_cards(page)

        for card in cards:
            job_id = card.get("job_id")
            if not job_id:
                continue
            if job_id in self.found_job_ids:
                continue

            self.found_job_ids.add(job_id)
            existing_job = existing_by_id.get(job_id)
            needs_detail_refresh = self.should_extract_details(existing_job)

            if not needs_detail_refresh:
                LOGGER.debug("Skipping detail refresh for existing job_id=%s", job_id)
                continue

            if len(self.new_job_ids) >= self.config.max_jobs_per_run:
                break

            record = self.extract_job_with_retry(context, card, location, existing_job)
            if not record:
                continue

            page_jobs.append(record)
            self.new_job_ids.add(job_id)

        return page_jobs

    def extract_job_cards(self, page: Page) -> list[dict[str, str]]:
        selector = self.find_job_card_selector(page)
        if not selector:
            LOGGER.warning(
                "No job cards found on %s. Selector diagnostics=%s",
                page.url,
                self.collect_selector_diagnostics(page, JOB_CARD_SELECTORS),
            )
            return []

        raw_cards = page.locator(selector).evaluate_all(
            """
            (nodes) => nodes.map((node) => {
              const clean = (value) => (value || '').replace(/\\s+/g, ' ').trim();
              const unique = (items) => [...new Set(items.map(clean).filter(Boolean))];
              const titleLink = node.querySelector(
                "a.title, a[title][href*='job'], a[href*='job-listings'], [class*='row1'] a[href*='job'], a[href*='jobs']"
              );
              const companyNode = node.querySelector(
                ".comp-name, a.comp-name, span.comp-name, [class*='comp-name'], [class*='row2'] a"
              );
              const experienceNode = node.querySelector(".expwdth, [class*='expwdth'], .experience, [class*='experience']");
              const locationNodes = Array.from(
                node.querySelectorAll(
                  ".locWdth, [class*='locWdth'], .location span, [class*='location'], [class*='loc'] span"
                )
              );
              const lines = unique((node.innerText || '').split(/\\n+/));
              const postedDate = lines.find(
                (line) => /^(just now|today|yesterday|\\d+\\s*(?:mins?|minutes?|hours?|days?|weeks?|months?)\\s+ago)$/i.test(line)
              ) || "";

              return {
                job_id_hint: clean(node.getAttribute("data-job-id") || node.dataset?.jobId || ""),
                title: clean(titleLink?.textContent),
                company: clean(companyNode?.textContent),
                location: unique(locationNodes.map((item) => item.textContent || "")).join(", "),
                experience: clean(experienceNode?.textContent),
                posted_date: postedDate,
                job_url: titleLink?.href || titleLink?.getAttribute("href") || "",
              };
            });
            """
        )

        cards: list[dict[str, str]] = []
        for raw_card in raw_cards:
            job_url = self.absolute_url(str(raw_card.get("job_url", "")))
            job_id = self.extract_job_id(job_url) or self.clean_text(raw_card.get("job_id_hint"))
            if not job_id:
                continue

            cards.append(
                {
                    "job_id": job_id,
                    "title": self.clean_text(raw_card.get("title")),
                    "company": self.clean_text(raw_card.get("company")),
                    "location": self.clean_text(raw_card.get("location")),
                    "experience": self.clean_text(raw_card.get("experience")),
                    "posted_date": self.clean_text(raw_card.get("posted_date")),
                    "job_url": job_url,
                }
            )

        return cards

    def extract_job_with_retry(
        self,
        context: BrowserContext,
        card: dict[str, str],
        location: str,
        existing_job: dict[str, Any] | None,
    ) -> dict[str, Any] | None:
        last_error: Exception | None = None

        for attempt in range(1, self.config.max_retries + 2):
            try:
                return self.extract_job_details(context, card, location, existing_job)
            except Exception as exc:
                last_error = exc
                LOGGER.warning(
                    "Job extraction failed for job_id=%s attempt=%s/%s error=%s",
                    card.get("job_id"),
                    attempt,
                    self.config.max_retries + 1,
                    exc,
                )
                if attempt <= self.config.max_retries:
                    self.random_delay(2.0, 4.0)

        LOGGER.error("Skipping job_id=%s after repeated failures: %s", card.get("job_id"), last_error)
        return None

    def extract_job_details(
        self,
        context: BrowserContext,
        card: dict[str, str],
        location: str,
        existing_job: dict[str, Any] | None,
    ) -> dict[str, Any]:
        detail_page = context.new_page()
        detail_page.set_default_timeout(self.config.navigation_timeout_ms)
        job_id = card["job_id"]

        try:
            self.random_delay(1.5, 3.0)
            detail_page.goto(
                card["job_url"],
                wait_until="domcontentloaded",
                timeout=self.config.navigation_timeout_ms,
            )
            self.random_delay(2.0, 4.0)

            detail_payload = detail_page.evaluate(
                """
                () => {
                  const clean = (value) => (value || '').replace(/\\s+/g, ' ').trim();
                  const unique = (items) => [...new Set(items.map(clean).filter(Boolean))];
                  const selectText = (selectors) => {
                    for (const selector of selectors) {
                      const node = document.querySelector(selector);
                      const text = clean(node?.textContent);
                      if (text) {
                        return text;
                      }
                    }
                    return "";
                  };
                  const rawText = document.body?.innerText || "";
                  const bodyText = clean(rawText);
                  const skills = unique(
                    Array.from(
                      document.querySelectorAll(
                        ".styles_chip__7YCfG, [class*='chip'], .key-skill, .tag-li, [data-testid='tag']"
                      )
                    ).map((node) => node.textContent || "")
                  );
                  const roleMatch =
                    rawText.match(/(?:^|\\n)\\s*Role\\s*:\\s*([^\\n]+)/i) ||
                    rawText.match(/(?:^|\\n)\\s*Role Category\\s*:\\s*([^\\n]+)/i);
                  const postedMatch = rawText.match(/(?:^|\\n)\\s*Posted(?:\\s+on)?\\s*:\\s*([^\\n]+)/i);
                  return {
                    jd_text: selectText([
                      ".styles_JDC__dang-inner-html__h0K4t",
                      "[class*='dang-inner-html']",
                      ".job-desc",
                      "[data-testid='job-description']",
                      ".styles_job-desc-container__txpYf"
                    ]) || bodyText,
                    skills,
                    job_role: roleMatch ? clean(roleMatch[1]) : "",
                    posted_date: postedMatch ? clean(postedMatch[1]) : "",
                  };
                }
                """
            )

            jd_text = self.clean_text(detail_payload.get("jd_text"))
            if not jd_text:
                raise RuntimeError("Job description not available")

            skills = self.normalize_skills(detail_payload.get("skills"))
            existing_status = self.clean_text((existing_job or {}).get("status")) or "Queued"
            existing_pipeline_status = self.clean_text((existing_job or {}).get("pipeline_status")) or "Queued"

            return {
                "job_id": job_id,
                "title": card.get("title", ""),
                "company": card.get("company", ""),
                "location": card.get("location") or location,
                "experience": card.get("experience", ""),
                "jd_text": jd_text,
                "skills": skills,
                "job_role": self.clean_text(detail_payload.get("job_role")),
                "posted_date": self.clean_text(detail_payload.get("posted_date")) or card.get("posted_date", ""),
                "job_url": card.get("job_url", ""),
                "source": "naukri",
                "scraped_at": self.utcnow_iso(),
                "status": existing_status,
                "pipeline_status": existing_pipeline_status,
                "search_location": location,
            }
        except Exception:
            try:
                self.capture_screenshot(detail_page, f"job-{job_id}")
            except Exception as screenshot_error:
                LOGGER.warning(
                    "Failed to capture job failure screenshot for job_id=%s error=%s",
                    job_id,
                    screenshot_error,
                )
            raise
        finally:
            try:
                detail_page.close()
            except Exception:
                pass

    def ensure_search_results_loaded(self, page: Page) -> None:
        deadline = time.time() + 20
        last_diagnostics: dict[str, int] = {}
        first_hint_seen_at: float | None = None

        while time.time() < deadline:
            title = self.clean_text(page.title())
            body_text = self.clean_text(page.locator("body").inner_text(timeout=3000))

            if "access denied" in title.lower() or "access denied" in body_text.lower():
                raise RuntimeError(
                    f"Naukri blocked the browser session on {page.url}. Keep discovery headful and slow."
                )

            if "captcha" in title.lower() or "captcha" in body_text.lower():
                raise RuntimeError(f"Captcha detected while loading {page.url}")

            selector = self.find_job_card_selector(page)
            if selector:
                LOGGER.info("Detected job card selector %s on %s", selector, page.url)
                return

            last_diagnostics = self.collect_selector_diagnostics(page, JOB_CARD_SELECTORS + RESULT_HINT_SELECTORS)
            hint_count = sum(last_diagnostics.get(selector_name, 0) for selector_name in RESULT_HINT_SELECTORS)
            if hint_count > 0:
                if first_hint_seen_at is None:
                    first_hint_seen_at = time.time()
                elif time.time() - first_hint_seen_at >= 5:
                    raise RuntimeError(
                        f"Search page loaded but job card selectors no longer match the DOM for {page.url}. "
                        f"Diagnostics={last_diagnostics}"
                    )
            else:
                first_hint_seen_at = None

            time.sleep(1)

        raise RuntimeError(
            f"Search results did not load for {page.url}. Diagnostics={last_diagnostics}"
        )

    def find_job_card_selector(self, page: Page) -> str:
        for selector in JOB_CARD_SELECTORS:
            try:
                locator = page.locator(selector)
                if locator.count() > 0:
                    return selector
            except Exception:
                continue
        return ""

    def collect_selector_diagnostics(
        self,
        page: Page,
        selectors: tuple[str, ...] | list[str],
    ) -> dict[str, int]:
        diagnostics: dict[str, int] = {}
        for selector in selectors:
            try:
                diagnostics[selector] = page.locator(selector).count()
            except Exception:
                diagnostics[selector] = -1
        return diagnostics

    def go_to_next_page(self, page: Page) -> bool:
        next_selectors = (
            'a[title="Next"]',
            "a:has-text('Next')",
            "button:has-text('Next')",
        )

        for selector in next_selectors:
            locator = page.locator(selector).first
            try:
                if not locator.is_visible():
                    continue
                if locator.get_attribute("disabled") is not None:
                    continue

                class_name = (locator.get_attribute("class") or "").lower()
                aria_disabled = (locator.get_attribute("aria-disabled") or "").lower()
                if "disabled" in class_name or aria_disabled == "true":
                    continue

                locator.scroll_into_view_if_needed()
                locator.click(timeout=5000)
                self.random_delay()
                self.ensure_search_results_loaded(page)
                return True
            except Exception:
                continue

        return False

    def load_jobs(self) -> list[dict[str, Any]]:
        if not self.config.jobs_path.exists():
            return []

        try:
            with self.config.jobs_path.open("r", encoding="utf-8") as handle:
                payload = json.load(handle)
                return payload if isinstance(payload, list) else []
        except Exception as exc:
            LOGGER.warning("Failed to read jobs from %s: %s", self.config.jobs_path, exc)
            return []

    def save_jobs(self, jobs: list[dict[str, Any]]) -> None:
        temp_path = self.config.jobs_path.with_suffix(".json.tmp")
        with temp_path.open("w", encoding="utf-8") as handle:
            json.dump(jobs, handle, indent=2, ensure_ascii=False)
        temp_path.replace(self.config.jobs_path)

    def report_progress(self, **payload: Any) -> None:
        if not self.progress_callback:
            return
        try:
            self.progress_callback(payload)
        except Exception as exc:
            LOGGER.debug("Progress callback failed: %s", exc)

    def merge_jobs(
        self,
        existing_jobs: list[dict[str, Any]],
        discovered_jobs: list[dict[str, Any]],
    ) -> tuple[list[dict[str, Any]], int]:
        merged_by_id = {
            self.clean_text(job.get("job_id")): job
            for job in existing_jobs
            if self.clean_text(job.get("job_id"))
        }
        saved_count = 0

        for job in discovered_jobs:
            job_id = self.clean_text(job.get("job_id"))
            if not job_id:
                continue

            existing = merged_by_id.get(job_id)
            if existing:
                merged = {**existing, **job}
                for field_name in PRESERVED_QUEUE_FIELDS:
                    existing_value = existing.get(field_name)
                    if existing_value not in (None, "", [], {}):
                        merged[field_name] = existing_value
                merged_by_id[job_id] = merged
                continue

            merged_by_id[job_id] = job
            saved_count += 1

        merged_jobs = sorted(
            merged_by_id.values(),
            key=lambda item: self.clean_text(item.get("scraped_at")),
            reverse=True,
        )
        return merged_jobs, saved_count

    def index_jobs(self, jobs: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
        return {
            self.clean_text(job.get("job_id")): job
            for job in jobs
            if self.clean_text(job.get("job_id"))
        }

    def should_extract_details(self, existing_job: dict[str, Any] | None) -> bool:
        if not existing_job:
            return True

        required_fields = (
            "jd_text",
            "job_role",
            "posted_date",
            "skills",
        )
        return any(not existing_job.get(field_name) for field_name in required_fields)

    def capture_screenshot(self, page: Page, prefix: str) -> Path:
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        safe_prefix = re.sub(r"[^a-zA-Z0-9_-]+", "-", prefix).strip("-") or "naukri-error"
        target = self.config.screenshot_dir / f"{safe_prefix}-{timestamp}.png"
        page.screenshot(path=str(target), full_page=True)
        LOGGER.info("Saved failure screenshot to %s", target)
        return target

    def write_debug_snapshot(self, page: Page, prefix: str) -> Path:
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        safe_prefix = re.sub(r"[^a-zA-Z0-9_-]+", "-", prefix).strip("-") or "naukri-debug"
        target = self.config.screenshot_dir / f"{safe_prefix}-{timestamp}.html"
        target.write_text(page.content(), encoding="utf-8")
        LOGGER.info("Saved debug HTML snapshot to %s", target)
        return target

    def random_delay(self, min_seconds: float | None = None, max_seconds: float | None = None) -> None:
        lower = self.config.min_delay_seconds if min_seconds is None else min_seconds
        upper = self.config.max_delay_seconds if max_seconds is None else max_seconds
        time.sleep(random.uniform(lower, upper))

    def normalize_skills(self, skills: Any) -> list[str]:
        if not isinstance(skills, list):
            return []
        cleaned: list[str] = []
        seen: set[str] = set()
        for skill in skills:
            text = self.clean_text(skill)
            if not text:
                continue
            lower_text = text.lower()
            if lower_text in seen:
                continue
            seen.add(lower_text)
            cleaned.append(text)
        return cleaned[:20]

    def absolute_url(self, url: str) -> str:
        cleaned = self.clean_text(url)
        if not cleaned:
            return ""
        if cleaned.startswith("http://") or cleaned.startswith("https://"):
            return cleaned
        return f"https://www.naukri.com{cleaned}"

    def extract_job_id(self, job_url: str) -> str:
        if not job_url:
            return ""

        patterns = (
            r"job-listings-[^-]+-(\d{6,})",
            r"-(\d{6,})(?:\?|$)",
            r"[?&](?:jk|jobId|jobid)=(\d+)",
            r"(\d{6,})",
        )

        for pattern in patterns:
            matches = re.findall(pattern, job_url)
            if matches:
                return matches[-1]
        return ""

    def slugify_location(self, location: str) -> str:
        return re.sub(r"[^a-z0-9]+", "-", location.strip().lower()).strip("-")

    def clean_text(self, value: Any) -> str:
        if value is None:
            return ""
        text = str(value)
        return re.sub(r"\s+", " ", text).strip()

    def utcnow_iso(self) -> str:
        return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main() -> None:
    configure_logging()
    result = NaukriDiscoveryAgent().run()
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
