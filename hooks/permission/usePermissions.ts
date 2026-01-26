"use client";

import { useEffect, useState } from "react";
import { getPermissions, type PermissionBE } from "./getPermission";

export function usePermissions(params?: {
  page?: number;
  limit?: number;
  keyword?: string;
}) {
  const { page, limit, keyword } = params || {};

  const [permissions, setPermissions] = useState<PermissionBE[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const data = await getPermissions({ page, limit, keyword });
        if (active) setPermissions(data);
      } catch {
        if (active) setPermissions([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPermissions();

    return () => {
      active = false;
    };
  }, [page, limit, keyword]);

  return {
    permissions,
    loading,
  };
}
