import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Shirt, X } from 'lucide-react';
import { api } from '../lib/api';
import { Spinner } from './ui';

export default function TryOnModal({ product, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const pick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) return setError('Please choose a JPG, PNG or WebP photo.');
    if (f.size > 4 * 1024 * 1024) return setError('Photo must be under 4 MB.');
    setError(''); setResult(null); setFile(f); setPreview(URL.createObjectURL(f));
  };

  const generate = async () => {
    setBusy(true); setError('');
    try {
      // the browser already has the product photo, so we send both images together
      const garment = await (await fetch(product.image)).blob();
      const form = new FormData();
      form.append('person', file);
      form.append('garment', garment, 'garment.webp');
      setResult((await api('/ai/tryon', { method: 'POST', form })).image);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Virtual try-on">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div><h2 className="flex items-center gap-2 text-xl font-bold"><Shirt size={22} className="text-brand-600" /> Try it on</h2><p className="text-sm text-ink-mute">{product.title}</p></div>
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-paper"><X size={22} /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">Your photo</p>
            <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-line bg-paper text-center text-sm text-ink-mute hover:border-brand-500">
              {preview ? <img src={preview} alt="Your uploaded photo" className="h-full w-full object-cover" /> : <><ImagePlus size={28} className="mb-2" />Choose a clear, full-length photo<span className="text-xs">JPG, PNG or WebP, up to 4 MB</span></>}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={pick} />
            </label>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Preview</p>
            <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-line bg-paper text-center text-sm text-ink-mute">
              {busy ? <div className="flex flex-col items-center gap-2"><Spinner className="h-6 w-6 text-brand-600" />Creating your preview. This can take up to a minute.</div>
                : result ? <img src={result} alt="Generated preview of you wearing the product" className="h-full w-full object-cover" /> : 'Your preview will appear here'}
            </div>
          </div>
        </div>

        <label className="mt-4 flex items-start gap-2 text-sm">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-brand-600" />
          <span>I agree to send my photo to an AI service to create this preview. White Bag does not save it.</span>
        </label>
        {error && <p className="mt-3 text-sm text-bad" role="alert">{error}</p>}
        <button onClick={generate} disabled={!file || !consent || busy} className="btn-primary mt-4 w-full">{busy ? 'Working…' : result ? 'Try again' : 'Create preview'}</button>
        <p className="mt-3 text-xs text-ink-mute">This is an AI preview, not an exact fit. Always check the size chart before you buy.</p>
      </div>
    </div>
  );
}
