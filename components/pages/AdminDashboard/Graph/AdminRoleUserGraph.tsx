"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getAdminRoleStats } from "@/hooks/roles/roleOverview";

type ChartData = {
  role: string;
  total: number;
};

export default function AdminRoleUserGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getAdminRoleStats();

        const chartData: ChartData[] = Object.entries(
          stats.byRole
        ).map(([role, total]) => ({
          role,
          total,
        }));

        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Users by Role"
      data={data}
      dataKey="total"
      xKey="role"
      chartType="bar"
      color="#10b981"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Tổng users: {data.reduce((sum, item) => sum + item.total, 0)}
        </span>
      }
    />
  );
}