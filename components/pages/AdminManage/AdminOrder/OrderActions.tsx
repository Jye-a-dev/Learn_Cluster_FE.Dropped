"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Order } from "./OrderUiTypes";

export function OrderActions({
    order,
    onEdit,
    onDelete,
}: {
    order: Order;
    onEdit: (order: Order) => void;
    onDelete: (order: Order) => void;
}) {
    return (
        <BaseAction
            items={[
                { label: "Sửa", onClick: () => onEdit(order) },
                { label: "Xoá", onClick: () => onDelete(order), danger: true },
            ]}
        />
    );
}
