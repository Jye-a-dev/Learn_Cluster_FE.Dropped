// src/components/pages/AdminManage/AdminUser/UserTable.tsx
"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import UserActions from "./UserActions";
import type { UserUI } from "./UserUiTypes";

type Props = {
	users: UserUI[];
	onEdit: (u: UserUI) => void;
	onDelete: (u: UserUI) => void;
};

export default function UserTable({
	users,
	onEdit,
	onDelete,
}: Props) {
	const columns: BaseColumn<UserUI>[] = [
		{
			key: "id",
			header: "ID",
			className: "p-3 font-mono text-[10px]",
			render: (u) => u.id,
		},
		{
			key: "username",
			header: "Username",
			className: "p-3 text-left",
			render: (u) => u.username,
		},
		{
			key: "email",
			header: "Email",
			className: "p-3 text-left",
			render: (u) => u.email,
		},
		{
			key: "role",
			header: "Role",
			className: "p-3 text-left",
			render: (u) => u.roleName,
		},
		{
			key: "created_at",
			header: "Created",
			className: "p-3",
			render: (u) =>
				u.created_at
					? new Date(u.created_at).toLocaleDateString()
					: "—",
		},
		{
			key: "updated_at",
			header: "Updated",
			className: "p-3",
			render: (u) =>
				u.updated_at
					? new Date(u.updated_at).toLocaleDateString()
					: "—",
		},
		{
			key: "actions",
			header: "Actions",
			className: "p-3 text-right relative",
			render: (u) => (
				<UserActions
					onEdit={() => onEdit(u)}
					onDelete={() => onDelete(u)}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={users}
			columns={columns}
			tableClassName="w-full text-xs text-white"
			headClassName="bg-white/5"
			rowClassName={() => "border-t border-white/10"}
			emptyText="Không có user"
		/>
	);
}
