"use client";

import BaseTable, {
	BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";
import StudyDateActions from "./StudyDateActions";
import type { StudyDate } from "./StudyDateUiTypes";

import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
	studyDates: StudyDate[];
	onEdit: (studyDate: StudyDate) => void;
	onDelete: (studyDate: StudyDate) => void;
};

export default function StudyDateTable({
	studyDates,
	onEdit,
	onDelete,
}: Props) {
	const { coursesMap } = useCoursesMap();
	const { usersMap } = useUsersMap();

	const columns: BaseColumn<StudyDate>[] = [
		/* ================= ID ================= */
		{
			key: "id",
			header: "ID",
			className:
				"px-4 py-3 text-left font-mono text-xs text-slate-400",
			render: (s) => s.id,
		},

		/* ================= COURSE ================= */
		{
			key: "course_id",
			header: "Course",
			className: "px-4 py-3 text-left text-slate-300",
			render: (s) => {
				const course = s.course_id
					? coursesMap[s.course_id]
					: null;

				return course ? (
					<span className="font-medium text-slate-100">
						{course.title}
					</span>
				) : (
					<span className="italic text-slate-500">
						No course
					</span>
				);
			},
		},

		/* ================= TITLE ================= */
		{
			key: "title",
			header: "Title",
			className:
				"px-4 py-3 text-left font-semibold text-slate-100",
			render: (s) =>
				s.title ?? (
					<span className="italic text-slate-500">
						No title
					</span>
				),
		},

		/* ================= TIME ================= */
		{
			key: "scheduled_at",
			header: "Scheduled at",
			className: "px-4 py-3 text-left text-slate-300",
			render: (s) =>
				s.scheduled_at ? (
					new Date(s.scheduled_at).toLocaleString()
				) : (
					<span className="italic text-slate-500">
						Not scheduled
					</span>
				),
		},

		/* ================= LOCATION ================= */
		{
			key: "location",
			header: "Location",
			className: "px-4 py-3 text-left text-slate-300",
			render: (s) =>
				s.location ?? (
					<span className="italic text-slate-500">
						No location
					</span>
				),
		},

		/* ================= CREATED BY ================= */
		{
			key: "created_by",
			header: "Created by",
			className: "px-4 py-3 text-left text-slate-300",
			render: (s) => {
				const user = s.created_by
					? usersMap[s.created_by]
					: null;

				return user ? (
					<span className="font-medium text-slate-100">
						{user.username}
					</span>
				) : (
					<span className="italic text-slate-500">
						System
					</span>
				);
			},
		},

		/* ================= ACTIONS ================= */
		{
			key: "actions",
			header: "Actions",
			className: "px-4 py-3 text-right",
			render: (s) => (
				<StudyDateActions
					studyDate={s}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={studyDates}
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
			emptyText="Không có study date nào"
		/>
	);
}
