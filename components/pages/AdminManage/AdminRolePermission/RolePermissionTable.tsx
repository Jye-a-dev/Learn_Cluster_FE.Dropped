// src/components/pages/AdminManage/AdminRolePermission/RolePermissionTable.tsx
"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import RolePermissionActions from "./RolePermissionActions";
import type { RolePermissionUI } from "./RolePermissionUiTypes";

type Props = {
	items: RolePermissionUI[];
	onEdit: (rp: RolePermissionUI) => void;
	onDelete: (rp: RolePermissionUI) => void;
};

export default function RolePermissionTable({
	items,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<RolePermissionUI>[] = [
		{
			key: "id",
			header: "ID",
			className: "p-3 font-mono text-[10px]",
			render: (rp) => rp.id,
		},
		{
			key: "role_id",
			header: "Role ID",
			className: "p-3 font-mono text-[10px] text-left",
			render: (rp) => rp.role_id,
		},
		{
			key: "permission_id",
			header: "Permission ID",
			className: "p-3 font-mono text-[10px] text-left",
			render: (rp) => rp.permission_id,
		},
		{
			key: "role_permission",
			header: "Role / Permission",
			className: "p-3 text-left",
			render: (rp) => (
				<div className="flex flex-col">
					<span>{rp.roleName ?? "—"}</span>
					<span className="text-white/60 text-[11px]">
						{rp.permissionName ?? "—"}
					</span>
				</div>
			),
		},
		{
			key: "actions",
			header: "Actions",
			className: "p-3 text-right relative",
			render: (rp) => (
				<RolePermissionActions
					onEdit={() => onEdit(rp)}
					onDelete={() => onDelete(rp)}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={items}
			columns={columns}
			tableClassName="w-full text-xs text-white"
			headClassName="bg-white/5"
			rowClassName={() => "border-t border-white/10"}
			emptyText="Không có role–permission"
			rowsPerPage={15}
		/>
	);
}
