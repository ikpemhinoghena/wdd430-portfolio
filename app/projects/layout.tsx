import Link from "next/link";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6 py-14 sm:py-20 lg:px-8">
      <nav aria-label="Project categories" className="mb-8">
        <ul className="flex flex-wrap gap-2 text-sm font-medium">
          <li><Link href="/projects" className="inline-flex min-h-11 items-center rounded-lg px-4 hover:bg-blue-50 hover:text-blue-800">All projects</Link></li>
          <li><Link href="/projects/school" className="inline-flex min-h-11 items-center rounded-lg px-4 hover:bg-blue-50 hover:text-blue-800">School</Link></li>
          <li><Link href="/projects/opensource" className="inline-flex min-h-11 items-center rounded-lg px-4 hover:bg-blue-50 hover:text-blue-800">Open source</Link></li>
        </ul>
      </nav>
      {children}
    </main>
  );
}
