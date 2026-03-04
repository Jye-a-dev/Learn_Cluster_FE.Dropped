"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type {
	StudyMatchUI,
} from "./StudyMatchUiTypes";

export default function ConfirmDeleteStudyMatchModal({
	open,
	item,
	onClose,
	onConfirm,
}: {
	open: boolean;
	item: StudyMatchUI | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!item) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa Study Match"
			danger
			confirmText="Xóa"
			description={
				<>
					Xóa match giữa{" "}
					<b>{item.user1_name}</b> và{" "}
					<b>{item.user2_name}</b> ?
				</>
			}
			onConfirm={() =>
				onConfirm(item.id)
			}
		/>
	);
}