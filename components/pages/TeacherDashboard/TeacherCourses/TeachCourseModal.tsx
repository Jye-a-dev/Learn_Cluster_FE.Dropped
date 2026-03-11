"use client";

import { Course } from "@/hooks/courses/getCourse";
import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";


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
    <BaseTeacherModal
      open={true}
      title="Đăng ký giảng dạy"
      width="max-w-md"
      onClose={onClose}
    >

      <p className="text-gray-200 mb-4">
        Bạn muốn đăng ký giảng dạy khóa học:
      </p>

      <div className="bg-gray-50 p-3 rounded-lg mb-6">
        <p className="font-medium">{course.title}</p>
      </div>

      <div className="flex justify-end gap-3">

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
          {loading ? "Đang đăng ký..." : "Xác nhận"}
        </button>

      </div>

    </BaseTeacherModal>
  );
}