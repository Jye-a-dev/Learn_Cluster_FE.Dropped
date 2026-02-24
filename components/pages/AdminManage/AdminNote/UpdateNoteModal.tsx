"use client";

import { useEffect, useState } from "react";
import {
    DocumentTextIcon,
    UserIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Note, UpdateNotePayload } from "./NoteUiTypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
    open: boolean;
    note: Note | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateNotePayload) => Promise<void>;
};

export default function UpdateNoteModal({
    open,
    note,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap, loading: loadingUsers } = useUsersMap();
    const { lessonsMap, loading: loadingLessons } = useLessonsMap();

    const [form, setForm] = useState<UpdateNotePayload>({
        user_id: "",
        lesson_id: "",
        content: "",
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && note) {
            setForm({
                user_id: note.user_id ?? "",
                lesson_id: note.lesson_id ?? "",
                content: note.content ?? "",
            });
        }
    }, [open, note]);

    if (!open || !note) return null;

    // 🔥 Tách id ra biến cục bộ để TS hiểu chắc chắn
    const noteId = note.id;

    const isInvalid = !form.user_id || !form.lesson_id;

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit(noteId, {
                user_id: form.user_id,
                lesson_id: form.lesson_id,
                content: form.content || null,
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Note"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                {/* USER */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                        <UserIcon className="h-4 w-4 text-white/40" />
                        User
                    </label>

                    <select
                        className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                        value={form.user_id}
                        disabled={loadingUsers}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                user_id: e.target.value,
                            })
                        }
                    >
                        <option value="">-- Chọn user --</option>
                        {Object.values(usersMap).map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.username ?? u.email}
                            </option>
                        ))}
                    </select>
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

                {/* CONTENT */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                        <DocumentTextIcon className="h-4 w-4 text-white/40" />
                        Content
                    </label>

                    <textarea
                        rows={3}
                        className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                        value={form.content ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                content: e.target.value,
                            })
                        }
                    /> 
                </div>
            </div>
        </BaseFormModal>
    );
}
