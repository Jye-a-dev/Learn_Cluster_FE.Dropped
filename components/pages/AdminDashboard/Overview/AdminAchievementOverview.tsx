"use client";

import { useEffect, useState } from "react";
import { getAchievementOverviewStats } from "@/hooks/achievement/achievementOverviewStats";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

type Stats = {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
};

export default function AdminAchievementOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievementOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Thành tựu"
      total={stats?.total ?? 0}
      loading={loading}
      growths={[
        { label: "7 ngày", value: stats?.growth7 ?? 0 },
        { label: "21 ngày", value: stats?.growth21 ?? 0 },
        { label: "30 ngày", value: stats?.growth30 ?? 0 },
      ]}
    />
  );
}