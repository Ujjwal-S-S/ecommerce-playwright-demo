import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page.js';
import { CartPage } from '../pages/cart.page.js';

test.describe('Checkout Workflow @checkout', () => {
  test('should apply promo discount and submit order summary', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page, cart);

    await checkout.goto();
    await checkout.fillShippingAddress({ street: '123 Tech Boulevard', city: 'San Francisco' });
    const discountedTotal = await checkout.applyPromoDiscount('VIP25');
    expect(discountedTotal).toBeLessThan(150);

    const summary = await checkout.submitOrderSummary();
    expect(summary.orderId).toBe('ORD-9912');
    expect(summary.payableAmount).toBe(112.50);
  });
});
