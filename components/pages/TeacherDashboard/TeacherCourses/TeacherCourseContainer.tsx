"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Course, getCourses } from "@/hooks/courses/getCourse";
import { useApplyTeachCourse } from "@/hooks/course_instructors/useApplyTeachCourse";

import TeacherCourseCard from "./TeacherCourseCard";
import TeachCourseModal from "./TeachCourseModal";
import BaseTeacherContainer from "../Base/BaseTeacherContainer";

export default function TeacherCourseContainer() {

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const router = useRouter();
  const { applyTeach, loading: applying } = useApplyTeachCourse();

  useEffect(() => {

    async function fetchCourses() {

      try {

        const data = await getCourses({
          status: "public",
          limit: 100,
        });

        setCourses(data);

      } catch (err) {
        console.error("Lỗi tải course", err);
      } finally {
        setLoading(false);
      }

    }

    fetchCourses();

  }, []);

  async function handleConfirm() {

    if (!selectedCourse) return;

    const success = await applyTeach(selectedCourse.id);

    if (success) {
      setSelectedCourse(null);
      router.push("/teacher/courses/my");
    }

  }

  return (
    <>
      <BaseTeacherContainer
        title="Chọn khóa học để giảng dạy"
        description="Chọn một khóa học có sẵn trong hệ thống để đăng ký giảng dạy."
      >

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-emerald-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {courses.map((course) => (
              <TeacherCourseCard
                key={course.id}
                course={course}
                onTeach={() => setSelectedCourse(course)}
              />
            ))}

          </div>
        )}

      </BaseTeacherContainer>

      {selectedCourse && (
        <TeachCourseModal
          course={selectedCourse}
          loading={applying}
          onConfirm={handleConfirm}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );

}