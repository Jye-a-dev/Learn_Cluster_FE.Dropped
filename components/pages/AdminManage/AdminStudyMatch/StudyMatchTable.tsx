"use client";

import BaseTable, {
	BaseColumn,
} from "../BaseModel/BaseTable";
import {
	TrashIcon,
} from "@heroicons/react/24/outline";

import type {
	StudyMatchUI,
} from "./StudyMatchUiTypes";

type Props = {
	items: StudyMatchUI[];
	onDelete: (p: StudyMatchUI) => void;
};

export default function StudyMatchTable({
	items,
	onDelete,
}: Props) {
	const columns: BaseColumn<StudyMatchUI>[] =
		[
			{
				key: "user1",
				header: "User 1",
				className: "px-4 py-3",
				render: (p) => (
					<div>
						<div className="font-medium text-white">
							{p.user1_name ??
								"Unknown"}
						</div>
						<div className="text-xs text-slate-400">
							{p.user1_id.slice(
								0,
								8
							)}
							...
						</div>
					</div>
				),
			},
			{
				key: "user2",
				header: "User 2",
				className: "px-4 py-3",
				render: (p) => (
					<div>
						<div className="font-medium text-white">
							{p.user2_name ??
								"Unknown"}
						</div>
						<div className="text-xs text-slate-400">
							{p.user2_id.slice(
								0,
								8
							)}
							...
						</div>
					</div>
				),
			},
			{
				key: "matched_at",
				header: "Matched At",
				className: "px-4 py-3 text-sm text-slate-300",
				render: (p) =>
					p.matched_at
						? new Date(
								p.matched_at
						  ).toLocaleString()
						: "—",
			},
			{
				key: "actions",
				header: "",
				className:
					"px-4 py-3 text-right",
				render: (p) => (
					<button
						onClick={() =>
							onDelete(p)
						}
						className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
					>
						<TrashIcon className="h-4 w-4" />
					</button>
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
			emptyText="Không có study match"
		/>
	);
}