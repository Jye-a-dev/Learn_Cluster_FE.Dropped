"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
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
	const columns: BaseColumn<Lesson>[] = [
		{
			key: "title",
			header: "Tiêu đề",
			className: "px-4 py-3 text-left",
			render: (l) => l.title,
		},
		{
			key: "chapterId",
			header: "Chapter",
			className: "px-4 py-3 text-left text-slate-400 text-xs",
			render: (l) => l.chapter_id,
		},
		{
			key: "chapterName",
			header: "Chương",
			className: "px-4 py-3 text-left text-slate-400 text-xs",
			render: (l) => l.chapter_name,
		},
		{
			key: "type",
			header: "Loại",
			className: "px-4 py-3 text-left text-slate-300",
			render: (l) => CONTENT_TYPE_LABEL[l.content_type],
		},
		{
			key: "content",
			header: "Nội dung",
			className: "px-4 py-3 align-top",
			render: (l) => renderContentCell(l),
		},
		{
			key: "ordering",
			header: "Thứ tự",
			className: "px-4 py-3 text-center text-slate-300",
			render: (l) => l.ordering,
		},
		{
			key: "actions",
			header: "Hành động",
			className: "px-4 py-3 text-right",
			render: (l) => (
				<div className="inline-flex gap-2">
					<button
						onClick={() => onEdit(l)}
						className="rounded-md p-1 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
						aria-label="Edit lesson"
					>
						<PencilSquareIcon className="h-5 w-5" />
					</button>

					<button
						onClick={() => onDelete(l)}
						className="rounded-md p-1 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
						aria-label="Delete lesson"
					>
						<TrashIcon className="h-5 w-5" />
					</button>
				</div>
			),
		},
	];

	return (
		<BaseTable
			data={lessons}
			columns={columns}
			emptyText="Chưa có bài học"
			headClassName="bg-cyan-900/50 text-xs uppercase tracking-wide text-slate-300"
			bodyClassName="divide-y divide-white/5"
			tableClassName="w-full text-sm text-slate-100"
			rowClassName={(_, idx) =>
				`
				transition-colors
				${idx % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}
				hover:bg-indigo-500/10
			`
			}
		/>
	);
}

/* =========================
   Helpers (GIỮ NGUYÊN)
========================= */

function renderContentCell(lesson: Lesson) {
	if (lesson.content_type === "text") {
		if (!lesson.content_text) {
			return <span className="text-slate-500">—</span>;
		}

		return (
			<div
				className="max-w-105 whitespace-pre-wrap text-sm leading-relaxed text-slate-300 line-clamp-3"
				title={lesson.content_text}
			>
				{lesson.content_text}
			</div>
		);
	}

	if (!lesson.content_url) {
		return <span className="text-slate-500">—</span>;
	}

	switch (lesson.content_type) {
		case "video":
			return (
				<a
					href={lesson.content_url}
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
					href={lesson.content_url}
					target="_blank"
					rel="noopener noreferrer"
					className="font-medium text-indigo-400 hover:underline"
				>
					Mở PDF
				</a>
			);

		default:
			return <span className="text-slate-500">—</span>;
	}
}
