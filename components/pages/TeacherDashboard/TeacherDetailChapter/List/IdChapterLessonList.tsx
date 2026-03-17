"use client";

import { useRouter } from "next/navigation";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";

import { LessonBE } from "@/hooks/lessons/getLesson";

type Props = {
  chapterId: string;
  lessons: LessonBE[];
};

export default function ChapterLessonList({ lessons }: Props) {

  const router = useRouter();

  const sortedLessons = [...lessons].sort(
    (a, b) => a.ordering - b.ordering
  );

  return (

    <BaseTeacherList
      layout="grid"
      title="Bài học"
      items={sortedLessons}
      emptyText="No lessons available"
      renderItem={(lesson) => (

        <div
          onClick={() => router.push(`/teacher/lesson/${lesson.id}`)}
          className="
              flex gap-4
               w-full  
              hover:bg-emerald-700/20
              rounded-xl
              transition
              p-2
              cursor-pointer
              border border-gray-200
              h-full
            "
        >

          {/* Lesson number */}
          <div
            className="
                flex items-center justify-center
                w-10 h-10
                rounded-full
                bg-indigo-50
                text-indigo-600
                font-semibold text-sm
              "
          >
            {lesson.ordering}
          </div>

          {/* Content */}
          <div className="flex-1">

            <div className="font-medium text-gray-700">
              {lesson.title}
            </div>

            <div className="text-xs text-emerald-900 mt-1">
              {lesson.content_type}
            </div>

          </div>

        </div>

      )}
    />

  );
}