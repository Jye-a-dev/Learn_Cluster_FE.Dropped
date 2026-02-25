"use client";

import { useEffect, useState } from "react";
import { getAdminRoleStats } from "@/hooks/roles/roleOverview";

type Stats = {
  totalUsers: number;
  byRole: Record<string, number>;
};

export default function AdminRoleOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAdminRoleStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (!stats) return <div>Không dữ liệu</div>;

  return (
    <div className="bg-slate-800 border text-white border-slate-700 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Phân bố User theo Role
      </h2>

      <div className="text-4xl font-bold mb-6">
        {stats.totalUsers}
      </div>

      <div className="space-y-2 text-sm">
        {Object.entries(stats.byRole).map(([role, count]) => (
          <div key={role} className="flex justify-between">
            <span>{role}</span>
            <span className="font-medium">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}