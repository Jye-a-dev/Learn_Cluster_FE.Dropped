"use client";

import { useEffect, useState } from "react";
import { getRole, type Role } from "./getRoles";

export function useRole(roleId?: string) {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roleId) {
      setRole(null);
      return;
    }

    let active = true;

    const fetchRole = async () => {
      setLoading(true);
      try {
        const data = await getRole(roleId);
        if (active) setRole(data);
      } catch {
        if (active) setRole(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRole();

    return () => {
      active = false;
    };
  }, [roleId]);

  return {
    role,
    roleName: role?.name ?? null, // ✅ THÊM CÁI BẠN CẦN
    loading,
  };
}
