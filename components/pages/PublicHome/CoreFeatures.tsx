const features = [
    { title: 'Course Management', desc: 'Quản lý chương – bài, video, PDF, % hoàn thành' },
    { title: 'Study Date', desc: 'Học nhóm, chat, thống kê tham gia' },
    { title: 'Assignment & Grading', desc: 'Giao bài, nộp bài, feedback' },
    { title: 'Notification & Calendar', desc: 'Nhắc deadline, lịch cá nhân hóa' },
];


export default function CoreFeatures() {
    return (
        <section className="px-8 py-20">
            <h2 className="text-3xl font-semibold text-center">Tính năng cốt lõi</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map(f => (
                    <div key={f.title} className="rounded-2xl border p-6 shadow-sm">
                        <h3 className="font-semibold text-lg">{f.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}