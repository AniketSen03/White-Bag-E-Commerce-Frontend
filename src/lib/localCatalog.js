import products from '../data/products';

// Answers the product requests (/products, /products/:id) from the built-in list, so cards show instantly
// without a server. It follows the same rules as the backend: category, type, colour, price, search words, sort.
const SORTS = {
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  newest: (a, b) => products.indexOf(b) - products.indexOf(a),
};

export async function localProducts(path) {
  const [route, query = ''] = path.split('?');

  if (route !== '/products') {
    const product = products.find((p) => p._id === route.split('/')[2]);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    return { product };
  }

  const params = new URLSearchParams(query);
  const words = (params.get('q') || '').toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  const colors = (params.get('color') || '').split(',').filter(Boolean);
  const ids = (params.get('ids') || '').split(',').filter(Boolean);
  const min = params.get('minPrice') ? Number(params.get('minPrice')) : null;
  const max = params.get('maxPrice') ? Number(params.get('maxPrice')) : null;
  const limit = Math.min(Math.max(parseInt(params.get('limit'), 10) || 60, 1), 100);

  const list = products
    .filter((p) => {
      if (params.get('category') && p.category !== params.get('category')) return false;
      if (params.get('type') && p.type !== params.get('type')) return false;
      if (colors.length && !colors.includes(p.color)) return false;
      if (ids.length && !ids.includes(p._id)) return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      const text = `${p.title} ${p.description} ${p.type} ${p.tags.join(' ')}`.toLowerCase();
      return words.every((w) => text.includes(w));
    })
    .sort(SORTS[params.get('sort')] || SORTS.rating)
    .slice(0, limit);

  return { count: list.length, products: list };
}