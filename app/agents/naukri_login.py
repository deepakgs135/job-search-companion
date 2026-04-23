from __future__ import annotations

import logging
import os
import random
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from dotenv import load_dotenv
from playwright.sync_api import Locator, Page, TimeoutError as PlaywrightTimeoutError, sync_playwright


LOGGER = logging.getLogger(__name__)
ROOT_DIR = Path(__file__).resolve().parents[2]
DEFAULT_STATE_PATH = ROOT_DIR / "state.json"
DEFAULT_SCREENSHOT_DIR = ROOT_DIR / "debug_artifacts" / "naukri" / "login"

LOGIN_BUTTON_SELECTORS = (
    'a[data-ga-track*="Login"]',
    "a[href*='login']",
    ".login-layer",
    "button:has-text('Login')",
)

EMAIL_INPUT_SELECTORS = (
    'input[placeholder*="Email"]',
    "#usernameField",
    'input[name="username"]',
    'input[type="email"]',
)

PASSWORD_INPUT_SELECTORS = (
    'input[placeholder*="password"]',
    "#passwordField",
    'input[name="password"]',
    'input[type="password"]',
)

SUBMIT_BUTTON_SELECTORS = (
    'button[type="submit"]',
    "button:has-text('Login')",
    'input[type="submit"]',
)

SUCCESS_SELECTORS = (
    'a[data-ga-track*="Profile"]',
    "text=/View profile/i",
    "text=/Profile performance/i",
    "text=/Recommended jobs/i",
)

POST_LOGIN_POPUP_SELECTORS = (
    'button[aria-label="Close"]',
    "button:has-text('Close')",
    '[class*="close"]',
    ".modal-close",
    ".popup-close",
)


def configure_logging(level: int = logging.INFO) -> None:
    if not logging.getLogger().handlers:
        logging.basicConfig(
            level=level,
            format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        )


def parse_env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


@dataclass
class NaukriLoginConfig:
    state_path: Path = DEFAULT_STATE_PATH
    screenshot_dir: Path = DEFAULT_SCREENSHOT_DIR
    base_url: str = "https://www.naukri.com"
    headless: bool = parse_env_bool("PLAYWRIGHT_HEADLESS", False)
    navigation_timeout_ms: int = 45000


