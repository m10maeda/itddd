import { test, expect } from '@playwright/test';

import { HomePage } from '../models/home-page';
import { ProfileListPage } from '../models/profile-list-page';
import { ProfilePage } from '../models/profile-page';

test.describe('Profile Lifecycle Tests', () => {
  const name = 'John';
  const newName = 'Jane';

  let homePage: HomePage;
  let profileListPage: ProfileListPage;
  let profilePage: ProfilePage;

  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
    profileListPage = new ProfileListPage(page);
    profilePage = new ProfilePage(page);
  });

  test('should register a new user', async ({ page }) => {
    await homePage.go();
    await homePage.navigateToProfileListPage();

    await profileListPage.navigateToRegisterPage();
    await expect(page).toHaveTitle(/Register User Form/);

    await page.getByRole('textbox', { name: 'Name' }).fill(name);
    await page.getByRole('button', { name: 'Register' }).click();

    await page.waitForLoadState();

    await expect(page).toHaveTitle(`${name}'s Profile`);
    await expect(page.getByRole('heading', { name, level: 1 })).toBeVisible();

    await page.getByRole('link', { name: 'Back' }).click();

    await expect(page.getByRole('link', { name })).toBeVisible();
    await profileListPage.navigateToProfilePage(name);
  });

  test('should rename an existing user', async ({ page }) => {
    await homePage.go();
    await homePage.navigateToProfileListPage();

    await profileListPage.navigateToProfilePage(name);

    await profilePage.navigateToEditPage();
    await expect(page).toHaveTitle(/Edit User Form/);

    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.getByRole('button', { name: 'Update' }).click();

    await page.waitForLoadState();

    await expect(page).toHaveTitle(`${newName}'s Profile`);
    await expect(
      page.getByRole('heading', { name: newName, level: 1 }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Back' }).click();

    await expect(page.getByRole('link', { name: newName })).toBeVisible();
  });

  test('should delete an existing user', async ({ page }) => {
    await homePage.go();
    await homePage.navigateToProfileListPage();

    await profileListPage.navigateToProfilePage(newName);

    await profilePage.submitDeleteForm();

    await page.waitForLoadState();

    await expect(page).toHaveTitle('User List');
    await expect(page.getByRole('link', { name: newName })).toBeHidden();
  });
});
