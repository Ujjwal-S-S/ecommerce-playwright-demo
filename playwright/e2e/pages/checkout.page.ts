import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';
import { CartPage } from './cart.page.js';
import { ShippingDetails } from '../../../src/types.js';

export class CheckoutPage extends BasePage {
  readonly cartPage: CartPage;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly promoInput: Locator;
  readonly applyPromoButton: Locator;
  readonly submitOrderButton: Locator;
  readonly orderIdDisplay: Locator;
  readonly orderPayableDisplay: Locator;
  readonly totalDisplay: Locator;

  constructor(page: Page, cartPage: CartPage) {
    super(page);
    this.cartPage = cartPage;
    this.addressInput = page.getByTestId('shipping-street');
    this.cityInput = page.getByTestId('shipping-city');
    this.promoInput = page.getByTestId('promo-input');
    this.applyPromoButton = page.getByTestId('apply-promo-btn');
    this.submitOrderButton = page.getByTestId('submit-order-btn');
    this.orderIdDisplay = page.getByTestId('order-id');
    this.orderPayableDisplay = page.getByTestId('order-payable');
    this.totalDisplay = page.getByTestId('discounted-total');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('checkout');
  }

  public async fillShippingAddress(address: Partial<ShippingDetails>): Promise<void> {
    if (address.street) {
      await this.addressInput.fill(address.street);
    }
    if (address.city) {
      await this.cityInput.fill(address.city);
    }
  }

  public async applyPromoDiscount(code: string): Promise<number> {
    await this.promoInput.fill(code);
    await this.applyPromoButton.click();
    const text = await this.totalDisplay.innerText();
    return parseFloat(text.replace('$', ''));
  }

  public async submitOrderSummary(): Promise<{ orderId: string; payableAmount: number }> {
    await this.submitOrderButton.click();
    await this.orderIdDisplay.waitFor({ state: 'visible' });
    const orderId = await this.orderIdDisplay.innerText();
    const amountText = await this.orderPayableDisplay.innerText();
    return {
      orderId,
      payableAmount: parseFloat(amountText.replace('$', '')),
    };
  }
}
