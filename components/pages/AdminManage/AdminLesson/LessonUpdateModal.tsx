"use client";

import { useEffect, useState } from "react";
import {
  BookOpenIcon,
  ListBulletIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useChaptersMap } from "@/hooks/chapters/useChaptersMap";

import type {
  Lesson,
  LessonContentType,
  UpdateLessonPayload,
} from "./LessonUiTypes";

type Props = {
  open: boolean;
  lesson: Lesson | null;
  onClose: () => void;
  onSubmit: (id: string, data: UpdateLessonPayload) => Promise<void>;
};

type FormState = {
  chapter_id: string;
  title: string;
  content_type: LessonContentType;
  content_url: string;
  content_text: string;
  ordering: string;
};

export default function UpdateLessonModal({
  open,
  lesson,
  onClose,
  onSubmit,
}: Props) {
  const { chaptersMap } = useChaptersMap();

  const [form, setForm] = useState<FormState>({
    chapter_id: "",
    title: "",
    content_type: "video",
    content_url: "",
    content_text: "",
    ordering: "",
  });

  const [submitting, setSubmitting] = useState(false);

  /* =======================
     INIT FORM
  ======================= */
  useEffect(() => {
    if (!open || !lesson) return;

    setForm({
      chapter_id: lesson.chapter_id,
      title: lesson.title,
      content_type: lesson.content_type,
      content_url: lesson.content_url ?? "",
      content_text: lesson.content_text ?? "",
      ordering: String(lesson.ordering),
    });
  }, [open, lesson]);

  if (!open || !lesson) return null;

  /* =======================
     VALIDATION
  ======================= */
  const isInvalid =
    !form.chapter_id ||
    !form.title.trim() ||
    (form.content_type === "text"
      ? !form.content_text.trim()
      : !form.content_url.trim());

  /* =======================
     SUBMIT
  ======================= */
  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      const payload: UpdateLessonPayload = {
        chapter_id: form.chapter_id,
        title: form.title.trim(),
        ordering:
          form.ordering !== ""
            ? Number(form.ordering)
            : undefined,
      };

      if (form.content_type === "text") {
        payload.content_text = form.content_text.trim();
        payload.content_url = "";
      } else {
        payload.content_url = form.content_url.trim();
      }

      await onSubmit(lesson!.id, payload);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <BaseFormModal
      open={open}
      title="Cập nhật Lesson"
      submitting={submitting}
      isInvalid={isInvalid}   // ✅ FIX
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* CHAPTER */}
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label className="text-xs font-medium text-white/70">
          Chapter
        </label>
        <select
          className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
          value={form.chapter_id}
          onChange={(e) =>
            setForm({
              ...form,
              chapter_id: e.target.value,
            })
          }
        >
          {Object.values(chaptersMap)
            .sort((a, b) => a.ordering - b.ordering)
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
        </select>
      </div>

      {/* TITLE */}
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-white/70">
          <BookOpenIcon className="h-4 w-4 text-white/40" />
          Title
        </label>
        <input
          className="input-admin text-white border border-white/40 rounded-md"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />
      </div>

      {/* CONTENT TYPE (LOCKED) */}
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label className="text-xs font-medium text-white/70">
          Content Type
        </label>
        <select
          className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
          value={form.content_type}
          disabled
        >
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="text">Text</option>
        </select>
      </div>

      {/* CONTENT URL */}
      {form.content_type !== "text" && (
        <div className="grid grid-cols-[140px_1fr] items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-white/70">
            <LinkIcon className="h-4 w-4 text-white/40" />
            Content URL
          </label>
          <input
            className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
            value={form.content_url}
            onChange={(e) =>
              setForm({
                ...form,
                content_url: e.target.value,
              })
            }
          />
        </div>
      )}

      {/* CONTENT TEXT */}
      {form.content_type === "text" && (
        <div className="grid grid-cols-[140px_1fr] items-start gap-3">
          <label className="text-xs font-medium text-white/70">
            Content Text
          </label>
          <textarea
            className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md min-h-40"
            value={form.content_text}
            onChange={(e) =>
              setForm({
                ...form,
                content_text: e.target.value,
              })
            }
          />
        </div>
      )}

      {/* ORDERING */}
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-white/70">
          <ListBulletIcon className="h-4 w-4 text-white/40" />
          Ordering
        </label>
        <input
          type="number"
          className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
          value={form.ordering}
          onChange={(e) =>
            setForm({
              ...form,
              ordering: e.target.value,
            })
          }
        />
      </div>
    </BaseFormModal>
  );
}