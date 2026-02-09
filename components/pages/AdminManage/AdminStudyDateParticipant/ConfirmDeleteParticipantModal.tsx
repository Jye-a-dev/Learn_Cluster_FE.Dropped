// src/components/pages/AdminManage/AdminStudyDate/ConfirmLeaveStudyDateParticipantModal.tsx
"use client";

import type { StudyDateParticipant } from "./StudyDateParticipantUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
	open: boolean;
	participant: StudyDateParticipant | null;
	onClose: () => void;
	onConfirm: (payload: {
		study_date_id: string;
		user_id: string;
	}) => Promise<void>;
};

export default function ConfirmLeaveStudyDateParticipantModal({
	open,
	participant,
	onClose,
	onConfirm,
}: Props) {
	if (!participant) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa participant"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa participant này khỏi study date?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() =>
				onConfirm({
					study_date_id: participant.study_date_id,
					user_id: participant.user_id,
				})
			}
		/>
	);
}
