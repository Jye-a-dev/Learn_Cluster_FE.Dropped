// src/components/pages/AdminManage/AdminStudyDateLesson/ConfirmDeleteStudyDateLessonModal.tsx
"use client";

import type { StudyDateLesson } from "./StudyDateLessonUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
	open: boolean;
	studyDateLesson: StudyDateLesson | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteStudyDateLessonModal({
	open,
	studyDateLesson,
	onClose,
	onConfirm,
}: Props) {
	if (!studyDateLesson) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa lesson khỏi study date"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa lesson này khỏi study date?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() => onConfirm(studyDateLesson.id)}
		/>
	);
}
