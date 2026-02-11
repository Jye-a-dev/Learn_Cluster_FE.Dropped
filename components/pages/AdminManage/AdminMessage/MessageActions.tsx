"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Message } from "./MessageUiTypes";

export default function MessageActions({
	message,
	onEdit,
	onDelete,
}: {
	message: Message;
	onEdit: (m: Message) => void;
	onDelete: (m: Message) => void;
}) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(message) },
				{
					label: "Xoá",
					onClick: () => onDelete(message),
					danger: true,
				},
			]}
		/>
	);
}
