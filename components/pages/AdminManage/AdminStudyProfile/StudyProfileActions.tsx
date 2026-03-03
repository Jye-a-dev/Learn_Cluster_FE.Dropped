"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { StudyProfileUI } from "./StudyProfileUiTypes";

type Props = {
	profile: StudyProfileUI;
	onEdit: (profile: StudyProfileUI) => void;
	onDelete: (profile: StudyProfileUI) => void;
};

export default function StudyProfileActions({
	profile,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Sửa",
					onClick: () => onEdit(profile),
				},
				{
					label: "Xoá",
					onClick: () => onDelete(profile),
					danger: true,
				},
			]}
		/>
	);
}