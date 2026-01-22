export default function UserHero() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white"
      style={{
        backgroundImage: "url(/assets/UserHero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Không gian học tập dành cho bạn
        </h2>

        <p className="mt-3 max-w-x2 text-sm sm:text-base text-white/80">
         Quản lý các khóa học, sắp xếp lịch học và theo dõi hành trình học tập của bạn — tất cả chỉ trong một nơi.
        </p>

        {/* subtle accent */}
        <div className="mt-4 h-1 w-16 rounded-full bg-primary/80" />
      </div>
    </section>
  );
}
