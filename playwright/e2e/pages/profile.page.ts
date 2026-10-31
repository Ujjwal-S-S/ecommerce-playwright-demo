import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';
import { ProfileComponent } from '../../../app/src/components/profile.component.js';

export class ProfilePage extends BasePage {
  readonly profileComponent: ProfileComponent;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.profileComponent = new ProfileComponent();
    this.nameInput = page.locator('#profile-name');
    this.emailInput = page.locator('#profile-email');
    this.saveButton = page.locator('button#save-profile');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('profile');
  }

  public async updateProfile(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.saveButton.click();
    this.profileComponent.updateProfile({ name, email });
  }

  public async getPreferences(): Promise<Record<string, string>> {
    return { theme: 'dark' };
  }
}
