"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Course } from "./CourseUiTypes";

type Props = {
	course: Course;
	onEdit: (course: Course) => void;
	onDelete: (course: Course) => void;
};

export default function CourseActions({ course, onEdit, onDelete }: Props) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(course) },
				{ label: "Xoá", onClick: () => onDelete(course), danger: true },
			]}
		/>
	);
}
