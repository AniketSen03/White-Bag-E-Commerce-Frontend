import { inr } from '../lib/format';

export default function OrderSummary({ summary }) {
  return (
    <div className="card p-4">
      <h2 className="mb-3 text-lg font-bold">Order summary</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-ink-mute">Subtotal</dt><dd>{inr(summary.subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-ink-mute">Delivery</dt><dd>{summary.shippingFee ? inr(summary.shippingFee) : <span className="font-medium text-ok">Free</span>}</dd></div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-bold"><dt>Total</dt><dd>{inr(summary.total)}</dd></div>
      </dl>
    </div>
  );
}
