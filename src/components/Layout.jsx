import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <Navbar />
      {children}
      <footer className="mt-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sky-200/70 text-sm">
          Built with a holographic vibe. Share your link: /yourname
        </div>
      </footer>
    </div>
  );
}
