import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, LogOut, Package, Search, ShoppingCart, Sparkles, User } from 'lucide-react';
import Logo from './Logo';
import { CATEGORIES } from '../lib/format';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => menuRef.current && !menuRef.current.contains(e.target) && setMenu(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (q.trim().length >= 2) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const iconBtn = 'relative rounded-lg p-2 text-ink-soft hover:bg-brand-50 hover:text-brand-700';
  const badge = 'absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-ink';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5">
        <Link to="/" aria-label="White Bag home" className="mr-auto md:mr-0"><Logo /></Link>

        <form onSubmit={submit} role="search" className="order-last w-full md:order-none md:mx-4 md:w-auto md:flex-1 md:max-w-xl">
          <div className="relative">
            <Sparkles size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-600" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="input pl-10 pr-11"
              placeholder='Try "blue kurta under ₹2000"'
              aria-label="Search products"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink-mute hover:text-brand-700" aria-label="Search"><Search size={18} /></button>
          </div>
        </form>

        <nav className="flex items-center gap-1" aria-label="Account">
          <Link to="/wishlist" className={iconBtn} aria-label="Wishlist">
            <Heart size={21} />
            {wishlist.ids.length > 0 && <span className={badge}>{wishlist.ids.length}</span>}
          </Link>
          <Link to="/cart" className={iconBtn} aria-label={`Cart, ${count} items`}>
            <ShoppingCart size={21} />
            {count > 0 && <span className={badge}>{count}</span>}
          </Link>
          {user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenu((m) => !m)} className={iconBtn} aria-haspopup="menu" aria-expanded={menu} aria-label="Account menu">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{user.name[0].toUpperCase()}</span>
              </button>
              {menu && (
                <div role="menu" className="card absolute right-0 mt-2 w-52 p-1.5 shadow-lg">
                  <p className="truncate px-3 py-2 text-sm font-bold">{user.name}</p>
                  <Link role="menuitem" to="/orders" onClick={() => setMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50"><Package size={16} /> My orders</Link>
                  <button role="menuitem" onClick={() => { logout(); setMenu(false); navigate('/'); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-brand-50"><LogOut size={16} /> Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary ml-1 !px-4 !py-2"><User size={16} /> Log in</Link>
          )}
        </nav>
      </div>

      <nav className="border-t border-line" aria-label="Categories">
        <div className="container-x no-scrollbar flex gap-1 overflow-x-auto py-1 text-sm">
          {CATEGORIES.map((c) => (
            <NavLink key={c.id} to={`/shop/${c.id}`} className={({ isActive }) => `whitespace-nowrap rounded-lg px-3.5 py-1.5 font-medium ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-soft hover:text-brand-700'}`}>{c.label}</NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
