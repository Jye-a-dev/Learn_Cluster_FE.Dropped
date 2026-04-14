"use client";

type Props = {
  title: string;
  description: string;
};

export default function TeacherEmptyState({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-emerald-700 bg-emerald-950/40 p-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        Teacher workflow
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-emerald-100/75">
        {description}
      </p>
    </div>
  );
}
