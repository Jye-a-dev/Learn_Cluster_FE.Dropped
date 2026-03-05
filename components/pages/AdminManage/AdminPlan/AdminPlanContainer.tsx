"use client";

import { useMemo, useState } from "react";
import {
    getPlans,
    addPlan,
    updatePlan,
    deletePlan,
    countPlans,
    type Plan as PlanApi,
} from "@/hooks/plans/getPlan";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreatePlanButton from "./CreatePlanButton";
import PlanTable from "./PlanTable";
import SearchPlan from "./SearchPlan";
import CreatePlanModal from "./CreatePlanModal";
import UpdatePlanModal from "./UpdatePlanModal";
import ConfirmDeletePlanModal from "./ConfirmDeletePlanModal";

import type {
    Plan,
    CreatePlanPayload,
    UpdatePlanPayload,
} from "./PlanUiTypes";

type PlanRaw = PlanApi;

export default function AdminPlanContainer() {
    const [search, setSearch] = useState("");
    const crud = useBaseCrudContainer<Plan>({
        fetchList: async () => {
            const plans = (await getPlans()) as PlanRaw[];

            return plans.map((p) => ({
                ...p,
                price: Number(p.price),
                duration_days:
                    p.duration_days !== null
                        ? Number(p.duration_days)
                        : null,
                created_at: p.created_at ?? "",
            }));
        },
        fetchCount: countPlans,
    });

    async function handleCreate(data: CreatePlanPayload) {
        await addPlan(data);
        crud.setOpenCreate(false);
        crud.refresh();
    }

    function handleEdit(plan: Plan) {
        crud.setSelectedItem(plan);
        crud.setOpenUpdate(true);
    }

    async function handleUpdate(id: string, data: UpdatePlanPayload) {
        await updatePlan(id, data);
        crud.setOpenUpdate(false);
        crud.setSelectedItem(null);
        crud.refresh();
    }

    function handleDelete(plan: Plan) {
        crud.setDeleteTarget(plan);
        crud.setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deletePlan(id);
        crud.setOpenDelete(false);
        crud.setDeleteTarget(null);
        crud.refresh();
    }

    const filteredPlans = useMemo(() => {
        const q = search.toLowerCase();
        return crud.items.filter((p) =>
            p.name.toLowerCase().includes(q)
        );
    }, [crud.items, search]);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Plan | Tổng plan: {crud.totalCount}
                </h1>
                <CreatePlanButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            <SearchPlan
                search={search}
                onSearchChange={setSearch}
            />

            {crud.loading ? (
                <p className="text-white/60">Đang tải plan…</p>
            ) : (
                <PlanTable
                    plans={filteredPlans}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreatePlanModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdatePlanModal
                open={crud.openUpdate}
                plan={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeletePlanModal
                open={crud.openDelete}
                plan={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}