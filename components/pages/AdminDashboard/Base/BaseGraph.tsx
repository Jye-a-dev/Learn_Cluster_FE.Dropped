"use client";

import { ReactNode } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type ChartType = "line" | "bar" | "pie";

type BaseGraphProps<T extends Record<string, unknown>> = {
  title: string;
  data: T[];
  dataKey: string;
  xKey: string;
  chartType?: ChartType;
  color?: string;
  loading?: boolean;
  emptyText?: string;
  extraTop?: ReactNode;
  height?: number;
};

export default function BaseGraph<T extends Record<string, unknown>>({
  title,
  data,
  dataKey,
  xKey,
  chartType = "line",
  color = "#6366f1",
  loading,
  emptyText = "Không có dữ liệu",
  extraTop,
  height = 260,
}: BaseGraphProps<T>) {
  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-white text-sm">
        Đang tải...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-white text-sm">
        {emptyText}
      </div>
    );
  }

  const tooltipStyle = {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 8,
    fontSize: "12px",
  };

  const pieColors = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f43f5e",
    "#22d3ee",
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md text-white">
      <h2 className="text-xs text-slate-400 mb-3 uppercase tracking-wide">
        {title}
      </h2>

      {extraTop && <div className="mb-3">{extraTop}</div>}

      <ResponsiveContainer width="100%" height={height}>
        {chartType === "line" && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        )}

        {chartType === "bar" && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={xKey} stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        )}

        {chartType === "pie" && (
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 8,
                fontSize: "12px",
                color: "#ffffff",
              }}
              itemStyle={{ color: "#ffffff" }}
              labelStyle={{ color: "#ffffff" }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#ffffff" }} />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}