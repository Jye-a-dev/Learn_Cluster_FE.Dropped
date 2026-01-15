import { steps } from "./Data";

export default function DemoFlow() {
  return (
    <section className="relative w-5/6 mx-auto px-8 py-10 bg-cyan-800 m-2 rounded-2xl border border-white">
      <div className="absolute inset-0 bg-emerald-700/40" />

      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-cyan-50 mb-12">
          Luồng demo hệ thống
        </h2>

        <ol className="relative space-y-10">
          <div className="mt-3 absolute left-4 top-0 bottom-0 w-px bg-cyan-700/60" />

          {steps.map((step, index) => (
            <li key={step} className="relative flex gap-6">
              <div className="mt-3 relative z-10 h-9 w-9 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-950 font-semibold shadow-md">
                {index + 1}
              </div>

              <div className="rounded-xl bg-cyan-900/60 border border-cyan-700/60 p-5 text-cyan-50 shadow-sm">
                {step}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
