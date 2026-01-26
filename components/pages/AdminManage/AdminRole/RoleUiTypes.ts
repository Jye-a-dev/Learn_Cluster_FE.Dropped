import type { RoleName } from "@/constants/role.constant";

/* ===== UI ROLE ===== */
export type Role = {
  id: string;
  name: RoleName;
  description?: string;
};

/* ===== CREATE ===== */
export type CreateRolePayload = {
  name: RoleName;
  description?: string;
};

/* ===== UPDATE ===== */
export type UpdateRolePayload = {
  name: RoleName;
  description?: string;
};
