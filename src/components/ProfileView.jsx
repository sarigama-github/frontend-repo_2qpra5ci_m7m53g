import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function ProfileView() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/profiles/${username}`)
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="max-w-4xl mx-auto px-6 py-16 text-sky-100">Loading…</div>;
  if (!data) return <div className="max-w-4xl mx-auto px-6 py-16 text-sky-100">Not found</div>;

  const { profile, projects, blogs } = data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-fuchsia-500" />
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">@{username}</h2>
          {profile?.headline && <p className="text-sky-100/80">{profile.headline}</p>}
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold mb-3">Projects</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects?.map(p => (
              <a key={p.id} href={p.url || '#'} className="group block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                <div className="h-36 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 mb-3" />
                <div className="text-white font-medium">{p.title}</div>
                {p.tags?.length ? (
                  <div className="mt-1 text-xs text-sky-200/70">{p.tags.join(' • ')}</div>
                ) : null}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Blog</h3>
          <div className="space-y-3">
            {blogs?.map(b => (
              <Link key={b.id} to={`/${username}/blog/${b.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                <div className="text-white">{b.title}</div>
                <div className="text-xs text-sky-200/70">{new Date(b.published_at || Date.now()).toLocaleDateString()}</div>
              </Link>
            ))}
            {(!blogs || blogs.length === 0) && (
              <div className="text-sky-200/70">No posts yet.</div>
            )}
          </div>
        </div>
      </div>

      {profile?.about && (
        <div className="mt-10">
          <h3 className="text-white font-semibold mb-3">About</h3>
          <p className="prose prose-invert max-w-none text-sky-100/90">{profile.about}</p>
        </div>
      )}
    </div>
  );
}
