export default function GamificationSection() {
    return (
        <section className="px-8 py-20">
            <h2 className="text-3xl font-semibold text-center">
                Gamification & Động lực học tập
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Hoàn thành bài học',
                        desc: 'Nhận badge sau mỗi chương',
                    },
                    {
                        title: 'Progress Streak',
                        desc: 'Duy trì chuỗi học tập liên tục',
                    },
                    {
                        title: 'Achievement',
                        desc: 'Mở khóa thành tích theo cột mốc',
                    },
                ].map(item => (
                    <div
                        key={item.title}
                        className="rounded-2xl border p-6 bg-background"
                    >
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
