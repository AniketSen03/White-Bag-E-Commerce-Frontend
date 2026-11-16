import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);
export const useWishlist = () => useContext(WishlistContext);

// Wishlist lives in the browser (localStorage). Simple, and works without logging in.
const read = () => { try { return JSON.parse(localStorage.getItem('wb_wishlist')) || []; } catch { return []; } };

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(read);
  useEffect(() => { localStorage.setItem('wb_wishlist', JSON.stringify(ids)); }, [ids]);

  const toggle = (id) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  return <WishlistContext.Provider value={{ ids, has: (id) => ids.includes(id), toggle }}>{children}</WishlistContext.Provider>;
}
