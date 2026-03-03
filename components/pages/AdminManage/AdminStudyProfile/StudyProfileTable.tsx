"use client";

import BaseTable, { BaseColumn } from "../BaseModel/BaseTable";
import {
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import type { StudyProfileUI } from "./StudyProfileUiTypes";

type Props = {
	profiles: StudyProfileUI[];
	onEdit: (p: StudyProfileUI) => void;
	onDelete: (p: StudyProfileUI) => void;
};

function formatAvailableTime(
	availableTime: Record<string, string[]> | null
) {
	if (!availableTime || Object.keys(availableTime).length === 0)
		return "—";

	return (
		<div className="space-y-1 text-xs">
			{Object.entries(availableTime).map(
				([day, slots]) => (
					<div key={day}>
						<span className="font-semibold capitalize text-slate-300">
							{day}:
						</span>{" "}
						<span className="text-slate-400">
							{slots.join(", ")}
						</span>
					</div>
				)
			)}
		</div>
	);
}

function LevelBadge({ level }: { level: string | null }) {
	if (!level)
		return (
			<span className="text-slate-400 text-xs">—</span>
		);

	const colorMap: Record<string, string> = {
		Beginner: "bg-emerald-500/20 text-emerald-400",
		Intermediate: "bg-amber-500/20 text-amber-400",
		Advanced: "bg-rose-500/20 text-rose-400",
	};

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-medium ${
				colorMap[level] ??
				"bg-indigo-500/20 text-indigo-400"
			}`}
		>
			{level}
		</span>
	);
}

function StatusBadge({ active }: { active: boolean }) {
	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-medium ${
				active
					? "bg-emerald-500/20 text-emerald-400"
					: "bg-rose-500/20 text-rose-400"
			}`}
		>
			{active ? "Active" : "Inactive"}
		</span>
	);
}

export default function StudyProfileTable({
	profiles,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<StudyProfileUI>[] = [
		{
			key: "user",
			header: "User",
			className: "px-4 py-3",
			render: (p) => (
				<div>
					<div className="font-medium text-white">
						{p.user_name ?? "Unknown"}
					</div>
					<div className="text-xs text-slate-400">
						{p.user_id.slice(0, 8)}...
					</div>
				</div>
			),
		},
		{
			key: "subject",
			header: "Subject",
			className: "px-4 py-3",
			render: (p) => p.preferred_subject ?? "—",
		},
		{
			key: "level",
			header: "Level",
			className: "px-4 py-3",
			render: (p) => <LevelBadge level={p.level} />,
		},
		{
			key: "goal",
			header: "Learning Goal",
			className: "px-4 py-3 max-w-xs truncate",
			render: (p) => p.learning_goal ?? "—",
		},
		{
			key: "available",
			header: "Available Time",
			className: "px-4 py-3 min-w-[220px]",
			render: (p) =>
				formatAvailableTime(p.available_time),
		},
		{
			key: "status",
			header: "Status",
			className: "px-4 py-3",
			render: (p) => (
				<StatusBadge active={p.is_active} />
			),
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
			data={profiles}
			columns={columns}
			tableClassName="w-full text-sm text-slate-200"
			headClassName="bg-slate-800 text-xs uppercase tracking-wide text-slate-400"
			bodyClassName="divide-y divide-slate-700"
			rowClassName={() =>
				"hover:bg-slate-800/60 transition"
			}
			emptyText="Không có study profile"
		/>
	);
}