"use client";

import { useEffect } from "react";
import { useAuthMe } from "@/hooks/auth/useAuthMe";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role_id: string;
  created_at: string;
  updated_at: string;
}

function isAuthUser(user: unknown): user is AuthUser {
  return (
    typeof user === "object" &&
    user !== null &&
    "role_id" in user
  );
}


export function useGetCurrentRole() {
  const { user, loading, isAuth } = useAuthMe();

  useEffect(() => {
    if (!loading && isAuth && isAuthUser(user)) {
      console.log("Current user role_id:", user.role_id);
    }
  }, [user, loading, isAuth]);

  return {
    roleId: isAuthUser(user) ? user.role_id : null,
    loading,
    isAuth,
  };
}
