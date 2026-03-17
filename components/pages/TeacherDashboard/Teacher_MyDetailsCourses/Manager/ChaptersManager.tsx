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
        <div className="flex items-center justify-between px-3 py-2 gap-3">

          {/* ORDERING - CUSTOM BUTTON */}
          <div className="flex items-center gap-1">

            {/* UP */}
            <button
              onClick={async () => {
                if (c.ordering <= 1) return;

                await patchChapter(c.id, {
                  ordering: c.ordering - 1,
                });

                await refresh();
              }}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              ↑
            </button>

            {/* CURRENT ORDER */}
            <span className="w-6 text-center text-sm text-white">
              {c.ordering}
            </span>

            {/* DOWN */}
            <button
              onClick={async () => {
                await patchChapter(c.id, {
                  ordering: c.ordering + 1,
                });

                await refresh();
              }}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              ↓
            </button>

          </div>

          {/* TITLE */}
          <span className="flex-1 text-sm text-gray-200">
            {c.title}
          </span>

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
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Chapter title"
            className="border rounded-lg text-white p-2 w-full"
          />

          <button
            onClick={handleAdd}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Add Chapter
          </button>
        </>
      )}
    />
  );
}