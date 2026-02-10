// src/components/pages/AdminManage/StudyDateLesson/StudyDateLessonTable.tsx
"use client";

import { useMemo } from "react";

import BaseTable, {
	BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";

import StudyDateLessonActions from "./StudyDateLessonActions";

import type { StudyDateLesson } from "./StudyDateLessonUiTypes";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
	lessons: StudyDateLesson[];
	onEdit: (l: StudyDateLesson) => void;
	onDelete: (l: StudyDateLesson) => void;
};

export default function StudyDateLessonTable({
	lessons,
	onEdit,
	onDelete,
}: Props) {
	const { studyDatesMap } = useStudyDatesMap();
	const { lessonsMap } = useLessonsMap();

	const columns = useMemo<BaseColumn<StudyDateLesson>[]>(() => [
		/* ================= ID ================= */
		{
			key: "id",
			header: "ID",
			className:
				"px-4 py-3 text-left font-mono text-xs text-slate-400",
			render: (l) => l.id,
		},

		/* ================= STUDY DATE ================= */
		{
			key: "study_date_id",
			header: "Study Date",
			className: "px-4 py-3 text-left text-slate-300",
			render: (l) => {
				const sd = studyDatesMap[l.study_date_id];
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

		/* ================= LESSON ================= */
		{
			key: "lesson_id",
			header: "Lesson",
			className: "px-4 py-3 text-left text-slate-300",
			render: (l) => {
				const lesson = lessonsMap[l.lesson_id];
				return lesson ? (
					<span className="font-medium text-slate-100">
						{lesson.title ?? lesson.id}
					</span>
				) : (
					<span className="italic text-slate-500">
						Unknown lesson
					</span>
				);
			},
		},
	

		/* ================= ACTIONS ================= */
		{
			key: "actions",
			header: "Actions",
			className: "px-4 py-3 text-right",
			render: (l) => (
				<StudyDateLessonActions
					studyDateLesson={l}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	], [studyDatesMap, lessonsMap, onEdit, onDelete]);

	return (
		<BaseTable
			data={lessons}
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
			emptyText="Không có lesson trong study date"
		/>
	);
}
