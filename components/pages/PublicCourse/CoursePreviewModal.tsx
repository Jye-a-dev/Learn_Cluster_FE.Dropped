"use client";

import { Course } from "@/hooks/courses/getCourse";
import Link from "next/link";

interface Props {
  course: Course;
  onClose: () => void;
}

export default function CoursePreviewModal({ course, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-3">{course.title}</h2>

        <p className="text-gray-600 mb-4">
          {course.description ?? "No description available"}
        </p>

        {course.objective && (
          <div className="mb-4">
            <h3 className="font-semibold">Objective</h3>
            <p className="text-gray-600 text-sm">{course.objective}</p>
          </div>
        )}

        <div className="text-sm text-gray-500 mb-6">
          Duration:{" "}
          {course.duration_hours
            ? `${course.duration_hours} hours`
            : "Self paced"}
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="flex-1 text-center bg-black text-white py-2 rounded-lg"
          >
            Login to view full course
          </Link>

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}