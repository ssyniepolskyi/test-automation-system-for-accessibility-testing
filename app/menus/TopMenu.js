import { expect } from "@playwright/test";
import { BASE_URL, CREATE_PAGE_URL, TASKS_PAGE_URL } from "../constants.js";

class TopMenu {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.menu = page.locator('ul[automation-id="navigation-menu"]');
    this.menuItemCreate = page.locator('li[automation-id="menu-item"] a:has-text("Створити")');
    this.menuItemLogout = page.locator('li[automation-id="menu-item"] a:has-text("Вийти")');
    this.menuItemTasks = page.locator('li[automation-id="menu-item"] a:has-text("Справи")');
  }

  async gotoLogout() {
    await this.menuItemLogout.click();
    await expect(this.page).toHaveURL(BASE_URL)
  }

  async gotoCreate() {
    await this.menuItemCreate.click();
    await expect(this.page).toHaveURL(CREATE_PAGE_URL)
  }

  async gotoTasks() {
    await this.menuItemTasks.click();
    await expect(this.page).toHaveURL(TASKS_PAGE_URL)
  }

  async checkMenuIsEnabled() {
    await expect(this.menu).toBeVisible();
    await expect(this.menuItemTasks).toBeEnabled()
    await expect(this.menuItemCreate).toBeEnabled()
    await expect(this.menuItemLogout).toBeEnabled()
  }

}

export default TopMenu;
