import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { inr } from '../lib/format';
import ProductImage from '../components/ProductImage';
import { Empty, PageLoader, Stepper } from '../components/ui';
import OrderSummary from '../components/OrderSummary';

export default function Cart() {
  const { items, summary, loading, setQuantity, remove } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const act = (fn) => fn().catch((e) => toast(e.message, 'error'));

  if (loading && !items.length) return <PageLoader />;
  if (!items.length) return <Empty icon={ShoppingBag} title="Your cart is empty" text="Add something you like and it will show up here." action={{ to: '/shop', label: 'Start shopping' }} />;

  const remaining = summary.freeShippingAbove - summary.subtotal;

  return (
    <div className="container-x py-6">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-3">
          {remaining > 0
            ? <p className="rounded-lg bg-accent-100 p-3 text-sm">Add <b>{inr(remaining)}</b> more to get free delivery.</p>
            : <p className="rounded-lg bg-emerald-50 p-3 text-sm text-ok">You have free delivery on this order.</p>}
          {items.map((i) => (
            <article key={i.id} className="card flex gap-3 p-3 sm:gap-4">
              <Link to={`/product/${i.product._id}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-50 sm:h-32 sm:w-28"><ProductImage product={i.product} /></Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link to={`/product/${i.product._id}`} className="line-clamp-2 font-medium hover:text-brand-700">{i.product.title}</Link>
                {i.size && <p className="text-sm text-ink-mute">Size: {i.size}</p>}
                <p className="mt-1 font-bold">{inr(i.product.price)}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <Stepper value={i.quantity} max={Math.min(10, i.product.stock)} onChange={(q) => act(() => setQuantity(i.id, q))} />
                  <button onClick={() => act(() => remove(i.id))} className="flex items-center gap-1 text-sm text-ink-mute hover:text-bad" aria-label={`Remove ${i.product.title}`}><Trash2 size={16} /> Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="h-fit lg:sticky lg:top-32">
          <OrderSummary summary={summary} />
          <button onClick={() => navigate('/checkout')} className="btn-primary mt-3 w-full !py-3">Proceed to checkout</button>
        </aside>
      </div>
    </div>
  );
}
