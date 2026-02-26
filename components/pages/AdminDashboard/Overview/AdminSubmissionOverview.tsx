"use client";

import { useEffect, useState } from "react";
import { getSubmissionOverviewStats } from "@/hooks/submission/submissionOverview";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminSubmissionOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSubmissionOverviewStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BaseOverview
      title="Tổng bài nộp"
      total={stats?.total ?? 0}
      loading={loading}
      emptyText="Không có dữ liệu"
      growths={
        stats
          ? [
              { label: "7 ngày", value: stats.growth7 },
              { label: "21 ngày", value: stats.growth21 },
              { label: "30 ngày", value: stats.growth30 },
            ]
          : undefined
      }
    />
  );
}