export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm hover:border-blue-800/30 focus-within:border-blue-800/30 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-4 text-base leading-7 text-stone-600">{description}</p>
      <ul aria-label={title + " technologies"} className="mt-6 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <li key={technology} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs leading-5 text-stone-700">
            {technology}
          </li>
        ))}
      </ul>
      {link && (
        <div className="mt-auto pt-7">
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-blue-50 px-4 text-sm font-medium text-blue-800 hover:bg-blue-100">
            View Project<span className="sr-only">: {title} (opens in a new tab)</span>
          </a>
        </div>
      )}
    </article>
  );
}
