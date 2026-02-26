"use client";

import { ReactNode } from "react";

type Growth = {
  label: string;
  value: number;
};

type BaseOverviewProps = {
  title: string;
  total: number;
  growths?: Growth[];
  extraTop?: ReactNode;     // ví dụ: upcoming
  breakdown?: Record<string, number>; // ví dụ: byRole
  loading?: boolean;
  emptyText?: string;
};

export default function BaseOverview({
  title,
  total,
  growths,
  extraTop,
  breakdown,
  loading,
  emptyText = "Không có dữ liệu",
}: BaseOverviewProps) {
  if (loading) return <div>Đang tải...</div>;
  if (total === undefined || total === null) return <div>{emptyText}</div>;

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
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg text-white">
      <h2 className="text-sm text-slate-300 mb-2">{title}</h2>

      <div className="text-3xl font-bold mb-2">{total}</div>

      {extraTop && <div className="mb-4">{extraTop}</div>}

      {growths && (
        <div className="space-y-2 text-sm mb-4">
          {growths.map((g) => (
            <div
              key={g.label}
              className="flex justify-between text-slate-400"
            >
              <span>{g.label}</span>
              {renderGrowth(g.value)}
            </div>
          ))}
        </div>
      )}

      {breakdown && (
        <div className="border-t border-slate-700 pt-4 space-y-2 text-sm">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span>{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}