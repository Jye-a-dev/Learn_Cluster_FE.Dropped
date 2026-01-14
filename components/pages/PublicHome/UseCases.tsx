export default function UseCases() {
    return (
        <section className="px-8 py-20">
            <h2 className="text-3xl font-semibold text-center">
                Phù hợp cho nhiều mô hình
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    'Đại học – Cao đẳng',
                    'Trung tâm đào tạo',
                    'EdTech Startup',
                    'Đồ án / Capstone',
                ].map(item => (
                    <div
                        key={item}
                        className="rounded-2xl border p-6 bg-background text-center"
                    >
                        <p className="font-medium">{item}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
