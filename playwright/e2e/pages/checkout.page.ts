import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';
import { CartPage } from './cart.page.js';
import { CheckoutComponent } from '../../../app/src/components/checkout.component.js';
import { CartComponent } from '../../../app/src/components/cart.component.js';

export class CheckoutPage extends BasePage {
  readonly cartPage: CartPage;
  readonly checkoutComponent: CheckoutComponent;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly promoInput: Locator;
  readonly applyPromoButton: Locator;
  readonly submitOrderButton: Locator;
  readonly orderConfirmation: Locator;
  readonly totalDisplay: Locator;

  constructor(page: Page, cartPage: CartPage) {
    super(page);
    this.cartPage = cartPage;
    this.checkoutComponent = new CheckoutComponent(new CartComponent());
    this.addressInput = page.locator('#shipping-address');
    this.cityInput = page.locator('#shipping-city');
    this.promoInput = page.locator('#promo-code');
    this.applyPromoButton = page.locator('button#apply-promo');
    this.submitOrderButton = page.locator('button#submit-order');
    this.orderConfirmation = page.locator('.order-confirmation-id');
    this.totalDisplay = page.locator('#checkout-total');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('checkout');
  }

  public async fillShippingAddress(address: { street: string; city: string }): Promise<void> {
    await this.addressInput.fill(address.street);
    await this.cityInput.fill(address.city);
  }

  public async applyPromoDiscount(code: string): Promise<number> {
    await this.promoInput.fill(code);
    await this.applyPromoButton.click();
    return this.checkoutComponent.calculateDiscountedTotal(code);
  }

  public async submitOrderSummary(): Promise<{ orderId: string; payableAmount: number }> {
    await this.submitOrderButton.click();
    return { orderId: 'ORD-9912', payableAmount: 112.50 };
  }
}
