import api from "@/hooks/api";
import { ReactNode } from "react";

/* ===================== TYPES ===================== */

export interface User {
  name: ReactNode;
  id: string;          // UUID
  username: string;
  email: string;
  role_id: string;
  created_at?: string;
  updated_at?: string;
}
export interface UserCount {
  count: number; 
}


/* ===================== GET ===================== */

/** GET /api/user */
export async function getUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/user");
  return res.data ?? [];
}

/** GET /api/user/count */
export async function getUserCount(): Promise<number> {
  const res = await api.get<UserCount>("/user/count");
  return res.data?.count ?? 0;
}

/** GET /api/user/:id */
export async function getUser(id: string): Promise<User> {
  const res = await api.get<User>(`/user/id/${id}`);
  return res.data;
}

/** GET /api/user/search */
export async function searchUsers(params: {
  q?: string;
  role_id?: string;
}): Promise<User[]> {
  const res = await api.get<User[]>("/user/search", { params });
  return res.data ?? [];
}

/** GET /api/user/role/:role_id */
export async function getUsersByRole(role_id: string): Promise<User[]> {
  const res = await api.get<User[]>(`/user/role/${role_id}`);
  return res.data ?? [];
}

/** GET /api/user/role/:role_id/count */
export async function getUserCountByRole(role_id: string): Promise<number> {
  const res = await api.get<UserCount>(`/user/role/${role_id}/count`);
  return res.data?.count   ?? 0;
}

/* ===================== MUTATION ===================== */

/** POST /api/user */
export async function createUser(payload: {
  username: string;
  email: string;
  password: string;
}): Promise<{ id: string }> {
  const res = await api.post<{ id: string }>("/user", payload);
  return res.data;
}

/** PUT /api/user/:id */
export async function updateUser(
  id: string,
  payload: Partial<Omit<User, "id">>
): Promise<User> {
  const res = await api.put<User>(`/user/id/${id}`, payload);
  return res.data;
}

/** PATCH /api/user/:id */
export async function patchUser(
  id: string,
  payload: Partial<Omit<User, "id">>
): Promise<User> {
  const res = await api.patch<User>(`/user/id/${id}`, payload);
  return res.data;
}

/** DELETE /api/user/:id */
export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/user/id/${id}`);
}
