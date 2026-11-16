import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { inr } from '../lib/format';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductImage from '../components/ProductImage';
import OrderSummary from '../components/OrderSummary';
import { Field, PageLoader, Spinner } from '../components/ui';

const EMPTY = { fullName: '', phone: '', address: '', city: '', state: '', pincode: '' };

// Same rules as the server. The server checks again, because browser checks can be skipped.
const validate = (f) => {
  const e = {};
  if (f.fullName.trim().length < 2) e.fullName = 'Enter your full name';
  if (!/^[6-9]\d{9}$/.test(f.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number';
  if (f.address.trim().length < 6) e.address = 'Enter your full address';
  if (f.city.trim().length < 2) e.city = 'Enter your city';
  if (f.state.trim().length < 2) e.state = 'Enter your state';
  if (!/^\d{6}$/.test(f.pincode.trim())) e.pincode = 'Enter a valid 6-digit pincode';
  return e;
};

export default function Checkout() {
  const navigate = useNavigate();
  const buyNow = useLocation().state?.buyNow; // set when the user clicked "Buy now" on a product
  const { refresh } = useCart();
  const toast = useToast();

  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    api('/orders/quote', { method: 'POST', body: buyNow ? { items: [buyNow] } : {} })
      .then(setQuote)
      .catch((e) => { toast(e.message, 'error'); navigate(buyNow ? -1 : '/cart', { replace: true }); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bind = (name) => ({
    value: form[name],
    onChange: (e) => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: undefined }); },
    className: `input ${errors[name] ? '!border-bad' : ''}`,
  });

  const place = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return document.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center' });
    setPlacing(true); // disables the button so a double click cannot create two orders
    try {
      const { order } = await api('/orders', { method: 'POST', body: { shipping: form, paymentMethod: payment, items: buyNow ? [buyNow] : undefined } });
      await refresh();
      navigate(`/orders/${order._id}`, { replace: true, state: { placed: true } });
    } catch (err) {
      toast(err.message, 'error');
      setPlacing(false);
    }
  };

  if (!quote) return <PageLoader />;

  return (
    <div className="container-x py-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <form onSubmit={place} noValidate className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="card p-5">
            <h2 className="mb-4 text-lg font-bold">Delivery address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.fullName}><input {...bind('fullName')} autoComplete="name" /></Field>
              <Field label="Mobile number" error={errors.phone}><input {...bind('phone')} inputMode="numeric" maxLength={10} autoComplete="tel-national" /></Field>
              <div className="sm:col-span-2"><Field label="Address" error={errors.address}><input {...bind('address')} autoComplete="street-address" placeholder="House number, street, area" /></Field></div>
              <Field label="City" error={errors.city}><input {...bind('city')} autoComplete="address-level2" /></Field>
              <Field label="State" error={errors.state}><input {...bind('state')} autoComplete="address-level1" /></Field>
              <Field label="Pincode" error={errors.pincode}><input {...bind('pincode')} inputMode="numeric" maxLength={6} autoComplete="postal-code" /></Field>
            </div>
          </section>

          <fieldset className="card p-5">
            <legend className="float-left mb-4 text-lg font-bold">Payment</legend>
            <div className="clear-both space-y-2">
              {[['cod', 'Cash on delivery', 'Pay when your order arrives.'], ['online_demo', 'Online payment (demo)', 'Demo only. No money is taken and the order stays “payment pending”.']].map(([id, title, text]) => (
                <label key={id} className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${payment === id ? 'border-brand-600 bg-brand-50' : 'border-line'}`}>
                  <input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(id)} className="mt-1 accent-brand-600" />
                  <span><span className="block font-medium">{title}</span><span className="text-sm text-ink-mute">{text}</span></span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="h-fit space-y-3 lg:sticky lg:top-32">
          <div className="card p-4">
            <h2 className="mb-3 text-lg font-bold">Items</h2>
            <ul className="space-y-3">
              {quote.lines.map((l, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-50"><ProductImage product={l.product} /></div>
                  <div className="min-w-0 flex-1"><p className="line-clamp-2">{l.product.title}</p><p className="text-ink-mute">{l.size && `Size ${l.size} · `}Qty {l.quantity}</p></div>
                  <p className="font-medium">{inr(l.product.price * l.quantity)}</p>
                </li>
              ))}
            </ul>
          </div>
          <OrderSummary summary={quote.summary} />
          <button disabled={placing} className="btn-primary w-full !py-3">{placing ? <><Spinner /> Placing order…</> : `Place order · ${inr(quote.summary.total)}`}</button>
        </aside>
      </form>
    </div>
  );
}
