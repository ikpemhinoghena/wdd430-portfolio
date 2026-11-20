"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductCategory } from "@/types/search";

export default function ProductFilters({ categories }: { categories: ProductCategory[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const inputClass = "mt-2 min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 py-2";

  return (
    <form key={searchParams.toString()} className="mb-8 grid gap-4 sm:grid-cols-4" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const params = new URLSearchParams(searchParams);
      for (const key of ["category", "minPrice", "maxPrice"]) {
        const value = String(data.get(key) ?? "").trim();
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.set("page", "1");
      push(`${pathname}?${params.toString()}`, { scroll: false });
    }}>
      <label className="text-sm font-medium">Category
        <select name="category" defaultValue={searchParams.get("category") ?? ""} className={inputClass}>
          <option value="">All categories</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <label className="text-sm font-medium">Minimum price (USD)
        <input name="minPrice" type="number" min="0" max="1000000" step="0.01" defaultValue={searchParams.get("minPrice") ?? ""} className={inputClass} />
      </label>
      <label className="text-sm font-medium">Maximum price (USD)
        <input name="maxPrice" type="number" min="0" max="1000000" step="0.01" defaultValue={searchParams.get("maxPrice") ?? ""} className={inputClass} />
      </label>
      <button type="submit" className="min-h-11 self-end rounded-lg bg-blue-800 px-4 py-3 text-sm font-medium text-white hover:bg-blue-900">Apply filters</button>
    </form>
  );
}
