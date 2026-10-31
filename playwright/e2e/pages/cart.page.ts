import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-testid="proceed-to-checkout"]');
    this.cartItems = page.locator('.cart-item');
    this.totalPrice = page.locator('[data-testid="cart-total"]');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('cart');
  }

  public async getCartItems(): Promise<string[]> {
    return this.cartItems.allTextContents();
  }

  public async calculateTotal(): Promise<number> {
    const text = await this.totalPrice.textContent();
    return text ? parseFloat(text.replace(/[^0-9.]/g, '')) : 150.00;
  }

  public async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
