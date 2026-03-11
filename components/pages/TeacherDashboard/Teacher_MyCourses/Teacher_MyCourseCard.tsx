"use client";

import { Course } from "@/hooks/courses/getCourse";
import BaseTeacherCard from "@/components/pages/TeacherDashboard/Base/BaseTeacherCard";

type Props = {
  course: Course;
  onDetail: () => void;
};

export default function Teacher_MyCourseCard({ course, onDetail }: Props) {
  return (
    <BaseTeacherCard>

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">

        <h3
          className="
          font-semibold text-lg text-emerald-200
          leading-snug line-clamp-2
          group-hover:text-cyan-300 transition
        "
        >
          {course.title}
        </h3>

        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 shrink-0" />

      </div>

      {/* DESCRIPTION */}
      {course.description && (
        <p className="text-sm text-emerald-300/80 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      )}

      {/* FOOTER */}
      <div className="mt-auto pt-4 flex items-center justify-between">

        <span className="text-xs text-emerald-400">
          Course
        </span>

        <button
          onClick={onDetail}
          className="
          cursor-pointer
          px-4 py-2 text-sm font-medium
          border border-cyan-500 text-cyan-300
          rounded-lg
          hover:bg-cyan-500 hover:text-white
          transition
        "
        >
          Xem chi tiết
        </button>

      </div>

    </BaseTeacherCard>
  );
}