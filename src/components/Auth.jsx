import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed');
      const data = await res.json();
      const username = data.username || form.username;
      navigate(`/${username}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">{mode === 'login' ? 'Login' : 'Create an account'}</h2>
          <button className="text-sky-300 text-sm" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Create account' : 'Have an account? Login'}
          </button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div>
            <label className="text-sky-200/80 text-sm">Username</label>
            <input className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-sky-400/50" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="text-sky-200/80 text-sm">Email</label>
              <input type="email" className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-sky-400/50" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required={mode==='signup'} />
            </div>
          )}
          <div>
            <label className="text-sky-200/80 text-sm">Password</label>
            <input type="password" className="mt-1 w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-sky-400/50" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          </div>
          {error && <div className="text-rose-400 text-sm">{error}</div>}
          <button className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white py-2 font-medium hover:opacity-90 transition">{mode === 'login' ? 'Login' : 'Sign up'}</button>
        </form>
      </div>
    </div>
  );
}
