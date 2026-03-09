"use client";

import { Course } from "@/hooks/courses/getCourse";

type Props = {
  course: Course;
  onDetail: () => void;
};

export default function Teacher_MyCourseCard({ course, onDetail }: Props) {
  return (
    <div
      className="
      group relative
      bg-black/80 border border-gray-200 rounded-2xl
      p-6 flex flex-col gap-4
      transition-all duration-200
      hover:shadow-lg hover:-translate-y-1
      hover:border-cyan-300
    "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className="
          font-semibold text-lg text-emerald-300
          leading-snug line-clamp-2
          group-hover:text-cyan-700 transition
        "
        >
          {course.title}
        </h3>

        {/* STATUS DOT */}
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
      </div>

      {/* DESCRIPTION */}
      {course.description && (
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      )}

      {/* FOOTER */}
      <div className="mt-auto pt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Course
        </span>

        <button
          onClick={onDetail}
          className="
          cursor-pointer
          px-4 py-2 text-sm font-medium
          border border-cyan-600 text-cyan-600
          rounded-lg
          hover:bg-cyan-600 hover:text-white
          transition
        "
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}