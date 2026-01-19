"use client";

import { useEffect, useState } from "react";
import api from "@/hooks/api";

export interface User {
  id: string;
  username: string;
  email: string;
  role_id: number | null;
  created_at: string;
  updated_at: string;
}

export function useUserById(id?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const res = await api.get<User>(`/user/${id}`, {
          withCredentials: true,
        });

        if (!cancelled) {
          setUser(res.data);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { user, loading };
}
