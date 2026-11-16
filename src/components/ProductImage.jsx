// Clothes and furniture photos fill the frame; electronics are product shots on white, so they are fitted inside it.
export default function ProductImage({ product, className = '', eager = false }) {
  const fit = product.category === 'electronics' ? 'object-contain bg-white p-4' : 'object-cover object-top';
  return (
    <img
      src={product.image}
      alt={product.title}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full ${fit} ${className}`}
    />
  );
}
