"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getAssignmentOverviewStats } from "@/hooks/assignment/assignmentOverviewStats";

type ChartData = {
  status: string;
  total: number;
};

export default function AdminAssignmentStatusGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getAssignmentOverviewStats();

        setTotal(stats.total);

        setData([
          { status: "Upcoming", total: stats.upcoming },
          { status: "Overdue", total: stats.overdue },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Assignment Deadline Distribution"
      data={data}
      dataKey="total"
      xKey="status"
      chartType="pie"
      loading={loading}
      extraTop={
        <span className="text-xs text-slate-400">
          Total Assignments: {total}
        </span>
      }
    />
  );
}