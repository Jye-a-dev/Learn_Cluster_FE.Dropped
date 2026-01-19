"use client";

import { useMemo } from "react";
import { useRoles } from "./useRoles";
import { useGetCurrentRole } from "./useGetCurrentRole";
import type { RoleName } from "@/constants/role.constant";

export function useCurrentRoleName() {
  const { roles, loading: rolesLoading } = useRoles();
  const { roleId, loading: authLoading, isAuth } = useGetCurrentRole();

  const roleName = useMemo<RoleName | null>(() => {
    if (!roleId) return null;
    return roles.find(r => r.id === roleId)?.name ?? null;
  }, [roles, roleId]);

  return {
    roleId,
    roleName,
    isAuth,
    loading: rolesLoading || authLoading,
  };
}
