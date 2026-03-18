"use client";

import { useEffect, useState } from "react";
import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

import {
    LessonBE,
    updateLesson,
} from "@/hooks/lessons/getLesson";

type Props = {
    open: boolean;
    lesson: LessonBE;
    onClose: () => void;
    onUpdated?: () => void;
};

export default function EditLessonModal({
    open,
    lesson,
    onClose,
    onUpdated,
}: Props) {

    const [title, setTitle] = useState("");
    const [contentUrl, setContentUrl] = useState("");
    const [contentText, setContentText] = useState("");
    const [ordering, setOrdering] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!lesson) return;

        setTitle(lesson.title ?? "");
        setContentUrl(lesson.content_url ?? "");
        setContentText(lesson.content_text ?? "");
        setOrdering(lesson.ordering ?? 0);
    }, [lesson]);

    const handleUpdate = async () => {
        try {
            setLoading(true);

            await updateLesson(lesson.id, {
                chapter_id: lesson.chapter_id,
                title,
                content_url: contentUrl,
                content_text: contentText,
                ordering,
            });

            onUpdated?.();
            onClose();

        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseTeacherModal open={open} title="Edit Lesson" onClose={onClose} width="max-w-5xl">
            <div className="flex gap-4">

                {/* Left side: basic info */}
                <div className="flex-1 space-y-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Title"
                    />

                    <input
                        value={contentUrl}
                        onChange={(e) => setContentUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Content URL"
                    />

                    <input
                        type="number"
                        value={ordering}
                        onChange={(e) => setOrdering(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        placeholder="Ordering"
                    />
                </div>

                {/* Right side: content text */}
                <div className="flex-1 flex flex-col">
                    <label className="text-sm text-gray-500 mb-1">Content Text</label>
                    <textarea
                        value={contentText}
                        onChange={(e) => setContentText(e.target.value)}
                        className="
   w-full p-2 border rounded
    resize
     min-h-50
    overflow-hidden
    whitespace-pre-wrap
    no-scrollbar
  "
                        placeholder="Content text"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
                <button onClick={onClose} className="border px-4 py-2 rounded">
                    Cancel
                </button>

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </BaseTeacherModal>
    );
}