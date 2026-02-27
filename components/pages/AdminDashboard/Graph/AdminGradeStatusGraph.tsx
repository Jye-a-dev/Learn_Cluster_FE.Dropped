"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getGradeOverviewStats } from "@/hooks/grade/gradeOverview";

type ChartData = {
  status: string;
  total: number;
};

export default function AdminGradeStatusGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getGradeOverviewStats();

        setTotal(stats.total);

        setData([
          { status: "Graded", total: stats.graded },
          { status: "Ungraded", total: stats.ungraded },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Grade Status Distribution"
      data={data}
      dataKey="total"
      xKey="status"
      chartType="pie"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Total Grades: {total}
        </span>
      }
    />
  );
}