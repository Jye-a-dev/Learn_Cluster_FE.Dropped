"use client";

import BaseConfirmModal from "../AdminManage/BaseModel/BaseConfirmModal";
import type { Assignment } from "./AssignmentUiTypes";

export default function ConfirmDeleteAssignmentModal({
	open,
	assignment,
	onClose,
	onConfirm,
}: {
	open: boolean;
	assignment: Assignment | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!assignment) return null;

	return (
		<BaseConfirmModal
			open={open}
			title="Xóa Assignment"
			danger
			onClose={onClose}
			onConfirm={() => onConfirm(assignment.id)}
			description={
				<>
					Bạn có chắc muốn xóa{" "}
					<span className="font-semibold">{assignment.title}</span>?
				</>
			}
		/>
	);
}
