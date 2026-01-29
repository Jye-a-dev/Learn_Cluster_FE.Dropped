"use client";

import { useEffect, useState } from "react";
import api from "@/hooks/api";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;      // hoặc number nếu backend trả role_id
  role_id?: number;
}

export function useAuthMe() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AuthUser>("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    isAuth: !!user,
  };
}
