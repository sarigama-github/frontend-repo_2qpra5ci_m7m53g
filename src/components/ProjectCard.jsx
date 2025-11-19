export default function ProjectCard({ project }) {
  return (
    <a href={project.url || '#'} target={project.url ? '_blank' : '_self'} rel="noreferrer"
       className="group rounded-2xl border border-cyan-400/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition p-5 flex gap-4">
      {project.image_url ? (
        <img src={project.image_url} alt={project.title} className="w-24 h-24 object-cover rounded-xl border border-white/10" />
      ) : (
        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 border border-white/10" />
      )}
      <div>
        <div className="flex items-center gap-2">
          {project.featured && <span className="px-2 py-0.5 text-[10px] rounded-full bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/30">FEATURED</span>}
          <h3 className="text-white font-semibold text-lg group-hover:text-cyan-200">{project.title}</h3>
        </div>
        <p className="text-cyan-100/80 text-sm mt-1 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(project.tags || []).map((t) => (
            <span key={t} className="px-2 py-0.5 text-[11px] rounded-md bg-white/5 text-white/70 border border-white/10">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
