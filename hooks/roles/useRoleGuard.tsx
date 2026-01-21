"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";
import type { RoleName } from "@/constants/role.constant";
import NoPermissionBackground
 from "@/components/layouts/auth/Background/NoPermissionBackground";
type RoleGuardProps = {
  allow?: RoleName[]; // role được phép
  onRoleChange?: (prev: RoleName | null, next: RoleName | null) => void;
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({
  allow,
  onRoleChange,
  children,
}: RoleGuardProps) {
  const { roleName, isAuth, loading } = useCurrentRoleName();
  const prevRoleRef = useRef<RoleName | null>(null);

  useEffect(() => {
    if (prevRoleRef.current !== roleName) {
      onRoleChange?.(prevRoleRef.current, roleName ?? null);
      prevRoleRef.current = roleName ?? null;
    }
  }, [roleName, onRoleChange]);

  if (loading) return null;

  if (!isAuth) {
    return <NoPermissionBackground/>;
  }

  if (allow && (!roleName || !allow.includes(roleName))) {
    return <NoPermissionBackground/>;
  }

  return <>{children}</>;
}
