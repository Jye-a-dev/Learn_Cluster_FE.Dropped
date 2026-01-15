"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "./useAuthMe";

export function useAuthGuard(redirect = "/login") {
  const { user, loading } = useAuthMe();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirect);
    }
  }, [loading, redirect, router, user]);

  return { user, loading };
}
