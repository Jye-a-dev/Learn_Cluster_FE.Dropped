// src/components/pages/AdminManage/AdminStudyDate/ConfirmDeleteStudyDateModal.tsx
"use client";

import type { StudyDate } from "./StudyDateUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
	open: boolean;
	studyDate: StudyDate | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteStudyDateModal({
	open,
	studyDate,
	onClose,
	onConfirm,
}: Props) {
	if (!studyDate) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa study date"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa{" "}
					<span className="font-semibold text-white">
						{studyDate.title || "buổi học này"}
					</span>
					?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() => onConfirm(studyDate.id)}
		/>
	);
}
