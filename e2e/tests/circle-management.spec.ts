import test, { expect } from '@playwright/test';

import { HomePage } from '../models/home-page';

test.describe('Circle Management Tests', () => {
  let homePage: HomePage;

  const circleName = 'Basketball';
  const newCircleName = 'Volleyball';
  const ownerName = 'Frank';

  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
  });

  test('should create a new circle', async ({ page }) => {
    await homePage.go();
    await homePage.navigateToCircleListPage();

    await page.getByRole('link', { name: 'New Circle' }).click();
    await expect(page).toHaveTitle(/Register Circle Form/);

    await page.getByRole('textbox', { name: 'Name' }).fill(circleName);
    await page.getByRole('combobox', { name: 'Owner' }).click();
    await page.getByRole('option', { name: ownerName }).click();
    await page.getByRole('button', { name: 'Register' }).click();

    await page.waitForLoadState();

    await expect(page).toHaveTitle(circleName);
    await expect(
      page.getByRole('heading', { name: circleName, level: 1 }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Back' }).click();

    await expect(page.getByRole('link', { name: circleName })).toBeVisible();
  });

  test('should rename an existing circle', async ({ page }) => {
    await homePage.go();
    await homePage.navigateToCircleListPage();

    await page.getByRole('link', { name: circleName }).click();

    await page.getByRole('link', { name: 'Edit' }).click();
    await expect(page).toHaveTitle(/Edit Circle Form/);

    await page.getByRole('textbox', { name: 'Name' }).fill(newCircleName);
    await page.getByRole('button', { name: 'Update' }).click();

    await page.waitForLoadState();

    await expect(page).toHaveTitle(newCircleName);
    await expect(
      page.getByRole('heading', { name: newCircleName, level: 1 }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Back' }).click();

    await expect(page.getByRole('link', { name: newCircleName })).toBeVisible();
  });

  test('should delete an existing circle', async ({ page }) => {
    await homePage.go();
    await homePage.navigateToCircleListPage();

    await page.getByRole('link', { name: newCircleName }).click();

    await page.getByRole('button', { name: 'Delete' }).click();

    await page.waitForLoadState();

    await expect(page.getByRole('link', { name: newCircleName })).toBeHidden();
  });
});
