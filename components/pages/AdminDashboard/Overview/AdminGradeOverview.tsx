"use client";

import { useEffect, useState } from "react";
import { getGradeOverviewStats } from "@/hooks/grade/gradeOverview";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;

  graded: number;
  ungraded: number;

  avgScore: number;
  highestScore: number;
  lowestScore: number;

  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminGradeOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGradeOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Chấm điểm"
      total={stats?.total ?? 0}
      loading={loading}
      extraTop={
        <div className="text-xs text-indigo-400 space-y-1">
          <div>Đã chấm: {stats?.graded ?? 0}</div>
          <div>Chưa chấm: {stats?.ungraded ?? 0}</div>
          <div>Điểm TB: {stats?.avgScore ?? 0}</div>
        </div>
      }
      growths={[
        { label: "7 ngày", value: stats?.growth7 ?? 0 },
        { label: "21 ngày", value: stats?.growth21 ?? 0 },
        { label: "30 ngày", value: stats?.growth30 ?? 0 },
      ]}
    />
  );
}