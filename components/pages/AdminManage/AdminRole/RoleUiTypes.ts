import type { RoleName } from "@/constants/role.constant";

/* ===== UI ROLE ===== */
export type Role = {
  id: string;
  name: RoleName;
  code?: string;
  description?: string;
};

/* ===== CREATE ===== */
export type CreateRolePayload = {
  name: RoleName;
  code?: string;
  description?: string;
};

/* ===== UPDATE ===== */
export type UpdateRolePayload = {
  name: RoleName;
  code?: string;
  description?: string;
};
