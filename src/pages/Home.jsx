import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Search, Truck, Wallet, Undo2 } from 'lucide-react';
import { api } from '../lib/api';
import { CATEGORIES } from '../lib/format';
import ProductGrid from '../components/ProductGrid';

const EXAMPLES = ['blue kurta under ₹2000', 'laptop for college', 'wedding lehenga', 'नीला शर्ट'];

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/products?sort=rating&limit=8').then((d) => setTop(d.products)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const search = (text) => text.trim().length >= 2 && navigate(`/search?q=${encodeURIComponent(text.trim())}`);

  return (
    <>
      <section className="bg-white">
        <div className="container-x grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
          <div>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">Tell us what you are looking for.</h1>
            <p className="mt-4 max-w-lg text-lg text-ink-soft">Describe it in your own words, in English, Hindi or Hinglish. We will find it in the store.</p>
            <form onSubmit={(e) => { e.preventDefault(); search(q); }} className="mt-6 flex max-w-xl gap-2" role="search">
              <input value={q} onChange={(e) => setQ(e.target.value)} className="input !py-3.5 !text-base" placeholder="e.g. red saree for a wedding under ₹5000" aria-label="Describe what you want" />
              <button className="btn-primary shrink-0 !px-5"><Search size={18} /><span className="hidden sm:inline">Search</span></button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {EXAMPLES.map((e) => <button key={e} onClick={() => search(e)} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft hover:border-brand-500 hover:text-brand-700">{e}</button>)}
            </div>
          </div>

          <div className="grid h-[22rem] grid-cols-2 grid-rows-2 gap-3 sm:h-[30rem]" aria-label="Featured collections">
            <Link to="/shop/men" className="row-span-2 overflow-hidden rounded-2xl bg-brand-50"><img src="/assets/img/men/6.webp" alt="Men's navy embroidered kurta" className="h-full w-full object-cover object-top" loading="eager" /></Link>
            <Link to="/shop/women" className="overflow-hidden rounded-2xl bg-accent-100"><img src="/assets/img/women/9.webp" alt="Women's navy lehenga" className="h-full w-full object-cover object-top" loading="eager" /></Link>
            <Link to="/shop/electronics" className="flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-4"><img src="/assets/img/electronics/9.webp" alt="Laptop" className="h-full w-full object-contain" loading="eager" /></Link>
          </div>
        </div>
      </section>

      <section className="container-x py-12" aria-labelledby="cats">
        <h2 id="cats" className="mb-5 text-2xl font-bold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/shop/${c.id}`} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-50">
              <img src={c.image} alt="" loading="lazy" className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${c.id === 'electronics' ? 'object-contain bg-white p-6' : 'object-cover object-top'}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-10 font-display text-lg font-bold text-white">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-4" aria-labelledby="top">
        <div className="mb-5 flex items-end justify-between"><h2 id="top" className="text-2xl font-bold">Top rated right now</h2><Link to="/shop" className="text-sm font-bold text-brand-700 hover:underline">View all products</Link></div>
        <ProductGrid products={top} loading={loading} />
      </section>

      <section className="container-x py-12">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-brand-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div><h2 className="text-2xl font-bold">Not sure what to buy?</h2><p className="mt-1 max-w-xl text-brand-100">Chat with our assistant. Tell it your budget or the occasion and it will pick from what is in the store.</p></div>
          <button onClick={() => window.dispatchEvent(new Event('wb:open-chat'))} className="btn-accent shrink-0"><MessageCircle size={18} /> Ask the assistant</button>
        </div>
      </section>

      <section className="container-x pb-4">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[[Truck, 'Free delivery above ₹999', 'A flat ₹49 fee applies on smaller orders.'], [Wallet, 'Cash on delivery', 'Pay when your order reaches you.'], [Undo2, 'Cancel before dispatch', 'Cancel any order that has not shipped yet.']].map(([Icon, title, text]) => (
            <li key={title} className="card flex gap-3 p-4"><Icon className="mt-0.5 shrink-0 text-brand-600" size={22} /><div><p className="font-bold">{title}</p><p className="text-sm text-ink-mute">{text}</p></div></li>
          ))}
        </ul>
      </section>
    </>
  );
}
