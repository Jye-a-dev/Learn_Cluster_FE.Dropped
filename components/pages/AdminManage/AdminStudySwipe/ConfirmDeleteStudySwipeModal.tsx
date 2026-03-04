"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { StudySwipeUI } from "./StudySwipeUiTypes";

export default function ConfirmDeleteStudySwipeModal({
	open,
	item,
	onClose,
	onConfirm,
}: {
	open: boolean;
	item: StudySwipeUI | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!item) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa Study Swipe"
			danger
			confirmText="Xóa"
			description={
				<>
					Xóa swipe từ{" "}
					<b>{item.swiper_name}</b> →{" "}
					<b>{item.target_name}</b> ?
				</>
			}
			onConfirm={() => onConfirm(item.id)}
		/>
	);
}