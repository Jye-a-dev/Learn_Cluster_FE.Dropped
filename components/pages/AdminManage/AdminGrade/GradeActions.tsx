"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Grade } from "./GradeUITypes";

export default function GradeActions({
	grade,
	onEdit,
	onDelete,
}: {
	grade: Grade;
	onEdit: (g: Grade) => void;
	onDelete: (g: Grade) => void;
}) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(grade) },
				{
					label: "Xoá",
					onClick: () => onDelete(grade),
					danger: true,
				},
			]}
		/>
	);
}
