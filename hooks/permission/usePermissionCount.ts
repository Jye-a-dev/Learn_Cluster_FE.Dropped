"use client";

import { useEffect, useState } from "react";
import { countPermissions } from "./permission.api";

export function usePermissionCount() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchCount = async () => {
      setLoading(true);
      try {
        const data = await countPermissions();
        if (active) setTotal(data);
      } catch {
        if (active) setTotal(0);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCount();

    return () => {
      active = false;
    };
  }, []);

  return {
    total,
    loading,
  };
}
