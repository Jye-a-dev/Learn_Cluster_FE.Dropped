"use client";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import type { StudyDate } from "@/hooks/study_dates/getStudyDates"; // ✔️ đúng type FE

type Props = {
  studyDate: StudyDate;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  onDelete?: () => void;          // NEW
};

export default function TeacherStudyDateModal({
  studyDate,
  loading,
  onConfirm,
  onDelete,
  onClose,
}: Props) {
  return (
    <BaseTeacherModal
      open={true}
      title="Quản lý buổi học"
      width="max-w-md"
      onClose={onClose}
    >
      <p className="text-gray-200 mb-4">
        Thông tin buổi học:
      </p>

      <div className="bg-gray-50/20 p-3 rounded-lg mb-6 space-y-2">

        <p className="font-medium">
          {studyDate.title || "Buổi học mới"}
        </p>

        <p className="text-sm">
          📍 {studyDate.location || "Chưa có địa điểm"}
        </p>

        <p className="text-sm">
          🕒{" "}
          {studyDate.scheduledAt
            ? new Date(studyDate.scheduledAt).toLocaleString()
            : "Chưa có lịch"}
        </p>

      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onDelete}
          className="px-4 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"
        >
          Xoá
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-white hover:text-red-600"
        >
          Hủy
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </button>

      </div>

    </BaseTeacherModal>
  );
}