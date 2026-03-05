"use client";

import BaseTable, {
    BaseColumn,
} from "../BaseModel/BaseTable";

import OrderItemActions from "./OrderItemActions";

import type { OrderItem } from "@/hooks/order_items/getOrderItem";
import type { Order } from "@/hooks/orders/getOrder";
import type { Plan } from "@/hooks/plans/getPlan";
import type { User } from "@/hooks/users/getUsers";
import type { Course } from "@/hooks/courses/getCourse";

type Props = {
    orderItems: OrderItem[];
    ordersMap: Record<string, Order>;
    plansMap: Record<string, Plan>;
    coursesMap: Record<string, Course>; // thêm
    usersMap: Record<string, User>;
    onEdit: (item: OrderItem) => void;
    onDelete: (item: OrderItem) => void;
};

export default function OrderItemTable({
    orderItems,
    ordersMap,
    plansMap,
    coursesMap, // thêm
    usersMap,
    onEdit,
    onDelete,
}: Props) {
    const columns: BaseColumn<OrderItem>[] = [
        {
            key: "order",
            header: "Order",
            className: "px-3 py-2 text-xs text-white/70",
            render: (item) => {
                const order = ordersMap[item.order_id];
                const user = order
                    ? usersMap[order.user_id]
                    : undefined;

                const userName = user?.username ?? "Unknown User";
                return (
                    <div className="flex flex-col">
                        <span className="text-white font-medium">
                            {userName}
                        </span>
                        <span className="text-xs text-white/40 truncate max-w-45">
                            Order ID: {item.order_id}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "type",
            header: "Type",
            className: "px-3 py-2 text-center",
            render: (item) => (
                <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white">
                    {item.item_type}
                </span>
            ),
        },
        {
            key: "item",
            header: "Item",
            className: "px-3 py-2",
            render: (item) => {
                if (item.item_type === "plan") {
                    const plan = plansMap[item.item_id];

                    return (
                        <div className="flex flex-col">
                            <span className="text-white">
                                {plan?.name ?? item.item_id}
                            </span>
                            {plan?.description && (
                                <span className="text-xs text-white/40 truncate max-w-xs">
                                    {plan.description}
                                </span>
                            )}
                        </div>
                    );
                }

                if (item.item_type === "course") {
                    const course = coursesMap[item.item_id];

                    return (
                        <div className="flex flex-col">
                            <span className="text-white">
                                {course?.title ?? item.item_id}
                            </span>
                            {course?.description && (
                                <span className="text-xs text-white/40 truncate max-w-xs">
                                    {course.description}
                                </span>
                            )}
                        </div>
                    );
                }

                return (
                    <span className="text-white">
                        {item.item_id}
                    </span>
                );
            },
        },
        {
            key: "price",
            header: "Price",
            className: "px-3 py-2 text-right font-semibold",
            render: (item) =>
                Number(item.price).toLocaleString("vi-VN") + " ₫",
        },
        {
            key: "actions",
            header: "",
            className: "px-3 py-2 text-right",
            render: (item) => (
                <OrderItemActions
                    orderItem={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <BaseTable
            data={orderItems}
            columns={columns}
            emptyText="Không có order item"
            tableClassName="w-full text-sm text-white"
            headClassName="bg-white/5"
            rowClassName={() =>
                "border-t border-white/10 hover:bg-white/5 align-middle"
            }
        />
    );
}