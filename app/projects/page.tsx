import { Suspense } from "react";
import { connection } from "next/server";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectList from "@/components/ProjectList";
import Pagination from "@/components/Pagination";
import { fetchProjectResults } from "@/lib/projects-db";
import SearchEmptyState from "@/components/SearchEmptyState";
import SearchSkeleton from "@/components/SearchSkeleton";
import { normalizePage, normalizeQuery } from "@/lib/project-search";
import type { SearchParameters } from "@/types/search";

async function ProjectResults({ query, page }: SearchParameters & { page: number }) {
  const results = await fetchProjectResults({ query }, page);

  return (
    <>
      {results.items.length > 0 ? <ProjectList projects={results.items} /> : <SearchEmptyState query={query} subject="projects" />}
      <Pagination totalPages={results.totalPages} />
    </>
  );
}

async function SearchResults({ searchParams }: PageProps<"/projects">) {
  await connection();
  const params = await searchParams;
  const query = normalizeQuery(params.query);
  const page = normalizePage(params.page);
  return (
    <Suspense key={JSON.stringify([query, page])} fallback={<SearchSkeleton />}>
      <ProjectResults query={query} page={page} />
    </Suspense>
  );
}

export default function ProjectsPage(props: PageProps<"/projects">) {
  return (
    <section aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
      <Suspense fallback={null}>
        <ProjectSearch />
      </Suspense>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults {...props} />
      </Suspense>
    </section>
  );
}
