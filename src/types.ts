export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  street: string;
  city: string;
  zipCode: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredTheme: 'light' | 'dark';
}

export interface OrderSummary {
  orderId: string;
  subtotal: number;
  discount: number;
  payableAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PAID';
}
