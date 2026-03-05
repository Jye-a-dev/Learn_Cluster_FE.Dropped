"use client";

import { useMemo, useState } from "react";

import {
    getOrderItems,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem,
    countOrderItems,
    type OrderItem as OrderItemApi,
} from "@/hooks/order_items/getOrderItem";

import { useOrdersMap } from "@/hooks/orders/useOrdersMap";
import { usePlansMap } from "@/hooks/plans/usePlansMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreateOrderItemButton from "./CreateOrderItemButton";
import OrderItemTable from "./OrderItemTable";
import SearchOrderItem from "./SearchOrderItem";
import CreateOrderItemModal from "./CreateOrderItemModal";
import UpdateOrderItemModal from "./UpdateOrderItemModal";
import ConfirmDeleteOrderItemModal from "./ConfirmDeleteOrderItemModal";

import type {
    OrderItem,
    AddOrderItemPayload,
    UpdateOrderItemPayload,
} from "@/hooks/order_items/getOrderItem";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

type OrderItemRaw = OrderItemApi;

export default function AdminOrderItemContainer() {
    const [search, setSearch] = useState("");

    const { ordersMap } = useOrdersMap();
    const { plansMap } = usePlansMap();
    const { usersMap } = useUsersMap();
    const { coursesMap } = useCoursesMap();
    const crud = useBaseCrudContainer<OrderItem>({
        fetchList: async () => {
            const items =
                (await getOrderItems()) as OrderItemRaw[];

            return items.map((i) => ({
                ...i,
                price: Number(i.price),
            }));
        },
        fetchCount: countOrderItems,
    });

    /* ================= CREATE ================= */
    async function handleCreate(
        data: AddOrderItemPayload
    ) {
        await addOrderItem(data);
        crud.setOpenCreate(false);
        crud.refresh();
    }

    /* ================= UPDATE ================= */
    function handleEdit(item: OrderItem) {
        crud.setSelectedItem(item);
        crud.setOpenUpdate(true);
    }

    async function handleUpdate(
        id: string,
        data: UpdateOrderItemPayload
    ) {
        await updateOrderItem(id, data);
        crud.setOpenUpdate(false);
        crud.setSelectedItem(null);
        crud.refresh();
    }

    /* ================= DELETE ================= */
    function handleDelete(item: OrderItem) {
        crud.setDeleteTarget(item);
        crud.setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteOrderItem(id);
        crud.setOpenDelete(false);
        crud.setDeleteTarget(null);
        crud.refresh();
    }

    /* ================= SEARCH ================= */
    const filteredItems = useMemo(() => {
        const q = search.toLowerCase();

        return crud.items.filter((item) => {
            const planName =
                plansMap[item.item_id]?.name ?? "";

            return (
                String(item.order_id)
                    .toLowerCase()
                    .includes(q) ||
                String(item.item_type)
                    .toLowerCase()
                    .includes(q) ||
                String(planName)
                    .toLowerCase()
                    .includes(q)
            );
        });
    }, [crud.items, search, plansMap]);

    /* ================= RENDER ================= */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Order Item | Tổng:{" "}
                    {crud.totalCount}
                </h1>

                <CreateOrderItemButton
                    onClick={() =>
                        crud.setOpenCreate(true)
                    }
                />
            </div>

            <SearchOrderItem
                search={search}
                onSearchChange={setSearch}
            />

            {crud.loading ? (
                <p className="text-white/60">
                    Đang tải order item…
                </p>
            ) : (
                <OrderItemTable
                    orderItems={filteredItems}
                    ordersMap={ordersMap}
                    plansMap={plansMap}
                    coursesMap={coursesMap}
                    usersMap={usersMap}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreateOrderItemModal
                open={crud.openCreate}
                onClose={() =>
                    crud.setOpenCreate(false)
                }
                onSubmit={handleCreate}
            />

            <UpdateOrderItemModal
                open={crud.openUpdate}
                orderItem={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteOrderItemModal
                open={crud.openDelete}
                OrderItem={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}