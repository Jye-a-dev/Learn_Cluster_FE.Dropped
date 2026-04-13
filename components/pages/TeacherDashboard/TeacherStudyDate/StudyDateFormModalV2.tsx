"use client";

import { useState } from "react";

import BaseTeacherModal from "../Base/BaseTeacherModal";

type CourseOption = {
  id: string;
  title: string;
};

type FormValues = {
  title: string;
  location: string;
  scheduledAt: string;
  courseId: string;
};

type Props = {
  open: boolean;
  loading?: boolean;
  title: string;
  submitText: string;
  courses: CourseOption[];
  initialValues?: Partial<FormValues>;
  onConfirm: (values: FormValues) => void | Promise<void>;
  onClose: () => void;
};

export default function StudyDateFormModalV2({
  open,
  loading,
  title,
  submitText,
  courses,
  initialValues,
  onConfirm,
  onClose,
}: Props) {
  const [form, setForm] = useState<FormValues>({
    title: initialValues?.title ?? "",
    location: initialValues?.location ?? "",
    scheduledAt: initialValues?.scheduledAt ?? "",
    courseId: initialValues?.courseId ?? "",
  });

  const isDisabled =
    Boolean(loading) ||
    !form.title.trim() ||
    !form.location.trim() ||
    !form.scheduledAt ||
    !form.courseId;

  return (
    <BaseTeacherModal
      open={open}
      title={title}
      width="max-w-md"
      onClose={onClose}
    >
      <div className="space-y-4">
        <input
          placeholder="Tiêu đề"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
          className="w-full rounded bg-gray-800 p-2 text-white"
        />

        <input
          placeholder="Địa điểm"
          value={form.location}
          onChange={(event) =>
            setForm((current) => ({ ...current, location: event.target.value }))
          }
          className="w-full rounded bg-gray-800 p-2 text-white"
        />

        <input
          type="datetime-local"
          value={form.scheduledAt}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              scheduledAt: event.target.value,
            }))
          }
          className="w-full rounded bg-gray-800 p-2 text-white"
        />

        <select
          value={form.courseId}
          onChange={(event) =>
            setForm((current) => ({ ...current, courseId: event.target.value }))
          }
          className="w-full rounded bg-gray-800 p-2 text-white"
        >
          <option value="">-- Chọn khóa học --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        {courses.length === 0 ? (
          <p className="text-sm text-gray-400">
            Bạn chưa có khóa học nào để tạo study date.
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded border px-4 py-2 text-white"
        >
          Hủy
        </button>

        <button
          onClick={() => {
            if (isDisabled) return;
            void onConfirm({
              title: form.title.trim(),
              location: form.location.trim(),
              scheduledAt: form.scheduledAt,
              courseId: form.courseId,
            });
          }}
          disabled={isDisabled}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : submitText}
        </button>
      </div>
    </BaseTeacherModal>
  );
}
