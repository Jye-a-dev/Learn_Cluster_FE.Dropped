"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Submission } from "./SubmissionUiTypes";

type Props = {
	submission: Submission;
	onEdit: (submission: Submission) => void;
	onDelete: (submission: Submission) => void;
};

export default function SubmissionActions({
	submission,
	onEdit,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Sửa",
					onClick: () => onEdit(submission),
				},
				{
					label: "Xoá",
					onClick: () => onDelete(submission),
					danger: true,
				},
			]}
		/>
	);
}
