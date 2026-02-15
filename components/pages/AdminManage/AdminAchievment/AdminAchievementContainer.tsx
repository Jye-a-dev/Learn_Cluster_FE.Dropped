"use client";

import { useMemo, useState } from "react";
import {
    getAchievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    type AchievementBE,
} from "@/hooks/achievement/getAchievement";

import { useBaseCrudContainer } from "@/components/pages/AdminManage/BaseModel/BaseCrudContainer";

import CreateAchievementButton from "./CreateAchievementButton";
import AchievementTable from "./AchievementTable";
import SearchAchievement from "./SearchAchievement";
import CreateAchievementModal from "./CreateAchievementModal";
import UpdateAchievementModal from "./UpdateAchievementModal";
import ConfirmDeleteAchievementModal from "./ConfirmDeleteAchievementModal";

import type {
    Achievement,
    CreateAchievementPayload,
    UpdateAchievementPayload,
} from "./AchievementUiTypes";

/* ===================== MAPPER ===================== */

function mapBEToUI(a: AchievementBE): Achievement {
    return {
        id: a.id,
        title: a.name,
        user_id: a.user_id,
        name: a.name,
        description: a.description ?? null,
        awarded_at: a.awarded_at,
    };
}

export default function AdminAchievementContainer() {
    const [search, setSearch] = useState("");

    const {
        items,
        loading,
        openCreate,
        openUpdate,
        openDelete,
        selectedItem,
        deleteTarget,
        setOpenCreate,
        setOpenUpdate,
        setOpenDelete,
        setSelectedItem,
        setDeleteTarget,
        refresh,
    } = useBaseCrudContainer<Achievement>({
        fetchList: async () => {
            const data = await getAchievements();
            return data.map(mapBEToUI);
        },
    });

    async function handleCreate(
        data: CreateAchievementPayload
    ) {
        await addAchievement(data);
        setOpenCreate(false);
        refresh();
    }

    function handleEdit(a: Achievement) {
        setSelectedItem(a);
        setOpenUpdate(true);
    }

    async function handleUpdate(
        id: string,
        data: UpdateAchievementPayload
    ) {
        if (!data.user_id || !data.name)
            throw new Error("Missing fields");

        await updateAchievement(id, {
            user_id: data.user_id,
            name: data.name,
            description: data.description ?? null,
        });

        setOpenUpdate(false);
        setSelectedItem(null);
        refresh();
    }

    function handleDelete(a: Achievement) {
        setDeleteTarget(a);
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteAchievement(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return items.filter(
            (a) =>
                a.name.toLowerCase().includes(q) ||
                (a.description ?? "")
                    .toLowerCase()
                    .includes(q)
        );
    }, [items, search]);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Achievement
                </h1>

                <CreateAchievementButton
                    onClick={() => setOpenCreate(true)}
                />
            </div>

            <SearchAchievement
                search={search}
                onSearchChange={setSearch}
            />

            {loading ? (
                <p className="text-white/60">
                    Đang tải achievements…
                </p>
            ) : (
                <AchievementTable
                    achievements={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreateAchievementModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateAchievementModal
                open={openUpdate}
                achievement={selectedItem}
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteAchievementModal
                open={openDelete}
                achievement={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
