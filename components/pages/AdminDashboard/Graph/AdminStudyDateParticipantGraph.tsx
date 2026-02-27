"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import {
  getStudyDateParticipants,
  StudyDateParticipant,
} from "@/hooks/study_date_participant/getStudyDateParticipant";

type ChartData = {
  date: string;
  total: number;
};

function groupByDate(
  items: StudyDateParticipant[],
  days: number
): ChartData[] {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - days);

  const map: Record<string, number> = {};

  items.forEach((item) => {
    if (!item.created_at) return;

    const date = new Date(item.created_at);
    if (date < start || date > now) return;

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

export default function AdminStudyDateParticipantGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const participants = await getStudyDateParticipants();
        const chartData = groupByDate(participants, 30);
        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Study Date Participants (Last 30 Days)"
      data={data}
      dataKey="total"
      xKey="date"
      chartType="line"
      color="#3b82f6"
      loading={loading}
    />
  );
}