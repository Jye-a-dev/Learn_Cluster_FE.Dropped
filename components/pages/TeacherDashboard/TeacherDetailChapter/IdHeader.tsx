"use client";

import { Chapter } from "@/hooks/chapters/getChapters";
import { useLessonCountByChapter } from "@/hooks/lessons/useLessonCountByChapter";

import ChapterHeaderActions from "./IdHeaderActions";

type Props = {
  chapter: Chapter;
  onOpenEdit?: () => void;
  onOpenManage?: () => void;
  onDelete?: () => void;
};

export default function ChapterHeader({
  chapter,
  onOpenEdit,
  onOpenManage,
  onDelete,
}: Props) {

  const lessonCount = useLessonCountByChapter(chapter.id);

  const stats = [
    { label: "Bài học", value: lessonCount },
    { label: "Thứ tự", value: chapter.ordering },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8">

      {/* TITLE */}
      <div className="flex items-start justify-between gap-6">

        <div>
          <h1 className="text-3xl font-bold text-cyan-100">
            {chapter.title}
          </h1>

          {chapter.description && (
            <p className="mt-2 text-cyan-200 max-w-2xl">
              {chapter.description}
            </p>
          )}
        </div>

        <ChapterHeaderActions
          onEdit={onOpenEdit}
          onManage={onOpenManage}
          onDelete={onDelete}
        />

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-8 text-sm">

        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white/50 rounded-lg p-4"
          >
            <p className="text-cyan-700">
              {item.label}
            </p>

            <p className="text-lg font-semibold text-white">
              {item.value}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}