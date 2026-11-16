import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductImage from './ProductImage';
import { Stars } from './ui';
import { inr } from '../lib/format';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const wishlist = useWishlist();
  const toast = useToast();
  const liked = wishlist.has(product._id);

  const toggle = (e) => {
    e.preventDefault();
    wishlist.toggle(product._id);
    toast(liked ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  return (
    <Link to={`/product/${product._id}`} className="group card flex flex-col overflow-hidden transition-colors hover:border-brand-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-50">
        <ProductImage product={product} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        <button
          onClick={toggle}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
          className="absolute right-2 top-2 rounded-full bg-white/95 p-2 text-ink-soft hover:text-bad"
        >
          <Heart size={18} fill={liked ? '#D13F3F' : 'none'} className={liked ? 'text-bad' : ''} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug">{product.title}</h3>
        <Stars rating={product.rating} count={product.reviewCount} />
        <p className="mt-auto text-lg font-bold">{inr(product.price)}</p>
      </div>
    </Link>
  );
}
