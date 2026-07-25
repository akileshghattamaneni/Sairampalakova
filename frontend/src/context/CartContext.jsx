import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_KEY = 'srp_cart';
const WISH_KEY = 'srp_wishlist';

const CartContext = createContext(null);

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => load(CART_KEY));
  const [wishlist, setWishlist] = useState(() => load(WISH_KEY));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => String(i.id) === String(product.id));
      if (existing) {
        return prev.map((i) =>
          String(i.id) === String(product.id) ? { ...i, qty: i.qty + (product.qty || 1) } : i
        );
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  }, []);

  const updateCartQty = useCallback((index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      if (delta < 0 && next[index].qty <= 1) {
        next.splice(index, 1);
        return next;
      }
      next[index] = { ...next[index], qty: next[index].qty + delta };
      return next;
    });
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id) => {
    const sid = String(id);
    setWishlist((prev) =>
      prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid]
    );
  }, []);

  const isWishlisted = useCallback((id) => wishlist.includes(String(id)), [wishlist]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      cartOpen,
      setCartOpen,
      wishlist,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      cartOpen,
      wishlist,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
