"use client";

import { Course } from "@/hooks/courses/getCourse";
import Link from "next/link";

type Props = {
  course: Course;
  onClose: () => void;
};

export default function Teacher_MyCourseModal({
  course,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-emerald-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-emerald-600">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-cyan-200 mb-5">
          {course.title}
        </h2>

        {/* COURSE INFO */}
        <div className="border border-emerald-500 rounded-xl bg-emerald-600/60 p-5 mb-6 space-y-4 text-sm">

          <div className="flex justify-between">
            <span className="text-cyan-300">ID</span>
            <span className="font-medium text-white">{course.id}</span>
          </div>

          <div>
            <p className="text-cyan-300 mb-1">Description</p>
            <p className="text-cyan-100 leading-relaxed">
              {course.description || "Không có mô tả"}
            </p>
          </div>

          <div>
            <p className="text-cyan-300 mb-1">Objective</p>
            <p className="text-cyan-100 leading-relaxed">
              {course.objective || "Không có mục tiêu"}
            </p>
          </div>

          <div className="flex justify-between">
            <span className="text-cyan-300">Duration</span>
            <span className="font-medium text-white">
              {course.duration_hours ?? 0} giờ
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-cyan-300">Status</span>

            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                course.status === "public"
                  ? "bg-green-200 text-green-900"
                  : course.status === "draft"
                  ? "bg-yellow-200 text-yellow-900"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {course.status}
            </span>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center">

          <Link
            href={`/teacher/courses/my/${course.id}`}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition"
          >
            Xem chi tiết
          </Link>

          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer border border-cyan-300 text-cyan-100 rounded-lg hover:bg-cyan-500 hover:text-white transition"
          >
            Đóng
          </button>

        </div>

      </div>
    </div>
  );
}