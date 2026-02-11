/* ===================== BASE TYPES ===================== */

export type PermissionName = string;

export interface Permission {
  id: number;   // ✅ UUID
  name: string;
  description?: string;
}


/* ===================== FORM PAYLOAD ===================== */

export interface CreatePermissionPayload {
    name: string;
    description?: string;
}

export interface UpdatePermissionPayload {
    name?: string;
    description?: string;
}
