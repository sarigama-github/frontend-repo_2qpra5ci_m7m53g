import { Link } from 'react-router-dom';
import { Menu, User, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold tracking-tight">holo.port</Link>
        <nav className="hidden md:flex items-center gap-6 text-sky-100/80">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/explore" className="hover:text-white">Explore</Link>
          <Link to="/login" className="hover:text-white inline-flex items-center gap-2"><LogIn size={16}/>Login</Link>
        </nav>
        <button className="md:hidden w-9 h-9 grid place-items-center text-white/80 hover:text-white">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
