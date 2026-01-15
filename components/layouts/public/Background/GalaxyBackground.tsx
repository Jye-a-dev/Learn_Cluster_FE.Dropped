"use client";

export default function GalaxyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(61, 193, 249, 0.731), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(45, 244, 178, 0.885), transparent 45%),
            linear-gradient(180deg, #3a57da, #0f9f22)
          `,
        }}
      />

      {/* Galaxy swirl */}
      <div
        className="absolute inset-0 opacity-60 blur-3xl"
        style={{
          background: `
            conic-gradient(
              from 180deg at 50% 50%,
              rgba(56,189,248,0.35),
              rgba(16,185,129,0.35),
              rgba(59,130,246,0.35),
              rgba(56,189,248,0.35)
            )
          `,
        }}
      />
    </div>
  );
}
