"use client";

import { Course } from "@/hooks/courses/getCourse";
import Link from "next/link";

interface Props {
  course: Course;
  onClose: () => void;
}

export default function CoursePreviewModal({ course, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-emerald-50 border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
              {course.title.charAt(0)}
            </div>

            <div>
              <h2 className="font-semibold text-lg text-emerald-900">
                Xem trước khóa học
              </h2>
              <p className="text-xs text-emerald-600 capitalize">
                {course.status}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-xl font-semibold mb-2">
            {course.title}
          </h3>

          <p className="text-gray-600 mb-5 leading-relaxed">
            {course.description ?? "Chưa có mô tả cho khóa học này."}
          </p>

          {course.objective && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Mục tiêu:
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {course.objective}
              </p>
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-4">
            <div>
              <span className="font-medium text-gray-700">
                Thời lượng:
              </span>{" "}
              {course.duration_hours
                ? `${course.duration_hours} giờ`
                : "Tự học"}
            </div>

            <div>
              <span className="font-medium text-gray-700">
                Quyền truy cập:
              </span>{" "}
              Cần đăng nhập
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex gap-3">
          <Link
            href="/login"
            className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition"
          >
            Đăng nhập để tham gia
          </Link>

          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-lg cursor-pointer transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
