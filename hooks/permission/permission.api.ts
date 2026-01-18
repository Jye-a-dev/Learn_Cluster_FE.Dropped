import api from "@/hooks/api";

export interface Permission {
  id: number;
  name: string;
  code?: string;
  description?: string;
}

/** GET /api/permission */
export async function getPermissions(params?: {
  page?: number;
  limit?: number;
  keyword?: string;
}): Promise<Permission[]> {
  const res = await api.get<Permission[]>("/api/permission", { params });
  return res.data ?? [];
}

/** GET /api/permission/:id */
export async function getPermission(id: number): Promise<Permission> {
  const res = await api.get<Permission>(`/api/permission/${id}`);
  return res.data;
}

/** GET /api/permission/count */
export async function countPermissions(): Promise<number> {
  const res = await api.get<{ total: number }>("/api/permission/count");
  return res.data.total;
}

/** POST /api/permission */
export async function createPermission(body: {
  name: string;
  code?: string;
  description?: string;
}): Promise<number> {
  const res = await api.post<{ id: number }>("/api/permission", body);
  return res.data.id;
}

/** PUT / PATCH /api/permission/:id */
export async function updatePermission(
  id: number,
  body: Partial<Permission>
): Promise<void> {
  await api.put(`/api/permission/${id}`, body);
}

/** DELETE /api/permission/:id */
export async function deletePermission(id: number): Promise<void> {
  await api.delete(`/api/permission/${id}`);
}
