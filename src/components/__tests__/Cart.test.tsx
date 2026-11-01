import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '../Cart.js';
import { CartItem } from '../../types.js';

describe('Cart Component (Unit Tests)', () => {
  const mockItems: CartItem[] = [
    { id: '1', name: 'Product A', price: 20, quantity: 2 },
    { id: '2', name: 'Product B', price: 50, quantity: 1 },
  ];

  it('renders cart items and calculates total correctly', () => {
    render(<Cart items={mockItems} />);

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();

    // 2 * 20 + 1 * 50 = $90.00
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$90.00');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3 items');
  });

  it('triggers onUpdateQuantity when increment and decrement buttons are clicked', () => {
    const handleUpdate = vi.fn();
    render(<Cart items={mockItems} onUpdateQuantity={handleUpdate} />);

    fireEvent.click(screen.getByTestId('qty-inc-1'));
    expect(handleUpdate).toHaveBeenCalledWith('1', 1);

    fireEvent.click(screen.getByTestId('qty-dec-2'));
    expect(handleUpdate).toHaveBeenCalledWith('2', -1);
  });

  it('calls onProceedToCheckout when proceed button is clicked', () => {
    const handleProceed = vi.fn();
    render(<Cart items={mockItems} onProceedToCheckout={handleProceed} />);

    fireEvent.click(screen.getByTestId('proceed-checkout-btn'));
    expect(handleProceed).toHaveBeenCalledTimes(1);
  });

  it('displays free shipping banner when subtotal is $100 or greater', () => {
    const qualifyingItems: CartItem[] = [
      { id: '1', name: 'Product A', price: 60, quantity: 2 }, // $120
    ];
    render(<Cart items={qualifyingItems} />);

    expect(screen.getByTestId('free-shipping-banner')).toBeInTheDocument();
    expect(screen.getByTestId('free-shipping-banner')).toHaveTextContent('Free Standard Shipping');
  });
});
