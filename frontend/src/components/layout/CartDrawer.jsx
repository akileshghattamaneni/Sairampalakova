import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { waLink } from '../../config/site';

function CartDrawer({ onCheckout }) {
  const { cart, cartCount, cartTotal, cartOpen, setCartOpen, updateCartQty, removeFromCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    document.body.classList.toggle('cart-open', cartOpen);
    return () => document.body.classList.remove('cart-open');
  }, [cartOpen]);

  const close = () => setCartOpen(false);

  return (
    <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} id="cartDrawer" aria-label="Shopping cart" aria-hidden={!cartOpen}>
      <div className="cart-overlay" id="cartOverlay" onClick={close} role="presentation" />
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button type="button" className="cart-close" id="cartClose" aria-label="Close cart" onClick={close}>
            &times;
          </button>
        </div>
        <div className="cart-body" id="cartItems">
          {cart.length === 0 ? (
            <div className="cart-empty" id="cartEmpty">
              <div className="cart-empty-icon">🍯</div>
              <p>Your cart is empty</p>
              <Link to="/products" className="btn btn-saffron btn-sm" onClick={close}>
                Browse Sweets
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ₹{item.price * item.qty} <small>({item.qty} × ₹{item.price})</small>
                  </div>
                  <div className="cart-item-qty">
                    <button type="button" className="qty-btn cart-qty-minus" onClick={() => updateCartQty(idx, -1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" className="qty-btn cart-qty-plus" onClick={() => updateCartQty(idx, 1)}>
                      +
                    </button>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => {
                        removeFromCart(idx);
                        showToast('Removed from cart', 'info');
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer" id="cartFooter">
            <div className="cart-total-row">
              <span>Estimated total</span>
              <strong id="cartTotal">₹{Math.round(cartTotal)}</strong>
            </div>
            <button type="button" className="btn btn-saffron w-100 mb-2" id="cartCheckoutBtn" onClick={onCheckout}>
              Checkout
            </button>
            <a href={waLink()} className="btn btn-wa-outline w-100" target="_blank" rel="noopener noreferrer">
              WhatsApp Order
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}

export default memo(CartDrawer);
