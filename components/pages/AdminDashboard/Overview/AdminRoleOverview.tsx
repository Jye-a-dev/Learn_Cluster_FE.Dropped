"use client";

import { useEffect, useState } from "react";
import { getAdminRoleStats } from "@/hooks/roles/roleOverview";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  totalUsers: number;
  byRole: Record<string, number>;
};

export default function AdminRoleOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminRoleStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Phân bố User theo Role"
      total={stats?.totalUsers ?? 0}
      loading={loading}
      breakdown={stats?.byRole}
    />
  );
}