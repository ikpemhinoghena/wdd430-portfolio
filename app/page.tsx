import ProjectList, { type Project } from "@/components/ProjectList";

const projects: Project[] = [
  {
    id: "developer-learning-hub",
    title: "Developer Learning Hub",
    description: "A JavaScript application for discovering GitHub repositories and Stack Overflow questions, with search, filtering, and saved resources.",
    technologies: ["HTML", "CSS", "JavaScript", "Vite", "GitHub REST API", "Stack Exchange API"],
    link: "https://github.com/ikpemhinoghena/developer-learning-hub",
  },
  {
    id: "hilgod-online-store",
    title: "Hilgod Online Store",
    description: "A multi-vendor e-commerce platform for the Nigerian market, featuring product browsing, seller management, ordering, and payment functionality.",
    technologies: ["Next.js", "React", "Node.js", "Express", "Supabase", "PostgreSQL", "Paystack"],
    link: "https://hilgod.com",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6 py-14 sm:py-20 lg:px-8">
      <section aria-labelledby="intro-heading" className="mb-14 max-w-3xl sm:mb-20">
        <p className="mb-5 inline-block rounded-full border border-blue-800/15 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">Web development &amp; learning</p>
        <h1 id="intro-heading" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Hello, I’m Ikpemhinoghena Etiuzale.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          Welcome to my developer portfolio. Here are two projects showcasing web applications, from finding learning resources to online shopping.
        </p>
      </section>
      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="mb-6 text-2xl font-semibold tracking-tight">Selected projects</h2>
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
