import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Payment } from '../Payment.js';

describe('Payment Component (Unit Tests)', () => {
  it('renders payment form with specified amount', () => {
    render(<Payment amount={112.50} />);

    expect(screen.getByText('Secure Payment')).toBeInTheDocument();
    expect(screen.getByTestId('payment-amount')).toHaveTextContent('$112.50');
    expect(screen.getByTestId('card-number')).toHaveValue('4242 •••• •••• 4242');
  });

  it('authorizes payment and calls onPaymentSuccess', async () => {
    const handleSuccess = vi.fn();
    render(<Payment amount={112.50} onPaymentSuccess={handleSuccess} />);

    fireEvent.click(screen.getByTestId('pay-btn'));

    const statusBadge = await screen.findByTestId('payment-status');
    expect(statusBadge).toHaveTextContent('✓ Payment Authorized: TXN-88219');
    expect(handleSuccess).toHaveBeenCalledWith('TXN-88219');
  });
});
