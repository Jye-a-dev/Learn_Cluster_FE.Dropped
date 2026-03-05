"use client";

import { useState, useMemo } from "react";
import {
    ShoppingCartIcon,
    CurrencyDollarIcon,
    CalendarDaysIcon,
    ReceiptPercentIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreatePaymentPayload } from "./PaymentUIType";

import { useOrdersMap } from "@/hooks/orders/useOrdersMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

export default function CreatePaymentModal({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePaymentPayload) => Promise<void>;
}) {
    const { ordersMap, loading: loadingOrders } = useOrdersMap();
    const { usersMap } = useUsersMap();

    const [form, setForm] = useState({
        order_id: "",
        provider: "",
        transaction_code: "",
        amount: "",
        status: "pending" as "pending" | "success" | "failed",
        paid_at: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const isInvalid =
        !form.order_id ||
        (form.amount !== "" && Number(form.amount) < 0);

    // Auto generate receipt
    const receiptObject = useMemo(
        () => ({
            order_id: form.order_id,
            provider: form.provider.trim() || null,
            transaction_code:
                form.transaction_code.trim() || null,
            amount: form.amount
                ? Number(form.amount)
                : null,
            status: form.status,
            paid_at: form.paid_at || null,
        }),
        [form]
    );

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit({
                ...receiptObject,
                raw_response: receiptObject,
            });

            onClose();

            setForm({
                order_id: "",
                provider: "",
                transaction_code: "",
                amount: "",
                status: "pending",
                paid_at: "",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Tạo Payment"
            submitting={submitting}
            isInvalid={isInvalid}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            {/* Order */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <ShoppingCartIcon className="h-4 w-4 text-white/40" />
                    Order
                </label>

                <select
                    className="input-admin text-zinc-400 border border-white/40 rounded-md"
                    value={form.order_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            order_id: e.target.value,
                        })
                    }
                >
                    <option value="">
                        {loadingOrders
                            ? "Loading..."
                            : "-- Chọn Order --"}
                    </option>

                    {Object.values(ordersMap).map((o) => {
                        const user = usersMap[o.user_id];
                        const userName =
                            user?.username ?? "Unknown User";

                        return (
                            <option key={o.id} value={o.id}>
                                {userName} – {o.id.slice(0, 8)}...
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Provider */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="text-xs font-medium text-white/70">
                    Provider
                </label>
                <input
                    className="input-admin text-white border border-white/40 rounded-md"
                    placeholder="momo | stripe | vnpay"
                    value={form.provider}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            provider: e.target.value,
                        })
                    }
                />
            </div>

            {/* Transaction Code */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="text-xs font-medium text-white/70">
                    Transaction
                </label>
                <input
                    className="input-admin text-white border border-white/40 rounded-md"
                    value={form.transaction_code}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            transaction_code:
                                e.target.value,
                        })
                    }
                />
            </div>

            {/* Amount */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <CurrencyDollarIcon className="h-4 w-4 text-white/40" />
                    Amount (VND)
                </label>
                <input
                    type="number"
                    min={0}
                    step="1000"
                    className="input-admin text-white border border-white/40 rounded-md"
                    value={form.amount}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            amount: e.target.value,
                        })
                    }
                />
            </div>

            {/* Paid At */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <CalendarDaysIcon className="h-4 w-4 text-white/40" />
                    Paid At
                </label>
                <input
                    type="datetime-local"
                    className="input-admin text-white border border-white/40 rounded-md"
                    value={form.paid_at}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            paid_at: e.target.value,
                        })
                    }
                />
            </div>

            {/* Auto Receipt */}
            <div className="grid grid-cols-[140px_1fr] items-start gap-3">
                <label className="flex items-center gap-2 pt-2 text-xs font-medium text-white/70">
                    <ReceiptPercentIcon className="h-4 w-4 text-white/40" />
                    Biên lai
                </label>

                <div className="relative">
                    <textarea
                        rows={6}
                        readOnly
                        value={JSON.stringify(
                            receiptObject,
                            null,
                            2
                        )}
                        className="input-admin font-mono text-xs text-white border border-white/40 rounded-md bg-neutral-900 no-scrollbar"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                JSON.stringify(
                                    receiptObject,
                                    null,
                                    2
                                )
                            )
                        }
                        className="absolute top-2 right-2 text-xs px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600"
                    >
                        Copy
                    </button>
                </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="text-xs font-medium text-white/70">
                    Status
                </label>

                <select
                    className="input-admin text-white border border-white/40 rounded-md"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status:
                                e.target.value as
                                | "pending"
                                | "success"
                                | "failed",
                        })
                    }
                >
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
        </BaseFormModal>
    );
}