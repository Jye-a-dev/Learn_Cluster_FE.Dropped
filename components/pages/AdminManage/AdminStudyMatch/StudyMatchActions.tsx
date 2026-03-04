"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { StudyMatchUI } from "./StudyMatchUiTypes";

type Props = {
	item: StudyMatchUI;
	onDelete: (item: StudyMatchUI) => void;
};

export default function StudyMatchActions({
	item,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Xoá",
					onClick: () => onDelete(item),
					danger: true,
				},
			]}
		/>
	);
}