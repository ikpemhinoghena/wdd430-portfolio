import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

export interface Project extends ProjectCardProps {
  id: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map(({ id, ...project }) => (
        <li key={id} className="min-w-0">
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
}
