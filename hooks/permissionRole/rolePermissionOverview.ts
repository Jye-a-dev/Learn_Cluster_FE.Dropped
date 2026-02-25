// src/hooks/role_permissions/rolePermissionOverview.ts
import { getRolePermissions } from "@/hooks/permissionRole/getPermissionRole";
import { getRoles } from "@/hooks/roles/getRoles";

export interface RolePermissionOverviewStats {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
  byRole: Record<string, number>;
}

function calculateGrowth(
  items: { created_at?: string }[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = items.filter((item) => {
    if (!item.created_at) return false;
    const date = new Date(item.created_at);
    return date >= currentStart && date <= now;
  }).length;

  const previous = items.filter((item) => {
    if (!item.created_at) return false;
    const date = new Date(item.created_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getRolePermissionOverviewStats(): Promise<RolePermissionOverviewStats> {
  const [rolePermissions, roles] = await Promise.all([
    getRolePermissions(),
    getRoles(),
  ]);

  // map role_id -> role_name
  const roleMap = roles.reduce<Record<string, string>>((acc, role) => {
    acc[role.id] = role.name;
    return acc;
  }, {});

  // count permission per role
  const byRole: Record<string, number> = {};

  for (const rp of rolePermissions) {
    const roleName = roleMap[rp.role_id] ?? "Unknown";

    if (!byRole[roleName]) {
      byRole[roleName] = 0;
    }

    byRole[roleName] += 1;
  }

  return {
    total: rolePermissions.length,
    growth7: calculateGrowth(rolePermissions, 7),
    growth21: calculateGrowth(rolePermissions, 21),
    growth30: calculateGrowth(rolePermissions, 30),
    byRole,
  };
}