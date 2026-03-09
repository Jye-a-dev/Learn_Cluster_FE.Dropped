import { Course } from "@/hooks/courses/getCourse";

interface Props {
  course: Course;
  onPreview: () => void;
}

export default function CourseCard({ course, onPreview }: Props) {
  return (
    <div
      onClick={onPreview}
      className="group cursor-pointer bg-white/90 border rounded-2xl p-6 hover:shadow-xl transition flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
            {course.title.charAt(0)}
          </div>

          <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">
            {course.status}
          </span>
        </div>

      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-emerald-600 mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
        {course.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-emerald-600 line-clamp-3 grow">
        {course.description ?? "Chưa có mô tả cho khóa học này."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-5">

        <span>
          {course.duration_hours
            ? `${course.duration_hours} giờ học`
            : "Tự học"}
        </span>

        <span className="text-indigo-600 font-medium">
          Xem trước →
        </span>

      </div>
    </div>
  );
}