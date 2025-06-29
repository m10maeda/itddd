import { Page, Locator, expect } from '@playwright/test';

export class ProfileListPage {
  private readonly page: Page;

  public async navigateToProfilePage(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).click();

    await expect(this.page).toHaveTitle(`${name}'s Profile`);
  }

  public async navigateToRegisterPage(): Promise<void> {
    await this.getRegisterLink().click();
  }

  private getRegisterLink(): Locator {
    return this.page.getByRole('link', { name: 'New User' });
  }

  public constructor(page: Page) {
    this.page = page;
  }
}
