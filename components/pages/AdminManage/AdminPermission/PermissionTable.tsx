"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import PermissionActions from "./PermissionAction";
import type { Permission } from "./PermissionUiTypes";

type Props = {
	permissions: Permission[];
	onEdit: (permission: Permission) => void;
	onDelete: (permission: Permission) => void;
};

export default function PermissionTable({
	permissions,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<Permission>[] = [
		{
			key: "id",
			header: "ID",
			className: "px-4 py-3 text-left font-mono text-xs text-white/60",
			render: (p) => p.id,
		},
		{
			key: "name",
			header: "Name",
			className: "px-4 py-3 text-left font-medium",
			render: (p) => p.name,
		},
		{
			key: "description",
			header: "Description",
			className: "px-4 py-3 text-left text-white/60",
			render: (p) => p.description ?? "—",
		},
		{
			key: "actions",
			header: "Actions",
			className: "px-4 py-3 text-center",
			render: (p) => (
				<PermissionActions
					permission={p}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={permissions}
			columns={columns}
			wrapperClassName="overflow-x-hidden overflow-y-visible rounded-xl border border-white"
			tableClassName="w-full text-sm text-white"
			headClassName="bg-cyan-800/50"
			rowClassName={() => "border-t border-white/10 hover:bg-white/5"}
			emptyText="Không có permission"
			rowsPerPage={10}
		/>
	);
}
