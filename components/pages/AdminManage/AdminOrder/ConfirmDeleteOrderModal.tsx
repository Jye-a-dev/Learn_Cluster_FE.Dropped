"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Order } from "./OrderUiTypes";

type Props = {
	open: boolean;
	order: Order | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteOrderModal({
	open,
	order,
	onClose,
	onConfirm,
}: Props) {
	if (!order) return null;

	return (
		<BaseConfirmModal
			open={open}
			title="Xác nhận xoá Order"
			description={`Bạn có chắc muốn xoá order ${order.id}?`}
			onClose={onClose}
			onConfirm={() => onConfirm(order.id)}
		/>
	);
}