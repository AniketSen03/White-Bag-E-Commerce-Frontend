import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, skeletons = 8 }) {
  const cols = 'grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4';
  if (loading) {
    return (
      <div className={cols} aria-busy="true">
        {Array.from({ length: skeletons }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton aspect-[4/5]" />
            <div className="space-y-2 p-3"><div className="skeleton h-4 w-3/4 rounded" /><div className="skeleton h-4 w-1/3 rounded" /></div>
          </div>
        ))}
      </div>
    );
  }
  return <div className={cols}>{products.map((p) => <ProductCard key={p._id} product={p} />)}</div>;
}
