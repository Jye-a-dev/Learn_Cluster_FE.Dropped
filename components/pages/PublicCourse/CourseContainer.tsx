"use client";

import { useEffect, useState } from "react";
import { Course, getCourses } from "@/hooks/courses/getCourse";
import CourseCard from "./CourseCard";
import CoursePreviewModal from "./CoursePreviewModal";

export default function CourseContainer() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses({
          status: "public",
          limit: 50,
        });

        setCourses(data);
      } catch (err) {
        console.error("Lỗi tải danh sách khóa học:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="bg-gray-50/90 border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h1 className="text-4xl text-cyan-800/60 font-bold mb-4">
            Khám phá khóa học
          </h1>

          <p className="text-emerald-600 max-w-2xl mx-auto">
            Tham khảo các khóa học chất lượng trên hệ thống.
            Đăng nhập để truy cập toàn bộ nội dung và bắt đầu hành trình học tập của bạn.
          </p>

        </div>
      </section>

      {/* COURSE LIST */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {loading && (
          <div className="text-center py-20 text-gray-500">
            Đang tải danh sách khóa học...
          </div>
        )}

        {!loading && courses.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Chưa có khóa học nào được công bố.
          </div>
        )}

        {!loading && courses.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPreview={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        )}

      </section>

      {/* PREVIEW MODAL */}
      {selectedCourse && (
        <CoursePreviewModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}