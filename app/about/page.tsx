import type { Metadata } from "next";
import SkillCard from "@/components/SkillCard";

export const metadata: Metadata = {
  title: "About | Ikpemhinoghena Etiuzale",
};

export default function About() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6 py-14 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">About me</h1>
        <p className="mt-6 text-lg leading-8 text-stone-600">
          I’m Ikpemhinoghena Etiuzale. I’m learning web development, and this portfolio is my first Next.js application for WDD 430.
        </p>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          This application brings together reusable components, typed props, and page routing. It gives me a place to introduce myself and showcase projects as I continue learning.
        </p>
        <section aria-labelledby="skills-heading" className="mt-12">
          <h2 id="skills-heading" className="mb-6 text-2xl font-semibold tracking-tight">What I’m practicing</h2>
          <SkillCard title="Reusable components" description="Using React, TypeScript, and Tailwind CSS to organize page content into small, reusable components with clear props and consistent styling." />
        </section>
      </div>
    </main>
  );
}
