export default function ProductCallToAction() {
  return (
    <section className="relative m-2 overflow-hidden rounded-2xl border border-white bg-cyan-950 px-8 py-24 text-center text-cyan-50">
      <div className="absolute inset-0 bg-cyan-900/70" />
      <div className="absolute inset-0 bg-emerald-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold leading-tight">
          Xây một hệ sinh thái học tập thay vì chỉ một LMS
        </h2>

        <p className="mt-5 text-base leading-8 text-cyan-100/88">
          LearnCluster kết hợp học tập, định hướng, kết nối và AI thành một vòng lặp học tập sống động hơn, thích nghi hơn và bền động lực hơn.
        </p>

        <p className="mt-6 text-sm italic text-cyan-100/84">
          Không chỉ giúp bạn học, mà còn giúp bạn học cùng đúng người, đúng lúc và đúng thứ tự.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-300">
            Trải nghiệm LearnCluster
          </button>
          <button className="rounded-xl border border-cyan-300/60 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-800/40">
            Xem bản demo và kiến trúc
          </button>
        </div>
      </div>
    </section>
  );
}
