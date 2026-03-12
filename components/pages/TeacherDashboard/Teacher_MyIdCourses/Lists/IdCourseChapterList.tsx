"use client";

import { useEffect, useState } from "react";
import { Chapter, getChaptersByCourse } from "@/hooks/chapters/getChapters";

type Props = {
  courseId: string;
};

export default function CourseChapterList({ courseId }: Props) {

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

  if (loading) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 text-gray-400 text-sm">
        Loading chapters...
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 text-gray-400 text-sm">
        No chapters available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm">

      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          Chương
        </h2>

        <span className="text-sm text-gray-400">
          {chapters.length} chapters
        </span>
      </div>

      {/* Chapter list */}
      <div className="divide-y">

        {chapters.map((chapter) => (

          <div
            key={chapter.id}
            className="flex gap-4 px-6 py-5 hover:bg-gray-50 transition"
          >

            {/* Chapter number */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 font-semibold text-sm">
              {chapter.ordering}
            </div>

            {/* Content */}
            <div className="flex-1">

              <div className="font-medium text-gray-900">
                {chapter.title}
              </div>

              {chapter.description && (
                <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {chapter.description}
                </div>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}