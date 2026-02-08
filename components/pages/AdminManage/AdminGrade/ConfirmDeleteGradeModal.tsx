"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Grade } from "./GradeUITypes";

export default function ConfirmDeleteGradeModal({
	open,
	grade,
	onClose,
	onConfirm,
}: {
	open: boolean;
	grade: Grade | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!grade) return null;

	return (
		<BaseConfirmModal
			open={open}
			title="Xóa Grade"
			danger
			onClose={onClose}
			onConfirm={() => onConfirm(grade.id)}
			description="Bạn có chắc muốn xoá grade này?"
		/>
	);
}
