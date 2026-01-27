import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface RolePermission {
	id: string; // UUID
	role_id: string; // UUID
	permission_id: string; // UUID
	created_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddRolePermissionPayload = {
	role_id: string;
	permission_id: string;
};

export type UpdateRolePermissionPayload = {
	role_id: string;
	permission_id: string;
};

export type PatchRolePermissionPayload = Partial<UpdateRolePermissionPayload>;

/* =======================
   QUERY
======================= */
export type RolePermissionQuery = {
	role_id?: string;
	permission_id?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/role_permission
 * ======================================================= */
export async function getRolePermissions(query?: RolePermissionQuery): Promise<RolePermission[]> {
	const res = await api.get<RolePermission[]>("/role_permission", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/role_permission/:id
 * ======================================================= */
export async function getRolePermission(id: string): Promise<RolePermission> {
	const res = await api.get<RolePermission>(`/role_permission/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/role_permission/role/:role_id
 * ======================================================= */
export async function getPermissionsByRole(roleId: string): Promise<RolePermission[]> {
	const res = await api.get<RolePermission[]>(`/role_permission/role/${roleId}`);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/role_permission/permission/:permission_id
 * ======================================================= */
export async function getRolesByPermission(permissionId: string): Promise<RolePermission[]> {
	const res = await api.get<RolePermission[]>(`/role_permission/permission/${permissionId}`);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/role_permission/role/:role_id/count
 * ======================================================= */
export async function getPermissionCountByRole(roleId: string): Promise<number> {
	const res = await api.get<{ count: number }>(`/role_permission/role/${roleId}/count`);
	return res.data?.count ?? 0;
}

/* =========================================================
 * POST /api/role_permission
 * ======================================================= */
export async function addRolePermissions(payload: AddRolePermissionPayload[]): Promise<RolePermission[]> {
	const res = await api.post<RolePermission[]>("/role_permission", payload);
	return res.data ?? [];
}

/* =========================================================
 * PUT /api/role_permission/:id
 * ======================================================= */
export async function updateRolePermission(id: string, payload: UpdateRolePermissionPayload): Promise<RolePermission> {
	const res = await api.put<RolePermission>(`/role_permission/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/role_permission/:id
 * ======================================================= */
export async function patchRolePermission(id: string, payload: PatchRolePermissionPayload): Promise<RolePermission> {
	const res = await api.patch<RolePermission>(`/role_permission/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/role_permission/:id
 * ======================================================= */
export async function deleteRolePermission(id: string): Promise<void> {
	await api.delete(`/role_permission/${id}`);
}

/* =========================================================
 * DELETE /api/role_permission
 * ======================================================= */
export async function removeRolePermissions(payload: AddRolePermissionPayload[]): Promise<void> {
	await api.delete("/role_permission", { data: payload });
}

/* =========================================================
 * DELETE /api/role_permission/role/:role_id
 * ======================================================= */
export async function removeByRole(roleId: string): Promise<void> {
	await api.delete(`/role_permission/role/${roleId}`);
}

/* =========================================================
 * DELETE /api/role_permission/permission/:permission_id
 * ======================================================= */
export async function removeByPermission(permissionId: string): Promise<void> {
	await api.delete(`/role_permission/permission/${permissionId}`);
}
