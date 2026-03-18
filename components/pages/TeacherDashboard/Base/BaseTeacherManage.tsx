"use client";

import { useState, useEffect } from "react";

type Props<T> = {
  data: T[];
  fetchData: () => Promise<T[]>;
  onAdd?: () => Promise<void>;
  renderItem: (item: T, refresh: () => Promise<void>) => React.ReactNode;
  renderAdd?: (refresh: () => Promise<void>) => React.ReactNode;
};

export default function BaseTeacherManage<T>({
  data,
  fetchData,
  onAdd,
  renderItem,
  renderAdd,
}: Props<T>) {

  const [list, setList] = useState<T[]>(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const refresh = async () => {
    const updated = await fetchData();
    setList(updated);
  };

  const handleAdd = async () => {
    if (!onAdd) return;
    await onAdd();
    await refresh();
  };

  return (
    <div className="space-y-3">

      <div className="border rounded-lg max-h-64 overflow-auto divide-y no-scrollbar">
        {list.map((item, i) => (
          <div key={i}>{renderItem(item, refresh)}</div>
        ))}
      </div>

      {renderAdd && (
        <div className="space-y-2">
          {renderAdd(handleAdd)}
        </div>
      )}

    </div>
  );
}