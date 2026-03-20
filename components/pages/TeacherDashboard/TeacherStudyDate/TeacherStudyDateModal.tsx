"use client";

import { useState } from "react";
import { StudyDateBE } from "@/hooks/study_dates/getStudyDates";
import BaseTeacherModal from "../Base/BaseTeacherModal";

type Props = {
  studyDate?: StudyDateBE | null;
  onSave: (data: {
    title: string;
    scheduled_at: string;
    location: string;
  }) => void;
  onClose: () => void;
};

export default function TeacherStudyDateModal({
  studyDate,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState({
    title: studyDate?.title || "",
    scheduled_at: studyDate?.scheduled_at || "",
    location: studyDate?.location || "",
  });

  function handleSubmit() {
    onSave(form);
  }

  return (
    <BaseTeacherModal
      open={true}
      title={studyDate ? "Chỉnh sửa buổi học" : "Tạo buổi học"}
      onClose={onClose}
    >
      <div className="space-y-4">
        {/* TITLE */}
        <input
          placeholder="Tiêu đề"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* TIME */}
        <input
          type="datetime-local"
          value={form.scheduled_at || ""}
          onChange={(e) =>
            setForm({ ...form, scheduled_at: e.target.value })
          }
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* LOCATION */}
        <input
          placeholder="Địa điểm"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-white"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Lưu
          </button>
        </div>
      </div>
    </BaseTeacherModal>
  );
}