"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import {
  getSubmissions,
  SubmissionBE,
} from "@/hooks/submission/getSubmission";

type ChartData = {
  date: string;
  total: number;
};

function groupByDate(submissions: SubmissionBE[], days: number): ChartData[] {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - days);

  const map: Record<string, number> = {};

  submissions.forEach((s) => {
    if (!s.submitted_at) return;

    const date = new Date(s.submitted_at);
    if (date < start) return;

    const key = date.toISOString().split("T")[0];

    map[key] = (map[key] || 0) + 1;
  });

  // đảm bảo đủ ngày kể cả không có submission
  const result: ChartData[] = [];

  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const key = d.toISOString().split("T")[0];

    result.push({
      date: key,
      total: map[key] || 0,
    });
  }

  return result;
}

export default function AdminSubmissionGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const submissions = await getSubmissions();
        const chartData = groupByDate(submissions, 30);
        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Submission Trend (Last 30 Days)"
      data={data}
      dataKey="total"
      xKey="date"
      loading={loading}
      chartType="line"
      color="#f59e0b"
    />
  );
}