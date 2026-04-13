"use client";

import { useEffect, useState } from "react";

interface Props {
  onFilter: (filters: {
    search: string;
    status: string;
    sort: string;
  }) => void;
}

export default function CourseFilter({ onFilter }: Props) {
  const [search, setSearch] = useState("");
  const [status] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    onFilter({
      search,
      status,
      sort,
    });
  }, [search, status, sort, onFilter]);

  return (
    <div className="bg-white/90 border border-emerald-100 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <div className="flex items-center gap-2 w-full md:w-80 bg-emerald-50 rounded-xl px-3 py-2 border border-emerald-100 focus-within:ring-2 focus-within:ring-emerald-300">
        <input
          type="text"
          placeholder="Tìm khóa học..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none w-full text-sm placeholder:text-emerald-400"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-emerald-200 cursor-pointer border border-emerald-700 rounded-xl px-3 py-2 text-sm text-emerald-700 focus:ring-2 focus:ring-emerald-300 outline-none"
        >
          <option value="newest">Mới nhất</option>
          <option value="title">Tên A-Z</option>
          <option value="duration_desc">Giờ học: nhiều → ít</option>
          <option value="duration_asc">Giờ học: ít → nhiều</option>
        </select>
      </div>
    </div>
  );
}
