"use client";

import { useState } from "react";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

import { Chapter, updateChapter } from "@/hooks/chapters/getChapters";

type Props = {
  open: boolean;
  chapter: Chapter;
  onClose: () => void;
  onUpdated?: (chapter: Chapter) => void; // callback reload nếu cần
};

export default function EditChapterModal({
  open,
  chapter,
  onClose,
  onUpdated,
}: Props) {

  const [title, setTitle] = useState(chapter.title);
  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE UPDATE
  ========================= */
  const handleUpdate = async () => {

    if (!title.trim()) return;

    try {
      setLoading(true);

      const updated = await updateChapter(chapter.id, {
        ...chapter,
        title,
      });

      onUpdated?.(updated);
      onClose();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  /* =========================
     UI
  ========================= */
  return (
    <BaseTeacherModal
      open={open}
      title="Edit Chapter"
      width="w-120"
      onClose={onClose}
    >
      <div className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>
    </BaseTeacherModal>
  );
}