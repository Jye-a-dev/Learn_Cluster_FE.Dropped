"use client";

import { useEffect, useState } from "react";
import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

import {
  LessonBE,
  getLessonsByChapter,
  addLesson,
  deleteLesson,
  updateLessonOrder,
} from "@/hooks/lessons/getLesson";

import type { LessonContentType } from "@/components/pages/AdminManage/AdminLesson/LessonUiTypes";

type Props = {
  open: boolean;
  chapterId: string;
  onUpdated: () => void;
  onClose: () => void;
};

export default function ManageLessonsModal({
  open,
  chapterId,
  onUpdated,
  onClose,
}: Props) {
  const [lessons, setLessons] = useState<LessonBE[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "video" as LessonContentType,
    url: "",
    text: "",
  });

  const [saving, setSaving] = useState(false);

  /* FETCH */
  useEffect(() => {
    if (!open) return;

    (async () => {
      try {
        setLoading(true);
        const data = await getLessonsByChapter(chapterId);
        setLessons(data.sort((a, b) => a.ordering - b.ordering));
      } finally {
        setLoading(false);
      }
    })();
  }, [open, chapterId]);

  /* ADD */
  const handleAdd = async () => {
    if (!form.title.trim()) return;

    try {
      setSaving(true);

      const newLesson = await addLesson({
        chapter_id: chapterId,
        title: form.title,
        content_type: form.type,
        content_url:
          form.type === "video" || form.type === "pdf" ? form.url : null,
        content_text: form.type === "text" ? form.text : null,
        ordering: lessons.length + 1,
      });

      setLessons((prev) => [...prev, newLesson]);
      onUpdated?.()
      setForm({ title: "", type: "video", url: "", text: "" });
    } finally {
      setSaving(false);
    }
  };

  /* DELETE */
  const handleDelete = async (id: string) => {
    await deleteLesson(id);
    setLessons((prev) => prev.filter((l) => l.id !== id));
    onUpdated?.()
  };

  /* MOVE */
  const move = async (i: number, dir: "up" | "down") => {
    const arr = [...lessons];
    const t = dir === "up" ? i - 1 : i + 1;
    if (t < 0 || t >= arr.length) return;

    [arr[i], arr[t]] = [arr[t], arr[i]];
    setLessons(arr);

    await Promise.all(
      arr.map((l, idx) => updateLessonOrder(l.id, { ordering: idx + 1 }))
    );
    onUpdated?.()
  };

  return (
    <BaseTeacherModal
      open={open}
      title="Manage Lessons"
      width="w-[900px]"
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT: FORM */}
        <div className="space-y-3">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as LessonContentType })
            }
            className="w-full p-2 border rounded"
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="text">Text</option>
          </select>

          {(form.type === "video" || form.type === "pdf") && (
            <input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder={form.type === "video" ? "Video URL" : "PDF URL"}
              className="w-full p-2 border rounded"
            />
          )}

          {form.type === "text" && (
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Content"
              className="w-full p-2 border rounded"
            />
          )}

          <button
            onClick={handleAdd}
            disabled={saving}
            className="w-full py-2 bg-blue-600 text-white rounded"
          >
            {saving ? "Saving..." : "Add Lesson"}
          </button>
        </div>

        {/* RIGHT: LIST */}
        <div className="space-y-2    overflow-y-auto">
          {loading && <p>Loading...</p>}

          {lessons.map((l, i) => (
            <div key={l.id} className="flex justify-between border p-2 rounded">
              <div>
                <p className="text-sm font-medium">{l.title}</p>
                <p className="text-xs text-gray-400">{l.content_type}</p>
              </div>

              <div className="flex gap-1">
                <button onClick={() => move(i, "up")}>↑</button>
                <button onClick={() => move(i, "down")}>↓</button>
                <button onClick={() => handleDelete(l.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </BaseTeacherModal>
  );
}