import api from "@/hooks/api";

export interface Role {
  id: string ;      // ✅ UUID
  name: string;
  description: string | null;
  code?: string;
}
  
/** GET /api/role */
export async function getRoles(): Promise<Role[]> {
  const res = await api.get<Role[]>("/role");
  return res.data ?? [];
}

export async function getRole(role_id: string): Promise<Role> {
  const res = await api.get<Role>(`/role/${role_id}`);
  return res.data;
}

/** GET role name by role_id */
