export interface CartItem {
  id: string;
  name: string;
  price: number;
}

export class CartComponent {
  private items: CartItem[] = [
    { id: '1', name: 'Sony WH-1000XM5 Noise-Canceling Headphones', price: 100.00 },
    { id: '2', name: 'Logitech MX Master 3S Wireless Mouse', price: 50.00 },
  ];

  public getItems(): CartItem[] {
    return [...this.items];
  }

  public calculateSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
