"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Chapter } from "./ChapterUiTypes";

type Props = {
	chapter: Chapter;
	onEdit: (chapter: Chapter) => void;
	onDelete: (chapter: Chapter) => void;
};

export default function ChapterActions({
	chapter,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(chapter) },
				{ label: "Xoá", onClick: () => onDelete(chapter), danger: true },
			]}
		/>
	);
}
