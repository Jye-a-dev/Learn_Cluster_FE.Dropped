"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";
import type { RoleName } from "@/constants/role.constant";

type RoleGuardProps = {
  allow: RoleName[];
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({
  allow,
  children,
  fallback = null,
}: RoleGuardProps) {
  const router = useRouter();
  const { roleName, isAuth, loading } = useCurrentRoleName();

  const prevRoleRef = useRef<RoleName | null>(null);

  useEffect(() => {
    if (prevRoleRef.current && prevRoleRef.current !== roleName) {
      router.refresh(); // refresh server components + re-eval guards
    }
    prevRoleRef.current = roleName ?? null;
  }, [roleName, router]);

  if (loading) return null;
  if (!isAuth) return fallback;
  if (!roleName || !allow.includes(roleName)) return fallback;

  return <>{children}</>;
}
