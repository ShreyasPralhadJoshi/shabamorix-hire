// C:\ShabamorixHire\frontend\src\lib\api.ts
export async function api<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
  const token = localStorage.getItem('idToken');
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(opts.headers as any || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(base + path, { ...opts, headers });
  if (!res.ok) {
    let msg: string;
    try { msg = await res.text(); } catch { msg = res.statusText; }
    throw new Error(msg || `HTTP ${res.status}`);
  }
  // if response has body
  const text = await res.text();
  return (text ? JSON.parse(text) : ({} as any)) as T;
}

// helper shorthands (optional)
export const get  = <T=any>(p: string) => api<T>(p);
export const post = <T=any>(p: string, body?: any) =>
  api<T>(p, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
