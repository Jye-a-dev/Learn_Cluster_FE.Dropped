"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { StudySwipeUI } from "./StudySwipeUiTypes";

type Props = {
	item: StudySwipeUI;
	onEdit: (item: StudySwipeUI) => void;
	onDelete: (item: StudySwipeUI) => void;
};

export default function StudySwipeActions({
	item,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Sửa",
					onClick: () => onEdit(item),
				},
				{
					label: "Xoá",
					onClick: () => onDelete(item),
					danger: true,
				},
			]}
		/>
	);
}