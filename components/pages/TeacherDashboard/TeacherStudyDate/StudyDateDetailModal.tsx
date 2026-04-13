"use client";

import BaseTeacherModal from "../Base/BaseTeacherModal";
import type { StudyDate } from "@/hooks/study_dates/getStudyDates";

type Props = {
  open: boolean;
  studyDate: StudyDate;
  courseTitle?: string;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export default function StudyDateDetailModal({
  open,
  studyDate,
  courseTitle,
  isOwner,
  onEdit,
  onDelete,
  onClose,
}: Props) {
  return (
    <BaseTeacherModal
      open={open}
      title="Chi tiet study date"
      width="max-w-md"
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="rounded-lg bg-gray-50/20 p-4">
          <p className="text-lg font-semibold text-white">
            {studyDate.title || "Study date"}
          </p>
          <div className="mt-3 space-y-2 text-sm text-emerald-100/85">
            <p>Course: {courseTitle || "Khong xac dinh"}</p>
            <p>Location: {studyDate.location || "Chua co dia diem"}</p>
            <p>
              Time:{" "}
              {studyDate.scheduledAt
                ? new Date(studyDate.scheduledAt).toLocaleString()
                : "Chua co lich"}
            </p>
            <p>Created by: {studyDate.createdBy || "Unknown"}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {isOwner ? (
            <>
              <button
                onClick={onDelete}
                className="rounded border border-red-500 px-4 py-2 text-red-300 hover:bg-red-500 hover:text-white"
              >
                Xoa
              </button>
              <button
                onClick={onEdit}
                className="rounded border border-cyan-500 px-4 py-2 text-cyan-200 hover:bg-cyan-600 hover:text-white"
              >
                Sua
              </button>
            </>
          ) : null}

          <button
            onClick={onClose}
            className="rounded border px-4 py-2 text-white"
          >
            Dong
          </button>
        </div>
      </div>
    </BaseTeacherModal>
  );
}
