"use client";

import { useEffect, useState } from "react";
import { getStudyDateLessonOverviewStats } from "@/hooks/study_date_lessons/studyDateLessonOverview";
import BaseOverview from "@/components/pages/AdminDashboard/Base/BaseOverview";

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
    getStudyDateLessonOverviewStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseOverview
      title="Tổng Lesson trong Study Date"
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