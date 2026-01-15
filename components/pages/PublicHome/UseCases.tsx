import { cases } from "./Data";

export default function UseCases() {
  return (
    <section className="relative px-8 py-20 bg-cover bg-center m-2 rounded-2xl border border-white overflow-hidden" style={{ backgroundImage: "url('/assets/UseCases.jpg')" }}>
      <div className="absolute inset-0 bg-cyan-950/60 backdrop-blur-sm" />

      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-cyan-50 mb-12">
          Phù hợp cho nhiều mô hình
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map(item => (
            <div key={item} className="rounded-2xl border border-emerald-400/40 bg-cyan-900/70 p-6 text-center text-cyan-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:bg-cyan-900/90">
              <p className="font-semibold tracking-wide text-emerald-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
