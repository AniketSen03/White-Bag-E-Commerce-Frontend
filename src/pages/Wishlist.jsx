import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { api } from '../lib/api';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/ProductGrid';
import { Empty } from '../components/ui';

export default function Wishlist() {
  const { ids } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids.length) { setProducts([]); setLoading(false); return; }
    api(`/products?ids=${ids.join(',')}&limit=100`).then((d) => setProducts(d.products)).catch(() => {}).finally(() => setLoading(false));
  }, [ids]);

  if (!loading && !products.length) return <Empty icon={Heart} title="Your wishlist is empty" text="Tap the heart on any product to save it here." action={{ to: '/shop', label: 'Browse products' }} />;
  return (
    <div className="container-x py-6">
      <h1 className="mb-6 text-3xl font-bold">Wishlist</h1>
      <ProductGrid products={products} loading={loading} skeletons={Math.min(ids.length, 4)} />
    </div>
  );
}
