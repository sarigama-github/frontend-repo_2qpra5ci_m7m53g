import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Multi‑owner portfolio theme
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight text-white">
            Iridescent identity for every creator
          </h1>
          <p className="mt-4 text-sky-100/80 text-lg">
            Clean portfolio with blogs, projects, and simple auth. Each user gets a unique URL you can share.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950/90" />
    </section>
  );
}
