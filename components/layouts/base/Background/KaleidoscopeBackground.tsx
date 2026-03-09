"use client";

export default function KaleidoscopeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, #020617, #000000)",
        }}
      />

      {/* Main vortex layer */}
      <div
        className="absolute inset-0 opacity-70 animate-spin-slow"
        style={{
          background: `
            repeating-conic-gradient(
              from 0deg at 50% 50%,
              rgba(244,63,94,0.35) 0deg,
              rgba(241,245,249,0.15) 10deg,
              transparent 20deg,
              rgba(225,29,72,0.3) 30deg,
              transparent 40deg
            )
          `,
          filter: "blur(30px)",
          transform: "scale(1.6)",
        }}
      />

      {/* Reverse spin layer */}
      <div
        className="absolute inset-0 opacity-50 animate-spin-reverse"
        style={{
          background: `
            repeating-conic-gradient(
              from 0deg,
              rgba(226,232,240,0.2) 0deg,
              transparent 8deg,
              transparent 24deg
            )
          `,
          filter: "blur(4px)",
          transform: "scale(1.3)",
        }}
      />

      {/* Inner spiral light */}
      <div
        className="absolute inset-0 blur-[120px] opacity-50"
        style={{
          background: `
            radial-gradient(
              40% 30% at 50% 50%,
              rgba(244,63,94,0.5),
              transparent 70%
            )
          `,
        }}
      />

      {/* Depth shadow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9))",
        }}
      />

    </div>
  );
}