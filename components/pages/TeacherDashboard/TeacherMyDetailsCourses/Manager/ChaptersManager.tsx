"use client";

import { useState } from "react";
import BaseTeacherManage from "@/components/pages/TeacherDashboard/Base/BaseTeacherManage";

import {
  Chapter,
  addChapter,
  deleteChapter,
  getChapters,
  patchChapter,
} from "@/hooks/chapters/getChapters";

type Props = {
  courseId: string;
  chapters: Chapter[];
};

export default function ChaptersManager({ courseId, chapters }: Props) {
  const [title, setTitle] = useState("");

  return (
    <BaseTeacherManage
      data={chapters}
      fetchData={() => getChapters({ course_id: courseId })}
      onAdd={async () => {
        if (!title.trim()) return;

        await addChapter({
          course_id: courseId,
          title,
          ordering: chapters.length + 1,
        });

        setTitle("");
      }}
      renderItem={(c: Chapter, refresh) => (
        <div className="flex items-center gap-3 px-3 py-2">

          {/* TITLE */}
          <span className="flex-1 text-sm text-gray-200">
            {c.title}
          </span>

          {/* ORDER (↑↓ chung 1 bên) */}
          <div className="flex items-center gap-1">
            <button
              onClick={async () => {
                if (c.ordering <= 1) return;
                await patchChapter(c.id, { ordering: c.ordering - 1 });
                await refresh();
              }}
              className="px-2 py-1 text-white rounded hover:bg-white/10 cursor-pointer"
            >
              ↑
            </button>

            <button
              onClick={async () => {
                await patchChapter(c.id, { ordering: c.ordering + 1 });
                await refresh();
              }}
              className="px-2 py-1  text-white rounded hover:bg-white/10 cursor-pointer"
            >
              ↓
            </button>
          </div>

          {/* DELETE */}
          <button
            onClick={async () => {
              await deleteChapter(c.id);
              await refresh();
            }}
            className="text-red-500 text-xs hover:text-red-600"
          >
            Remove
          </button>

        </div>
      )}
      renderAdd={(handleAdd) => (
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Chapter title"
            className="border rounded-lg text-white p-2 w-full bg-gray-800"
          />

          <button
            onClick={handleAdd}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-500"
          >
            Add Chapter
          </button>
        </div>
      )}
    />
  );
}