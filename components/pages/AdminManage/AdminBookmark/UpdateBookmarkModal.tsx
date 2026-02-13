"use client";

import { useEffect, useState } from "react";
import {
  UserIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { BookmarkBE, UpdateBookmarkPayload } from "@/hooks/bookmark/getBookmark";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
  open: boolean;
  bookmark: BookmarkBE | null;
  onClose: () => void;
  onSubmit: (id: string, data: UpdateBookmarkPayload) => Promise<void>;
};

export default function UpdateBookmarkModal({
  open,
  bookmark,
  onClose,
  onSubmit,
}: Props) {
  const { usersMap } = useUsersMap();
  const { lessonsMap, loading: loadingLessons } = useLessonsMap();

  const [form, setForm] = useState<UpdateBookmarkPayload>({
    lesson_id: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && bookmark) {
      setForm({
        lesson_id: bookmark.lesson_id ?? "",
      });
    }
  }, [open, bookmark]);

  if (!open || !bookmark) return null;

  const bookmarkId = bookmark.id;

  const isInvalid = !form.lesson_id;

  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      await onSubmit(bookmarkId, {
        lesson_id: form.lesson_id,
      });

      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseFormModal
      open={open}
      title="Cập nhật Bookmark"
      submitting={submitting}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="space-y-5 text-white">
        {/* USER (readonly hiển thị) */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
            <UserIcon className="h-4 w-4 text-white/40" />
            User
          </label>

          <input
            className="w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm text-white/70"
            value={
              usersMap[bookmark.user_id]?.username ??
              usersMap[bookmark.user_id]?.email ??
              bookmark.user_id
            }
            disabled
          />
        </div>

        {/* LESSON */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
            <BookOpenIcon className="h-4 w-4 text-white/40" />
            Lesson
          </label>

          <select
            className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
            value={form.lesson_id}
            disabled={loadingLessons}
            onChange={(e) =>
              setForm({
                ...form,
                lesson_id: e.target.value,
              })
            }
          >
            <option value="">-- Chọn lesson --</option>
            {Object.values(lessonsMap).map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </BaseFormModal>
  );
}
