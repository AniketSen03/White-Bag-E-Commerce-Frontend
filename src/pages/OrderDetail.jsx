import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';
import { dateFmt, inr } from '../lib/format';
import { useToast } from '../context/ToastContext';
import { PageLoader } from '../components/ui';
import StatusBadge from '../components/StatusBadge';

const STEPS = ['placed', 'shipped', 'delivered'];

export default function OrderDetail() {
  const { id } = useParams();
  const placed = useLocation().state?.placed;
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { api(`/orders/${id}`).then((d) => setOrder(d.order)).catch((e) => setError(e.message)); }, [id]);

  const cancel = async () => {
    if (!window.confirm('Cancel this order?')) return;
    try { setOrder((await api(`/orders/${id}/cancel`, { method: 'PATCH' })).order); toast('Order cancelled'); } catch (e) { toast(e.message, 'error'); }
  };

  if (error) return <div className="container-x py-16 text-center"><h1 className="text-2xl font-bold">{error}</h1><Link to="/orders" className="btn-primary mt-5">My orders</Link></div>;
  if (!order) return <PageLoader />;

  const step = STEPS.indexOf(order.status);
  const s = order.shipping;

  return (
    <div className="container-x max-w-3xl py-6">
      {placed && (
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-ok"><CheckCircle2 size={26} /><div><p className="font-bold">Order placed. Thank you!</p><p className="text-sm">We will update the status here as it moves.</p></div></div>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-2xl font-bold">Order #{order._id.slice(-8).toUpperCase()}</h1><p className="text-sm text-ink-mute">Placed on {dateFmt(order.createdAt)}</p></div>
        <StatusBadge status={order.status} />
      </div>

      {order.status !== 'cancelled' && (
        <ol className="card mt-5 grid grid-cols-3 p-4 text-center text-sm" aria-label="Order progress">
          {STEPS.map((label, i) => (
            <li key={label} className={i <= step ? 'font-bold text-brand-700' : 'text-ink-mute'}>
              <span className={`mx-auto mb-2 block h-2 rounded-full ${i <= step ? 'bg-brand-600' : 'bg-line'}`} />
              <span className="capitalize">{label}</span>
            </li>
          ))}
        </ol>
      )}

      <section className="card mt-5 divide-y divide-line">
        {order.items.map((i, k) => (
          <Link key={k} to={`/product/${i.product}`} className="flex gap-3 p-4 hover:bg-paper">
            <img src={i.image} alt="" className="h-20 w-16 rounded-lg bg-brand-50 object-cover object-top" />
            <div className="min-w-0 flex-1"><p className="line-clamp-2 font-medium">{i.title}</p><p className="text-sm text-ink-mute">{i.size && `Size ${i.size} · `}Qty {i.quantity}</p></div>
            <p className="font-medium">{inr(i.price * i.quantity)}</p>
          </Link>
        ))}
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <section className="card p-4"><h2 className="mb-2 font-bold">Delivery address</h2><p className="text-sm text-ink-soft">{s.fullName}<br />{s.address}<br />{s.city}, {s.state} {s.pincode}<br />Mobile: {s.phone}</p></section>
        <section className="card p-4">
          <h2 className="mb-2 font-bold">Payment</h2>
          <p className="text-sm text-ink-soft">{order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Online payment (demo)'} · <span className="capitalize">{order.paymentStatus}</span></p>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between"><dt className="text-ink-mute">Subtotal</dt><dd>{inr(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-mute">Delivery</dt><dd>{order.shippingFee ? inr(order.shippingFee) : 'Free'}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 font-bold"><dt>Total</dt><dd>{inr(order.total)}</dd></div>
          </dl>
        </section>
      </div>

      {order.status === 'placed' && <button onClick={cancel} className="btn-outline mt-5 !border-bad/40 !text-bad hover:!bg-red-50">Cancel order</button>}
    </div>
  );
}
