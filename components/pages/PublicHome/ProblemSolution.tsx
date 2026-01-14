export default function ProblemSolution() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 py-20">
            <div>
                <h2 className="text-2xl font-semibold">Vấn đề</h2>
                <ul className="mt-4 space-y-2 list-disc ml-5">
                    <li>Học online rời rạc, thiếu tương tác</li>
                    <li>Khó theo dõi tiến độ & deadline</li>
                    <li>Study group không có công cụ quản lý</li>
                    <li>Giảng viên mất thời gian quản lý lớp</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-semibold">Giải pháp – Learn Cluster</h2>
                <ul className="mt-4 space-y-2 list-disc ml-5">
                    <li>Course + Study Date + Chat + Progress</li>
                    <li>Lịch học & thông báo tự động</li>
                    <li>Thống kê trực quan, real-time</li>
                    <li>Phân quyền rõ ràng theo vai trò</li>
                </ul>
            </div>
        </section>
    );
}