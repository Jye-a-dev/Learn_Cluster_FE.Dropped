"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getCourseOverviewStats } from "@/hooks/courses/courseOverviewStats";

type ChartData = {
  period: string;
  growth: number;
};

export default function AdminCourseGrowthGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getCourseOverviewStats();

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
      title="Course Growth Rate"
      data={data}
      dataKey="growth"
      xKey="period"
      chartType="line"
      loading={loading}
    />
  );
}