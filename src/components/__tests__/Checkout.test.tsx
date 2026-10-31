import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkout } from '../Checkout.js';

describe('Checkout Component (Unit Tests)', () => {
  it('renders initial subtotal without promo applied', () => {
    render(<Checkout subtotal={150.0} />);

    expect(screen.getByText('Checkout & Shipping')).toBeInTheDocument();
    expect(screen.getByTestId('discounted-total')).toHaveTextContent('$150.00');
  });

  it('applies VIP25 promo discount correctly', () => {
    render(<Checkout subtotal={150.0} />);

    const promoInput = screen.getByTestId('promo-input');
    const applyBtn = screen.getByTestId('apply-promo-btn');

    fireEvent.change(promoInput, { target: { value: 'VIP25' } });
    fireEvent.click(applyBtn);

    // 150 - 25% = 112.50
    expect(screen.getByTestId('discounted-total')).toHaveTextContent('$112.50');
    expect(screen.getByTestId('promo-success-msg')).toHaveTextContent('Applied 25% Discount!');
  });

  it('submits order and displays order confirmation details', () => {
    const handleOrder = vi.fn();
    render(<Checkout subtotal={150.0} onOrderCreated={handleOrder} />);

    const streetInput = screen.getByTestId('shipping-street');
    const cityInput = screen.getByTestId('shipping-city');
    const submitBtn = screen.getByTestId('submit-order-btn');

    fireEvent.change(streetInput, { target: { value: '123 Market St' } });
    fireEvent.change(cityInput, { target: { value: 'San Francisco' } });
    fireEvent.click(submitBtn);

    expect(screen.getByTestId('order-id')).toHaveTextContent('ORD-9912');

    fireEvent.click(screen.getByTestId('goto-payment-btn'));
    expect(handleOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: 'ORD-9912',
        subtotal: 150,
      })
    );
  });
});
