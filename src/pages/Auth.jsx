import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Field, Spinner } from '../components/ui';
import Logo from '../components/Logo';

export default function Auth({ mode }) {
  const isRegister = mode === 'register';
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from; // where the user was heading before being sent to log in
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const goBack = () => navigate(from ? from.pathname + (from.search || '') : '/', { replace: true, state: from?.state });
  if (user) return <Navigate to={from ? from.pathname : '/'} replace state={from?.state} />;

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      isRegister ? await register(form.name, form.email, form.password) : await login(form.email, form.password);
      goBack();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="container-x flex justify-center py-10 sm:py-16">
      <div className="card w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 text-center"><Logo className="justify-center" /><h1 className="mt-4 text-2xl font-bold">{isRegister ? 'Create your account' : 'Welcome back'}</h1></div>
        <form onSubmit={submit} className="space-y-4">
          {isRegister && <Field label="Full name"><input className="input" value={form.name} onChange={set('name')} required minLength={2} autoComplete="name" /></Field>}
          <Field label="Email"><input type="email" className="input" value={form.email} onChange={set('email')} required autoComplete="email" /></Field>
          <Field label="Password">
            <div className="relative">
              <input type={show ? 'text' : 'password'} className="input pr-11" value={form.password} onChange={set('password')} required minLength={isRegister ? 8 : 1} autoComplete={isRegister ? 'new-password' : 'current-password'} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-ink-mute" aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {isRegister && <span className="mt-1 block text-xs text-ink-mute">Use at least 8 characters.</span>}
          </Field>
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-bad" role="alert">{error}</p>}
          <button className="btn-primary w-full !py-3" disabled={busy}>{busy ? <Spinner /> : isRegister ? 'Create account' : 'Log in'}</button>
        </form>
        <p className="mt-5 text-center text-sm text-ink-mute">
          {isRegister ? 'Already have an account?' : 'New to White Bag?'}{' '}
          <Link to={isRegister ? '/login' : '/register'} state={{ from }} className="font-bold text-brand-700 hover:underline">{isRegister ? 'Log in' : 'Create an account'}</Link>
        </p>
      </div>
    </div>
  );
}
