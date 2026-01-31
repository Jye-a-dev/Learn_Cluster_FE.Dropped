"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Lesson, LessonContentType } from "./LessonUiTypes";

type Props = {
    lessons: Lesson[];
    onEdit: (lesson: Lesson) => void;
    onDelete: (lesson: Lesson) => void;
};

const CONTENT_TYPE_LABEL: Record<LessonContentType, string> = {
    video: "🎬 Video",
    pdf: "📄 PDF",
    text: "📝 Văn bản",
};

export default function LessonTable({ lessons, onEdit, onDelete }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] shadow-lg">
            <table className="w-full text-sm text-slate-100">
                {/* ===== HEADER ===== */}
                <thead className="bg-slate-900 text-xs uppercase tracking-wide text-slate-300">
                    <tr>
                        <th className="px-4 py-3 text-left">Tiêu đề</th>
                        <th className="px-4 py-3 text-left">Loại</th>
                        <th className="px-4 py-3 text-left">Nội dung</th>
                        <th className="px-4 py-3 text-center">Thứ tự</th>
                        <th className="px-4 py-3 text-right">Hành động</th>
                    </tr>
                </thead>

                {/* ===== BODY ===== */}
                <tbody className="divide-y divide-white/5">
                    {lessons.map((lesson, idx) => (
                        <tr
                            key={lesson.id}
                            className={`
                                transition-colors
                                ${idx % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}
                                hover:bg-indigo-500/10
                            `}
                        >
                            {/* TITLE */}
                            <td className="px-4 py-3 font-medium">
                                {lesson.title}
                            </td>

                            {/* CONTENT TYPE */}
                            <td className="px-4 py-3 text-slate-300">
                                {CONTENT_TYPE_LABEL[lesson.content_type]}
                            </td>

                            {/* CONTENT */}
                            <td className="px-4 py-3">
                                {renderContentCell(lesson)}
                            </td>

                            {/* ORDER */}
                            <td className="px-4 py-3 text-center font-mono text-slate-300">
                                {lesson.ordering}
                            </td>

                            {/* ACTIONS */}
                            <td className="px-4 py-3 text-right">
                                <div className="inline-flex gap-2">
                                    <button
                                        onClick={() => onEdit(lesson)}
                                        className="rounded-md p-1 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
                                        aria-label="Edit lesson"
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </button>

                                    <button
                                        onClick={() => onDelete(lesson)}
                                        className="rounded-md p-1 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                                        aria-label="Delete lesson"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {/* ===== EMPTY STATE ===== */}
                    {lessons.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-4 py-10 text-center text-slate-400"
                            >
                                Chưa có bài học
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

/* =========================
   Helpers
========================= */

function renderContentCell(lesson: Lesson) {
    if (!lesson.content_url && lesson.content_type !== "text") {
        return <span className="text-slate-500">—</span>;
    }

    switch (lesson.content_type) {
        case "video":
            return (
                <a
                    href={lesson.content_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-400 hover:underline"
                >
                    Xem video
                </a>
            );

        case "pdf":
            return (
                <a
                    href={lesson.content_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-400 hover:underline"
                >
                    Mở PDF
                </a>
            );

        case "text":
            return (
                <span className="italic text-slate-400">
                    Nội dung văn bản
                </span>
            );

        default:
            return <span className="text-slate-500">—</span>;
    }
}
