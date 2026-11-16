const STYLES = {
  placed: 'bg-brand-50 text-brand-700',
  shipped: 'bg-accent-100 text-accent-600',
  delivered: 'bg-emerald-50 text-ok',
  cancelled: 'bg-red-50 text-bad',
};

export default function StatusBadge({ status }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${STYLES[status]}`}>{status}</span>;
}
