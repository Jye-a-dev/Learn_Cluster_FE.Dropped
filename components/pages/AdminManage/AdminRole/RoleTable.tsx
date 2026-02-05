"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import RoleActions from "./RoleAction";
import type { Role } from "./RoleUiTypes";

type Props = {
	roles: Role[];
	onEdit: (role: Role) => void;
	onDelete: (role: Role) => void;
};

export default function RoleTable({
	roles,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<Role>[] = [
		{
			key: "id",
			header: "ID",
			className: "px-4 py-3 text-left font-mono text-xs text-slate-400",
			render: (r) => r.id,
		},
		{
			key: "name",
			header: "Role name",
			className: "px-4 py-3 text-left font-semibold text-slate-100",
			render: (r) => r.name,
		},
		{
			key: "description",
			header: "Description",
			className: "px-4 py-3 text-left text-slate-300",
			render: (r) =>
				r.description ?? (
					<span className="italic text-slate-500">
						No description
					</span>
				),
		},
		{
			key: "actions",
			header: "Actions",
			className: "px-4 py-3 text-right",
			render: (r) => (
				<RoleActions
					role={r}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={roles}
			columns={columns}
			tableClassName="w-full text-sm text-slate-100"
			headClassName="bg-slate-900 text-xs uppercase tracking-wide text-slate-300"
			bodyClassName="divide-y divide-white/5"
			rowClassName={(_, idx) =>
				`
				transition-colors
				${idx % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}
				hover:bg-indigo-500/10
			`
			}
			emptyText="Không có role nào"
		/>
	);
}
