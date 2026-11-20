"use client";

export default function SearchError({ retry }: { retry: () => void }) {
  return (
    <section role="alert" className="mx-auto max-w-5xl rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold">Unable to load results</h2>
      <p className="mt-4 leading-7 text-stone-600">Something went wrong while loading this page. Please try again.</p>
      <button type="button" onClick={retry} className="mt-4 min-h-11 rounded-lg bg-blue-800 px-4 font-medium text-white hover:bg-blue-900">Try again</button>
    </section>
  );
}
