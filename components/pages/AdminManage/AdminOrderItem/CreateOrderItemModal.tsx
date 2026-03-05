"use client";

import { useState, useMemo } from "react";
import {
    ShoppingCartIcon,
    TagIcon,
    CubeIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useOrdersMap } from "@/hooks/orders/useOrdersMap";
import { usePlansMap } from "@/hooks/plans/usePlansMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

import type {
    AddOrderItemPayload,
    OrderItemType,
} from "@/hooks/order_items/getOrderItem";

export default function CreateOrderItemModal({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: AddOrderItemPayload) => Promise<void>;
}) {
    const { ordersMap, loading: loadingOrders } = useOrdersMap();
    const { plansMap, loading: loadingPlans } = usePlansMap();
    const { usersMap } = useUsersMap();
    const { coursesMap, loading: loadingCourses } = useCoursesMap();

    const [form, setForm] = useState<{
        order_id: string;
        item_type: OrderItemType;
        item_id: string;
        price: string;
    }>({
        order_id: "",
        item_type: "plan",
        item_id: "",
        price: "",
    });

    const courseOptions = useMemo(
        () => Object.values(coursesMap),
        [coursesMap]
    );

    const [submitting, setSubmitting] = useState(false);

    const isInvalid =
        !form.order_id ||
        !form.item_type ||
        !form.item_id ||
        !form.price ||
        Number(form.price) < 0;

    const planOptions = useMemo(
        () => Object.values(plansMap),
        [plansMap]
    );

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit({
                order_id: form.order_id,
                item_type: form.item_type,
                item_id: form.item_id,
                price: Number(form.price),
            });

            onClose();
            setForm({
                order_id: "",
                item_type: "plan",
                item_id: "",
                price: "",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Tạo Order Item"
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
                        const userName = user?.username ?? "Unknown User";

                        return (
                            <option key={o.id} value={o.id}>
                                {userName} – {o.id.slice(0, 8)}...
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Item Type */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <TagIcon className="h-4 w-4 text-white/40" />
                    Item Type
                </label>

                <select
                    className="input-admin text-zinc-400 border border-white/40 rounded-md"
                    value={form.item_type}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            item_type:
                                e.target
                                    .value as OrderItemType,
                            item_id: "",
                        })
                    }
                >
                    <option value="plan">Plan</option>
                    <option value="course">Course</option>
                </select>
            </div>

            {/* Item ID (Plan) */}
            {form.item_type === "plan" && (
                <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                        <CubeIcon className="h-4 w-4 text-white/40" />
                        Plan
                    </label>

                    <select
                        className="input-admin text-zinc-400 border border-white/40 rounded-md"
                        value={form.item_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                item_id: e.target.value,
                            })
                        }
                    >
                        <option value="">
                            {loadingPlans
                                ? "Loading..."
                                : "-- Chọn Plan --"}
                        </option>

                        {planOptions.map((p) => (
                            <option
                                key={p.id}
                                value={p.id}
                            >
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Item ID (Course placeholder) */}
            {form.item_type === "course" && (
                <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                        <CubeIcon className="h-4 w-4 text-white/40" />
                        Course
                    </label>

                    <select
                        className="input-admin text-zinc-400 border border-white/40 rounded-md"
                        value={form.item_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                item_id: e.target.value,
                            })
                        }
                    >
                        <option value="">
                            {loadingCourses
                                ? "Loading..."
                                : "-- Chọn Course --"}
                        </option>

                        {courseOptions.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Price */}
            <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <CurrencyDollarIcon className="h-4 w-4 text-white/40" />
                    Price (VND)
                </label>

                <input
                    type="number"
                    min={0}
                    step="1000"
                    className="input-admin text-zinc-400 border border-white/40 rounded-md"
                    placeholder="Ví dụ: 199000"
                    value={form.price}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            price: e.target.value,
                        })
                    }
                />
            </div>
        </BaseFormModal>
    );
}