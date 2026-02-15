"use client";

import { useMemo, useState } from "react";
import {
    getNotifications,
    addNotification,
    markNotificationRead,
    deleteNotification,
    type NotificationBE,
} from "@/hooks/notification/getNotification";

import { useBaseCrudContainer } from "@/components/pages/AdminManage/BaseModel/BaseCrudContainer";

import CreateNotificationButton from "./CreateNotificationButton";
import NotificationTable from "./NotificationTable";
import SearchNotification from "./SearchNotification";
import CreateNotificationModal from "./CreateNotificationModal";
import ConfirmDeleteNotificationModal from "./ConfirmDeleteNotificationModal";

import type {
    Notification,
    CreateNotificationPayload,
} from "./NotificationUiTypes";

/* ===================== MAPPER ===================== */

function mapBEToUI(n: NotificationBE): Notification {
    return {
        id: n.id,
        title: n.content ?? "",
        user_id: n.user_id,
        type: n.type ?? null,
        content: n.content ?? null,
        is_read: n.is_read,
        created_at: n.created_at,
    };
}

export default function AdminNotificationContainer() {
    const [search, setSearch] = useState("");

    const {
        items,
        loading,
        openCreate,
        openDelete,
        deleteTarget,
        setOpenCreate,
        setOpenDelete,
        setDeleteTarget,
        refresh,
    } = useBaseCrudContainer<Notification>({
        fetchList: async () => {
            const data = await getNotifications();
            return data.map(mapBEToUI);
        },
    });

    async function handleCreate(
        data: CreateNotificationPayload
    ) {
        await addNotification(data);
        setOpenCreate(false);
        refresh();
    }

    async function handleMarkRead(n: Notification) {
        if (n.is_read) return;
        await markNotificationRead(n.id);
        refresh();
    }

    function handleDelete(n: Notification) {
        setDeleteTarget(n);
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteNotification(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return items.filter(
            (n) =>
                (n.type ?? "")
                    .toLowerCase()
                    .includes(q) ||
                (n.content ?? "")
                    .toLowerCase()
                    .includes(q)
        );
    }, [items, search]);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Notification
                </h1>

                <CreateNotificationButton
                    onClick={() => setOpenCreate(true)}
                />
            </div>

            <SearchNotification
                search={search}
                onSearchChange={setSearch}
            />

            {loading ? (
                <p className="text-white/60">
                    Đang tải notifications…
                </p>
            ) : (
                <NotificationTable
                    notifications={filtered}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                />
            )}

            <CreateNotificationModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <ConfirmDeleteNotificationModal
                open={openDelete}
                notification={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
