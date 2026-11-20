export default function SearchSkeleton() {
  return (
    <div role="status" aria-label="Loading search results" className="motion-safe:animate-pulse">
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="h-7 w-3/4 rounded bg-stone-200" />
            <div className="mt-4 h-4 rounded bg-stone-200" />
            <div className="mt-3 h-4 w-5/6 rounded bg-stone-200" />
            <div className="mt-6 h-7 w-24 rounded-full bg-stone-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
