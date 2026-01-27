// src/hooks/permission/usePermissionsMap.ts
"use client";

import { useEffect, useState } from "react";
import { getPermissions } from "@/hooks/permission/getPermission";
import type { PermissionBE } from "@/hooks/permission/getPermission";

export function usePermissionsMap() {
  const [permissionsMap, setPermissionsMap] = useState<
    Record<string, PermissionBE>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPermissions() {
      const permissions = await getPermissions();
      const map: Record<string, PermissionBE> = {};

      permissions.forEach((p) => {
        map[p.id] = p;
      });

      setPermissionsMap(map);
      setLoading(false);
    }

    fetchPermissions();
  }, []);

  return { permissionsMap, loading };
}
