"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Enrollment } from "./EnrollmentUiTypes";

export default function EnrollmentActions({
	enrollment,
	onEdit,
	onDelete,
}: {
	enrollment: Enrollment;
	onEdit: (e: Enrollment) => void;
	onDelete: (e: Enrollment) => void;
}) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(enrollment) },
				{
					label: "Xoá",
					onClick: () => onDelete(enrollment),
					danger: true,
				},
			]}
		/>
	);
}
