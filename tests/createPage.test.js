import { test, expect } from "@playwright/test";
import CreateTaskPage from "../app/pages/create/CreateTaskPage.js";
import generateString from "../helpers/helpers.js"
import { userWithCorrectLoginData as user } from "../helpers/users.js";
import { BASE_URL, TASKS_PAGE_URL } from "../app/constants.js";

test.describe('Verify that "Create page" functionality worked correctly', () => {

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

  test('Verify that all required elements displayed on the create page', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);
    await createTaskPage.goto();
    await createTaskPage.topMenu.checkMenuIsEnabled();
    await expect(createTaskPage.addTaskBtn).toBeEnabled();
    await expect(createTaskPage.taskNameInput).toBeEditable();
  });

  test('Verify that new task can be created', async ({ page }) => {
    const newTask = generateString('New Task ', '');
    const createTaskPage = new CreateTaskPage(page);
    await createTaskPage.goto();
    await createTaskPage.createNewTask(newTask);
    await expect(page).toHaveURL(TASKS_PAGE_URL);
  });

  test('Verify that navigation menu worked correctly', async ({ page }) => {
    const createTaskPage = new CreateTaskPage(page);
    await createTaskPage.goto();
    await createTaskPage.topMenu.gotoTasks();
    await createTaskPage.topMenu.gotoCreate();
    await createTaskPage.topMenu.gotoLogout();
  });

});
