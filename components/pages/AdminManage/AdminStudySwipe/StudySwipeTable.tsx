"use client";

import BaseTable, { BaseColumn } from "../BaseModel/BaseTable";
import {
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";

import type { StudySwipeUI } from "./StudySwipeUiTypes";

type Props = {
	items: StudySwipeUI[];
	onEdit: (p: StudySwipeUI) => void;
	onDelete: (p: StudySwipeUI) => void;
};

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }: { status: string }) {
	const colorMap: Record<string, string> = {
		pending: "bg-amber-500/20 text-amber-400",
		accepted: "bg-emerald-500/20 text-emerald-400",
		rejected: "bg-rose-500/20 text-rose-400",
	};

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-medium ${
				colorMap[status] ??
				"bg-indigo-500/20 text-indigo-400"
			}`}
		>
			{status}
		</span>
	);
}

/* =========================
   TABLE
========================= */

export default function StudySwipeTable({
	items,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<StudySwipeUI>[] = [
		{
			key: "swiper",
			header: "Swiper",
			className: "px-4 py-3",
			render: (p) => (
				<div>
					<div className="font-medium text-white">
						{p.swiper_name ?? "Unknown"}
					</div>
					<div className="text-xs text-slate-400">
						{p.swiper_id.slice(0, 8)}...
					</div>
				</div>
			),
		},
		{
			key: "target",
			header: "Target",
			className: "px-4 py-3",
			render: (p) => (
				<div>
					<div className="font-medium text-white">
						{p.target_name ?? "Unknown"}
					</div>
					<div className="text-xs text-slate-400">
						{p.target_id.slice(0, 8)}...
					</div>
				</div>
			),
		},
		{
			key: "status",
			header: "Status",
			className: "px-4 py-3",
			render: (p) => (
				<StatusBadge status={p.status} />
			),
		},
		{
			key: "created",
			header: "Created At",
			className: "px-4 py-3 text-slate-300 text-sm",
			render: (p) =>
				p.created_at
					? new Date(p.created_at).toLocaleString()
					: "—",
		},
		{
			key: "actions",
			header: "",
			className: "px-4 py-3 text-right",
			render: (p) => (
				<div className="flex justify-end gap-2">
					<button
						onClick={() => onEdit(p)}
						className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
					>
						<PencilSquareIcon className="h-4 w-4" />
					</button>

					<button
						onClick={() => onDelete(p)}
						className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
					>
						<TrashIcon className="h-4 w-4" />
					</button>
				</div>
			),
		},
	];

	return (
		<BaseTable
			data={items}
			columns={columns}
			tableClassName="w-full text-sm text-slate-200"
			headClassName="bg-slate-800 text-xs uppercase tracking-wide text-slate-400"
			bodyClassName="divide-y divide-slate-700"
			rowClassName={() =>
				"hover:bg-slate-800/60 transition"
			}
			emptyText="Không có study swipe"
		/>
	);
}