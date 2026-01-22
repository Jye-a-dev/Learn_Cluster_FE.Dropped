"use client";

export default function HexagonBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base dark backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #020617, #020617)",
        }}
      />

      {/* Hexagon grid – Opal glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              60deg,
              rgba(226,232,240,0.15) 0px,
              rgba(240, 226, 226, 0.15) 2px,
              transparent 2px,
              transparent 24px
            ),
            repeating-linear-gradient(
              -60deg,
              rgba(226,232,240,0.15) 0px,
              rgba(226,232,240,0.15) 2px,
              transparent 2px,
              transparent 24px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(226,232,240,0.15) 0px,
              rgba(226,232,240,0.15) 2px,
              transparent 2px,
              transparent 24px
            )
          `,
          backgroundSize: "48px 48px",
          filter: "blur(0.5px)",
        }}
      />

      {/* Ruby energy blooms */}
      <div
        className="absolute inset-0 opacity-55 blur-[120px]"
        style={{
          background: `
            radial-gradient(
              60% 40% at 20% 30%,
              rgba(225,29,72,0.45),
              rgba(159,18,57,0.5) 45%,
              transparent 75%
            ),
            radial-gradient(
              60% 40% at 80% 70%,
              rgba(244,63,94,0.35),
              rgba(136,19,55,0.45) 45%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Opal iridescent wash */}
      <div
        className="absolute inset-0 opacity-35 blur-[160px]"
        style={{
          background: `
            radial-gradient(
              70% 50% at 60% 40%,
              rgba(241,245,249,0.35),
              rgba(148,163,184,0.25) 40%,
              transparent 80%
            ),
            radial-gradient(
              50% 30% at 40% 70%,
              rgba(203,213,225,0.3),
              rgba(100,116,139,0.25) 45%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Subtle hex shimmer overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(
              120deg,
              transparent 0%,
              rgba(241,245,249,0.15) 50%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  );
}
