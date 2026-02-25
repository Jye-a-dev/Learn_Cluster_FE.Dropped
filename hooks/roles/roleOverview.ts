// src/hooks/roles/roleUserOverview.ts
import { getRoles } from "@/hooks/roles/getRoles";
import { getUserCountByRole } from "@/hooks/users/getUsers";

export interface AdminRoleStats {
  totalUsers: number;
  byRole: Record<string, number>;
}

export async function getAdminRoleStats(): Promise<AdminRoleStats> {
  const roles = await getRoles();

  const byRole: Record<string, number> = {};
  let totalUsers = 0;

  await Promise.all(
    roles.map(async (role) => {
      const count = await getUserCountByRole(role.id);
      byRole[role.name] = count;
      totalUsers += count;
    })
  );

  return {
    totalUsers,
    byRole,
  };
}