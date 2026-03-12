import api from "@/hooks/api";
import type { RoleName } from "@/constants/role.constant";

/* ===== TYPE ===== */
export interface Role {
	id: string; // UUID
	name: RoleName;
	description: string | null;
}

/* ===== PAYLOAD ===== */
export type CreateRolePayload = {
	name: RoleName;
	description?: string | null;
};

export type UpdateRolePayload = Partial<CreateRolePayload>;

/* =========================================================
 * GET /api/role
 * ======================================================= */
export async function getRoles(): Promise<Role[]> {
	const res = await api.get<Role[]>("/role");
	return res.data ?? [];
}

/* =========================================================
 * GET /api/role/count
 * ======================================================= */
export async function getRoleCount(): Promise<number> {
	const res = await api.get<{ total: number }>("/role/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/role/:id
 * ======================================================= */
export async function getRole(roleId: string): Promise<Role> {
	const res = await api.get<Role>(`/role/id/${roleId}`);
	return res.data;
}

/* =========================================================
 * POST /api/role
 * ======================================================= */
export async function createRole(payload: CreateRolePayload): Promise<Role> {
	const res = await api.post<Role>("/role", payload);
	return res.data;
}

/* =========================================================
 * PUT /api/role/:id
 * (update full)
 * ======================================================= */
export async function updateRole(roleId: string, payload: CreateRolePayload): Promise<Role> {
	const res = await api.put<Role>(`/role/id/${roleId}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/role/:id
 * (update partial)
 * ======================================================= */
export async function patchRole(roleId: string, payload: UpdateRolePayload): Promise<Role> {
	const res = await api.patch<Role>(`/role/id/${roleId}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/role/:id
 * ======================================================= */
export async function deleteRole(roleId: string): Promise<void> {
	await api.delete(`/role/id/${roleId}`);
}

/* =========================================================
 * HELPER: get role name by id (optional)
 * ======================================================= */
export async function getRoleNameById(roleId: string): Promise<RoleName | null> {
	const role = await getRole(roleId);
	return role?.name ?? null;
}
