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
  CreateOrderPayload,
  OrderStatus,
} from "./OrderUiTypes";

export default function CreateOrderModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateOrderPayload) => Promise<void>;
}) {
  const { usersMap, loading } = useUsersMap();
  const users = Object.values(usersMap);

  const [form, setForm] = useState({
    user_id: "",
    total_amount: "",
    status: "pending" as OrderStatus,
  });

  const [submitting, setSubmitting] = useState(false);

  const isInvalid =
    !form.user_id ||
    !form.total_amount ||
    Number(form.total_amount) < 0;

  useEffect(() => {
    if (!open) return;
    setForm({
      user_id: "",
      total_amount: "",
      status: "pending",
    });
  }, [open]);

  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      await onSubmit({
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
      title="Tạo Order"
      submitting={submitting}
      isInvalid={isInvalid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">

        {/* USER */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-white/60 pt-3">
            <UserIcon className="h-4 w-4 text-white/40" />
            User
          </label>

          <select
            className="w-full bg-zinc-900 border border-white/20 hover:border-white/40 transition rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            value={form.user_id}
            onChange={(e) =>
              setForm({ ...form, user_id: e.target.value })
            }
            disabled={loading}
          >
            <option value="">
              {loading ? "Đang tải user..." : "-- Chọn user --"}
            </option>

            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.username ?? "User"} - {u.email}
              </option>
            ))}
          </select>
        </div>

        {/* AMOUNT */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-white/60 pt-3">
            <CurrencyDollarIcon className="h-4 w-4 text-white/40" />
            Total (VND)
          </label>

          <div className="space-y-2">
            <input
              type="number"
              min={0}
              step="1000"
              className="w-full bg-zinc-900 border border-white/20 hover:border-white/40 transition rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              placeholder="Ví dụ: 199000"
              value={form.total_amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  total_amount: e.target.value,
                })
              }
            />

            {form.total_amount &&
              !Number.isNaN(Number(form.total_amount)) && (
                <div className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg">
                  {Number(form.total_amount).toLocaleString("vi-VN")} ₫
                </div>
              )}
          </div>
        </div>

        {/* STATUS */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-white/60 pt-3">
            <CheckCircleIcon className="h-4 w-4 text-white/40" />
            Status
          </label>

          <select
            className="w-full bg-zinc-900 border border-white/20 hover:border-white/40 transition rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as OrderStatus,
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

      </div>
    </BaseFormModal>
  );
}