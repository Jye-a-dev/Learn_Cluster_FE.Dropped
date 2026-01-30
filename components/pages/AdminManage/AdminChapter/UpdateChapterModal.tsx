"use client";

import { useEffect, useState } from "react";
import { BookOpenIcon, ListBulletIcon } from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Chapter, UpdateChapterPayload } from "./ChapterUiTypes";

type Props = {
    open: boolean;
    chapter: Chapter | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateChapterPayload) => Promise<void>;
};

export default function UpdateChapterModal({
    open,
    chapter,
    onClose,
    onSubmit,
}: Props) {
    const [form, setForm] = useState<UpdateChapterPayload>({
        course_id: "",
        title: "",
        description: "",
        order: undefined,
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && chapter) {
            setForm({
                course_id: chapter.course_id,
                title: chapter.title,
                description: chapter.description ?? "",
                order: chapter.order ?? undefined,
            });
        }
    }, [open, chapter]);

    if (!open || !chapter) return null;
    const chapterId = chapter.id;

    async function handleSubmit() {
        try {
            setSubmitting(true);
            await onSubmit(chapterId, {
                ...form,
                description: form.description || undefined,
            });
            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Chapter"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            {/* Course ID */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="text-xs font-medium text-white/70">
                    Course ID
                </label>
                <input
                    className="input-admin text-white border border-white rounded-md"
                    value={form.course_id}
                    onChange={(e) =>
                        setForm({ ...form, course_id: e.target.value })
                    }
                />
            </div>

            {/* Title */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <BookOpenIcon className="h-4 w-4 text-white/40" />
                    Title
                </label>
                <input
                    className="input-admin text-white border border-white rounded-md"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />
            </div>

            {/* Description */}
            <div className="grid grid-cols-[140px_1fr] items-start gap-3">
                <label className="pt-2 text-xs font-medium text-white/70">
                    Description
                </label>
                <textarea
                    rows={3}
                    className="input-admin text-white border border-white rounded-md"
                    value={form.description ?? ""}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </div>

            {/* Order */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <ListBulletIcon className="h-4 w-4 text-white/40" />
                    Order
                </label>
                <input
                    type="number"
                    className="input-admin text-white border border-white rounded-md"
                    value={form.order ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            order: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                        })
                    }
                />
            </div>
        </BaseFormModal>
    );
}
