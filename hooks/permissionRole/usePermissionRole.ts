import api from "@/hooks/api";

/* ===================== TYPES ===================== */

export interface RolePermissionBE {
	role_id: string;
	permission_id: string;
}

/* ===================== GET ===================== */

/** GET /api/role_permission */
export async function getRolePermissions(): Promise<RolePermissionBE[]> {
	const res = await api.get<RolePermissionBE[]>("/role_permission");
	return res.data ?? [];
}

/** GET /api/role_permission/role/:role_id */
export async function getRolePermissionsByRole(role_id: string): Promise<RolePermissionBE[]> {
	const res = await api.get<RolePermissionBE[]>(`/role_permission/role/${role_id}`);
	return res.data ?? [];
}

/** GET /api/role_permission/role/:role_id/count */
export async function countRolePermissionsByRole(role_id: string): Promise<number> {
	const res = await api.get<{ total: number }>(`/role_permission/role/${role_id}/count`);
	return res.data.total;
}

/* ===================== MUTATION ===================== */

/** POST /api/role_permission */
export async function createRolePermission(body: { role_id: string; permission_id: string }): Promise<void> {
	await api.post("/role_permission", body);
}

/** DELETE /api/role_permission */
export async function deleteRolePermission(body: { role_id: string; permission_id: string }): Promise<void> {
	await api.delete("/role_permission", { data: body });
}

/** DELETE /api/role_permission/role/:role_id */
export async function deleteRolePermissionsByRole(role_id: string): Promise<void> {
	await api.delete(`/role_permission/role/${role_id}`);
}
