import { localProducts } from './localCatalog';

// One small wrapper for every call to the backend. Adds the login token and turns errors into messages.
const BASE = import.meta.env.VITE_API_URL || '';

export const tokenStore = {
  get: () => localStorage.getItem('wb_token'),
  set: (t) => localStorage.setItem('wb_token', t),
  clear: () => localStorage.removeItem('wb_token'),
};

export async function api(path, { method = 'GET', body, form } = {}) {
  // product cards come from the built-in list, everything else (login, cart, orders, AI) goes to the backend
  if (method === 'GET' && path.startsWith('/products')) return localProducts(path);

  const headers = {};
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';

  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, { method, headers, body: form || (body ? JSON.stringify(body) : undefined) });
  } catch {
    throw new Error('Cannot reach the server. Check your internet connection.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && token) window.dispatchEvent(new Event('wb:logout')); // expired session
    const err = new Error(data.message || 'Something went wrong');
    err.status = res.status;
    throw err;
  }
  return data;
}