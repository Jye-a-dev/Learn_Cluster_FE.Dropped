"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getLessonOverviewStats } from "@/hooks/lessons/lessonOverviewStats";

type ChartData = {
  period: string;
  growth: number;
};

export default function AdminLessonGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getLessonOverviewStats();

        setTotal(stats.total);

        const chartData: ChartData[] = [
          { period: "7 Days", growth: stats.growth7 },
          { period: "21 Days", growth: stats.growth21 },
          { period: "30 Days", growth: stats.growth30 },
        ];

        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Lesson Growth Rate"
      data={data}
      dataKey="growth"
      xKey="period"
      chartType="line"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Total Lessons: {total}
        </span>
      }
    />
  );
}