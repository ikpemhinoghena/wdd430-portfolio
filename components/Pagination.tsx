"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { normalizePage } from "@/lib/project-search";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.min(normalizePage(searchParams.getAll("page").length > 1 ? undefined : searchParams.get("page")), Math.max(1, totalPages));

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(Math.max(1, Math.min(page, totalPages))));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  const linkClass = "inline-flex min-h-11 items-center rounded-lg px-4 text-blue-800 hover:bg-blue-50";

  return (
    <nav aria-label="Project pagination" className="mt-8 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className={linkClass}>Previous</Link>
      ) : (
        <span aria-disabled="true" className="px-4 text-stone-500">Previous</span>
      )}
      <span>Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className={linkClass}>Next</Link>
      ) : (
        <span aria-disabled="true" className="px-4 text-stone-500">Next</span>
      )}
    </nav>
  );
}
