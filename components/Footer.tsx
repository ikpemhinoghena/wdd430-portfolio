import { cacheLife } from "next/cache";

export default async function Footer() {
  "use cache";
  cacheLife("hours");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200">
      <p className="mx-auto w-full max-w-5xl px-6 py-7 text-sm leading-6 text-stone-600 lg:px-8">
        &copy; {year} Ikpemhinoghena Etiuzale. All rights reserved.
      </p>
    </footer>
  );
}

