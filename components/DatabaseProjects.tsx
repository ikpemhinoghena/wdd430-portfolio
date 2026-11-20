import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects, type Project } from "@/lib/projects-db";

export default async function DatabaseProjects({ type }: { type?: Project["type"] }) {
  await connection();
  const projects = await getProjects(type);

  if (projects.length === 0) {
    return <p className="text-lg leading-8 text-stone-600">No projects yet.</p>;
  }

  return <ProjectList projects={projects} />;
}
