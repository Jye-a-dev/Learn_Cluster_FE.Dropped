"use client";

import CourseHeaderActions from "./IdHeaderActions";
import { Course } from "@/hooks/courses/getCourse";
import { useInstructorCount } from "@/hooks/course_instructors/countCourseInstructor";
import { useStudentCountByCourse } from "@/hooks/enrollment/countStudentCountByCourse";
import { useChapterCount } from "@/hooks/chapters/useChapterCount";

type Props = {
  course: Course;
  onOpenInstructors?: () => void;
  onOpenStudents?: () => void;
  onOpenEdit?: () => void;
  onOpenManage?: () => void;
};

export default function CourseHeader({
  course,
  onOpenInstructors,
  onOpenStudents,
  onOpenEdit,
  onOpenManage,
}: Props) {

  const studentCount = useStudentCountByCourse(course.id);
  const instructorCount = useInstructorCount(course.id);
  const chapterCount = useChapterCount(course.id);

  const stats = [
    { label: "Instructors", value: instructorCount },
    { label: "Students", value: studentCount },
    { label: "Chapters", value: chapterCount },
    {
      label: "Created",
      value: new Date(course.created_at ?? "").toLocaleDateString(),
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8">

      {/* TITLE */}
      <div className="flex items-start justify-between gap-6">

        <div>
          <h1 className="text-3xl font-bold text-cyan-100">
            {course.title}
          </h1>

          <p className="mt-2 text-cyan-200 max-w-2xl">
            Mô tả: {course.description}
          </p>
          <p className="mt-2 text-cyan-200 max-w-2xl">
            Mục tiêu: {course.objective}
          </p>
        </div>

        <CourseHeaderActions
          onEdit={onOpenEdit}
          onManage={onOpenManage}
        />

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-sm">

        {stats.map((item) => {

          let onClick: (() => void) | undefined;

          if (item.label === "Instructors") onClick = onOpenInstructors;
          if (item.label === "Students") onClick = onOpenStudents;

          const clickable = !!onClick;

          return (
            <div
              key={item.label}
              onClick={onClick}
              className={`bg-white/50 rounded-lg p-4
                ${clickable ? "cursor-pointer hover:bg-emerald-100/70 transition" : ""}
              `}
            >
              <p className="text-cyan-700">{item.label}</p>

              <p className="text-lg font-semibold text-white">
                {item.value}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}