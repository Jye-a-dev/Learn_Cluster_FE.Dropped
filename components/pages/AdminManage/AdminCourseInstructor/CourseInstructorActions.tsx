"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { CourseInstructor } from "./CourseInstructorUiTypes";

type Props = {
	instructor: CourseInstructor;
	onEdit: (i: CourseInstructor) => void;
	onDelete: (i: CourseInstructor) => void;
};

export default function CourseInstructorActions({
	instructor,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(instructor) },
				{
					label: "Xóa",
					onClick: () => onDelete(instructor),
					danger: true,
				},
			]}
		/>
	);
}
