"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchEmptyState({ query, subject }: { query: string; subject: "projects" | "products" }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <section className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold">No {subject} found</h2>
      <p className="mt-4 leading-7 text-stone-600">
        {query ? <>No results match “{query}”. </> : "There are no results for the current selection. "}
        Try another search or clear your filters. If the list is empty, check back later.
      </p>
      <button type="button" className="mt-4 min-h-11 rounded-lg bg-blue-50 px-4 font-medium text-blue-800 hover:bg-blue-100" onClick={() => {
        const next = new URLSearchParams(params);
        for (const key of ["query", "page", "category", "minPrice", "maxPrice"]) next.delete(key);
        replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
      }}>Clear search and filters</button>
    </section>
  );
}
