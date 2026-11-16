import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { api } from '../lib/api';
import { inr } from '../lib/format';
import { Spinner } from './ui.jsx';
import ProductImage from './ProductImage';

const SUGGESTIONS = ['Shaadi ke liye kuch suggest karo', 'Best phone under ₹15,000', 'Gift for my mother'];
const WELCOME = { role: 'assistant', content: 'Hi! I am the White Bag assistant. Tell me what you need, in English or Hinglish, and I will suggest products from our store.' };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener('wb:open-chat', openChat);
    return () => window.removeEventListener('wb:open-chat', openChat);
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [messages, busy, open]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      // the welcome message is UI only, so we don't send it to the AI
      const history = next.filter((m) => m !== WELCOME).map(({ role, content }) => ({ role, content }));
      const data = await api('/ai/chat', { method: 'POST', body: { messages: history } });
      setMessages([...next, { role: 'assistant', content: data.reply, products: data.products }]);
    } catch (err) {
      setMessages([...next, { role: 'assistant', content: err.message, error: true }]);
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-brand-600 p-3.5 text-sm sm:px-4 sm:py-3 font-bold text-white shadow-lg hover:bg-brand-700" aria-label="Open shopping assistant">
        <MessageCircle size={20} /> <span className="hidden sm:inline">Ask assistant</span>
      </button>
    );
  }

  return (
    <section aria-label="Shopping assistant" className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col overflow-hidden border border-line bg-white shadow-2xl sm:inset-x-auto sm:bottom-4 sm:right-4 sm:h-[34rem] sm:w-[24rem] sm:rounded-2xl">
      <header className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
        <div className="flex items-center gap-2 font-display font-bold"><Sparkles size={18} className="text-accent-400" /> White Bag assistant</div>
        <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded p-1 hover:bg-white/15"><X size={20} /></button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-paper p-3" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex flex-col items-start gap-2'}>
            <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${m.role === 'user' ? 'bg-brand-600 text-white' : m.error ? 'bg-red-50 text-bad' : 'border border-line bg-white'}`}>{m.content}</p>
            {m.products?.map((p) => (
              <Link key={p._id} to={`/product/${p._id}`} onClick={() => window.innerWidth < 640 && setOpen(false)} className="card flex w-[85%] items-center gap-3 p-2 hover:border-brand-500">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-50"><ProductImage product={p} /></div>
                <div className="min-w-0"><p className="truncate text-sm font-medium">{p.title}</p><p className="text-sm font-bold text-brand-700">{inr(p.price)}</p></div>
              </Link>
            ))}
          </div>
        ))}
        {busy && <p className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2 text-sm text-ink-mute"><Spinner /> Thinking…</p>}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50">{s}</button>)}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line bg-white p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} className="input" placeholder="Type your question…" aria-label="Your message" />
        <button className="btn-primary !px-3" disabled={busy || !input.trim()} aria-label="Send message"><Send size={18} /></button>
      </form>
    </section>
  );
}
