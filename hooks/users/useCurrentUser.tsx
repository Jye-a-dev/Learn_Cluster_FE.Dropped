"use client";

import { useAuthMe } from "@/hooks/auth/useAuthMe";
import { useUserById } from "@/hooks/users/useUserById";

export interface User {
  id: string;
  username: string;
  email: string;
  role_id: number | null;
  created_at: string;
  updated_at: string;
}

function hasUserId(user: unknown): user is { id: string } {
  return typeof user === "object" && user !== null && "id" in user;
}

export function useCurrentUser() {
  const {
    user: authUser,
    loading: authLoading,
    isAuth,
  } = useAuthMe();

  const userId = hasUserId(authUser) ? authUser.id : undefined;

  const {
    user,
    loading: userLoading,
  } = useUserById(userId);

  return {
    user: user as User | null,
    loading: authLoading || userLoading,
    isAuth,
  };
}
