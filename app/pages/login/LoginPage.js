import BasePage from "../BasePage.js";
import { BASE_URL, CREATE_PAGE_URL, TASKS_PAGE_URL } from "../../constants.js";

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.locator('[automation-id="email-input"]');
    this.passwordInput = page.locator('[automation-id="password-input"]');
    this.loginButton = page.locator('[automation-id="login-btn"]');
    this.registerButton = page.locator('[automation-id="register-btn"]');
    this.toastMessage = page.locator('div[id="toast-container"] div[class="toast"]')
    this.toastMessageByText = (messageText) => page.locator(`.toast:has-text("${messageText}")`)
  }

  // async url() {
  //   await super.goto('http://localhost:3000/', this.emailInput);
  // }

  async mandatoryElement() {
    return this.emailInput;
  }

  async goto() {
    await super.goto(BASE_URL, this.emailInput);
  }

  async fillAuthInputs(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async registration(email, password) {
    await this.fillAuthInputs(email, password);
    await this.registerButton.click();
  }

  async loginWithUncorrectData(email, password) {
    await this.fillAuthInputs(email, password);
    await this.loginButton.click();
  }

  async loginWithCorrectData(email, password) {
    await this.fillAuthInputs(email, password);
    await this.loginButton.click();
    await this.page.waitForNavigation();
    await this.page.goto(CREATE_PAGE_URL);
  }
}

export default LoginPage;
