import { sql } from "@vercel/postgres";
import { normalizePage, normalizeQuery, PROJECTS_PER_PAGE } from "./project-search";

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

function searchPattern(query: string): string {
  return `%${normalizeQuery(query).replace(/[\\%_]/g, "\\$&")}%`;
}

export async function fetchFilteredProjects(query: string, currentPage: number): Promise<Project[]> {
  const pattern = searchPattern(query);
  const offset = (normalizePage(currentPage) - 1) * PROJECTS_PER_PAGE;
  const { rows } = await sql<ProjectRow>`
    SELECT id, title, description, type, technologies, link
    FROM projects
    WHERE title ILIKE ${pattern}
      OR COALESCE(description, '') ILIKE ${pattern}
      OR COALESCE(array_to_string(technologies, ' '), '') ILIKE ${pattern}
    ORDER BY id ASC
    LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
  `;
  return rows.map(toProject);
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const pattern = searchPattern(query);
  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE title ILIKE ${pattern}
      OR COALESCE(description, '') ILIKE ${pattern}
      OR COALESCE(array_to_string(technologies, ' '), '') ILIKE ${pattern}
  `;
  return Math.ceil(Number(rows[0].count) / PROJECTS_PER_PAGE);
}
