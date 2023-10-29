import { test, expect } from "@playwright/test";
import LoginPage from "../app/pages/login/LoginPage.js";
import generateString from "../helpers/helpers.js"
import { userNotExist, uncorrectPassword, uncorrectAuthData, uncorrectRegistrationData, registrationUserExist, accountCreated } from "../helpers/texts.js"
import { userWithCorrectLoginData as user1, userWithUncorrectLoginData as user2, existingUserForRegistration as user3 } from "../helpers/users.js";
import {altText, colorContrast } from 'accessibility-testing-module-playwright-poc';

test.describe('Verify that "Login page" functionality worked correctly', () => {

  test.only('Verify that all required elements displayed on the page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();
    await expect(loginPage.loginButton).toBeEnabled();
    await expect(loginPage.registerButton).toBeEnabled();
    await test.step('Accessibility Checks', async() => {
      await altText.checkAltText(page);
      await colorContrast.checkColorContrast(page)
    })
  });

  test('Verify that user can be creacted with correct registration data', async ({ page }) => {
    const newUserEmail = generateString('', '@em.com');
    const newUserPassword = generateString();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.registration(newUserEmail, newUserPassword);
    await expect(loginPage.toastMessage).toContainText(accountCreated);
  });

  test('Verify that user can`t be creacted with uncorrect registration data', async ({ page }) => {
    const newUserEmail = generateString('', '@em.com');
    const newUserPassword = '1234';//password minimal length shoul be 6 charters 
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.registration(newUserEmail, newUserPassword);
    await expect(loginPage.toastMessage).toContainText(uncorrectRegistrationData);
  });

  test('Verify that user can`t be creacted, if email already existed in system', async ({ page }) => {
    const newUserEmail = user1.email;
    const newUserPassword = user1.password;
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.registration(newUserEmail, newUserPassword);
    await expect(loginPage.toastMessage).toContainText(registrationUserExist);
  });

  test('Verify that user can not logged in if password is uncorrect', async ({ page }) => {
    const newUserEmail = user1.email;
    const newUserPassword = 'some_uncorrect_password';
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithUncorrectData(newUserEmail, newUserPassword);
    await expect(loginPage.toastMessage).toContainText(uncorrectPassword);
  });

  test('Verify that user can not logged in if auth data is uncorrect', async ({ page }) => {
    const newUserEmail = user1.email;
    const newUserPassword = 'pass';
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithUncorrectData(newUserEmail, newUserPassword);
    await expect(loginPage.toastMessage).toContainText(uncorrectAuthData);
  });

  test('Verify that user can not logged in if email not exist', async ({ page }) => {
    const newUserEmail = 'not_exist@email.com';
    const newUserPassword = user1.password;
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithUncorrectData(newUserEmail, newUserPassword);
    await expect(loginPage.toastMessage).toContainText(userNotExist);
  });

  test('Verify that user can logged in if auth data is Correct', async ({ page }) => {
    const newUserEmail = user1.email;
    const newUserPassword = user1.password;
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithCorrectData(newUserEmail, newUserPassword);
  });
});
