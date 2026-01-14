export default function CallToAction() {
    return (
        <section className="px-8 py-24 text-primary-foreground text-center">
            <h2 className="text-4xl font-bold">
                Bắt đầu xây dựng hệ thống học tập thông minh
            </h2>

            <div className="mt-8 flex justify-center gap-4">
                <button
                    className="
            rounded-xl bg-background text-primary
            px-6 py-3 font-semibold
            hover:bg-background/90 transition
          "
                >
                    Trải nghiệm Learn Cluster
                </button>

                <button
                    className="
            rounded-xl border border-background
            px-6 py-3 font-semibold
            hover:bg-primary-foreground/10 transition
          "
                >
                    Xem GitHub / Demo
                </button>
            </div>
        </section>
    );
}
