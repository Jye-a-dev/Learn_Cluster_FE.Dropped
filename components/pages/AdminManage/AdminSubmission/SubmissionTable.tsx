"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Submission } from "./SubmissionUiTypes";

type Props = {
	submissions: Submission[];
	onEdit: (s: Submission) => void;
	onDelete: (s: Submission) => void;
};

export default function SubmissionTable({
	submissions,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<Submission>[] = [
		{
			key: "assignment",
			header: "Assignment",
			className: "px-4 py-3",
			render: (s) => s.assignment_title,
		},
		{
			key: "student",
			header: "Student",
			className: "px-4 py-3",
			render: (s) => s.student_name,
		},
		{
			key: "text",
			header: "Text",
			className: "px-4 py-3 max-w-96 line-clamp-2",
			render: (s) => s.text_submission ?? "—",
		},
		{
			key: "file",
			header: "File",
			className: "px-4 py-3",
			render: (s) =>
				s.file_url ? (
					<a
						href={s.file_url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-indigo-400 hover:underline"
					>
						Tải file
					</a>
				) : (
					"—"
				),
		},
		{
			key: "actions",
			header: "Hành động",
			className: "px-4 py-3 text-right",
			render: (s) => (
				<>
					<button
						onClick={() => onEdit(s)}
						className="mr-2 text-indigo-400"
					>
						<PencilSquareIcon className="h-5 w-5" />
					</button>
					<button
						onClick={() => onDelete(s)}
						className="text-rose-400"
					>
						<TrashIcon className="h-5 w-5" />
					</button>
				</>
			),
		},
	];

	return (
		<BaseTable
			data={submissions}
			columns={columns}
			tableClassName="w-full text-sm text-white"
			headClassName="bg-cyan-700/70 text-xs uppercase"
			bodyClassName="divide-y divide-white/10"
			rowClassName={() => ""}
			emptyText="Không có submission"
		/>
	);
}
