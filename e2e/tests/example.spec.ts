import { test, expect } from '@playwright/test';

const WEB_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

test('has title', async ({ page }) => {
  await page.goto(WEB_URL);

  await expect(page).toHaveTitle(/Introduction to Domain-Driven Design/);
});
