// src/components/pages/AdminManage/StudyDateLesson/StudyDateLessonActions.tsx
"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { StudyDateLesson } from "./StudyDateLessonUiTypes";

type Props = {
	studyDateLesson: StudyDateLesson;
	onEdit: (lesson: StudyDateLesson) => void;
	onDelete: (lesson: StudyDateLesson) => void;
};

export default function StudyDateLessonActions({
	studyDateLesson,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Sửa",
					onClick: () => onEdit(studyDateLesson),
				},
				{
					label: "Xoá",
					onClick: () => onDelete(studyDateLesson),
					danger: true,
				},
			]}
		/>
	);
}
