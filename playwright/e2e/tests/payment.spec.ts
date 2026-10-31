import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/payment.page.js';

test.describe('Payment Processing Gateway @payment', () => {
  test('should authorize credit card charge successfully', async ({ page }) => {
    const payment = new PaymentPage(page);
    await payment.goto();
    const authorized = await payment.authorizeCardPayment({
      cardNumber: '4111111111111111',
      cvv: '123',
      amount: 112.50,
    });
    expect(authorized).toBe(true);

    const status = await payment.getReceiptStatus();
    expect(status).toContain('Authorized');
  });
});
