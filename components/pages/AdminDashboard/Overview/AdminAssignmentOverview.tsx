"use client";

import { useEffect, useState } from "react";
import { getAssignmentOverviewStats } from "@/hooks/assignment/assignmentOverviewStats";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;
  upcoming: number;
  overdue: number;

  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminAssignmentOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignmentOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Bài tập"
      total={stats?.total ?? 0}
      loading={loading}
      extraTop={
        <div className="text-xs text-indigo-400 space-y-1">
          <div>Sắp đến hạn: {stats?.upcoming ?? 0}</div>
          <div>Quá hạn: {stats?.overdue ?? 0}</div>
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