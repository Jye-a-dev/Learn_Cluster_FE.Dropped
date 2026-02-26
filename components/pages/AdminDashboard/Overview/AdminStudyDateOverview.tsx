"use client";

import { useEffect, useState } from "react";
import { getStudyDateOverviewStats } from "@/hooks/study_dates/studyDateOverview";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;
  upcoming: number;
  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminStudyDateOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudyDateOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Lịch học"
      total={stats?.total ?? 0}
      loading={loading}
      extraTop={
        <div className="text-xs text-indigo-400">
          Sắp diễn ra: {stats?.upcoming ?? 0}
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