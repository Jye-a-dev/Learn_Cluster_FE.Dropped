"use client";

import BaseTable, { BaseColumn } from "../BaseModel/BaseTable";
import PaymentActions from "./PaymentActions";
import type { Payment } from "./PaymentUIType";
import { useOrdersMap } from "@/hooks/orders/useOrdersMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

function StatusBadge({ status }: { status: Payment["status"] }) {
	const colorMap = {
		success:
			"bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
		failed:
			"bg-rose-500/15 text-rose-400 border border-rose-500/30",
		pending:
			"bg-amber-500/15 text-amber-400 border border-amber-500/30",
	};

	return (
		<span
			className={`text-[11px] px-3 py-1 rounded-full font-medium tracking-wide ${colorMap[status]}`}
		>
			{status.toUpperCase()}
		</span>
	);
}

export default function PaymentTable({
	payments,
	onEdit,
	onDelete,
}: {
	payments: Payment[];
	onEdit: (p: Payment) => void;
	onDelete: (p: Payment) => void;
}) {
	const { ordersMap } = useOrdersMap();
	const { usersMap } = useUsersMap();

	const columns: BaseColumn<Payment>[] = [
		{
			key: "order",
			header: "Order",
			className: "text-center align-middle",
			render: (p) => {
				const order = ordersMap[p.order_id];
				const user = order ? usersMap[order.user_id] : null;

				return (
					<div className="flex flex-col items-center gap-0.5">
						<span className="text-sm font-semibold text-cyan-300">
							{user?.username ?? "Unknown"}
						</span>

						<span className="text-[10px] text-white/40 uppercase tracking-wide">
							Order
						</span>

						<span className="text-[11px] font-mono text-white/70">
							{p.order_id.slice(0, 10)}...
						</span>
					</div>
				);
			},
		},
		{
			key: "amount",
			header: "Amount",
			className: "text-right pr-4",
			render: (p) =>
				p.amount !== null ? (
					<span className="font-semibold text-emerald-400">
						{p.amount.toLocaleString("vi-VN")} ₫
					</span>
				) : (
					<span className="text-white/25">—</span>
				),
		},
		{
			key: "status",
			header: "Status",
			className: "text-center",
			render: (p) => <StatusBadge status={p.status} />,
		},
		{
			key: "receipt",
			header: "Receipt",
			className: "text-center align-middle w-[220px]",
			render: (p) =>
				p.raw_response ? (
					<div className="relative group inline-block w-50 text-left">
						<pre className="text-[10px] leading-snug max-h-20 overflow-y-auto bg-zinc-900/70 border border-white/10 p-3 rounded-lg no-scrollbar text-white/60">
							{JSON.stringify(p.raw_response, null, 2)}
						</pre>

						<button
							onClick={() =>
								navigator.clipboard.writeText(
									JSON.stringify(p.raw_response, null, 2)
								)
							}
							className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition text-[9px] px-2 py-0.5 bg-zinc-700 rounded-md hover:bg-zinc-600"
						>
							Copy
						</button>
					</div>
				) : (
					<span className="text-white/25">—</span>
				),
		},
		{
			key: "actions",
			header: "Actions",
			className: "text-right pr-2",
			render: (p) => (
				<PaymentActions
					payment={p}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={payments}
			columns={columns}
			emptyText="Không có payment"
			tableClassName="w-full text-sm text-white"
		/>
	);
}