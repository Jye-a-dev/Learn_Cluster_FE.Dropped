"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getAssignmentOverviewStats } from "@/hooks/assignment/assignmentOverviewStats";

type ChartData = {
  period: string;
  growth: number;
};

export default function AdminAssignmentGrowthGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getAssignmentOverviewStats();

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
      title="Assignment Deadline Growth"
      data={data}
      dataKey="growth"
      xKey="period"
      chartType="bar"
      loading={loading}
    />
  );
}