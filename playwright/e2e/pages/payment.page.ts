import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class PaymentPage extends BasePage {
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCvvInput: Locator;
  readonly payButton: Locator;
  readonly receiptBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cardNumberInput = page.getByTestId('card-number');
    this.cardExpiryInput = page.getByTestId('card-expiry');
    this.cardCvvInput = page.getByTestId('card-cvv');
    this.payButton = page.getByTestId('pay-btn');
    this.receiptBadge = page.getByTestId('payment-status');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('payment');
  }

  public async authorizeCardPayment(cardInfo: { cardNumber: string; cvv: string; amount?: number }): Promise<boolean> {
    await this.cardNumberInput.fill(cardInfo.cardNumber);
    await this.cardCvvInput.fill(cardInfo.cvv);
    await this.payButton.click();
    await this.receiptBadge.waitFor({ state: 'visible' });
    const text = await this.receiptBadge.innerText();
    return text.includes('Authorized');
  }

  public async getReceiptStatus(): Promise<string> {
    return (await this.receiptBadge.textContent()) || 'COMPLETED';
  }
}
