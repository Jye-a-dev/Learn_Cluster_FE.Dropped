"use client";

import { useEffect, useState } from "react";
import api from "@/hooks/api";
import type { User } from "@/@types/user.type";

export function useAuthMe() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth.route/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data as User);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    isAuth: !!user,
  };
}
