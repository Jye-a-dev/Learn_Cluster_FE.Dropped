"use client";

import { useMemo, useState } from "react";

import {
    getMessages,
    addMessage,
    updateMessage,
    deleteMessage,
} from "@/hooks/message/getMessage";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import MessageTable from "./MessageTable";
import CreateMessageModal from "./CreateMessageModal";
import UpdateMessageModal from "./UpdateMessageModal";
import ConfirmDeleteMessageModal from "./ConfirmDeleteMessageModal";
import SearchMessage from "./SearchMessage";
import CreateMessageButton from "./CreateMessageButton";

import type {
    Message,
    CreateMessagePayload,
    UpdateMessagePayload,
} from "./MessageUiTypes";

export default function AdminMessageContainer() {
    const [search, setSearch] = useState("");

    /* ===================== CRUD ===================== */
    const crud = useBaseCrudContainer<Message>({
        fetchList: async () => {
            const data = await getMessages();

            if (!data) return [];

            return data.map((m) => ({
                id: m.id,
                study_date_id: m.study_date_id,
                sender_id: m.sender_id ?? null,
                content: m.content ?? null,
                sent_at: m.sent_at ?? "", // ép undefined -> ""
            }));
        },
    });


    /* ===================== FILTER ===================== */
    const filteredMessages = useMemo(() => {
        const q = search.toLowerCase();

        return crud.items.filter((m) => {
            const content = m.content?.toLowerCase() ?? "";
            const sender = m.sender_id?.toLowerCase() ?? "";
            const studyDate = m.study_date_id.toLowerCase();

            return (
                content.includes(q) ||
                sender.includes(q) ||
                studyDate.includes(q)
            );
        });
    }, [crud.items, search]);

    /* ===================== HANDLERS ===================== */
    async function handleCreate(data: CreateMessagePayload) {
        await addMessage(data);
        await crud.refresh();
    }

    async function handleUpdate(id: string, data: UpdateMessagePayload) {
        await updateMessage(id, data);
        await crud.refresh();
    }

    async function handleConfirmDelete(id: string) {
        await deleteMessage(id);
        await crud.refresh();
    }

    /* ===================== RENDER ===================== */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Message | Tổng: {crud.items.length}
                </h1>

                <CreateMessageButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            <SearchMessage
                search={search}
                onSearchChange={setSearch}
            />

            {crud.loading ? (
                <p className="text-white/60">Đang tải message…</p>
            ) : filteredMessages.length === 0 ? (
                <p className="text-white/60">Chưa có message</p>
            ) : (
                <MessageTable
                    messages={filteredMessages}
                    onEdit={(m) => {
                        crud.setSelectedItem(m);
                        crud.setOpenUpdate(true);
                    }}
                    onDelete={(m) => {
                        crud.setDeleteTarget(m);
                        crud.setOpenDelete(true);
                    }}
                />
            )}

            <CreateMessageModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateMessageModal
                open={crud.openUpdate}
                message={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteMessageModal
                open={crud.openDelete}
                message={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
