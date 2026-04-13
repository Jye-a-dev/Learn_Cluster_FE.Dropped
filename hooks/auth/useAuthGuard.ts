"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "./useAuthMe";

type GuardOptions = {
  roles?: string[];
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

    if (!user) {
      router.replace(redirect);
      return;
    }

    if (roles.length && !roles.includes(user.role)) {
      router.replace("/403");
    }
  }, [loading, user, redirect, router, options]);

  return { user, loading };
}