"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import AssignmentActions from "./AssignmentActions";
import type { Assignment } from "./AssignmentUiTypes";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

type Props = {
	assignments: Assignment[];
	onEdit: (a: Assignment) => void;
	onDelete: (a: Assignment) => void;
};

export default function AssignmentTable({
	assignments,
	onEdit,
	onDelete,
}: Props) {
	const { coursesMap, loading } = useCoursesMap();

	const columns: BaseColumn<Assignment>[] = [
		{
			key: "title",
			header: "Title",
			className: "p-3 font-medium text-center",
			render: (a) => a.title ?? "—",
		},
		{
			key: "course",
			header: "Course",
			className: "p-3 text-white/80",
			render: (a) =>
				loading
					? "Loading…"
					: coursesMap[a.course_id]?.title ?? "—",
		},
		{
			key: "description",
			header: "Description",
			className: "p-3 text-white/70 max-w-[320px] truncate",
			render: (a) => a.description ?? "—",
		},
		{
			key: "deadline",
			header: "Deadline",
			className: "p-3 text-center",
			render: (a) =>
				a.deadline
					? new Date(a.deadline).toLocaleString("vi-VN", {
						dateStyle: "long",
						timeStyle: "short",
					})
					: "—",
		},
		{
			key: "file",
			header: "File",
			className: "p-3 text-center",
			render: (a) =>
				a.file_url ? (
					<a
						href={a.file_url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 underline "
					>
						Open
					</a>
				) : (
					"—"
				),
		},
		{
			key: "actions",
			header: "",
			className: "p-3 w-30",
			render: (a) => (
				<AssignmentActions
					assignment={a}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={assignments}
			columns={columns}
			wrapperClassName="rounded-xl border border-white/50 overflow-x-auto"
			headClassName="border-b border-white/20"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5"
			}
			emptyText="Không có assignment"
		/>
	);
}
