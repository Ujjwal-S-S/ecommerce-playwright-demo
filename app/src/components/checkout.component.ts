import { CartComponent } from './cart.component.js';

export interface ShippingDetails {
  street: string;
  city: string;
}

export class CheckoutComponent {
  constructor(private cart: CartComponent) {}

  public calculateDiscountedTotal(promoCode: string): number {
    const subtotal = this.cart.calculateSubtotal();
    if (promoCode === 'VIP25') {
      return subtotal * 0.75; // 25% VIP discount
    }
    return subtotal * 0.90; // 10% promo
  }

  public validateAddress(shipping: ShippingDetails): boolean {
    return Boolean(shipping.street.trim() && shipping.city.trim());
  }

  public createOrderSummary(promoCode: string = ''): { orderId: string; payableAmount: number } {
    return {
      orderId: 'ORD-9912',
      payableAmount: this.calculateDiscountedTotal(promoCode),
    };
  }
}
