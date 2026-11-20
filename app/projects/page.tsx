import { Suspense } from "react";
import DatabaseProjects from "@/components/DatabaseProjects";

export default function ProjectsPage() {
  return (
    <section aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="mb-8 text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
      <Suspense fallback={<p role="status">Loading projects…</p>}>
        <DatabaseProjects />
      </Suspense>
    </section>
  );
}
