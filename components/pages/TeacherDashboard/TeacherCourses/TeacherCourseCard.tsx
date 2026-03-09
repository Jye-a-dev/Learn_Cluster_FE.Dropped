import { Course } from "@/hooks/courses/getCourse";

interface Props {
  course: Course;
  onTeach: () => void;
}

function statusColor(status: Course["status"]) {
  switch (status) {
    case "public":
      return "bg-emerald-100 text-emerald-700";
    case "draft":
      return "bg-amber-100 text-amber-700";
    case "closed":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

export default function TeacherCourseCard({ course, onTeach }: Props) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
          {course.title}
        </h3>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${statusColor(
            course.status
          )}`}
        >
          {course.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 line-clamp-3 mb-4">
        {course.description || "Chưa có mô tả cho khóa học này."}
      </p>

      {/* META */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-5">
        <span className="flex items-center gap-1">
          ⏱ {course.duration_hours ?? 0} giờ
        </span>

        <span className="opacity-0 group-hover:opacity-100 transition">
          ID: {course.id.slice(0, 6)}
        </span>
      </div>

      {/* ACTION */}
      <button
        onClick={onTeach}
        className="w-full py-2.5 cursor-pointer rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium hover:opacity-90 transition"
      >
        Dạy khóa này
      </button>

      {/* HOVER BORDER EFFECT */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-emerald-300 pointer-events-none transition" />

    </div>
  );
}