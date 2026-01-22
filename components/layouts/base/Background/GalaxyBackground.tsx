"use client";

export default function ClusterBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base emerald + lapis cluster */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 28%, rgba(16,185,129,0.55), transparent 42%),
            radial-gradient(circle at 72% 35%, rgba(59,130,246,0.55), transparent 45%),
            radial-gradient(circle at 40% 75%, rgba(52,211,153,0.45), transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(99,102,241,0.45), transparent 42%),
            linear-gradient(180deg, #020617, #020617)
          `,
        }}
      />

      {/* Cluster swirl */}
      <div
        className="absolute inset-0 opacity-60 blur-3xl"
        style={{
          background: `
            conic-gradient(
              from 210deg at 50% 50%,
              rgba(16,185,129,0.35),
              rgba(59,130,246,0.35),
              rgba(99,102,241,0.3),
              rgba(52,211,153,0.35),
              rgba(16,185,129,0.35)
            )
          `,
        }}
      />

      {/* Nebula */}
      <div
        className="absolute inset-0 opacity-40 blur-[120px]"
        style={{
          background: `
            radial-gradient(circle at 30% 60%, rgba(16,185,129,0.35), transparent 55%),
            radial-gradient(circle at 65% 40%, rgba(59,130,246,0.35), transparent 55%)
          `,
        }}
      />
    </div>
  );
}
