"use client";

import BaseTeacherCard from "@/components/pages/TeacherDashboard/Base/BaseTeacherCard";
import type { StudyDate } from "@/hooks/study_dates/getStudyDates";

type Props = {
  studyDate: StudyDate;
  courseTitle?: string;
  onClick: () => void;
};

export default function StudyDateListCardV2({
  studyDate,
  courseTitle,
  onClick,
}: Props) {
  return (
    <BaseTeacherCard>
      <div className="mb-2 flex items-start justify-between">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-emerald-200">
          {studyDate.title}
        </h3>

        <span className="rounded-md bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
          Study Date
        </span>
      </div>

      <p className="mb-2 text-sm text-yellow-300">
        Khóa học: {courseTitle || "Không có khóa học"}
      </p>

      <p className="mb-3 line-clamp-2 text-sm text-emerald-300/80">
        Địa điểm: {studyDate.location || "Chưa có địa điểm"}
      </p>

      <div className="mb-4 flex items-center justify-between text-sm text-emerald-400">
        <span>
          {studyDate.scheduledAt
            ? new Date(studyDate.scheduledAt).toLocaleString()
            : "Chưa có lịch"}
        </span>

        <span className="opacity-0 transition group-hover:opacity-100">
          ID: {studyDate.id?.slice(0, 6)}
        </span>
      </div>

      <button
        onClick={onClick}
        className="w-full cursor-pointer rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-2.5 font-medium text-white transition hover:opacity-90"
      >
        Xem chi tiết
      </button>
    </BaseTeacherCard>
  );
}
