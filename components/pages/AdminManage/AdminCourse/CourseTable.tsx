"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import CourseActions from "./CourseActions";
import type { Course } from "./CourseUiTypes";

type Props = {
	courses: Course[];
	onEdit: (course: Course) => void;
	onDelete: (course: Course) => void;
};

export default function CourseTable({ courses, onEdit, onDelete }: Props) {
	const columns: BaseColumn<Course>[] = [
		{
			key: "id",
			header: "ID",
			className: "px-3 py-2 text-left text-xs text-white/60",
			render: (c) => c.id,
		},
		{
			key: "title",
			header: "Title",
			className: "px-3 py-2 font-medium",
			render: (c) => c.title,
		},
		{
			key: "description",
			header: "Description",
			className: "px-3 py-2 text-white/70 max-w-xs truncate",
			render: (c) => c.description ?? "—",
		},
		{
			key: "objective",
			header: "Objective",
			className: "px-3 py-2 text-white/70 max-w-xs truncate",
			render: (c) => c.objective ?? "—",
		},
		{
			key: "hours",
			header: "Hours",
			className: "px-3 py-2 text-center",
			render: (c) => c.duration_hours ?? "—",
		},
		{
			key: "status",
			header: "Status",
			className: "px-3 py-2 text-white/60",
			render: (c) => c.status,
		},
		{
			key: "created",
			header: "Created",
			className: "px-3 py-2 text-xs text-white/50 text-center",
			render: (c) => new Date(c.created_at).toLocaleString(),
		},
		{
			key: "updated",
			header: "Updated",
			className: "px-3 py-2 text-xs text-white/50 text-center",
			render: (c) => new Date(c.updated_at).toLocaleString(),
		},
		{
			key: "actions",
			header: "Actions",
			className: "px-3 py-2 text-right",
			render: (c) => (
				<CourseActions
					course={c}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={courses}
			columns={columns}
			emptyText="Không có course"
			tableClassName="w-full text-sm text-white"
			headClassName="bg-black/5"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5 align-top"
			}
		/>
	);
}
