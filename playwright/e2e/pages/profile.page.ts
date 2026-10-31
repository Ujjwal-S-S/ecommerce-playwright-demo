import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class ProfilePage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly themeSelect: Locator;
  readonly saveButton: Locator;
  readonly statusMessage: Locator;
  readonly themeBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByTestId('profile-name');
    this.emailInput = page.getByTestId('profile-email');
    this.themeSelect = page.getByTestId('theme-select');
    this.saveButton = page.getByTestId('save-profile-btn');
    this.statusMessage = page.getByTestId('profile-status');
    this.themeBadge = page.getByTestId('theme-badge');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('profile');
  }

  public async updateProfile(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.saveButton.click();
    await this.statusMessage.waitFor({ state: 'visible' });
  }

  public async selectTheme(theme: 'light' | 'dark'): Promise<void> {
    await this.themeSelect.selectOption(theme);
    await this.saveButton.click();
    await this.statusMessage.waitFor({ state: 'visible' });
  }

  public async getPreferences(): Promise<Record<string, string>> {
    const themeText = await this.themeBadge.innerText();
    const theme = themeText.toLowerCase().includes('dark') ? 'dark' : 'light';
    return { theme };
  }
}
