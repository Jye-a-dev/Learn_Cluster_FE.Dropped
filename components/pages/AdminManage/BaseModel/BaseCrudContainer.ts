"use client";

import { useEffect, useState, useCallback } from "react";

export type BaseCrudOptions<T> = {
  fetchList: () => Promise<T[]>;
  fetchCount?: () => Promise<number>;
};

export function useBaseCrudContainer<T>({
  fetchList,
  fetchCount,
}: BaseCrudOptions<T>) {
  /* ===== DATA ===== */
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  /* ===== MODALS ===== */
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  /* ===== SELECTION ===== */
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  /* ===== FETCH ===== */
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [list, count] = await Promise.all([
        fetchList(),
        fetchCount?.(),
      ]);

      setItems(list);
      if (typeof count === "number") setTotalCount(count);
    } finally {
      setLoading(false);
    }
  }, [fetchList, fetchCount]);

  /* ===== INITIAL FETCH ===== */
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    /* data */
    items,
    loading,
    totalCount,

    /* modal state */
    openCreate,
    openUpdate,
    openDelete,

    /* selection */
    selectedItem,
    deleteTarget,

    /* setters */
    setItems,
    setOpenCreate,
    setOpenUpdate,
    setOpenDelete,
    setSelectedItem,
    setDeleteTarget,

    /* actions */
    refresh,
  };
}
