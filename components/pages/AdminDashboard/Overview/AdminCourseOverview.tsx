"use client";

import { useEffect, useState } from "react";
import { getCourseOverviewStats } from "@/hooks/courses/courseOverviewStats";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;
  draft: number;
  public: number;
  closed: number;

  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminCourseOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourseOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Khóa học"
      total={stats?.total ?? 0}
      loading={loading}
      extraTop={
        <div className="text-xs text-indigo-400 space-y-1">
          <div>Draft: {stats?.draft ?? 0}</div>
          <div>Public: {stats?.public ?? 0}</div>
          <div>Closed: {stats?.closed ?? 0}</div>
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