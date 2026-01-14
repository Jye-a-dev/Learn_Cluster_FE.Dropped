const steps = [
    'Teacher tạo khóa học',
    'Student đăng ký',
    'Tạo Study Date',
    'Học nhóm & Chat',
    'Nộp bài & Chấm điểm',
    'Xem thống kê',
    'Nhận Badge',
];

export default function DemoFlow() {
    return (
        <section className="px-8 py-20 bg-muted/30">
            <h2 className="text-3xl font-semibold text-center">
                Luồng demo hệ thống
            </h2>

            <ol className="mt-10 max-w-3xl mx-auto space-y-6">
                {steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                            {index + 1}
                        </div>
                        <p className="text-base">{step}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
