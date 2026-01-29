// src/components/pages/AdminManage/AdminRolePermission/CreateRolePermissionModal.tsx
"use client";

import { useState, useMemo } from "react";
import { ShieldCheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import { usePermissionsMap } from "@/hooks/permissionRole/usePermissionsMap";
import type { CreateRolePermissionPayload } from "./RolePermissionUiTypes";

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateRolePermissionPayload) => Promise<void>;
};

export default function CreateRolePermissionModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const { rolesMap, loading: rolesLoading } = useRolesMap();
	const { permissionsMap, loading: permissionsLoading } =
		usePermissionsMap();

	const roles = useMemo(() => Object.values(rolesMap), [rolesMap]);
	const permissions = useMemo(
		() => Object.values(permissionsMap),
		[permissionsMap]
	);

	const [form, setForm] = useState<CreateRolePermissionPayload>({
		role_id: "",
		permission_id: "",
	});

	const isInvalid =
		!form.role_id ||
		!form.permission_id ||
		rolesLoading ||
		permissionsLoading;

	async function handleSubmit() {
		if (isInvalid) return;

		await onSubmit(form);
		setForm({ role_id: "", permission_id: "" });
		onClose();
	}

	return (
		<BaseFormModal
			open={open}
			title="Gán Permission cho Role"
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* ROLE */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<ShieldCheckIcon className="h-4 w-4 text-white/40" />
					Role
				</label>
				<select
					value={form.role_id}
					onChange={(e) =>
						setForm({ ...form, role_id: e.target.value })
					}
					className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md focus:border-white"
				>
					<option value="" className="bg-neutral-800 text-white">
						-- Chọn role --
					</option>
					{roles.map((r) => (
						<option
							key={r.id}
							value={r.id}
							className="bg-neutral-800 text-white"
						>
							{r.name}
						</option>
					))}
				</select>
			</div>

			{/* PERMISSION */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<KeyIcon className="h-4 w-4 text-white/40" />
					Permission
				</label>
				<select
					value={form.permission_id}
					onChange={(e) =>
						setForm({
							...form,
							permission_id: e.target.value,
						})
					}
					className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md focus:border-white"
				>
					<option value="" className="bg-neutral-800 text-white">
						-- Chọn permission --
					</option>
					{permissions.map((p) => (
						<option
							key={p.id}
							value={p.id}
							className="bg-neutral-800 text-white"
						>
							{p.name}
						</option>
					))}
				</select>
			</div>

			{/* Hint */}
			<p className="pt-1 text-xs text-white/40">
				Mỗi cặp Role – Permission là duy nhất. Hệ thống sẽ tự
				động từ chối trùng lặp.
			</p>
		</BaseFormModal>
	);
}
