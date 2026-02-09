// src/components/pages/AdminManage/StudyDateParticipant/StudyDateParticipantActions.tsx
"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { StudyDateParticipant } from "./StudyDateParticipantUiTypes";

type Props = {
	participant: StudyDateParticipant;
	onDelete: (participant: StudyDateParticipant) => void;
};

export default function StudyDateParticipantActions({
	participant,
	onDelete,
}: Props) {
	return (
		<BaseAction
			items={[
				{
					label: "Xoá",
					onClick: () => onDelete(participant),
					danger: true,
				},
			]}
		/>
	);
}
