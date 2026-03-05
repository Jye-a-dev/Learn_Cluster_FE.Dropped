"use client";

import BaseTable, {
	BaseColumn,
} from "../BaseModel/BaseTable";
import PlanActions from "./PlanActions";
import type { Plan } from "./PlanUiTypes";

type Props = {
	plans: Plan[];
	onEdit: (plan: Plan) => void;
	onDelete: (plan: Plan) => void;
};

export default function PlanTable({
	plans,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<Plan>[] = [
		{
			key: "name",
			header: "Plan",
			className: "px-3 py-2 font-medium",
			render: (p) => (
				<div className="flex flex-col">
					<span className="text-white">
						{p.name}
					</span>
					<span className="text-xs text-white/40 truncate max-w-xs">
						{p.description ?? "Không có mô tả"}
					</span>
				</div>
			),
		},
		{
			key: "price",
			header: "Price",
			className: "px-3 py-2 text-right font-semibold",
			render: (p) =>
				Number(p.price).toLocaleString("vi-VN") +
				" ₫",
		},
		{
			key: "duration",
			header: "Duration",
			className: "px-3 py-2 text-center",
			render: (p) =>
				p.duration_days === null ? (
					<span className="text-emerald-400 font-medium">
						Vĩnh viễn
					</span>
				) : (
					`${p.duration_days} ngày`
				),
		},
		{
			key: "status",
			header: "Status",
			className: "px-3 py-2 text-center",
			render: (p) =>
				p.is_active ? (
					<span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
						Active
					</span>
				) : (
					<span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
						Inactive
					</span>
				),
		},
		{
			key: "created",
			header: "Created",
			className: "px-3 py-2 text-xs text-white/50 text-center",
			render: (p) =>
				p.created_at
					? new Date(
							p.created_at
					  ).toLocaleDateString("vi-VN")
					: "—",
		},
		{
			key: "actions",
			header: "",
			className: "px-3 py-2 text-right",
			render: (p) => (
				<PlanActions
					plan={p}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={plans}
			columns={columns}
			emptyText="Không có plan"
			tableClassName="w-full text-sm text-white"
			headClassName="bg-white/5"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5 align-middle"
			}
		/>
	);
}