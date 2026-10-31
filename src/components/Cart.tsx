import React from 'react';
import { CartItem } from '../types.js';

interface CartProps {
  items: CartItem[];
  onProceedToCheckout?: () => void;
  onUpdateQuantity?: (id: string, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onProceedToCheckout,
  onUpdateQuantity,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card cart-card" data-testid="cart-section">
      <div className="card-header">
        <h2>Shopping Cart</h2>
        <span className="badge" data-testid="cart-count">
          {items.reduce((acc, item) => acc + item.quantity, 0)} items
        </span>
      </div>

      <div className="cart-items-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item-row" data-testid="cart-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </div>
            <div className="quantity-controls">
              <button
                type="button"
                className="btn-sm"
                onClick={() => onUpdateQuantity?.(item.id, -1)}
                data-testid={`qty-dec-${item.id}`}
              >
                -
              </button>
              <span className="quantity-val" data-testid={`qty-val-${item.id}`}>
                {item.quantity}
              </span>
              <button
                type="button"
                className="btn-sm"
                onClick={() => onUpdateQuantity?.(item.id, 1)}
                data-testid={`qty-inc-${item.id}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <strong data-testid="cart-subtotal">${subtotal.toFixed(2)}</strong>
        </div>
        <div className="summary-row total-row">
          <span>Total:</span>
          <strong data-testid="cart-total">${subtotal.toFixed(2)}</strong>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={onProceedToCheckout}
          data-testid="proceed-checkout-btn"
        >
          Proceed to Checkout &rarr;
        </button>
      </div>
    </div>
  );
};
