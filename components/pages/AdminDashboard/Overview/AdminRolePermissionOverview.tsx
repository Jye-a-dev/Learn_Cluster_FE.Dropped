"use client";

import { useEffect, useState } from "react";
import { getRolePermissionOverviewStats } from "@/hooks/permissionRole/rolePermissionOverview";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
  byRole: Record<string, number>;
};

export default function AdminRolePermissionOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRolePermissionOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Role Permission Overview"
      total={stats?.total ?? 0}
      loading={loading}
      growths={[
        { label: "7 ngày", value: stats?.growth7 ?? 0 },
        { label: "21 ngày", value: stats?.growth21 ?? 0 },
        { label: "30 ngày", value: stats?.growth30 ?? 0 },
      ]}
      breakdown={stats?.byRole}
    />
  );
}