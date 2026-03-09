"use client";

import { Course } from "@/hooks/courses/getCourse";

type Props = {
  course: Course;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export default function TeachCourseModal({
  course,
  loading,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

        <h2 className="text-xl font-semibold mb-3">
          Đăng ký giảng dạy
        </h2>

        <p className="text-gray-600 mb-4">
          Bạn muốn đăng ký giảng dạy khóa học:
        </p>

        <div className="bg-gray-50 p-3 rounded-lg mb-6">
          <p className="font-medium">{course.title}</p>
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Đang đăng ký..." : "Xác nhận"}
          </button>

        </div>

      </div>
    </div>
  );
}