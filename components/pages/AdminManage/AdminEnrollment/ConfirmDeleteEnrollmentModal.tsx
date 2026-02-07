"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Enrollment } from "./EnrollmentUiTypes";

export default function ConfirmDeleteEnrollmentModal({
	open,
	enrollment,
	onClose,
	onConfirm,
}: {
	open: boolean;
	enrollment: Enrollment | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!enrollment) return null;

	return (
		<BaseConfirmModal
			open={open}
			title="Xóa Enrollment"
			danger
			onClose={onClose}
			onConfirm={() => onConfirm(enrollment.id)}
			description="Bạn có chắc muốn xoá enrollment này?"
		/>
	);
}
