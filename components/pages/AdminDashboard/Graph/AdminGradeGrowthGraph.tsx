"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getGradeOverviewStats } from "@/hooks/grade/gradeOverview";

type ChartData = {
  period: string;
  growth: number;
};

export default function AdminGradeGrowthGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getGradeOverviewStats();

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
      title="Grade Growth Rate"
      data={data}
      dataKey="growth"
      xKey="period"
      chartType="line"
      loading={loading}
    />
  );
}