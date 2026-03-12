// src/hooks/permission/getPermission.ts
import api from "@/hooks/api";

export interface PermissionBE {
  id: number;
  name: string;
  code?: string;
  description?: string;
}

/* ===================== GET ===================== */

/** GET /api/permission */
export async function getPermissions(params?: {
  page?: number;
  limit?: number;
  keyword?: string;
}): Promise<PermissionBE[]> {
  const res = await api.get<PermissionBE[]>("/permission", { params });
  return res.data ?? [];
}

/** GET /api/permission/:id */
export async function getPermission(id: number): Promise<PermissionBE> {
  const res = await api.get<PermissionBE>(`/permission/id/${id}`);
  return res.data;
}

/** GET /api/permission/count */
export async function countPermissions(): Promise<number> {
  const res = await api.get<{ total: number }>("/permission/count");
  return res.data.total;
}

/* ===================== MUTATION ===================== */

/** POST /api/permission */
export async function createPermission(body: {
  name: string;
  description?: string;
}): Promise<number> {
  const res = await api.post<{ id: number }>("/permission", body);
  return res.data.id;
}

/** PUT /api/permission/:id */
export async function updatePermission(
  id: number,
  body: Partial<Omit<PermissionBE, "id">>
): Promise<void> {
  await api.put(`/permission/id/${id}`, body);
}

/** DELETE /api/permission/:id */
export async function deletePermission(id: number): Promise<void> {
  await api.delete(`/permission/id/${id}`);
}
