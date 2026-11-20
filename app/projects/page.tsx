import { Suspense } from "react";
import { connection } from "next/server";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectList from "@/components/ProjectList";
import Pagination from "@/components/Pagination";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";
import { normalizePage, normalizeQuery } from "@/lib/project-search";

async function SearchResults({ searchParams }: PageProps<"/projects">) {
  await connection();
  const params = await searchParams;
  const query = normalizeQuery(params.query);
  const totalPages = await fetchProjectsPages(query);
  const currentPage = Math.min(normalizePage(params.page), Math.max(1, totalPages));
  const projects = await fetchFilteredProjects(query, currentPage);

  return (
    <>
      {projects.length > 0 ? <ProjectList projects={projects} /> : <p className="text-lg leading-8 text-stone-600">No projects found.</p>}
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function ProjectsPage(props: PageProps<"/projects">) {
  return (
    <section aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
      <Suspense fallback={null}>
        <ProjectSearch />
      </Suspense>
      <Suspense fallback={<p role="status">Loading projects…</p>}>
        <SearchResults {...props} />
      </Suspense>
    </section>
  );
}
