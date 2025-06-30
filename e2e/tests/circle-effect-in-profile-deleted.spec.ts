import test, { expect } from '@playwright/test';

import { HomePage } from '../models/home-page';
import { ProfileListPage } from '../models/profile-list-page';
import { ProfilePage } from '../models/profile-page';

test.describe('Circle Effect in Profile Deleted Tests', () => {
  let homePage: HomePage;
  let profileListPage: ProfileListPage;
  let profilePage: ProfilePage;

  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
    profileListPage = new ProfileListPage(page);
    profilePage = new ProfilePage(page);
  });

  test('Remove member in joined member deleted', async ({ page }) => {
    await test.step('Delete member', async () => {
      await homePage.go();

      await homePage.navigateToProfileListPage();
      await profileListPage.navigateToProfilePage('Bob');

      await profilePage.submitDeleteForm();

      await page.waitForLoadState();

      await expect(page).toHaveTitle('User List');
      await expect(page.getByRole('link', { name: 'Bob' })).toBeHidden();
    });

    await test.step('Check that Bob is removed from circle', async () => {
      await homePage.navigateToCircleListPage();

      await page.getByRole('link', { name: 'Baseball' }).click();

      await expect(page.getByRole('link', { name: 'Bob' })).toBeHidden();
    });

    await test.step('Check that Football owner is changed', async () => {
      await homePage.navigateToCircleListPage();

      const table = page.getByRole('table');

      await expect(
        table.locator('tbody tr:nth-child(2) > td:nth-child(2)'),
      ).toContainText('Carol');
      await expect(
        table.locator('tbody tr:nth-child(2) > td:nth-child(3)'),
      ).toContainText('0');
    });

    await test.step('Check that Tennis is removed', async () => {
      await homePage.navigateToCircleListPage();

      const table = page.getByRole('table');

      await expect(table.getByRole('link', { name: 'Tennis' })).toBeHidden();
    });
  });
});
