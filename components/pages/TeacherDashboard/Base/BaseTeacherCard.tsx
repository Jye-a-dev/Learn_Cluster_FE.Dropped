"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function BaseTeacherCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        group relative
        bg-emerald-950/80
        border border-emerald-800
        rounded-2xl
        p-6
        flex flex-col gap-4
        backdrop-blur-sm
        transition-all duration-200
        hover:shadow-xl
        hover:-translate-y-1
        hover:border-cyan-400
        ${className}
      `}
    >
      {children}

      {/* hover border glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          border border-transparent
          group-hover:border-cyan-400/40
          pointer-events-none
          transition
        "
      />
    </div>
  );
}