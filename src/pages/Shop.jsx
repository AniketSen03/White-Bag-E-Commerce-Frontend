import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { api } from '../lib/api';
import { CATEGORIES, COLOR_HEX, TYPES, titleCase } from '../lib/format';
import ProductGrid from '../components/ProductGrid';
import { Empty } from '../components/ui';

const PRICES = [
  { id: '', label: 'Any price' },
  { id: '0-500', label: 'Under ₹500' },
  { id: '500-2000', label: '₹500 to ₹2,000' },
  { id: '2000-10000', label: '₹2,000 to ₹10,000' },
  { id: '10000-50000', label: '₹10,000 to ₹50,000' },
  { id: '50000-', label: 'Above ₹50,000' },
];
const COLORS = Object.keys(COLOR_HEX);

export default function Shop() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const type = params.get('type') || '';
  const price = params.get('price') || '';
  const colors = (params.get('color') || '').split(',').filter(Boolean);
  const sort = params.get('sort') || 'rating';
  const cat = CATEGORIES.find((c) => c.id === category);

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };
  const toggleColor = (c) => set('color', (colors.includes(c) ? colors.filter((x) => x !== c) : [...colors, c]).join(','));

  useEffect(() => {
    const qs = new URLSearchParams({ sort, limit: '100' });
    if (category) qs.set('category', category);
    if (type) qs.set('type', type);
    if (colors.length) qs.set('color', colors.join(','));
    if (price) { const [min, max] = price.split('-'); if (min) qs.set('minPrice', min); if (max) qs.set('maxPrice', max); }
    setLoading(true); setError('');
    api(`/products?${qs}`).then((d) => setProducts(d.products)).catch((e) => setError(e.message)).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, type, price, params.get('color'), sort]);

  const filtered = type || price || colors.length;

  const Filters = (
    <div className="space-y-6">
      {category && TYPES[category].length > 1 && (
        <fieldset><legend className="mb-2 text-sm font-bold">Type</legend>
          <div className="flex flex-wrap gap-2">
            {TYPES[category].map((t) => <button key={t} onClick={() => set('type', type === t ? '' : t)} aria-pressed={type === t} className={`rounded-full border px-3 py-1 text-sm ${type === t ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white hover:border-brand-500'}`}>{titleCase(t)}</button>)}
          </div>
        </fieldset>
      )}
      <fieldset><legend className="mb-2 text-sm font-bold">Price</legend>
        <div className="space-y-1.5">{PRICES.map((p) => (
          <label key={p.id} className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="price" checked={price === p.id} onChange={() => set('price', p.id)} className="accent-brand-600" />{p.label}</label>
        ))}</div>
      </fieldset>
      <fieldset><legend className="mb-2 text-sm font-bold">Colour</legend>
        <div className="flex flex-wrap gap-2">{COLORS.map((c) => (
          <button key={c} onClick={() => toggleColor(c)} aria-pressed={colors.includes(c)} aria-label={c} title={titleCase(c)} style={{ background: COLOR_HEX[c] }} className={`h-7 w-7 rounded-full border ${colors.includes(c) ? 'ring-2 ring-brand-600 ring-offset-2' : 'border-line'}`} />
        ))}</div>
      </fieldset>
      {filtered && <button onClick={() => setParams({}, { replace: true })} className="text-sm font-bold text-brand-700 hover:underline">Clear all filters</button>}
    </div>
  );

  return (
    <div className="container-x py-6">
      <h1 className="text-3xl font-bold">{cat ? cat.label : 'All products'}</h1>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {[{ id: '', label: 'All' }, ...CATEGORIES].map((c) => (
          <Link key={c.id} to={c.id ? `/shop/${c.id}` : '/shop'} aria-current={(category || '') === c.id ? 'page' : undefined} className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium ${(category || '') === c.id ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-brand-500'}`}>{c.label}</Link>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-mute" aria-live="polite">{loading ? 'Loading…' : `${products.length} products`}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen((o) => !o)} className="btn-outline !py-2 lg:hidden" aria-expanded={open}><SlidersHorizontal size={16} /> Filters</button>
              <select value={sort} onChange={(e) => set('sort', e.target.value === 'rating' ? '' : e.target.value)} className="input !w-auto !py-2" aria-label="Sort products">
                <option value="rating">Top rated</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="newest">Newest</option>
              </select>
            </div>
          </div>
          {open && <div className="card mb-4 p-4 lg:hidden">{Filters}</div>}
          {error ? <p className="rounded-lg bg-red-50 p-4 text-sm text-bad" role="alert">{error}</p>
            : !loading && !products.length ? <Empty title="No products match these filters" text="Try removing a filter or two." action={{ to: category ? `/shop/${category}` : '/shop', label: 'Clear filters' }} />
            : <ProductGrid products={products} loading={loading} />}
        </div>
      </div>
    </div>
  );
}
