import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import BlogCard from './components/BlogCard'
import AuthPanel from './components/AuthPanel'
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-6">
            <h3 className="text-cyan-200 font-semibold">Neon theme</h3>
            <p className="text-cyan-100/80 text-sm mt-2">Futuristic, vibrant, and holographic. Perfect for modern creators and devs.</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-6">
            <h3 className="text-fuchsia-200 font-semibold">Multi‑owner</h3>
            <p className="text-fuchsia-100/80 text-sm mt-2">Every account has its own URL: /username</p>
          </div>
          <div className="rounded-2xl border border-lime-400/20 bg-lime-500/5 p-6">
            <h3 className="text-lime-200 font-semibold">Blogs & Projects</h3>
            <p className="text-lime-100/80 text-sm mt-2">Share your work and publish posts with a clean editor-friendly API.</p>
          </div>
        </section>
        <div className="mt-10 text-sm text-white/60">Try visiting /demo after creating a user named demo.</div>
      </main>
    </div>
  )
}

function ProfilePage() {
  const { username, slug } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let url = `${API}/profiles/${username}`
    if (slug) url = `${API}/profiles/${username}/blogs/${slug}`
    ;(async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        if (!res.ok) throw new Error(json.detail || 'Failed to load')
        setData(json)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [username, slug])

  if (slug) {
    if (!data) return loading()
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-10">
          <Link to={`/${username}`} className="text-cyan-300">← Back to profile</Link>
          <h1 className="mt-6 text-3xl font-semibold">{data.title}</h1>
          <div className="mt-2 text-white/60 text-sm">{new Date(data.published_at||Date.now()).toLocaleString()}</div>
          <article className="prose prose-invert mt-6" dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g,'<br/>') }} />
        </main>
      </div>
    )
  }

  if (!data) return loading()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_10%,rgba(34,211,238,0.18),transparent),radial-gradient(500px_circle_at_80%_10%,rgba(217,70,239,0.15),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/40 to-fuchsia-500/40 border border-white/10" />
            <div>
              <h1 className="text-3xl font-semibold">{data.profile.display_name || username}</h1>
              <div className="text-white/60">@{username}</div>
            </div>
          </div>
          {data.profile.headline && <p className="mt-4 text-white/80">{data.profile.headline}</p>}
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.projects.map(p => <ProjectCard key={p.id} project={p} />)}
              {data.projects.length===0 && <div className="text-white/60">No projects yet.</div>}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">Blog</h2>
            <div className="grid gap-3">
              {data.blogs.map(b => <BlogCard key={b.id} post={b} to={`/${username}/blog/${b.slug}`} />)}
              {data.blogs.length===0 && <div className="text-white/60">No posts yet.</div>}
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold">About</h3>
            <p className="text-white/70 text-sm mt-2">{data.profile.about || 'This creator has not written an about yet.'}</p>
          </div>
          {data.profile.socials && Object.keys(data.profile.socials).length>0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold">Links</h3>
              <div className="mt-2 space-y-1">
                {Object.entries(data.profile.socials).map(([k,v])=> (
                  <a key={k} href={v} className="block text-cyan-300 hover:underline" target="_blank">{k}</a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  )
}

function Dashboard() {
  const [username, setUsername] = useState('')
  const [projects, setProjects] = useState([])
  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState({ headline:'', about:'', socials:{} })

  const load = async (u) => {
    const res = await fetch(`${API}/profiles/${u}`)
    const data = await res.json()
    setProjects(data.projects)
    setPosts(data.blogs)
    setProfile(data.profile)
  }

  const handleAuthed = async (u) => {
    setUsername(u)
    await load(u)
  }

  const addProject = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    payload.tags = (payload.tags||'').split(',').map(s=>s.trim()).filter(Boolean)
    payload.featured = Boolean(payload.featured)
    const res = await fetch(`${API}/profiles/${username}/projects`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok) load(username)
    e.currentTarget.reset()
  }

  const addBlog = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    payload.published = true
    const res = await fetch(`${API}/profiles/${username}/blogs`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok) load(username)
    e.currentTarget.reset()
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    payload.socials = payload.socials ? JSON.parse(payload.socials) : {}
    await fetch(`${API}/profiles/${username}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    load(username)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <AuthPanel onAuthed={handleAuthed} />
          {username && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Signed in as <span className="text-white">{username}</span> • Public URL: <a className="text-cyan-300" href={`/${username}`}>/{username}</a>
            </div>
          )}
          {username && (
            <form onSubmit={saveProfile} className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4 space-y-2">
              <h3 className="font-semibold">Update profile</h3>
              <input name="headline" defaultValue={profile.headline} placeholder="Headline" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" />
              <textarea name="about" defaultValue={profile.about} placeholder="About" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" rows={4} />
              <input name="socials" defaultValue={JSON.stringify(profile.socials||{})} placeholder='{"twitter":"https://x.com/you"}' className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" />
              <button className="w-full rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white py-2">Save profile</button>
            </form>
          )}
        </div>
        <div className="md:col-span-2 space-y-8">
          {username ? (
            <>
              <form onSubmit={addProject} className="rounded-2xl border border-white/10 bg-white/5 p-4 grid gap-2">
                <h3 className="font-semibold">Add project</h3>
                <input name="title" placeholder="Title" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" required />
                <input name="description" placeholder="Description" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" />
                <input name="url" placeholder="Link" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" />
                <input name="image_url" placeholder="Image URL" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" />
                <input name="tags" placeholder="tags, comma, separated" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" />
                <button className="rounded-md bg-cyan-600 text-white py-2">Save project</button>
              </form>

              <form onSubmit={addBlog} className="rounded-2xl border border-white/10 bg-white/5 p-4 grid gap-2">
                <h3 className="font-semibold">Publish blog post</h3>
                <input name="slug" placeholder="slug" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" required />
                <input name="title" placeholder="Title" className="bg-white/5 border border-white/10 rounded-md px-3 py-2" required />
                <textarea name="content" placeholder="Content (HTML or plain)" rows={6} className="bg-white/5 border border-white/10 rounded-md px-3 py-2" required />
                <button className="rounded-md bg-fuchsia-600 text-white py-2">Publish</button>
              </form>

              <section>
                <h3 className="text-lg font-semibold mb-2">Your projects</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {projects.map(p=> <ProjectCard project={p} key={p.id} />)}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Your posts</h3>
                <div className="grid gap-3">
                  {posts.map(b=> <BlogCard post={b} key={b.id} to={`/${username}/blog/${b.slug}`} />)}
                </div>
              </section>
            </>
          ) : (
            <div className="text-white/70">Login or create an account to manage your portfolio.</div>
          )}
        </div>
      </main>
    </div>
  )
}

const loading = () => (
  <div className="min-h-screen bg-slate-950 text-white grid place-items-center">
    <div className="text-white/70">Loading...</div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/:username/blog/:slug" element={<ProfilePage />} />
        <Route path="/login" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
