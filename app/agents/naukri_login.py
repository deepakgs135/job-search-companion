import os
import time
import random
import logging
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class NaukriLogin:
    def __init__(self):
        load_dotenv()
        self.email = os.getenv('NAUKRI_EMAIL')
        self.password = os.getenv('NAUKRI_PASSWORD')
        if not self.email or not self.password:
            raise ValueError("NAUKRI_EMAIL and NAUKRI_PASSWORD must be set in .env file")
        self.cookies_file = 'naukri_cookies.json'

    def human_delay(self, min_sec=1, max_sec=3):
        delay = random.uniform(min_sec, max_sec)
        time.sleep(delay)

    def slow_type(self, element, text):
        for char in text:
            element.type(char)
            time.sleep(random.uniform(0.1, 0.3))

    def save_cookies(self, context):
        cookies = context.cookies()
        with open(self.cookies_file, 'w') as f:
            import json
            json.dump(cookies, f)
        logging.info("Cookies saved to file")

    def load_cookies(self, context):
        if os.path.exists(self.cookies_file):
            with open(self.cookies_file, 'r') as f:
                import json
                cookies = json.load(f)
                context.add_cookies(cookies)
            logging.info("Cookies loaded from file")
            return True
        return False

    def close_post_login_popup(self, page):
        logging.info("Checking for post-login popup close button")
        popup_selectors = [
            'button[aria-label="Close"]',
            'button:has-text("Close")',
            'button:has-text("×")',
            'button:has-text("x")',
            'button[class*="close"]',
            'div[class*="close"]',
            '.modal-close',
            '.popup-close',
            '.close-btn',
            '.dialog-close'
        ]
        for selector in popup_selectors:
            try:
                close_button = page.locator(selector).first
                if close_button.is_visible():
                    logging.info(f"Closing popup using selector: {selector}")
                    close_button.click()
                    self.human_delay(0.5, 1.2)
                    return True
            except Exception:
                continue
        logging.info("No post-login popup close button found")
        return False

    def is_login_successful(self, page):
        success_selectors = [
            'a[data-ga-track="Main Navigation Profile|Profile Icon"]',
            'text=View profile',
            'button:has-text("View profile")',
            'text=Profile performance',
            'div:has-text("Deepak")',
        ]
        for selector in success_selectors:
            try:
                locator = page.locator(selector).first
                if locator.is_visible():
                    logging.info(f"Found login success indicator: {selector}")
                    return True
            except Exception:
                continue
        current_url = page.url
        if '/mnuser/homepage' in current_url or '/homepage' in current_url:
            logging.info(f"Detected logged-in homepage URL: {current_url}")
            return True
        return False

    def login(self):
        logging.info("Starting Naukri login process")
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=False)  # Non-headless for debugging
            context = browser.new_context()

            # Try to load existing session
            if self.load_cookies(context):
                page = context.new_page()
                page.goto('https://www.naukri.com')
                self.human_delay()
                # Check if already logged in
                if page.locator('a[data-ga-track="Main Navigation Profile|Profile Icon"]').is_visible():
                    logging.info("Already logged in via saved session")
                    browser.close()
                    return "Login Successful"
                else:
                    logging.info("Saved session expired, proceeding with login")

            page = context.new_page()
            logging.info("Navigating to https://www.naukri.com")
            page.goto('https://www.naukri.com')
            self.human_delay()

            # Click login button
            logging.info("Clicking login button")
            # Try multiple possible selectors for login button
            login_selectors = [
                'a[data-ga-track="Main Navigation Login|Login Icon"]',
                '.login-layer',
                'a[href*="login"]',
                'button:contains("Login")'
            ]
            login_button = None
            for selector in login_selectors:
                try:
                    login_button = page.locator(selector).first
                    if login_button.is_visible():
                        break
                except:
                    continue
            if not login_button:
                logging.error("Login button not found")
                page.screenshot(path='login_button_not_found.png')
                browser.close()
                return "Login Failed"
            login_button.click()
            page.wait_for_load_state('networkidle')
            self.human_delay()
            page.screenshot(path='after_login_click.png')
            logging.info("Screenshot saved after login click")
            # Debug: Log visible inputs
            inputs = page.locator('input').all()
            logging.info(f"Visible inputs: {len(inputs)}")
            for i, inp in enumerate(inputs):
                try:
                    tag = inp.evaluate('el => el.outerHTML')
                    logging.info(f"Input {i}: {tag}")
                except:
                    logging.info(f"Input {i}: could not get HTML")
            # Check for iframes
            iframes = page.locator('iframe').all()
            logging.info(f"Visible iframes: {len(iframes)}")
            for i, iframe in enumerate(iframes):
                try:
                    src = iframe.get_attribute('src')
                    logging.info(f"Iframe {i}: src={src}")
                except:
                    logging.info(f"Iframe {i}: could not get src")
            # Log buttons
            buttons = page.locator('button').all()
            logging.info(f"Visible buttons: {len(buttons)}")
            for i, btn in enumerate(buttons):
                try:
                    text = btn.text_content()
                    logging.info(f"Button {i}: {text}")
                except:
                    logging.info(f"Button {i}: could not get text")

            # Fill email
            logging.info("Waiting for email input field")
            # Try multiple selectors for email
            email_selectors = ['input[placeholder="Enter your active Email ID / Username"]', '#usernameField', 'input[type="email"]', 'input[name="username"]', 'input[placeholder*="email"]']
            email_input = None
            for selector in email_selectors:
                try:
                    email_input = page.locator(selector).first
                    email_input.wait_for(state='visible', timeout=5000)
                    break
                except:
                    continue
            if not email_input:
                logging.error("Email input field not found")
                page.screenshot(path='email_not_found.png')
                browser.close()
                return "Login Failed"
            logging.info(f"Filling email: {self.email}")
            self.slow_type(email_input, self.email)
            self.human_delay()
            # Debug: Check filled value
            filled_email = email_input.input_value()
            logging.info(f"Email field filled with: {filled_email}")
            if filled_email != self.email:
                logging.error("Email not filled correctly!")

            # Fill password
            logging.info("Filling password")
            # Try multiple selectors for password
            password_selectors = ['input[placeholder="Enter your password"]', '#passwordField', 'input[type="password"]', 'input[name="password"]']
            password_input = None
            for selector in password_selectors:
                try:
                    password_input = page.locator(selector).first
                    if password_input.is_visible():
                        break
                except:
                    continue
            if not password_input:
                logging.error("Password input field not found")
                page.screenshot(path='password_not_found.png')
                browser.close()
                return "Login Failed"
            self.slow_type(password_input, self.password)
            self.human_delay()
            # Debug: Check filled value (password might be masked, but check length)
            filled_password = password_input.input_value()
            logging.info(f"Password field length: {len(filled_password)} (expected: {len(self.password)})")
            if len(filled_password) != len(self.password):
                logging.error("Password not filled correctly!")

            # Submit
            logging.info("Submitting login form")
            submit_selectors = ['button[type="submit"]', 'button:contains("Login")', 'input[type="submit"]']
            submit_button = None
            for selector in submit_selectors:
                try:
                    submit_button = page.locator(selector).first
                    if submit_button.is_visible():
                        break
                except:
                    continue
            if not submit_button:
                logging.error("Submit button not found")
                page.screenshot(path='submit_not_found.png')
                browser.close()
                return "Login Failed"
            submit_button.click()
            self.human_delay(2, 5)  # Wait a bit longer for login

            # Check for success
            logging.info("Checking for login success indicator")
            page.wait_for_load_state('networkidle')
            self.human_delay(1, 2)
            try:
                if self.is_login_successful(page):
                    logging.info("Login successful")
                    if self.close_post_login_popup(page):
                        logging.info("Post-login popup closed")
                    else:
                        logging.info("No popup to close after login")
                    self.save_cookies(context)
                    browser.close()
                    return "Login Successful"
                logging.error("Login not successful: success indicators not found")
            except Exception as e:
                logging.error(f"Login failed: {e}")

            # Check for error messages
            error_locator = page.locator('.error-msg')
            try:
                if error_locator.is_visible():
                    error_msg = error_locator.text_content()
                    logging.error(f"Error message: {error_msg}")
                else:
                    logging.error("No error message visible")
            except Exception:
                logging.error("Unable to read error message")
            # Take screenshot for debug
            page.screenshot(path='login_failure.png')
            logging.info("Screenshot saved as login_failure.png")
            browser.close()
            return "Login Failed"

if __name__ == "__main__":
    login_module = NaukriLogin()
    result = login_module.login()
    print(result)