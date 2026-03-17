"use client";

import { useRouter } from "next/navigation";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { useChaptersByCourse } from "@/hooks/chapters/useChapter_swr";

type Props = {
  courseId: string;
};

export default function CourseChapterList({ courseId }: Props) {

  const router = useRouter();

  const {
    chapters,
    isLoading,
  } = useChaptersByCourse(courseId);

  function handleOpenChapter(id: string) {
    router.push(`/teacher/chapter/${id}`);
  }

  return (
    <BaseTeacherList
      layout="grid"
      title="Chương"
      items={chapters}
      loading={isLoading}
      emptyText="No chapters available"
      renderItem={(chapter) => (

        <div
          onClick={() => handleOpenChapter(chapter.id)}
          className="
            flex gap-4
            hover:bg-emerald-100/20
            rounded-xl
            transition
            p-2
            cursor-pointer
          "
        >

          <div className="
            flex items-center justify-center
            w-10 h-10
            rounded-full
            bg-cyan-50
            text-cyan-600
            font-semibold text-sm
          ">
            {chapter.ordering}
          </div>

          <div className="flex-1">
            <div className="font-medium text-gray-700">
              {chapter.title}
            </div>

            {chapter.description && (
              <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                {chapter.description}
              </div>
            )}
          </div>

        </div>

      )}
    />
  );
}