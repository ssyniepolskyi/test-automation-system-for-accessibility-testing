import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";
import TopMenu from "../../menus/TopMenu.js";
import { CREATE_PAGE_URL } from "../../constants.js";

class CreateTaskPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.topMenu = new TopMenu(page);
    this.taskNameInput = page.locator('[automation-id="task-name-input"]');
    this.addTaskBtn = page.locator('[automation-id="add-task-btn"]')
  }

  async goto() {
    await super.goto(CREATE_PAGE_URL, this.taskNameInput);
  }


  async createNewTask(TaskName) {
    await this.taskNameInput.fill(TaskName);
    await expect(this.taskNameInput).toHaveValue(TaskName);
    await this.addTaskBtn.click();
    await this.page.waitForNavigation();
  }
}

export default CreateTaskPage;
