import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, SearchX, Sparkles } from 'lucide-react';
import { api } from '../lib/api';
import { inr, titleCase } from '../lib/format';
import ProductGrid from '../components/ProductGrid';
import { Empty } from '../components/ui';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (q.trim().length < 2) { setLoading(false); return; }
    setLoading(true); setError(''); setData(null);
    api('/ai/search', { method: 'POST', body: { query: q } }).then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [q]);

  const f = data?.filters;
  const chips = f ? [f.category && titleCase(f.category), f.type && titleCase(f.type), f.minPrice != null && `From ${inr(f.minPrice)}`, f.maxPrice != null && `Up to ${inr(f.maxPrice)}`, ...f.colors.map(titleCase)].filter(Boolean) : [];

  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Results for “{q}”</h1>

      {data?.aiUsed && chips.length > 0 && (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-soft"><Sparkles size={16} className="text-brand-600" /> We understood this as:
          {chips.map((c) => <span key={c} className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">{c}</span>)}
        </p>
      )}
      {data && !data.aiUsed && <p className="mt-3 flex items-center gap-2 rounded-lg bg-accent-100 p-3 text-sm"><Info size={16} className="shrink-0" /> Smart search is unavailable right now, so we matched your words directly.</p>}
      {data?.relaxed && data.products.length > 0 && <p className="mt-3 flex items-center gap-2 rounded-lg bg-accent-100 p-3 text-sm"><Info size={16} className="shrink-0" /> No exact match, so here are the closest products.</p>}

      <div className="mt-6">
        {error ? <p className="rounded-lg bg-red-50 p-4 text-sm text-bad" role="alert">{error}</p>
          : !loading && (!data || !data.products.length) ? <Empty icon={SearchX} title="Nothing found" text="Try fewer words, or ask the assistant for ideas." action={{ to: '/shop', label: 'Browse all products' }} />
          : <ProductGrid products={data?.products || []} loading={loading} />}
      </div>
    </div>
  );
}
