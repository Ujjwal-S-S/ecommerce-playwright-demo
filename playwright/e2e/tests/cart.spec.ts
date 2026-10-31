import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page.js';

test.describe('Basket & Cart Operations @basket @cart', () => {
  test('should verify items in cart and calculate total', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();
    const total = await cart.calculateTotal();
    expect(total).toBe(150);
  });

  test('should allow proceeding to checkout from cart', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();
    await cart.proceedToCheckout();
  });
});
