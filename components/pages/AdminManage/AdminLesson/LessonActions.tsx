"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Lesson } from "./LessonUiTypes";

type Props = {
	lesson: Lesson;
	onEdit: (lesson: Lesson) => void;
	onDelete: (lesson: Lesson) => void;
};

export default function LessonActions({
	lesson,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(lesson) },
				{ label: "Xoá", onClick: () => onDelete(lesson), danger: true },
			]}
		/>
	);
}
