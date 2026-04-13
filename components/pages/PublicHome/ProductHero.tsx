export default function ProductHero() {
  return (
    <section
      className="relative min-h-[88vh] m-2 overflow-hidden rounded-2xl border border-white/80 bg-cover bg-center px-8 py-12"
      style={{ backgroundImage: "url('/assets/Hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-950/75 via-cyan-950/65 to-emerald-950/55" />

      <div className="relative z-10 mx-auto grid min-h-[76vh] max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
          <p className="inline-flex rounded-full border border-cyan-200/25 bg-cyan-100/10 px-4 py-1 text-sm font-medium text-cyan-100">
            Hệ sinh thái học tập
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
            LearnCluster
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50/88 md:text-lg">
            Không chỉ giúp người học truy cập nội dung, LearnCluster còn giúp họ học đúng thứ tự, cùng đúng người và trong đúng thời điểm bằng cách kết hợp nền tảng LMS, đồ thị tri thức và học tập xã hội.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-cyan-50/92">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Nền tảng học tập</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Đồ thị tri thức</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Ghép nhóm học tập</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Phản hồi AI</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-300">
              Khám phá hệ sinh thái
            </button>
            <button className="rounded-xl border border-cyan-200/35 bg-white/10 px-6 py-3 font-semibold text-cyan-50 transition hover:bg-white/15">
              Xem tầm nhìn sản phẩm
            </button>
          </div>

          <p className="mt-8 text-sm italic text-cyan-100/82">
            Không chỉ giúp bạn học, mà còn giúp bạn học cùng đúng người, đúng lúc và đúng thứ tự.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/15 bg-cyan-100/10 p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">Định hướng</h2>
            <p className="mt-2 text-sm leading-7 text-cyan-50/85">
              Lộ trình dựa trên đồ thị giúp người học biết rõ nên học gì trước và học gì tiếp theo.
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-cyan-100/10 p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">Động lực</h2>
            <p className="mt-2 text-sm leading-7 text-cyan-50/85">
              Cơ chế ghép nhóm tạo bạn học, nhóm học và người đồng hành để việc học không còn đơn độc.
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-cyan-100/10 p-6 backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">Thích ứng</h2>
            <p className="mt-2 text-sm leading-7 text-cyan-50/85">
              Vòng lặp phản hồi AI liên tục cập nhật tiến độ để lộ trình và ghép nhóm luôn phù hợp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
