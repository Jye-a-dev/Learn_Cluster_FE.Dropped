"use client";

import { ReactNode } from "react";

type Props<T> = {
  title: string;
  items: T[];
  loading?: boolean;
  emptyText?: string;
  renderItem: (item: T) => ReactNode;
};

export default function BaseTeacherList<T>({
  title,
  items,
  loading,
  emptyText = "No data",
  renderItem,
}: Props<T>) {

  if (loading) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 text-gray-400 text-sm">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="bg-white/60 rounded-2xl border shadow-sm">

      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <span className="text-sm text-gray-500">
          {items.length}
        </span>

      </div>

      {/* List */}
      <div className="divide-y">

        {items.map((item, index) => (
          <div key={index} className="px-6 py-4">
            {renderItem(item)}
          </div>
        ))}

      </div>

    </div>
  );
}