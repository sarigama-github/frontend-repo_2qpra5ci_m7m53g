import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export default function AuthPanel({ onAuthed }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', display_name: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Request failed');
      onAuthed?.(form.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('login')} className={`px-3 py-1 rounded-md text-sm ${mode==='login'?'bg-cyan-500/20 text-white border border-cyan-400/30':'text-cyan-100/80 hover:text-white'}`}>Login</button>
        <button onClick={() => setMode('signup')} className={`px-3 py-1 rounded-md text-sm ${mode==='signup'?'bg-cyan-500/20 text-white border border-cyan-400/30':'text-cyan-100/80 hover:text-white'}`}>Sign up</button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/40" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
        {mode==='signup' && (
          <>
          <input className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/40" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/40" placeholder="Display name" value={form.display_name} onChange={e=>setForm({...form, display_name:e.target.value})} />
          </>
        )}
        <input className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/40" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        {error && <div className="text-red-300 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white py-2 font-medium hover:opacity-90 disabled:opacity-50">
          {loading? 'Please wait...' : (mode==='login' ? 'Login' : 'Create account')}
        </button>
      </form>
    </div>
  );
}
