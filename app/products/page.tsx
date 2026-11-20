import { Suspense } from "react";
import { connection } from "next/server";
import ProjectSearch from "@/components/ProjectSearch";
import ProductFilters from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";
import SearchEmptyState from "@/components/SearchEmptyState";
import SearchSkeleton from "@/components/SearchSkeleton";
import { normalizeProductFilters, productCategories, searchProducts } from "@/lib/products";

async function ProductResults({ searchParams }: PageProps<"/products">) {
  await connection();
  const filters = normalizeProductFilters(await searchParams);
  const results = searchProducts(filters);

  return (
    <>
      {filters.validationError && <p role="alert" className="mb-6 text-red-800">{filters.validationError}</p>}
      {results.items.length ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {results.items.map((product) => (
            <li key={product.id} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-4 leading-7 text-stone-600">{product.description}</p>
              <p className="mt-4 text-sm text-stone-600">{product.category}</p>
              <p className="mt-2 font-medium">${product.price.toFixed(2)} USD</p>
            </li>
          ))}
        </ul>
      ) : <SearchEmptyState query={filters.query} subject="products" />}
      <Pagination totalPages={results.totalPages} label="Product pagination" />
    </>
  );
}

export default function ProductsPage(props: PageProps<"/products">) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6 py-14 sm:py-20 lg:px-8">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">Product filter demonstration</h1>
      <p className="mb-8 leading-7 text-stone-600">Sample products and USD prices for learning search and filtering. These are demonstration data, not commercial inventory.</p>
      <Suspense fallback={null}>
        <ProjectSearch subject="products" />
        <ProductFilters categories={productCategories} />
      </Suspense>
      <Suspense fallback={<SearchSkeleton />}>
        <ProductResults {...props} />
      </Suspense>
    </main>
  );
}
