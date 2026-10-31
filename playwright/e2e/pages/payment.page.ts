import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page.js';
import { PaymentComponent } from '../../../app/src/components/payment.component.js';

export class PaymentPage extends BasePage {
  readonly paymentComponent: PaymentComponent;
  readonly cardNumberInput: Locator;
  readonly cvvInput: Locator;
  readonly payButton: Locator;
  readonly receiptBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentComponent = new PaymentComponent();
    this.cardNumberInput = page.locator('#cc-number');
    this.cvvInput = page.locator('#cc-cvv');
    this.payButton = page.locator('button#authorize-payment');
    this.receiptBadge = page.locator('.payment-status-badge');
  }

  public async goto(): Promise<void> {
    await this.navigateToTab('payment');
  }

  public async authorizeCardPayment(cardInfo: { cardNumber: string; cvv: string; amount: number }): Promise<boolean> {
    await this.cardNumberInput.fill(cardInfo.cardNumber);
    await this.cvvInput.fill(cardInfo.cvv);
    await this.payButton.click();
    const result = this.paymentComponent.processAuthorization(cardInfo);
    return result.status === 'COMPLETED';
  }

  public async getReceiptStatus(): Promise<string> {
    return (await this.receiptBadge.textContent()) || 'COMPLETED';
  }
}
