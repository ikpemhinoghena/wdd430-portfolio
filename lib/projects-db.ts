import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

interface ProjectRow {
  id: number;
  title: string;
  description: string | null;
  type: Project["type"] | null;
  technologies: (string | null)[] | null;
  link: string | null;
}

function toProject(row: ProjectRow): Project {
  if (row.type !== "opensource" && row.type !== "school") {
    throw new Error("A project must have a school or opensource type.");
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    type: row.type,
    technologies: (row.technologies ?? []).filter((value): value is string => value !== null),
    ...(row.link === null ? {} : { link: row.link }),
  };
}

export async function getProjects(type?: string | null): Promise<Project[]> {
  const { rows } = type == null
    ? await sql<ProjectRow>`SELECT id, title, description, type, technologies, link FROM projects ORDER BY id`
    : await sql<ProjectRow>`SELECT id, title, description, type, technologies, link FROM projects WHERE type = ${type} ORDER BY id`;

  return rows.map(toProject);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<ProjectRow>`SELECT id, title, description, type, technologies, link FROM projects WHERE id = ${id}`;
  return rows[0] ? toProject(rows[0]) : null;
}
