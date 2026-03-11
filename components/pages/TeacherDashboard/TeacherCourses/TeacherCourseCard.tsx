import { Course } from "@/hooks/courses/getCourse";
import BaseTeacherCard from "@/components/pages/TeacherDashboard/Base/BaseTeacherCard";

interface Props {
  course: Course;
  onTeach: () => void;
}

function statusColor(status: Course["status"]) {
  switch (status) {
    case "public":
      return "bg-emerald-500/20 text-emerald-300";
    case "draft":
      return "bg-amber-500/20 text-amber-300";
    case "closed":
      return "bg-gray-500/20 text-gray-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
}

export default function TeacherCourseCard({ course, onTeach }: Props) {
  return (
    <BaseTeacherCard>

      {/* HEADER */}
      <div className="flex items-start justify-between mb-2">

        <h3 className="text-lg font-semibold text-emerald-200 leading-snug line-clamp-2">
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
      <p className="text-sm text-emerald-300/80 line-clamp-3 mb-3">
        {course.description || "Chưa có mô tả cho khóa học này."}
      </p>

      {/* META */}
      <div className="flex items-center justify-between text-sm text-emerald-400 mb-4">

        <span>
          ⏱ {course.duration_hours ?? 0} giờ
        </span>

        <span className="opacity-0 group-hover:opacity-100 transition">
          ID: {course.id.slice(0, 6)}
        </span>

      </div>

      {/* ACTION */}
      <button
        onClick={onTeach}
        className="
          w-full py-2.5 cursor-pointer
          rounded-xl
          bg-linear-to-r
          from-emerald-500
          to-teal-600
          text-white
          font-medium
          hover:opacity-90
          transition
        "
      >
        Dạy khóa này
      </button>

    </BaseTeacherCard>
  );
}