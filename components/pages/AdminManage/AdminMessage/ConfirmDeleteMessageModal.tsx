"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Message } from "./MessageUiTypes";

export default function ConfirmDeleteMessageModal({
	open,
	message,
	onClose,
	onConfirm,
}: {
	open: boolean;
	message: Message | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
}) {
	if (!message) return null;

	return (
		<BaseConfirmModal
			open={open}
			title="Xóa Message"
			danger
			onClose={onClose}
			onConfirm={() => onConfirm(message.id)}
			description="Bạn có chắc muốn xoá message này?"
		/>
	);
}
