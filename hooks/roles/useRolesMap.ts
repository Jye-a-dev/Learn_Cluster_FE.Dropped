// src/hooks/useRolesMap.ts
"use client";

import { useEffect, useState } from "react";
import { getRoles } from "@/hooks/roles/getRoles";
import type { Role } from "@/hooks/roles/getRoles";

export function useRolesMap() {
  const [rolesMap, setRolesMap] = useState<Record<string, Role>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      const roles = await getRoles();
      const map: Record<string, Role> = {};
      roles.forEach((r) => {
        map[r.id] = r;
      });
      setRolesMap(map);
      setLoading(false);
    }
    fetchRoles();
  }, []);

  return { rolesMap, loading };
}
