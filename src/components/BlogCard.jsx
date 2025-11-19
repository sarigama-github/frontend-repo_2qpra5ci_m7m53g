export default function BlogCard({ post, to }) {
  return (
    <a href={to} className="group rounded-xl border border-lime-400/20 bg-lime-500/5 hover:bg-lime-500/10 transition p-5 block">
      <div className="text-lime-300 text-xs">{new Date(post.published_at || Date.now()).toLocaleDateString()}</div>
      <h3 className="mt-1 text-white font-semibold text-lg group-hover:text-lime-200">{post.title}</h3>
      <p className="text-lime-100/80 text-sm mt-1 line-clamp-2">{(post.content||'').slice(0, 140)}...</p>
    </a>
  );
}
