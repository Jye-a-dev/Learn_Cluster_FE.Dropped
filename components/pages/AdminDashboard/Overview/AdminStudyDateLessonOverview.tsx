"use client";

import { useEffect, useState } from "react";
import { getStudyDateLessonOverviewStats } from "@/hooks/study_date_lessons/studyDateLessonOverview";

type Stats = {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminStudyDateLessonOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudyDateLessonOverviewStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (!stats) return <div>Không có dữ liệu</div>;

  const renderGrowth = (value: number) => {
    const positive = value >= 0;

    return (
      <span
        className={`text-sm font-medium ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {positive ? "+" : ""}
        {value.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
      <h2 className="text-slate-300 text-sm mb-2">
        Tổng Lesson trong Study Date
      </h2>

      <div className="text-3xl font-bold text-white mb-4">
        {stats.total}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-400">
          <span>7 ngày</span>
          {renderGrowth(stats.growth7)}
        </div>

        <div className="flex justify-between text-slate-400">
          <span>21 ngày</span>
          {renderGrowth(stats.growth21)}
        </div>

        <div className="flex justify-between text-slate-400">
          <span>30 ngày</span>
          {renderGrowth(stats.growth30)}
        </div>
      </div>
    </div>
  );
}