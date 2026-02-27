"use client";

import { useEffect, useState } from "react";
import BaseGraph from "@/components/pages/AdminDashboard/Base/BaseGraph";
import {
  getStudyDateLessons,
  StudyDateLessonBE,
} from "@/hooks/study_date_lessons/getStudyDateLesson";

type ChartData = {
  date: string;
  total: number;
};

function groupByCreatedDate(
  items: StudyDateLessonBE[],
  days: number
): ChartData[] {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - days);

  const map: Record<string, number> = {};

  items.forEach((item) => {
    if (!item.created_by) return;

    const date = new Date(item.created_by);
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

export default function AdminStudyDateLessonGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const lessons = await getStudyDateLessons();
        const chartData = groupByCreatedDate(lessons, 30);
        setData(chartData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseGraph
      title="Study Date Lessons (Last 30 Days)"
      data={data}
      dataKey="total"
      xKey="date"
      chartType="line"
      color="#ec4899"
      loading={loading}
    />
  );
}