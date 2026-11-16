import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { api } from '../lib/api';
import { dateFmt, inr } from '../lib/format';
import { Empty, PageLoader } from '../components/ui';
import StatusBadge from '../components/StatusBadge';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api('/orders').then((d) => setOrders(d.orders)).catch((e) => setError(e.message)); }, []);

  if (error) return <p className="container-x py-10 text-bad" role="alert">{error}</p>;
  if (!orders) return <PageLoader />;
  if (!orders.length) return <Empty icon={Package} title="No orders yet" text="When you place an order, you can track it here." action={{ to: '/shop', label: 'Start shopping' }} />;

  return (
    <div className="container-x max-w-3xl py-6">
      <h1 className="text-3xl font-bold">My orders</h1>
      <ul className="mt-6 space-y-3">
        {orders.map((o) => (
          <li key={o._id}>
            <Link to={`/orders/${o._id}`} className="card flex items-center gap-4 p-4 hover:border-brand-500">
              <div className="flex -space-x-3">
                {o.items.slice(0, 3).map((i, k) => <img key={k} src={i.image} alt="" className="h-14 w-12 rounded-lg border-2 border-white bg-brand-50 object-cover object-top" loading="lazy" />)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{o.items[0].title}{o.items.length > 1 && ` + ${o.items.length - 1} more`}</p>
                <p className="text-sm text-ink-mute">Placed on {dateFmt(o.createdAt)}</p>
              </div>
              <div className="text-right"><p className="font-bold">{inr(o.total)}</p><StatusBadge status={o.status} /></div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
