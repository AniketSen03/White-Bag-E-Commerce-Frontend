import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CATEGORIES } from '../lib/format';

export default function Footer() {
  const link = 'text-sm text-ink-mute hover:text-brand-700';
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-x grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-mute">Clothes, electronics and furniture, with an assistant that helps you find the right one.</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold">Shop</h2>
          <ul className="space-y-2">{CATEGORIES.map((c) => <li key={c.id}><Link className={link} to={`/shop/${c.id}`}>{c.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold">Your account</h2>
          <ul className="space-y-2">
            <li><Link className={link} to="/orders">My orders</Link></li>
            <li><Link className={link} to="/wishlist">Wishlist</Link></li>
            <li><Link className={link} to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold">Help</h2>
          <ul className="space-y-2">
            <li><Link className={link} to="/contact">Contact us</Link></li>
            <li><Link className={link} to="/about">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-ink-mute">© {new Date().getFullYear()} White Bag. Demo store: no real payments are taken.</div>
    </footer>
  );
}
