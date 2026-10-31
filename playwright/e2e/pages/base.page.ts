import { type Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  public async navigateToTab(tabId: 'cart' | 'checkout' | 'payment' | 'profile'): Promise<void> {
    await this.page.goto('/');
    await this.page.locator(`#nav-${tabId}`).click();
  }
}
