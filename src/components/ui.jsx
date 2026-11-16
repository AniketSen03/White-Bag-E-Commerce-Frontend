import { Loader2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Spinner = ({ className = '' }) => <Loader2 className={`animate-spin ${className}`} size={18} aria-label="Loading" />;

export const PageLoader = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-brand-600"><Spinner className="h-7 w-7" /></div>
);

export function Empty({ icon: Icon, title, text, action }) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center py-16 text-center">
      {Icon && <div className="mb-4 rounded-full bg-brand-50 p-4 text-brand-600"><Icon size={28} /></div>}
      <h2 className="text-xl font-bold">{title}</h2>
      {text && <p className="mt-1 text-sm text-ink-mute">{text}</p>}
      {action && <Link to={action.to} className="btn-primary mt-5">{action.label}</Link>}
    </div>
  );
}

export function Stars({ rating, count }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="inline-flex items-center gap-1 rounded bg-ok px-1.5 py-0.5 text-xs font-bold text-white">
        {Number(rating).toFixed(1)} <Star size={11} fill="currentColor" />
      </span>
      {count != null && <span className="text-ink-mute">({count})</span>}
    </span>
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-bad" role="alert">{error}</span>}
    </label>
  );
}

export function Stepper({ value, onChange, min = 1, max = 10, disabled }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-line bg-white">
      <button type="button" className="h-9 w-9 text-lg disabled:opacity-40" onClick={() => onChange(value - 1)} disabled={disabled || value <= min} aria-label="Decrease quantity">−</button>
      <span className="w-8 text-center text-sm font-bold" aria-live="polite">{value}</span>
      <button type="button" className="h-9 w-9 text-lg disabled:opacity-40" onClick={() => onChange(value + 1)} disabled={disabled || value >= max} aria-label="Increase quantity">+</button>
    </div>
  );
}
