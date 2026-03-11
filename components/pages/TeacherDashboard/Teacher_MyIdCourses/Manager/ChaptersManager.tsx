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

          {/* ORDERING */}
          <input
            type="number"
            value={c.ordering}
            className="w-14 border text-white rounded-md px-2 py-1 text-sm"
            onChange={async (e) => {

              const newOrder = Number(e.target.value);

              if (!newOrder) return;

              await patchChapter(c.id, {
                ordering: newOrder,
              });

              await refresh();
            }}
          />

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