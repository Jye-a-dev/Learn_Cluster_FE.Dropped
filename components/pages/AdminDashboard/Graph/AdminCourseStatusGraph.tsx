"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getCourseOverviewStats } from "@/hooks/courses/courseOverviewStats";

type ChartData = {
  status: string;
  total: number;
};

export default function AdminCourseStatusGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getCourseOverviewStats();

        setTotal(stats.total);

        setData([
          { status: "Draft", total: stats.draft },
          { status: "Public", total: stats.public },
          { status: "Closed", total: stats.closed },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Course Status Distribution"
      data={data}
      dataKey="total"
      xKey="status"
      chartType="pie"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Total Courses: {total}
        </span>
      }
    />
  );
}