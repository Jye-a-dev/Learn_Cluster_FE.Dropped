"use client";

import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname.startsWith("/teacher/courses/my")) {
      router.push("/teacher/courses");
      return;
    }

    if (pathname.startsWith("/teacher/courses")) {
      router.push("/teacher");
      return;
    }

    router.back(); // fallback
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-100">

      {/* HERO */}
      <section className="border-b border-emerald-800 bg-emerald-950/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center relative">

          {/* Back button */}
          <button
            onClick={handleBack}
            className="absolute cursor-pointer left-6 top-6 px-3 py-2 text-sm rounded-lg border border-emerald-700 text-emerald-200 hover:bg-emerald-800 transition"
          >
            ← Quay lại
          </button>

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