class NaukriLogin:
    def __init__(
        self,
        state_path: str | Path | None = None,
        screenshot_dir: str | Path | None = None,
        headless: bool | None = None,
    ) -> None:
        load_dotenv()
        self.email = os.getenv("NAUKRI_EMAIL")
        self.password = os.getenv("NAUKRI_PASSWORD")
        self.config = NaukriLoginConfig(
            state_path=Path(state_path) if state_path else DEFAULT_STATE_PATH,
            screenshot_dir=Path(screenshot_dir) if screenshot_dir else DEFAULT_SCREENSHOT_DIR,
            headless=parse_env_bool("PLAYWRIGHT_HEADLESS", False) if headless is None else headless,
        )
        self.config.state_path.parent.mkdir(parents=True, exist_ok=True)
        self.config.screenshot_dir.mkdir(parents=True, exist_ok=True)

    def human_delay(self, min_seconds: float = 1.0, max_seconds: float = 3.0) -> None:
        time.sleep(random.uniform(min_seconds, max_seconds))

    def ensure_session(self) -> Path:
        if self.is_session_valid():
            LOGGER.info("Reusing authenticated Naukri session from %s", self.config.state_path)
            return self.config.state_path

        LOGGER.info("Existing Naukri session is missing or invalid. Starting login flow.")
        self.login()
        return self.config.state_path

    def is_session_valid(self) -> bool:
        if not self.config.state_path.exists():
            LOGGER.info("Session state file %s not found", self.config.state_path)
            return False

        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(headless=self.config.headless)
                context = browser.new_context(storage_state=str(self.config.state_path))
                page = context.new_page()
                self._goto_home(page)
                self.human_delay(1.0, 2.0)
                valid = self.is_login_successful(page)
                browser.close()
                return valid
        except Exception as exc:
            LOGGER.warning("Unable to validate saved Naukri session: %s", exc)
            return False

    def login(self) -> str:
        self._require_credentials()

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=self.config.headless)
            context = browser.new_context()
            page = context.new_page()
            page.set_default_timeout(self.config.navigation_timeout_ms)

            try:
                self._goto_home(page)
                self.human_delay(1.0, 2.5)

                if self.is_login_successful(page):
                    LOGGER.info("Session already authenticated after homepage load")
                    self.save_storage_state(context)
                    browser.close()
                    return "Login Successful"

                login_button = self.find_first_visible(page, LOGIN_BUTTON_SELECTORS, timeout_ms=7000)
                if not login_button:
                    raise RuntimeError("Could not locate Naukri login button")

                login_button.click()
                self.human_delay(1.0, 2.0)

                email_input = self.find_first_visible(page, EMAIL_INPUT_SELECTORS, timeout_ms=10000)
                password_input = self.find_first_visible(page, PASSWORD_INPUT_SELECTORS, timeout_ms=10000)
                submit_button = self.find_first_visible(page, SUBMIT_BUTTON_SELECTORS, timeout_ms=10000)

                if not email_input or not password_input or not submit_button:
                    raise RuntimeError("Could not locate one or more login form controls")

                self.slow_fill(email_input, self.email or "")
                self.human_delay(0.5, 1.2)
                self.slow_fill(password_input, self.password or "")
                self.human_delay(0.8, 1.5)

                submit_button.click()
                self.human_delay(4.0, 6.0)
                self.close_post_login_popup(page)

                if not self.is_login_successful(page):
                    raise RuntimeError("Login completed but no authenticated state was detected")

                self.save_storage_state(context)
                LOGGER.info("Naukri login succeeded. Session stored in %s", self.config.state_path)
                browser.close()
                return "Login Successful"
            except Exception:
                try:
                    self.capture_screenshot(page, "login_failure")
                except Exception as screenshot_error:
                    LOGGER.warning("Failed to capture login failure screenshot: %s", screenshot_error)
                browser.close()
                raise

    def save_storage_state(self, context) -> None:
        context.storage_state(path=str(self.config.state_path))

    def close_post_login_popup(self, page: Page) -> bool:
        popup_button = self.find_first_visible(page, POST_LOGIN_POPUP_SELECTORS, timeout_ms=2500)
        if not popup_button:
            return False

        try:
            popup_button.click(timeout=3000)
            self.human_delay(0.5, 1.0)
            LOGGER.info("Closed post-login popup")
            return True
        except Exception as exc:
            LOGGER.debug("Popup close attempt failed: %s", exc)
            return False

    def is_login_successful(self, page: Page) -> bool:
        current_url = page.url.lower()
        if "/mnuser/" in current_url or "/homepage" in current_url:
            return True

        for selector in SUCCESS_SELECTORS:
            try:
                locator = page.locator(selector).first
                if locator.is_visible():
                    return True
            except Exception:
                continue

        for selector in LOGIN_BUTTON_SELECTORS:
            try:
                locator = page.locator(selector).first
                if locator.is_visible():
                    return False
            except Exception:
                continue

        return False

    def slow_fill(self, locator: Locator, value: str) -> None:
        locator.click()
        locator.fill("")
        for character in value:
            locator.type(character, delay=random.randint(70, 160))

    def capture_screenshot(self, page: Page, prefix: str) -> Path:
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        screenshot_path = self.config.screenshot_dir / f"{prefix}-{timestamp}.png"
        page.screenshot(path=str(screenshot_path), full_page=True)
        LOGGER.info("Saved screenshot to %s", screenshot_path)
        return screenshot_path

    def find_first_visible(
        self,
        page: Page,
        selectors: Iterable[str],
        timeout_ms: int = 5000,
    ) -> Locator | None:
        for selector in selectors:
            locator = page.locator(selector).first
            try:
                locator.wait_for(state="visible", timeout=timeout_ms)
                return locator
            except PlaywrightTimeoutError:
                continue
            except Exception:
                continue
        return None

    def _goto_home(self, page: Page) -> None:
        LOGGER.info("Navigating to %s", self.config.base_url)
        page.goto(
            self.config.base_url,
            wait_until="domcontentloaded",
            timeout=self.config.navigation_timeout_ms,
        )

    def _require_credentials(self) -> None:
        if self.email and self.password:
            return
        raise ValueError(
            "NAUKRI_EMAIL and NAUKRI_PASSWORD must be set in the .env file when a new login is required."
        )


if __name__ == "__main__":
    configure_logging()
    client = NaukriLogin()
    print(client.login())
