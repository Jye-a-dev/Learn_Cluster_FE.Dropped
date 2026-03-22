"use client";

import { useState } from "react";
import BaseTeacherModal from "../Base/BaseTeacherModal";

/* ===================== TYPES ===================== */
type CourseOption = {
  id: string;
  title: string;
};

type Props = {
  open: boolean;
  loading?: boolean;
  courses: CourseOption[];
  onConfirm: (data: {
    title: string;
    location: string;
    scheduledAt: string;
    courseId: string;
  }) => void | Promise<void>;
  onClose: () => void;
};

/* ===================== COMPONENT ===================== */
export default function CreateStudyDateModal({
  open,
  loading,
  courses,
  onConfirm,
  onClose,
}: Props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [courseId, setCourseId] = useState("");

  /* ===================== VALIDATE ===================== */
  const isDisabled =
    loading ||
    !title.trim() ||
    !location.trim() ||
    !scheduledAt ||
    !courseId;

  /* ===================== SUBMIT ===================== */
  const handleSubmit = () => {
    if (isDisabled) return;

    onConfirm({
      title: title.trim(),
      location: location.trim(),
      scheduledAt,
      courseId,
    });
  };

  /* ===================== RENDER ===================== */
  return (
    <BaseTeacherModal
      open={open}
      title="Tạo buổi học"
      width="max-w-md"
      onClose={onClose}
    >
      <div className="space-y-4">

        {/* TITLE */}
        <input
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* LOCATION */}
        <input
          placeholder="Địa điểm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* DATETIME */}
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* COURSE SELECT */}
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">-- Chọn khoá học --</option>

          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* EMPTY STATE */}
        {courses.length === 0 && (
          <p className="text-sm text-gray-400">
            Bạn chưa được phân công khoá học nào
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded text-white"
        >
          Huỷ
        </button>

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "Đang tạo..." : "Tạo"}
        </button>
      </div>
    </BaseTeacherModal>
  );
}