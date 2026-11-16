import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';
import { Field, Spinner } from '../components/ui';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'busy' });
    try {
      const d = await api('/contact', { method: 'POST', body: form });
      setStatus({ type: 'done', text: d.message });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="container-x max-w-xl py-10">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-2 text-ink-soft">Questions about an order or a product? Send us a message.</p>
      {status.type === 'done' ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-ok" role="status"><CheckCircle2 /> {status.text}</div>
      ) : (
        <form onSubmit={submit} className="card mt-6 space-y-4 p-5">
          <Field label="Your name"><input className="input" value={form.name} onChange={set('name')} required minLength={2} /></Field>
          <Field label="Email"><input type="email" className="input" value={form.email} onChange={set('email')} required /></Field>
          <Field label="Message"><textarea className="input min-h-32" value={form.message} onChange={set('message')} required minLength={10} maxLength={1000} /></Field>
          {status.type === 'error' && <p className="rounded-lg bg-red-50 p-3 text-sm text-bad" role="alert">{status.text}</p>}
          <button className="btn-primary" disabled={status.type === 'busy'}>{status.type === 'busy' ? <Spinner /> : 'Send message'}</button>
        </form>
      )}
    </div>
  );
}
