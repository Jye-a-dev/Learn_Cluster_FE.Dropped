"use client";

import { useState } from "react";
import {
  UserIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { AddBookmarkPayload } from "@/hooks/bookmark/getBookmark";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddBookmarkPayload) => Promise<void>;
};

export default function CreateBookmarkModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const { usersMap, loading: loadingUsers } =
    useUsersMap();

  const {
    lessonsMap,
    loading: loadingLessons,
  } = useLessonsMap();

  const [form, setForm] = useState<AddBookmarkPayload>({
    user_id: "",
    lesson_id: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const isInvalid =
    !form.user_id || !form.lesson_id;

  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      await onSubmit({
        user_id: form.user_id,
        lesson_id: form.lesson_id,
      });

      onClose();
      setForm({
        user_id: "",
        lesson_id: "",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseFormModal
      open={open}
      title="Tạo Bookmark"
      submitting={submitting}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="space-y-5 text-white">
        {/* ===== USER ===== */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
            <UserIcon className="h-4 w-4 text-white/40" />
            User
          </label>

          <select
            className="w-full rounded-md bg-black/60 border border-white/30
            px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500"
            value={form.user_id}
            disabled={loadingUsers}
            onChange={(e) =>
              setForm({
                ...form,
                user_id: e.target.value,
              })
            }
          >
            <option value="">
              -- Chọn user --
            </option>

            {Object.values(usersMap).map((u) => (
              <option
                key={u.id}
                value={u.id}
              >
                {u.username ?? u.email}
              </option>
            ))}
          </select>
        </div>

        {/* ===== LESSON ===== */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
            <BookOpenIcon className="h-4 w-4 text-white/40" />
            Lesson
          </label>

          <select
            className="w-full rounded-md bg-black/60 border border-white/30
            px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500"
            value={form.lesson_id}
            disabled={loadingLessons}
            onChange={(e) =>
              setForm({
                ...form,
                lesson_id: e.target.value,
              })
            }
          >
            <option value="">
              -- Chọn lesson --
            </option>

            {Object.values(lessonsMap).map(
              (lesson) => (
                <option
                  key={lesson.id}
                  value={lesson.id}
                >
                  {lesson.title}
                </option>
              )
            )}
          </select>
        </div>

        <p className="text-[11px] text-white/50">
          Bookmark lưu lại bài học mà người dùng đã đánh dấu.
        </p>
      </div>
    </BaseFormModal>
  );
}
