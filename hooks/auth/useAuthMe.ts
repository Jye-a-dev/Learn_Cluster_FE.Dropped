"use client";

import { useEffect, useState } from "react";
import api from "@/hooks/api";

export function useAuthMe() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth.route/me")
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
