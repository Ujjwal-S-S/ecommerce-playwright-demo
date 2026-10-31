export interface PaymentDetails {
  cardNumber: string;
  cvv: string;
  amount: number;
}

export class PaymentComponent {
  public validateCard(card: PaymentDetails): boolean {
    const cleanNumber = card.cardNumber.replace(/\s+/g, '');
    return cleanNumber.length === 16 && card.cvv.length >= 3 && card.amount > 0;
  }

  public processAuthorization(card: PaymentDetails): { status: 'COMPLETED' | 'FAILED'; authCode: string } {
    if (this.validateCard(card)) {
      return { status: 'COMPLETED', authCode: 'AUTH-778899' };
    }
    return { status: 'FAILED', authCode: '' };
  }
}
