import { features } from "./Data";

export default function CoreFeatures() {
  return (
    <section
      className="relative overflow-hidden px-8 py-24 m-2 rounded-2xl border border-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/CoreFeatures.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-semibold text-center text-white tracking-tight">
          Tính năng cốt lõi
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-white/10 backdrop-blur-xl p-6 border border-white/25 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(56,189,248,0.25)]"
            >
              {/* subtle ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />

              <h3 className="font-semibold text-lg tracking-tight">
                {f.title}
              </h3>

              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
