"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getAchievementOverviewStats } from "@/hooks/achievement/achievementOverviewStats";

type ChartData = {
  period: string;
  growth: number;
};

export default function AdminAchievementGrowthGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getAchievementOverviewStats();

        setTotal(stats.total);

        setData([
          { period: "7 Days", growth: stats.growth7 },
          { period: "21 Days", growth: stats.growth21 },
          { period: "30 Days", growth: stats.growth30 },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Achievement Growth Rate"
      data={data}
      dataKey="growth"
      xKey="period"
      chartType="bar"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Total Achievements: {total}
        </span>
      }
    />
  );
}