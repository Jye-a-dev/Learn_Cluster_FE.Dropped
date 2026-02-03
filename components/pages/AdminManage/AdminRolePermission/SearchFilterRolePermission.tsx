"use client";

import { useMemo } from "react";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import { usePermissionsMap } from "@/hooks/permissionRole/usePermissionsMap";
import BaseSelect from "@/components/pages/AdminManage/BaseModel/BaseSelect";

type Props = {
	roleId: string;
	permissionId: string;
	onRoleChange: (v: string) => void;
	onPermissionChange: (v: string) => void;
};

export default function SearchFilterRolePermission({
	roleId,
	permissionId,
	onRoleChange,
	onPermissionChange,
}: Props) {
	const { rolesMap, loading: rolesLoading } = useRolesMap();
	const { permissionsMap, loading: permissionsLoading } =
		usePermissionsMap();

	const roles = useMemo(() => Object.values(rolesMap), [rolesMap]);
	const permissions = useMemo(
		() => Object.values(permissionsMap),
		[permissionsMap]
	);

	return (
		<div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-emerald-600 p-4 md:flex-row md:items-center">
			<BaseSelect
				value={roleId}
				onChange={onRoleChange}
				options={roles}
				placeholder="Tất cả role"
				disabled={rolesLoading}
				className="md:w-48"
				getValue={(r) => r.id}
				getLabel={(r) => r.name}
			/>


			<BaseSelect
				value={permissionId}
				onChange={onPermissionChange}
				options={permissions}
				placeholder="Tất cả permission"
				disabled={permissionsLoading}
				className="md:w-56"
				getValue={(p) => p.id}
				getLabel={(p) => p.name}
			/>

		</div>
	);
}
