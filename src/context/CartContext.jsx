import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const EMPTY = { items: [], summary: { subtotal: 0, shippingFee: 0, total: 0, freeShippingAbove: 999 } };

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) return setCart(EMPTY);
    setLoading(true);
    try { setCart(await api('/cart')); } catch { /* shown by pages when needed */ } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  // every cart action returns the fresh cart from the server, so the UI never drifts out of sync
  const run = async (path, options) => { const data = await api(path, options); setCart(data); };

  const value = {
    items: cart.items,
    summary: cart.summary,
    loading,
    count: cart.items.reduce((n, i) => n + i.quantity, 0),
    refresh,
    add: (productId, size, quantity = 1) => run('/cart/items', { method: 'POST', body: { productId, size, quantity } }),
    setQuantity: (itemId, quantity) => run(`/cart/items/${itemId}`, { method: 'PATCH', body: { quantity } }),
    remove: (itemId) => run(`/cart/items/${itemId}`, { method: 'DELETE' }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
