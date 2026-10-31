import React, { useState } from 'react';
import { ShippingDetails, OrderSummary } from '../types.js';

interface CheckoutProps {
  subtotal: number;
  onOrderCreated?: (order: OrderSummary) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ subtotal, onOrderCreated }) => {
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: 'Jane Doe',
    street: '',
    city: '',
    zipCode: '',
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'VIP25') {
      setDiscountPercent(0.25);
    } else if (code === 'SAVE10') {
      setDiscountPercent(0.10);
    } else {
      setDiscountPercent(0);
    }
  };

  const discountAmount = subtotal * discountPercent;
  const payableAmount = Math.max(0, subtotal - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary: OrderSummary = {
      orderId: 'ORD-9912',
      subtotal,
      discount: discountAmount,
      payableAmount,
      status: 'PENDING',
    };
    setOrderSummary(summary);
  };

  return (
    <div className="card checkout-card" data-testid="checkout-section">
      <div className="card-header">
        <h2>Checkout &amp; Shipping</h2>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="shipping-street">Street Address</label>
          <input
            id="shipping-street"
            type="text"
            className="input-field"
            value={shipping.street}
            onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
            placeholder="e.g. 123 Tech Boulevard"
            data-testid="shipping-street"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping-city">City</label>
          <input
            id="shipping-city"
            type="text"
            className="input-field"
            value={shipping.city}
            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            placeholder="e.g. San Francisco"
            data-testid="shipping-city"
            required
          />
        </div>

        <div className="form-group promo-group">
          <label htmlFor="promo-input">Promo Code</label>
          <div className="input-with-button">
            <input
              id="promo-input"
              type="text"
              className="input-field"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="e.g. VIP25"
              data-testid="promo-input"
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={applyPromo}
              data-testid="apply-promo-btn"
            >
              Apply
            </button>
          </div>
          {discountPercent > 0 && (
            <p className="promo-success" data-testid="promo-success-msg">
              Applied {discountPercent * 100}% Discount!
            </p>
          )}
        </div>

        <div className="pricing-box">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discountPercent > 0 && (
            <div className="summary-row discount-row">
              <span>Discount ({discountPercent * 100}%):</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row total-row">
            <span>Payable Total:</span>
            <strong data-testid="discounted-total">${payableAmount.toFixed(2)}</strong>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success btn-block"
          data-testid="submit-order-btn"
        >
          Confirm &amp; Submit Order &rarr;
        </button>
      </form>

      {orderSummary && (
        <div className="order-result-box" data-testid="order-summary-box">
          <h3>Order Confirmed!</h3>
          <p>
            Order ID: <strong data-testid="order-id">{orderSummary.orderId}</strong>
          </p>
          <p>
            Amount Payable:{' '}
            <strong data-testid="order-payable">${orderSummary.payableAmount.toFixed(2)}</strong>
          </p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => onOrderCreated?.(orderSummary)}
            data-testid="goto-payment-btn"
          >
            Proceed to Payment &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
