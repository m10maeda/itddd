import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  private readonly deleteButton: Locator;
  private readonly editLink: Locator;
  private readonly page: Page;

  public async navigateToEditPage(): Promise<void> {
    await this.editLink.click();
  }

  public async submitDeleteForm(): Promise<void> {
    await this.deleteButton.click();
  }

  public constructor(page: Page) {
    this.page = page;

    this.deleteButton = this.page.getByRole('button', { name: 'Delete' });
    this.editLink = this.page.getByRole('link', { name: 'Edit' });
  }
}
