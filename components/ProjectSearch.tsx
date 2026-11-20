"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MAX_QUERY_LENGTH, normalizeQuery } from "@/lib/project-search";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    const query = normalizeQuery(value);
    params.set("page", "1");
    if (query) params.set("query", query);
    else params.delete("query");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  useEffect(() => {
    handleSearch.cancel();
    if (input.current) input.current.value = searchParams.get("query") ?? "";
    return () => handleSearch.cancel();
  }, [searchParams, handleSearch]);

  return (
    <div className="mb-8">
      <label htmlFor="project-search" className="sr-only">Search projects</label>
      <input
        ref={input}
        id="project-search"
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get("query") ?? ""}
        maxLength={MAX_QUERY_LENGTH}
        onChange={(event) => handleSearch(event.target.value)}
        className="min-h-11 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-800"
      />
    </div>
  );
}
