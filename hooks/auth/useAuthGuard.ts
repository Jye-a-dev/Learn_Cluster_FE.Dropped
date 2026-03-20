"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "./useAuthMe";

type GuardOptions = {
  roles?: string[];
  permissions?: string[];
};

export function useAuthGuard(
  redirect = "/login",
  options?: GuardOptions
) {
  const { user, loading } = useAuthMe();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const roles = options?.roles ?? [];
    const permissions = options?.permissions ?? [];

    // ❌ chưa login
    if (!user) {
      router.replace(redirect);
      return;
    }

    // ❌ sai role
    if (roles.length && !roles.includes(user.role)) {
      router.replace("/403");
      return;
    }

    // ❌ thiếu permission
    const userPermissions = user.permissions ?? [];

    if (
      permissions.length &&
      !permissions.every((p) => userPermissions.includes(p))
    ) {
      router.replace("/403");
      return;
    }
  }, [loading, user, redirect, router, options]);

  return { user, loading };
}