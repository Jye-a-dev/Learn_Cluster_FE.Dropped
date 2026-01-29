"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Course } from "./CourseUiTypes";

type Props = {
	open: boolean;
	course: Course | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteCourseModal({
	open,
	course,
	onClose,
	onConfirm,
}: Props) {
	if (!course) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa course"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa{" "}
					<span className="font-semibold text-white">
						{course.title}
					</span>
					?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() => onConfirm(course.id)}
		/>
	);
}
