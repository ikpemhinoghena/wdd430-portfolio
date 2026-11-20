export default function Loading() {
  return (
    <section role="status" aria-label="Loading open source projects" className="motion-safe:animate-pulse">
      <div aria-hidden="true" className="mb-8 h-12 w-80 max-w-full rounded bg-stone-200" />
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[0, 1].map((card) => (
          <div key={card} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="h-7 w-3/4 rounded bg-stone-200" />
            <div className="mt-4 h-4 w-full rounded bg-stone-200" />
            <div className="mt-3 h-4 w-5/6 rounded bg-stone-200" />
            <div className="mt-6 flex gap-2">
              <div className="h-7 w-20 rounded-full bg-stone-200" />
              <div className="h-7 w-16 rounded-full bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
