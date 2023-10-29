import { test, expect } from "@playwright/test";
import CreateTaskPage from "../app/pages/create/CreateTaskPage.js";
import TasksPage from "../app/pages/tasks/TasksPage.js";
import generateString from "../helpers/helpers.js"
import { userWithCorrectLoginData as user } from "../helpers/users.js";
import { BASE_URL, TASKS_PAGE_URL } from "../app/constants.js";

test.describe('Verify that "Tasks page" and "Detail page" functionality worked correctly', () => {

  test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    const userEmail = user.email
    const userPassword = user.password
    await page.goto(BASE_URL);
    await page.fill('[automation-id="email-input"]', userEmail);
    await page.fill('[automation-id="password-input"]', userPassword);
    await page.click('[automation-id="login-btn"]');
    await page.waitForNavigation();
  });

  test('Verify that task added to bottom of the list with status "Undone"', async ({ page }) => {
    const newTask = generateString('New Task ', '');
    const createTaskPage = new CreateTaskPage(page);
    const tasksPage = new TasksPage(page)
    await createTaskPage.goto();
    await createTaskPage.createNewTask(newTask);
    await expect(page).toHaveURL(TASKS_PAGE_URL);
    await tasksPage.goto();
    await tasksPage.compairLastTaskName(newTask);
    await tasksPage.checkThatCheckboxUnchecked();
  });

  test('Verify that user can change shatus with checkbox', async ({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.goto();
    await tasksPage.checkThatCheckboxUnchecked();
    await tasksPage.changeLastTaskCheckboxStatus();
    await tasksPage.checkThatCheckboxChecked();
  });

  test('Verify that task Data and Status displayed correctly on the "Detail" page', async ({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.goto();
    await tasksPage.checkThatCheckboxChecked();
    await tasksPage.openLastTaskDetails();
    await tasksPage.checkThatStatusIsDone();
    await tasksPage.topMenu.gotoTasks();
    await tasksPage.changeLastTaskCheckboxStatus();
    await tasksPage.checkThatCheckboxUnchecked();
    await tasksPage.openLastTaskDetails();
    await tasksPage.checkThatDataDisplayedCorrect();
    await tasksPage.checkThatStatusIsUndone();
  });

  test('Verify that user can delete task', async ({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.goto();
    const tasksCount = await tasksPage.taskNameCell.count()
    await tasksPage.deleteLastTask();
    const newTasksCount = await tasksPage.taskNameCell.count()
    expect(newTasksCount).toBe(tasksCount - 1)
  });

  test('Verify that tasks page displayed corectly whe user havent task', async ({ page }) => {
    const newTask = generateString('New Task ', '');
    const createTaskPage = new CreateTaskPage(page);
    const tasksPage = new TasksPage(page)
    await createTaskPage.goto();
    await createTaskPage.createNewTask(newTask);
    await expect(page).toHaveURL(TASKS_PAGE_URL);
    await tasksPage.goto();
    await tasksPage.deleteAllTasks();
    await tasksPage.taskPageVisionWithoutTasks();
    await tasksPage.checkCreateLink();
  });

});
