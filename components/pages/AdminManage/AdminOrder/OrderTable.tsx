"use client";

import BaseTable, {
	BaseColumn,
} from "../BaseModel/BaseTable";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import type { Order } from "./OrderUiTypes";
import { OrderActions } from "./OrderActions";

type Props = {
	orders: Order[];
	onEdit: (order: Order) => void;
	onDelete: (order: Order) => void;
};

export default function OrderTable({
	orders,
	onEdit,
	onDelete,
}: Props) {
	const { usersMap, loading } = useUsersMap();

	const columns: BaseColumn<Order>[] = [
		{
			key: "id",
			header: "Order ID",
			className: "px-3 py-2 text-xs text-white/50",
			render: (o) => (
				<span className="truncate max-w-40 block">
					{o.id}
				</span>
			),
		},
		{
			key: "user",
			header: "User",
			className: "px-3 py-2",
			render: (o) => {
				const user = usersMap[o.user_id];

				if (loading)
					return (
						<span className="text-white/40 text-xs">
							Loading...
						</span>
					);

				if (!user)
					return (
						<span className="text-red-400 text-xs">
							Unknown user
						</span>
					);

				return (
					<div className="flex flex-col">
						<span className="text-white text-sm">
							{user.name ??
								user.username ??
								"User"}
						</span>
						<span className="text-xs text-white/40">
							{user.email}
						</span>
					</div>
				);
			},
		},
		{
			key: "amount",
			header: "Total Amount",
			className:
				"px-3 py-2 text-right font-semibold",
			render: (o) =>
				Number(o.total_amount).toLocaleString(
					"vi-VN"
				) + " ₫",
		},
		{
			key: "status",
			header: "Status",
			className: "px-3 py-2 text-center",
			render: (o) => {
				const map = {
					pending:
						"bg-yellow-500/20 text-yellow-400",
					paid:
						"bg-emerald-500/20 text-emerald-400",
					failed:
						"bg-red-500/20 text-red-400",
					cancelled:
						"bg-gray-500/20 text-gray-400",
				};

				return (
					<span
						className={`px-2 py-1 rounded-full text-xs capitalize ${map[o.status]}`}
					>
						{o.status}
					</span>
				);
			},
		},
		{
			key: "created",
			header: "Created",
			className:
				"px-3 py-2 text-xs text-white/50 text-center",
			render: (o) =>
				o.created_at
					? new Date(
							o.created_at
					  ).toLocaleString("vi-VN")
					: "—",
		},
		{
			key: "actions",
			header: "",
			className: "px-3 py-2 text-right",
			render: (o) => (
				<OrderActions
					order={o}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={orders}
			columns={columns}
			emptyText="Không có order"
			tableClassName="w-full text-sm text-white"
			headClassName="bg-white/5"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5 align-middle"
			}
		/>
	);
}