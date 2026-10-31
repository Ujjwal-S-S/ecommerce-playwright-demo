import { useState } from 'react';
import { Cart } from './components/Cart.js';
import { Checkout } from './components/Checkout.js';
import { Payment } from './components/Payment.js';
import { Profile } from './components/Profile.js';
import { CartItem } from './types.js';
import './App.css';

const INITIAL_ITEMS: CartItem[] = [
  { id: '1', name: 'Wireless Noise-Canceling Headphones', price: 100.00, quantity: 1 },
  { id: '2', name: 'Ergonomic Mechanical Keyboard', price: 50.00, quantity: 1 },
];

export function App() {
  const [activeTab, setActiveTab] = useState<'cart' | 'checkout' | 'payment' | 'profile'>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">⚡</span>
            <h1>Apex Storefront</h1>
          </div>
          <nav className="tab-nav">
            <button
              type="button"
              className={`nav-tab ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
              data-testid="nav-cart"
            >
              Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </button>
            <button
              type="button"
              className={`nav-tab ${activeTab === 'checkout' ? 'active' : ''}`}
              onClick={() => setActiveTab('checkout')}
              data-testid="nav-checkout"
            >
              Checkout
            </button>
            <button
              type="button"
              className={`nav-tab ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
              data-testid="nav-payment"
            >
              Payment
            </button>
            <button
              type="button"
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
              data-testid="nav-profile"
            >
              Profile
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'cart' && (
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onProceedToCheckout={() => setActiveTab('checkout')}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout
            subtotal={subtotal}
            onOrderCreated={() => setActiveTab('payment')}
          />
        )}

        {activeTab === 'payment' && (
          <Payment amount={subtotal * 0.75} />
        )}

        {activeTab === 'profile' && (
          <Profile />
        )}
      </main>
    </div>
  );
}

export default App;
