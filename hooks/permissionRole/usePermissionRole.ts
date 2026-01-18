"use client";

import { useEffect, useState } from "react";
import api from "@/hooks/api";

export interface RolePermission {
  role_id: number;
  permission_id: number;
  permission_code?: string;
}

export function usePermissionRole(role_id?: number) {
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!role_id) {
      setPermissions([]);
      return;
    }

    let active = true;

    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const res = await api.get<RolePermission[]>(
          `/api/role_permission/role/${role_id}`
        );
        if (active) {
          setPermissions(res.data ?? []);
        }
      } catch {
        if (active) {
          setPermissions([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPermissions();

    return () => {
      active = false;
    };
  }, [role_id]);

  return {
    permissions,
    loading,
  };
}
