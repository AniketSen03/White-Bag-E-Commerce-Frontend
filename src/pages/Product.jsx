import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Heart, Shirt, ShoppingCart, Truck, Zap } from 'lucide-react';
import { api } from '../lib/api';
import { CLOTHING, COLOR_HEX, inr, titleCase } from '../lib/format';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductImage from '../components/ProductImage';
import ProductGrid from '../components/ProductGrid';
import TryOnModal from '../components/TryOnModal';
import { PageLoader, Stars, Stepper } from '../components/ui';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState('');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tryOn, setTryOn] = useState(false);
  const [tryOnReady, setTryOnReady] = useState(false);

  useEffect(() => {
    setProduct(null); setError(''); setSize(''); setQty(1); setSizeError(false);
    api(`/products/${id}`).then(async (d) => {
      setProduct(d.product);
      const rel = await api(`/products?category=${d.product.category}&limit=5`);
      setRelated(rel.products.filter((p) => p._id !== d.product._id).slice(0, 4));
    }).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => { api('/ai/status').then((s) => setTryOnReady(s.tryon)).catch(() => {}); }, []);

  if (error) return <div className="container-x py-16 text-center"><h1 className="text-2xl font-bold">{error}</h1><Link to="/shop" className="btn-primary mt-5">Back to shop</Link></div>;
  if (!product) return <PageLoader />;

  const needsSize = product.sizes.length > 0;
  const outOfStock = product.stock < 1;
  const liked = wishlist.has(product._id);

  const guard = () => {
    if (!user) { toast('Please log in to continue', 'error'); navigate('/login', { state: { from: location } }); return false; }
    if (needsSize && !size) { setSizeError(true); return false; }
    return true;
  };
  const addToCart = async () => {
    if (!guard()) return;
    setBusy(true);
    try { await cart.add(product._id, size, qty); toast('Added to cart'); } catch (e) { toast(e.message, 'error'); } finally { setBusy(false); }
  };
  const buyNow = () => guard() && navigate('/checkout', { state: { buyNow: { productId: product._id, size, quantity: qty } } });

  return (
    <div className="container-x py-6">
      <nav className="mb-4 text-sm text-ink-mute" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-brand-700">Shop</Link> / <Link to={`/shop/${product.category}`} className="hover:text-brand-700">{titleCase(product.category)}</Link>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-brand-50 md:sticky md:top-32 md:self-start"><ProductImage product={product} eager /></div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="mt-2"><Stars rating={product.rating} count={product.reviewCount} /></div>
          <p className="mt-4 text-3xl font-bold">{inr(product.price)}</p>
          <p className="text-sm text-ink-mute">Inclusive of all taxes. Free delivery above ₹999.</p>
          <p className="mt-5 max-w-prose text-ink-soft">{product.description}</p>

          <p className="mt-5 flex items-center gap-2 text-sm"><span className="font-medium">Colour:</span><span className="h-4 w-4 rounded-full border border-line" style={{ background: COLOR_HEX[product.color] }} />{titleCase(product.color)}</p>

          {needsSize && (
            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-medium">Size {sizeError && <span className="ml-2 text-bad" role="alert">Please choose a size</span>}</legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => <button key={s} onClick={() => { setSize(s); setSizeError(false); }} aria-pressed={size === s} className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-medium ${size === s ? 'border-brand-600 bg-brand-600 text-white' : sizeError ? 'border-bad bg-white' : 'border-line bg-white hover:border-brand-500'}`}>{s}</button>)}
              </div>
            </fieldset>
          )}

          <div className="mt-5 flex items-center gap-3"><span className="text-sm font-medium">Quantity</span><Stepper value={qty} onChange={setQty} max={Math.min(10, product.stock)} /></div>
          {product.stock > 0 && product.stock <= 5 && <p className="mt-2 text-sm font-medium text-accent-600">Only {product.stock} left</p>}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={addToCart} disabled={busy || outOfStock} className="btn-outline !py-3"><ShoppingCart size={18} /> {outOfStock ? 'Out of stock' : 'Add to cart'}</button>
            <button onClick={buyNow} disabled={outOfStock} className="btn-primary !py-3"><Zap size={18} /> Buy now</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button onClick={() => { wishlist.toggle(product._id); toast(liked ? 'Removed from wishlist' : 'Saved to wishlist'); }} aria-pressed={liked} className="btn-outline !py-2"><Heart size={16} fill={liked ? '#D13F3F' : 'none'} className={liked ? 'text-bad' : ''} /> {liked ? 'Saved' : 'Save for later'}</button>
            {tryOnReady && CLOTHING.includes(product.category) && <button onClick={() => (user ? setTryOn(true) : (toast('Please log in to use try-on', 'error'), navigate('/login', { state: { from: location } })))} className="btn-outline !py-2"><Shirt size={16} /> Try it on</button>}
          </div>

          <p className="mt-6 flex items-center gap-2 rounded-lg bg-brand-50 p-3 text-sm text-brand-800"><Truck size={18} /> Cash on delivery available. Cancel any time before it ships.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="rel"><h2 id="rel" className="mb-4 text-2xl font-bold">You may also like</h2><ProductGrid products={related} /></section>
      )}
      {tryOn && <TryOnModal product={product} onClose={() => setTryOn(false)} />}
    </div>
  );
}
