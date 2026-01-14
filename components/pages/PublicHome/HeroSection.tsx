'use client';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] m-2 p-6 px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-2xl overflow-hidden bg-cover bg-center border border-white/90"
      style={{ backgroundImage: "url('/assets/Hero.jpg')" }}
    >
      {/* Overlay nền */}
      <div className="absolute inset-0 bg-white/25 backdrop-blur-md" />

      {/* Content card */}
      <div className="relative z-10 mx-auto max-w-xl">
        <div className="rounded-2xl bg-emerald-100/40 backdrop-blur-lg p-8 border border-white/60 shadow-xl">
          <h1 className="text-4xl font-extrabold text-blue-900 text-center leading-tight">
            Learn Cluster
          </h1>

          <h2 className="mt-2 text-lg font-semibold text-blue-700 text-center">
            Hệ thống quản lý học tập & Study Date thông minh
          </h2>

          <p className="mt-4 text-base text-blue-800/90 text-justify leading-relaxed">
            Quản lý khóa học, study date, theo dõi tiến độ và tương tác học tập
            trong một nền tảng duy nhất.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition">
              Bắt đầu ngay
            </button>

            <button className="px-6 py-3 rounded-xl font-semibold border border-blue-300 text-blue-700 bg-white/70 hover:bg-white transition">
              Xem demo
            </button>
          </div>
        </div>
      </div>

      <div />
    </section>
  );
}
