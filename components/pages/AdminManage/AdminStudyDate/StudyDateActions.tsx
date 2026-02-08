// src/components/pages/AdminManage/StudyDate/StudyDateActions.tsx
"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { StudyDate } from "./StudyDateUiTypes";

type Props = {
	studyDate: StudyDate;
	onEdit: (studyDate: StudyDate) => void;
	onDelete: (studyDate: StudyDate) => void;
};

export default function StudyDateActions({
	studyDate,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Sửa",
					onClick: () => onEdit(studyDate), // wrap
				},
				{
					label: "Xoá",
					onClick: () => onDelete(studyDate), // wrap
					danger: true,
				},
			]}
		/>
	);
}
