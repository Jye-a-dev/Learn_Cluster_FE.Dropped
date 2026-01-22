"use client";

export default function WavesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base deep space */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #020617, #020617)`,
        }}
      />

      {/* Wave layer 1 – Lapis with cyan edge */}
      <div
        className="absolute inset-0 opacity-60 blur-3xl"
        style={{
          background: `
            radial-gradient(
              120% 60% at 10% 30%,
              rgba(34,211,238,0.35),
              rgba(59,130,246,0.45) 35%,
              transparent 60%
            ),
            radial-gradient(
              120% 60% at 90% 70%,
              rgba(16,185,129,0.3),
              rgba(37,99,235,0.35) 40%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Wave layer 2 – Ruby with emerald rim */}
      <div
        className="absolute inset-0 opacity-50 blur-[100px]"
        style={{
          background: `
            radial-gradient(
              100% 50% at 20% 80%,
              rgba(16,185,129,0.25),
              rgba(220,38,38,0.4) 35%,
              transparent 65%
            ),
            radial-gradient(
              100% 50% at 80% 20%,
              rgba(34,211,238,0.2),
              rgba(185,28,28,0.35) 35%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Wave layer 3 – Gold highlights with cyan shimmer */}
      <div
        className="absolute inset-0 opacity-40 blur-[140px]"
        style={{
          background: `
            radial-gradient(
              80% 40% at 50% 50%,
              rgba(34,211,238,0.25),
              rgba(234,178,8,0.86) 45%,
              transparent 90%
            ),
            radial-gradient(
              60% 30% at 70% 60%,
              rgba(16,185,129,0.2),
              rgba(250,204,21,0.93) 40%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Flowing wave lines with emerald/cyan tint */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              120deg,
              rgba(34,211,238,0.08),
              rgba(34,211,238,0.08) 2px,
              transparent 40px,
              transparent 80px
            )
          `,
        }}
      />
    </div>
  );
}
