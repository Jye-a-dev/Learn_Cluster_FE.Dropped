"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { CourseInstructor } from "./CourseInstructorUiTypes";

type Props = {
	open: boolean;
	instructor: CourseInstructor | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteCourseInstructorModal({
	open,
	instructor,
	onClose,
	onConfirm,
}: Props) {
	if (!instructor) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa Instructor"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa instructor
					<br />
					<span className="font-semibold text-white">
						{instructor.user_id}
					</span>
					?
				</>
			}
			onConfirm={() => onConfirm(instructor.id)}
		/>
	);
}
