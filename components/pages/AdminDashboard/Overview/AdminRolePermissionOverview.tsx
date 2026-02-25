"use client";

import { useEffect, useState } from "react";
import { getRolePermissionOverviewStats } from "@/hooks/permissionRole/rolePermissionOverview";

type Stats = {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
  byRole: Record<string, number>;
};

export default function AdminRolePermissionOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRolePermissionOverviewStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (!stats) return <div>Không dữ liệu</div>;

  const renderGrowth = (value: number) => {
    const positive = value >= 0;

    return (
      <span
        className={`text-sm font-medium ${
          positive ? "text-green-600" : "text-red-600"
        }`}
      >
        {positive ? "+" : ""}
        {value.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="bg-slate-800 border text-white border-slate-700 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Role Permission Overview
      </h2>

      <div className="text-4xl font-bold mb-6">
        {stats.total}
      </div>

      <div className="space-y-2 text-sm mb-6">
        <div className="flex justify-between">
          <span>7 ngày</span>
          {renderGrowth(stats.growth7)}
        </div>
        <div className="flex justify-between">
          <span>21 ngày</span>
          {renderGrowth(stats.growth21)}
        </div>
        <div className="flex justify-between">
          <span>30 ngày</span>
          {renderGrowth(stats.growth30)}
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4 space-y-2 text-sm">
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