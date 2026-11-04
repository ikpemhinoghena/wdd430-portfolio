interface SkillCardProps {
  title: string;
  description: string;
}

export default function SkillCard({ title, description }: SkillCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 border-l-4 border-l-blue-800 bg-white p-6 sm:p-8">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 leading-7 text-stone-600">{description}</p>
    </article>
  );
}
