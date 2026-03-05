"use client";

import { useEffect, useState } from "react";
import {
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import type {
  Order,
  UpdateOrderPayload,
  OrderStatus,
} from "./OrderUiTypes";

type Props = {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSubmit: (
    id: string,
    data: UpdateOrderPayload
  ) => Promise<void>;
};

export default function UpdateOrderModal({
  open,
  order,
  onClose,
  onSubmit,
}: Props) {
  const { usersMap, loading } = useUsersMap();

  const [form, setForm] = useState({
    user_id: "",
    total_amount: 0,
    status: "pending" as OrderStatus,
  });

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (!open || !order) return;

    setForm({
      user_id: order.user_id,
      total_amount: order.total_amount,
      status: order.status,
    });
  }, [open, order]);

  if (!open || !order) return null;

  const selectedUser =
    usersMap[form.user_id];

  const isInvalid =
    !form.user_id.trim() ||
    form.total_amount < 0;

  const newOrder = order 

  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      await onSubmit(newOrder.id, {
        user_id: form.user_id,
        total_amount: Number(form.total_amount),
        status: form.status,
      });

      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseFormModal
      open={open}
      title="Cập nhật Order"
      submitting={submitting}
      isInvalid={isInvalid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* USER INFO */}
      <div className="grid grid-cols-[140px_1fr] items-start gap-3">
        <label className="flex items-center gap-2 pt-2 text-xs font-medium text-white/70">
          <UserIcon className="h-4 w-4 text-white/40" />
          User
        </label>

        <div className="space-y-2">
          {loading && (
            <div className="text-xs text-white/40">
              Đang tải user...
            </div>
          )}

          {selectedUser && (
            <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg">
              <div className="font-semibold">
                {selectedUser.name ??
                  selectedUser.username}
              </div>
              <div className="text-xs opacity-70">
                {selectedUser.email}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AMOUNT */}
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-white/70">
          <CurrencyDollarIcon className="h-4 w-4 text-white/40" />
          Total (VND)
        </label>

        <div className="space-y-1">
          <input
            type="number"
            min={0}
            step="1000"
            className="input-admin text-white border border-white/40 rounded-md w-full"
            value={form.total_amount}
            onChange={(e) =>
              setForm({
                ...form,
                total_amount: Number(e.target.value),
              })
            }
          />

          {!Number.isNaN(form.total_amount) && (
            <div className="text-sm font-semibold text-emerald-400">
              {form.total_amount.toLocaleString("vi-VN")} ₫
            </div>
          )}
        </div>
      </div>

      {/* STATUS */}
      <div className="grid grid-cols-[140px_1fr] items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-white/70">
          <CheckCircleIcon className="h-4 w-4 text-white/40" />
          Status
        </label>

        <select
          className="input-admin text-zinc-400 border border-white/40 rounded-md"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value as OrderStatus,
            })
          }
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </BaseFormModal>
  );
}