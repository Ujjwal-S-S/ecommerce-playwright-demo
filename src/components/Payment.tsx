import React, { useState } from 'react';
import { PaymentDetails } from '../types.js';

interface PaymentProps {
  amount?: number;
  onPaymentSuccess?: (transactionId: string) => void;
}

export const Payment: React.FC<PaymentProps> = ({ amount = 112.50, onPaymentSuccess }) => {
  const [details, setDetails] = useState<PaymentDetails>({
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: 'Jane Doe',
    expiry: '12/28',
    cvv: '888',
  });

  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    setTimeout(() => {
      setStatus('SUCCESS');
      onPaymentSuccess?.('TXN-88219');
    }, 150);
  };

  return (
    <div className="card payment-card" data-testid="payment-section">
      <div className="card-header">
        <h2>Secure Payment</h2>
        <span className="badge badge-shield">256-Bit Encrypted</span>
      </div>

      <div className="payment-amount-banner">
        <span>Total Due:</span>
        <strong data-testid="payment-amount">${amount.toFixed(2)}</strong>
      </div>

      <form onSubmit={handlePay} className="payment-form">
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            id="card-number"
            type="text"
            className="input-field"
            value={details.cardNumber}
            onChange={(e) => setDetails({ ...details, cardNumber: e.target.value })}
            data-testid="card-number"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="card-expiry">Expiry</label>
            <input
              id="card-expiry"
              type="text"
              className="input-field"
              value={details.expiry}
              onChange={(e) => setDetails({ ...details, expiry: e.target.value })}
              data-testid="card-expiry"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="card-cvv">CVV</label>
            <input
              id="card-cvv"
              type="password"
              className="input-field"
              value={details.cvv}
              onChange={(e) => setDetails({ ...details, cvv: e.target.value })}
              data-testid="card-cvv"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          data-testid="pay-btn"
          disabled={status === 'PROCESSING'}
        >
          {status === 'PROCESSING' ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>

      {status === 'SUCCESS' && (
        <div className="status-badge status-success" data-testid="payment-status">
          ✓ Payment Authorized: TXN-88219
        </div>
      )}
    </div>
  );
};
