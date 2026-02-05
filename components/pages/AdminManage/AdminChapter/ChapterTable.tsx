"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import ChapterActions from "./ChapterActions";
import type { Chapter } from "./ChapterUiTypes";

type Props = {
	chapters: Chapter[];
	onEdit: (chapter: Chapter) => void;
	onDelete: (chapter: Chapter) => void;
};

export default function ChapterTable({
	chapters,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<Chapter>[] = [
		{
			key: "id",
			header: "ID",
			className: "px-3 py-2 text-left text-xs text-white/60",
			render: (c) => c.id,
		},
		{
			key: "course_id",
			header: "Course ID",
			className: "px-3 py-2 text-left text-xs text-white/60",
			render: (c) => c.course_id,
		},
		{
			key: "title",
			header: "Title",
			className: "px-3 py-2 text-left font-medium",
			render: (c) => c.title,
		},
		{
			key: "ordering",
			header: "Ordering",
			className: "px-3 py-2 text-right font-semibold",
			render: (c) => c.ordering,
		},
		{
			key: "actions",
			header: "Actions",
			className: "px-3 py-2 text-right",
			render: (c) => (
				<ChapterActions
					chapter={c}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={chapters}
			columns={columns}
			emptyText="Không có chapter"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5"
			}
		/>
	);
}
