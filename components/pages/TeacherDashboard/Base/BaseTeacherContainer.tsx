"use client";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function BaseTeacherContainer({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-100">

      {/* HERO */}
      <section className="border-b border-emerald-800 bg-emerald-950/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h1 className="text-4xl font-bold text-cyan-300 mb-4">
            {title}
          </h1>

          {description && (
            <p className="text-emerald-300/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </section>

    </div>
  );
}