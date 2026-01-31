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
		<div className="overflow-x-auto">
			<table className="min-w-full border border-gray-200 rounded-md">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-4 py-2 text-left text-sm font-semibold">
							Tiêu đề
						</th>
						<th className="px-4 py-2 text-left text-sm font-semibold">
							Loại nội dung
						</th>
						<th className="px-4 py-2 text-left text-sm font-semibold">
							Nội dung
						</th>
						<th className="px-4 py-2 text-center text-sm font-semibold">
							Thứ tự
						</th>
						<th className="px-4 py-2 text-center text-sm font-semibold">
							Hành động
						</th>
					</tr>
				</thead>

				<tbody>
					{lessons.length === 0 && (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-6 text-center text-gray-500"
							>
								Chưa có bài học
							</td>
						</tr>
					)}

					{lessons.map((lesson) => (
						<tr key={lesson.id} className="border-t">
							<td className="px-4 py-2">{lesson.title}</td>

							<td className="px-4 py-2">
								{CONTENT_TYPE_LABEL[lesson.content_type]}
							</td>

							<td className="px-4 py-2">
								{renderContentCell(lesson)}
							</td>

							<td className="px-4 py-2 text-center">
								{lesson.ordering}
							</td>

							<td className="px-4 py-2 text-center">
								<div className="flex justify-center gap-2">
									<button
										onClick={() => onEdit(lesson)}
										className="p-1 text-blue-600 hover:text-blue-800"
									>
										<PencilSquareIcon className="h-5 w-5" />
									</button>
									<button
										onClick={() => onDelete(lesson)}
										className="p-1 text-red-600 hover:text-red-800"
									>
										<TrashIcon className="h-5 w-5" />
									</button>
								</div>
							</td>
						</tr>
					))}
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
		return <span className="text-gray-400">—</span>;
	}

	switch (lesson.content_type) {
		case "video":
			return (
				<a
					href={lesson.content_url!}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 underline"
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
					className="text-blue-600 underline"
				>
					Mở PDF
				</a>
			);

		case "text":
			return (
				<span className="italic text-gray-600">
					Nội dung văn bản
				</span>
			);

		default:
			return <span className="text-gray-400">—</span>;
	}
}
