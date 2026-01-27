// src/components/pages/AdminManage/AdminRolePermission/RolePermissionUiTypes.ts

export type RolePermissionUI = {
  id: string;
  role_id: string;
  permission_id: string;

  // UI-friendly (từ join BE hoặc map FE)
  roleName?: string;
  permissionName?: string;

  created_at?: string;
};

export type CreateRolePermissionPayload = {
  role_id: string;
  permission_id: string;
};
