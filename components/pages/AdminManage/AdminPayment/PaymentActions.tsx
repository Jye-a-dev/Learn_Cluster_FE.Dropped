"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Payment } from "./PaymentUIType";

export default function PaymentActions({
	payment,
	onEdit,
	onDelete,
}: {
	payment: Payment;
	onEdit: (p: Payment) => void;
	onDelete: (p: Payment) => void;
}) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(payment) },
				{ label: "Xoá", onClick: () => onDelete(payment), danger: true },
			]}
		/>
	);
}