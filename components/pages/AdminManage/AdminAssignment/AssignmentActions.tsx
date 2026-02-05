"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Assignment } from "./AssignmentUiTypes";

export default function AssignmentActions({
	assignment,
	onEdit,
	onDelete,
}: {
	assignment: Assignment;
	onEdit: (a: Assignment) => void;
	onDelete: (a: Assignment) => void;
}) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(assignment) },
				{
					label: "Xoá",
					onClick: () => onDelete(assignment),
					danger: true,
				},
			]}
		/>
	);
}
