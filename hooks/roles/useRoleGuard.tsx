"use client";

import { ReactNode } from "react";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";
import type { RoleName } from "@/constants/role.constant";

type RoleGuardProps = {
  allow: RoleName[];        // danh sách role được phép
  children: ReactNode;
  fallback?: ReactNode;    // optional UI khi bị chặn
};

export function RoleGuard({
  allow,
  children,
  fallback = null,
}: RoleGuardProps) {
  const { roleName, isAuth, loading } = useCurrentRoleName();

  if (loading) return null;

  if (!isAuth) return fallback;

  if (!roleName || !allow.includes(roleName)) {
    return fallback;
  }

  return <>{children}</>;
}
