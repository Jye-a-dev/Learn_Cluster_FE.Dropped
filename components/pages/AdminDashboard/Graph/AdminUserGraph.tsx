"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import { getUsers, User } from "@/hooks/users/getUsers";

type ChartData = {
  date: string;
  total: number;
};

function groupByDate(users: User[], days: number): ChartData[] {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - days);

  const map: Record<string, number> = {};

  users.forEach((u) => {
    if (!u.created_at) return;

    const date = new Date(u.created_at);
    if (date < start) return;

    const key = date.toISOString().split("T")[0];
    map[key] = (map[key] || 0) + 1;
  });

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

export default function AdminUserGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getUsers();
        const chartData = groupByDate(users, 30);
        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="User Growth (Last 30 Days)"
      data={data}
      dataKey="total"
      xKey="date"
      loading={loading}
      chartType="line"
      color="#10b981"
    />
  );
}