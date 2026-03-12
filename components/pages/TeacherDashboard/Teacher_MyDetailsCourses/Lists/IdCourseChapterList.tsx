"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { Chapter, getChaptersByCourse } from "@/hooks/chapters/getChapters";

type Props = {
  courseId: string;
};

export default function CourseChapterList({ courseId }: Props) {

  const router = useRouter();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!courseId) return;

    async function fetchChapters() {

      try {

        const res = await getChaptersByCourse(courseId);

        const sorted = res.sort((a, b) => a.ordering - b.ordering);

        setChapters(sorted);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    }

    fetchChapters();

  }, [courseId]);

  function handleOpenChapter(id: string) {
    router.push(`/teacher/chapter/${id}`);
  }

  return (
    <BaseTeacherList
      title="Chương"
      items={chapters}
      loading={loading}
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

          {/* Chapter number */}
          <div
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-cyan-50
              text-cyan-600
              font-semibold text-sm
            "
          >
            {chapter.ordering}
          </div>

          {/* Content */}
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