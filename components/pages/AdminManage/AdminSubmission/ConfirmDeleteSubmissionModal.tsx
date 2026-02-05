"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Submission } from "./SubmissionUiTypes";

export default function ConfirmDeleteSubmissionModal({
	open,
	submission,
	onClose,
	onConfirm,
}: {
	open: boolean;
	submission: Submission | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!submission) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa Submission"
			danger
			confirmText="Xóa"
			description={`Xóa bài nộp của ${submission.student_name}?`}
			onConfirm={() => onConfirm(submission.id)}
		/>
	);
}
