export default function CallToAction() {
  return (
    <section className="relative px-8 py-24 text-center text-cyan-50 bg-cyan-950 m-2 rounded-2xl overflow-hidden border border-white">
      {/* layered backgrounds */}
      <div className="absolute inset-0 bg-cyan-900/70" />
      <div className="absolute inset-0 bg-emerald-700/20 blur-3xl" />
      <div className="absolute inset-0 bg-cyan-800/20" />

      <div className="relative max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold leading-tight">
          Bắt đầu xây dựng hệ thống học tập thông minh
        </h2>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl cursor-pointer bg-emerald-400 text-emerald-950 px-6 py-3 font-semibold shadow-md transition hover:bg-emerald-300">
            Trải nghiệm Learn Cluster
          </button>

          <button className="rounded-xl border cursor-pointer border-cyan-300/60 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-800/40">
            Xem GitHub / Demo
          </button>
        </div>
      </div>
    </section>
  );
}
