"use client";

import BaseTable, {
	BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";
import NoteActions from "./NoteActions";
import type { Note } from "./NoteUiTypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
	notes: Note[];
	onEdit: (note: Note) => void;
	onDelete: (note: Note) => void;
};

export default function NoteTable({
	notes,
	onEdit,
	onDelete,
}: Props) {
	const { usersMap, loading: loadingUsers } =
		useUsersMap();
	const {
		lessonsMap,
		loading: loadingLessons,
	} = useLessonsMap();

	const columns: BaseColumn<Note>[] = [
		{
			key: "id",
			header: "ID",
			className:
				"px-4 py-3 text-left font-mono text-xs text-white/60",
			render: (n) => n.id,
		},

		/* ================= USER ================= */

		{
			key: "user",
			header: "User",
			className:
				"px-4 py-3 text-left text-white/80",
			render: (n) => {
				if (loadingUsers) return "Loading…";

				const user = usersMap[n.user_id];
				return user?.username ?? (
					<span className="text-white/50">
						—
					</span>
				);
			},
		},

		/* ================= LESSON ================= */

		{
			key: "lesson",
			header: "Lesson",
			className:
				"px-4 py-3 text-left text-white/80",
			render: (n) => {
				if (loadingLessons) return "Loading…";

				const lesson =
					lessonsMap[n.lesson_id];

				return lesson?.title ?? (
					<span className="text-white/50">
						—
					</span>
				);
			},
		},

		/* ================= CONTENT ================= */

		{
			key: "content",
			header: "Content",
			className:
				"px-4 py-3 text-left text-white/80 max-w-[300px] truncate",
			render: (n) => n.content ?? "—",
		},

		/* ================= CREATED ================= */

		{
			key: "created_at",
			header: "Created At",
			className:
				"px-4 py-3 text-left text-white/60 text-xs",
			render: (n) =>
				new Date(
					n.created_at
				).toLocaleString("vi-VN", {
					dateStyle: "medium",
					timeStyle: "short",
				}),
		},

		/* ================= ACTIONS ================= */

		{
			key: "actions",
			header: "Actions",
			className:
				"px-4 py-3 text-center",
			render: (n) => (
				<NoteActions
					note={n}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={notes}
			columns={columns}
			  wrapperClassName="rounded-xl border border-white/30"
			tableClassName="w-full text-sm text-white"
			headClassName="bg-cyan-800/50"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5"
			}
			emptyText="Không có note"
			rowsPerPage={10}
		/>
	);
}
