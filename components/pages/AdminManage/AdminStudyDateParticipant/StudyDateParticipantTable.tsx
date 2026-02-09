"use client";

import BaseTable, {
	BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";

import type { StudyDateParticipant } from "./StudyDateParticipantUiTypes";
import { useMemo } from "react";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";

type Props = {
	participants: StudyDateParticipant[];
	onDelete: (p: StudyDateParticipant) => void;
};

export default function StudyDateParticipantTable({
	participants,
	onDelete,
}: Props) {
	const { usersMap } = useUsersMap();
	const { studyDatesMap } = useStudyDatesMap();

	const columns = useMemo<BaseColumn<StudyDateParticipant>[]>(() => [
		{
			key: "id",
			header: "ID",
			className:
				"px-4 py-3 text-left font-mono text-xs text-slate-400",
			render: (p) => p.id,
		},
		{
			key: "study_date_id",
			header: "Study Date",
			className: "px-4 py-3 text-left text-slate-300",
			render: (p) => {
				const sd = studyDatesMap[p.study_date_id];
				return sd ? (
					<span className="font-medium text-slate-100">
						{sd.title ?? sd.id}
					</span>
				) : (
					<span className="italic text-slate-500">
						Unknown study date
					</span>
				);
			},
		},
		{
			key: "user_id",
			header: "User",
			className: "px-4 py-3 text-left text-slate-300",
			render: (p) => {
				const user = usersMap[p.user_id];
				return user ? (
					<span className="font-medium text-slate-100">
						{user.username}
					</span>
				) : (
					<span className="italic text-slate-500">
						Unknown user
					</span>
				);
			},
		},
		{
			key: "joined_at",
			header: "Joined at",
			className: "px-4 py-3 text-left text-slate-300",
			render: (p) =>
				p.joined_at
					? new Date(p.joined_at).toLocaleString()
					: <span className="italic text-slate-500">—</span>,
		},
		{
			key: "_actions",
			header: "Actions",
			className: "px-4 py-3 text-right",
			render: (p) => (
				<button
					onClick={() => onDelete(p)}
					className="text-xs font-semibold text-red-400 hover:text-red-300"
				>
					Remove
				</button>
			),
		},
	], [usersMap, studyDatesMap, onDelete]);

	return (
		<BaseTable
			data={participants}
			columns={columns}
			tableClassName="w-full text-sm text-slate-100"
			headClassName="bg-slate-900 text-xs uppercase tracking-wide text-slate-300"
			bodyClassName="divide-y divide-white/5"
			rowClassName={(_, idx) =>
				`
				transition-colors
				${idx % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}
				hover:bg-indigo-500/10
			`
			}
			emptyText="Không có học viên tham gia"
		/>
	);
}
