import { Page, expect } from '@playwright/test';

export class HomePage {
  private static readonly URL =
    process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

  private page: Page;

  public async go(): Promise<void> {
    await this.page.goto(HomePage.URL);

    await expect(this.page).toHaveTitle(/Introduction to Domain-Driven Design/);
  }

  public async navigateToCircleListPage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Circles' }).click();

    await expect(this.page).toHaveTitle('Circle List');
  }

  public async navigateToProfileListPage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Users' }).click();

    await expect(this.page).toHaveTitle('User List');
  }

  public constructor(page: Page) {
    this.page = page;
  }
}
