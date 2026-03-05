"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { OrderItem } from "./OrderItemUIType";

export default function OrderItemActions({
    orderItem,
    onEdit,
    onDelete,
}: {
    orderItem: OrderItem;
    onEdit: (order: OrderItem) => void;
    onDelete: (order: OrderItem) => void;
}) {
    return (
        <BaseAction
            items={[
                { label: "Sửa", onClick: () => onEdit(orderItem) },
                { label: "Xoá", onClick: () => onDelete(orderItem), danger: true },
            ]}
        />
    );
}