"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Lesson } from "./LessonUiTypes";

type Props = {
	open: boolean;
	lesson: Lesson | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteLessonModal({
	open,
	lesson,
	onClose,
	onConfirm,
}: Props) {
	if (!lesson) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa lesson"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa{" "}
					<span className="font-semibold text-white">
						{lesson.title}
					</span>
					?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() => onConfirm(lesson.id)}
		/>
	);
}
