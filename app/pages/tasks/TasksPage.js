import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";
import TopMenu from "../../menus/TopMenu.js";
import { CREATE_PAGE_URL, TASKS_PAGE_URL } from "../../constants.js";

class TasksPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.topMenu = new TopMenu(page);
    this.taskNameCell = page.locator('[automation-id="task-name"]');
    this.taskStatusCheckbox = page.locator('[automation-id="task-checkbox"]')
    this.taskStatusCheckbox1 = page.locator('[automation-id="task-checkbox1"]')
    this.mandatoryElement = page.locator('[automation-id="mandatory-element"]')
    this.taskDetailLink = page.locator('a[automation-id="task-detail-link"]')
    this.taskDeleteBtn = page.locator('button[automation-id="delete-task-btn"]')
    this.createTaskLink = page.locator('a[automation-id="create-task-link"]')
    this.detailTaskName = page.locator('strong[automation-id="task-name"]')
    this.detailTaskCreateDate = page.locator('strong[automation-id="task-create-date"]')
    this.detailTaskStatus = page.locator('strong[automation-id="task-status"]')
  }

  async goto() {
    await super.goto(TASKS_PAGE_URL, this.mandatoryElement);
  }


  async compairLastTaskName(taskNameToCompair) {
    await expect(this.taskNameCell.last()).toHaveText(taskNameToCompair);
  }

  async changeLastTaskCheckboxStatus() {
    await this.taskStatusCheckbox.last().click();
  }

  async checkThatCheckboxUnchecked() {
    await expect(this.taskStatusCheckbox1.last()).not.toBeChecked()
  }

  async checkThatCheckboxChecked() {
    await expect(this.taskStatusCheckbox1.last()).toBeChecked()
  }

  async checkThatDataDisplayedCorrect() {
    await expect(this.detailTaskCreateDate).toHaveText(/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/)
  }

  async checkThatStatusIsDone() {
    await expect(this.detailTaskStatus).toHaveText('Виконана')
  }

  async checkThatStatusIsUndone() {
    await expect(this.detailTaskStatus).toHaveText('Не виконана')
  }

  async openLastTaskDetails() {
    const taskName = await this.taskNameCell.last().textContent()
    await this.taskDetailLink.last().click();
    await expect(this.detailTaskName).toHaveText(taskName);
  }

  async deleteLastTask() {
    const taskName = await this.taskNameCell.last().textContent()
    await this.taskDeleteBtn.last().click();
    await this.page.waitForTimeout(500)
    await expect(this.taskNameCell.last()).not.toHaveText(taskName)
  }

  async deleteFirstTask() {
    await this.taskDeleteBtn.first().click();
    await this.page.waitForTimeout(500)
  }

  async taskPageVisionWithoutTasks() {
    await expect(this.mandatoryElement).toBeVisible();
    await expect(this.createTaskLink).toBeEnabled();
  }

  async deleteAllTasks() {
    const tasksCount = await this.taskDeleteBtn.count();
    for (let i = 0; i < tasksCount; i++) {
      await this.deleteFirstTask();
    }
  }

  async checkCreateLink() {
    await expect(this.createTaskLink).toBeEnabled()
    await this.createTaskLink.click();
    await expect(this.page).toHaveURL(CREATE_PAGE_URL)
  }


}

export default TasksPage;
