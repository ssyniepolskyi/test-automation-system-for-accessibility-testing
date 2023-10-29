class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url, mandatoryElement) {
    await this.page.goto(url);
    await mandatoryElement.waitFor({ timeout: 12000 });
  }
}

export default BasePage;