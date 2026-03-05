"use client";

import { useEffect, useState } from "react";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Payment } from "./PaymentUIType";

import { useOrdersMap } from "@/hooks/orders/useOrdersMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type FormState = {
	order_id: string;
	provider: string;
	transaction_code: string;
	amount: string;
	paid_at: string;
	status: Payment["status"];
};

export type UpdatePaymentPayload = {
	order_id?: string;
	provider?: string | null;
	transaction_code?: string | null;
	amount?: number | null;
	status?: Payment["status"];
	paid_at?: string | null;
};

type Props = {
	open: boolean;
	payment: Payment | null;
	onClose: () => void;
	onSubmit: (
		id: string,
		data: UpdatePaymentPayload
	) => Promise<void>;
};

function toMysqlDatetime(date: string | null) {
	if (!date) return null;

	const d = new Date(date);
	const pad = (n: number) => String(n).padStart(2, "0");

	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
		d.getDate()
	)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
		d.getSeconds()
	)}`;
}

export default function UpdatePaymentModal({
	open,
	payment,
	onClose,
	onSubmit,
}: Props) {
	const { ordersMap, loading: loadingOrders } =
		useOrdersMap();

	const { usersMap } = useUsersMap();

	const [form, setForm] = useState<FormState>({
		order_id: "",
		provider: "",
		transaction_code: "",
		amount: "",
		paid_at: "",
		status: "pending",
	});

	const [submitting, setSubmitting] = useState(false);

	/* ================= INIT ================= */

	useEffect(() => {
		if (!open || !payment) return;

		setForm({
			order_id: payment.order_id ?? "",
			provider: payment.provider ?? "",
			transaction_code:
				payment.transaction_code ?? "",
			amount: payment.amount?.toString() ?? "",
			paid_at: payment.paid_at
				? payment.paid_at
						.slice(0, 16)
						.replace(" ", "T")
				: "",
			status: payment.status,
		});
	}, [open, payment]);

	if (!open || !payment) return null;

	const isInvalid =
		!form.order_id ||
		(form.amount !== "" && Number(form.amount) < 0);

	const receipt =
		payment.raw_response &&
		typeof payment.raw_response === "object"
			? payment.raw_response
			: null;

	/* ================= SUBMIT ================= */

	async function handleSubmit() {
		if (!payment || isInvalid) return;

		try {
			setSubmitting(true);

			const payload: UpdatePaymentPayload = {};

			if (form.order_id !== payment.order_id)
				payload.order_id = form.order_id;

			if (form.provider !== payment.provider)
				payload.provider = form.provider || null;

			if (
				form.transaction_code !==
				payment.transaction_code
			)
				payload.transaction_code =
					form.transaction_code || null;

			if (Number(form.amount) !== payment.amount)
				payload.amount = form.amount
					? Number(form.amount)
					: null;

			if (form.status !== payment.status)
				payload.status = form.status;

			const paid = toMysqlDatetime(form.paid_at);

			if (paid !== payment.paid_at)
				payload.paid_at = paid;

			if (Object.keys(payload).length === 0) {
				onClose();
				return;
			}

			await onSubmit(payment.id, payload);

			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	const inputStyle =
		"w-full rounded-md bg-zinc-900 text-white border border-white/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Payment"
			submitting={submitting}
			isInvalid={isInvalid}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Order */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-white">
					Order
				</label>

				<select
					value={form.order_id}
					onChange={(e) =>
						setForm({
							...form,
							order_id: e.target.value,
						})
					}
					className={inputStyle}
				>
					<option value="">
						{loadingOrders
							? "Loading..."
							: "-- Chọn Order --"}
					</option>

					{Object.values(ordersMap).map((o) => {
						const user = usersMap[o.user_id];

						const userName =
							user?.username ??
							"Unknown User";

						return (
							<option
								key={o.id}
								value={o.id}
							>
								{userName} –{" "}
								{o.id.slice(0, 8)}...
							</option>
						);
					})}
				</select>
			</div>

			{/* Provider */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-white">
					Provider
				</label>

				<input
					value={form.provider}
					onChange={(e) =>
						setForm({
							...form,
							provider: e.target.value,
						})
					}
					className={inputStyle}
				/>
			</div>

			{/* Transaction */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-white">
					Transaction
				</label>

				<input
					value={form.transaction_code}
					onChange={(e) =>
						setForm({
							...form,
							transaction_code:
								e.target.value,
						})
					}
					className={inputStyle}
				/>
			</div>

			{/* Amount */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-white">
					Amount
				</label>

				<input
					type="number"
					min={0}
					step="1000"
					value={form.amount}
					onChange={(e) =>
						setForm({
							...form,
							amount: e.target.value,
						})
					}
					className={inputStyle}
				/>
			</div>

			{/* Paid At */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-white">
					Paid At
				</label>

				<input
					type="datetime-local"
					value={form.paid_at}
					onChange={(e) =>
						setForm({
							...form,
							paid_at: e.target.value,
						})
					}
					className={inputStyle}
				/>
			</div>

			{/* Status */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-white">
					Status
				</label>

				<select
					value={form.status}
					onChange={(e) =>
						setForm({
							...form,
							status:
								e.target
									.value as Payment["status"],
						})
					}
					className={inputStyle}
				>
					<option value="pending">
						Pending
					</option>
					<option value="success">
						Success
					</option>
					<option value="failed">
						Failed
					</option>
				</select>
			</div>

			{/* Receipt JSON */}
			{receipt && (
				<div className="space-y-2">
					<span className="text-xs text-white/60">
						Biên lai (JSON)
					</span>

					<pre className="w-full text-[11px] max-h-40 overflow-y-auto bg-zinc-900/60 border border-white/10 p-4 rounded-xl text-white/60">
						{JSON.stringify(
							receipt,
							null,
							2
						)}
					</pre>
				</div>
			)}
		</BaseFormModal>
	);
}