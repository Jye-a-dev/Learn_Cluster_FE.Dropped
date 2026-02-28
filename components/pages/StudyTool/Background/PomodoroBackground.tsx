"use client";

export default function PomodoroBackground() {
  return (
    <>
      {/* Gradient nền */}
      <div className="absolute inset-0 bg-linear-to-brrom-emerald-500 via-teal-600 to-blue-700" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, white 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, white 2px, transparent 2px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Glow trái */}
      <div className="absolute w-150 h-150 bg-emerald-400 opacity-20 blur-3xl rounded-full -top-40 -left-40" />

      {/* Glow phải */}
      <div className="absolute w-150 h-150 bg-blue-500 opacity-20 blur-3xl rounded-full bottom-0 right-0" />
    </>
  );
}