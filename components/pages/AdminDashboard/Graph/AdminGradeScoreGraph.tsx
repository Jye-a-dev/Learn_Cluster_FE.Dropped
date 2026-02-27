"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getGradeOverviewStats } from "@/hooks/grade/gradeOverview";

type ChartData = {
  metric: string;
  value: number;
};

export default function AdminGradeScoreGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getGradeOverviewStats();

        setData([
          { metric: "Average", value: stats.avgScore },
          { metric: "Highest", value: stats.highestScore },
          { metric: "Lowest", value: stats.lowestScore },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Score Overview"
      data={data}
      dataKey="value"
      xKey="metric"
      chartType="bar"
      loading={loading}
    />
  );
}