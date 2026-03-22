"use client";

import BaseTeacherCard from "@/components/pages/TeacherDashboard/Base/BaseTeacherCard";
import type { StudyDate } from "@/hooks/study_dates/getStudyDates";

interface Props {
  studyDate: StudyDate;
  courseTitle?: string; // ✅ thêm prop
  onClick: () => void;
}

export default function TeacherStudyDateCard({
  studyDate,
  courseTitle,
  onClick,
}: Props) {
  return (
    <BaseTeacherCard>

      {/* HEADER */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-emerald-200 leading-snug line-clamp-2">
          {studyDate.title}
        </h3>

        <span className="text-xs px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-300">
          Study Date
        </span>
      </div>

      {/* COURSE TITLE */}
      <p className="text-sm text-yellow-300 mb-2">
        📚 {courseTitle || "Không có khóa học"}
      </p>

      {/* LOCATION */}
      <p className="text-sm text-emerald-300/80 line-clamp-2 mb-3">
        📍 {studyDate.location || "Chưa có địa điểm"}
      </p>

      {/* META */}
      <div className="flex items-center justify-between text-sm text-emerald-400 mb-4">
        <span>
          🕒{" "}
          {studyDate.scheduledAt
            ? new Date(studyDate.scheduledAt).toLocaleString()
            : "Chưa có lịch"}
        </span>

        <span className="opacity-0 group-hover:opacity-100 transition">
          ID: {studyDate.id?.slice(0, 6)}
        </span>
      </div>

      {/* ACTION */}
      <button
        onClick={onClick}
        className="
          w-full py-2.5 cursor-pointer
          rounded-xl
          bg-linear-to-r
          from-cyan-500
          to-blue-600
          text-white
          font-medium
          hover:opacity-90
          transition
        "
      >
        Xem / Chỉnh sửa
      </button>

    </BaseTeacherCard>
  );
}