"use client";

import { useEffect, useState, useCallback } from "react";
import { Course, getCourses } from "@/hooks/courses/getCourse";
import CourseCard from "./CourseCard";
import CoursePreviewModal from "./CoursePreviewModal";
import CourseFilter from "./CourseFilter";

export default function CourseContainer() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses({
          status: "public",
          limit: 50,
        });

        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error("Lỗi tải danh sách khóa học:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handleFilter = useCallback(
    (filters: {
      search: string;
      status: string;
      sort: string;
    }) => {
      let result = [...courses];

      if (filters.search) {
        result = result.filter((c) =>
          c.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.status !== "all") {
        result = result.filter((c) => c.status === filters.status);
      }

      if (filters.sort === "title") {
        result.sort((a, b) => a.title.localeCompare(b.title));
      }

      if (filters.sort === "duration_desc") {
        result.sort(
          (a, b) => (b.duration_hours || 0) - (a.duration_hours || 0)
        );
      }

      if (filters.sort === "duration_asc") {
        result.sort(
          (a, b) => (a.duration_hours || 0) - (b.duration_hours || 0)
        );
      }

      setFilteredCourses(result);
    },
    [courses]
  );

  return (
    <>
      <section className="bg-gray-50/80 m-2 border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl text-cyan-800/60 font-bold mb-4">
            Khám phá khóa học
          </h1>

          <p className="text-emerald-600 max-w-2xl mx-auto">
            Tham khảo các khóa học chất lượng trên hệ thống. Đăng nhập để truy
            cập toàn bộ nội dung và bắt đầu hành trình học tập của bạn.
          </p>
        </div>
      </section>

      <section className="mt-4 mx-2">
        <CourseFilter onFilter={handleFilter} />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Không tìm thấy khóa học phù hợp.
          </div>
        )}

        {!loading && filteredCourses.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-[fadeIn_.5s_ease]">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="hover:scale-[1.02] transition"
                style={{
                  animation: "fadeUp .4s ease forwards",
                  animationDelay: `${index * 70}ms`,
                  opacity: 0,
                }}
              >
                <CourseCard
                  course={course}
                  onPreview={() => setSelectedCourse(course)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedCourse && (
        <CoursePreviewModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}
