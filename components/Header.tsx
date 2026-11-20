import Link from "next/link";

export default function Header() {
  return (
    <header className="border-t-4 border-t-blue-800 border-b border-b-stone-200 bg-white/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="w-fit text-base font-semibold tracking-tight">
          Ikpemhinoghena Etiuzale
          <span className="mt-1 block text-xs font-normal tracking-wide text-stone-600">Developer portfolio</span>
        </Link>
        <nav aria-label="Main navigation" className="text-sm font-medium">
          <ul className="flex gap-2">
            <li><Link href="/" className="inline-flex min-h-11 items-center rounded-lg px-4 hover:bg-blue-50 hover:text-blue-800">Home</Link></li>
            <li><Link href="/about" className="inline-flex min-h-11 items-center rounded-lg px-4 hover:bg-blue-50 hover:text-blue-800">About</Link></li>
            <li><Link href="/projects" className="inline-flex min-h-11 items-center rounded-lg px-4 hover:bg-blue-50 hover:text-blue-800">Projects</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
