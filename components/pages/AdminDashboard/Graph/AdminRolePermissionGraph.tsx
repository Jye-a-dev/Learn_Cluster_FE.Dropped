"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import {
  getRolePermissionOverviewStats,
} from "@/hooks/permissionRole/rolePermissionOverview";

type ChartData = {
  role: string;
  total: number;
};

export default function AdminRolePermissionGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getRolePermissionOverviewStats();

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

  const totalRecords = data.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <BaseGraph
      title="Permissions by Role"
      data={data}
      dataKey="total"
      xKey="role"
      chartType="pie"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Total Role-Permission Records: {totalRecords}
        </span>
      }
    />
  );
}