"use client";

import { useMemo, useState } from "react";

import {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
} from "@/hooks/assignment/getAssignment";

import { useBaseCrudContainer } from "../AdminManage/BaseModel/BaseCrudContainer";

import AssignmentTable from "./AssignmentTable";
import CreateAssignmentModal from "./CreateAssignmentModal";
import UpdateAssignmentModal from "./UpdateAssignmentModal";
import ConfirmDeleteAssignmentModal from "./ConfirmDeleteAssignmentModal";
import SearchAssignment from "./SearchAssignment";
import CreateAssignmentButton from "./CreateAssignmentButton";

import type {
    Assignment,
    CreateAssignmentPayload,
    UpdateAssignmentPayload,
} from "./AssignmentUiTypes";

export default function AdminAssignmentContainer() {
    /* ===================== SEARCH ===================== */
    const [search, setSearch] = useState("");

    /* ===================== CRUD ===================== */
    const crud = useBaseCrudContainer<Assignment>({
        fetchList: async () => {
            const data = await getAssignments();
            return data ?? [];
        },
    });

    /* ===================== FILTER ===================== */
    const filteredAssignments = useMemo(() => {
        const q = search.toLowerCase();
        return crud.items.filter((a) =>
            (a.title ?? "").toLowerCase().includes(q)
        );
    }, [crud.items, search]);

    /* ===================== HANDLERS ===================== */
    async function handleCreate(data: CreateAssignmentPayload) {
        // ⚠️ Admin tạo assignment → course_id phải chọn trong modal
        await createAssignment(data);
        await crud.refresh();
    }

    async function handleUpdate(
        id: string,
        data: UpdateAssignmentPayload
    ) {
        await updateAssignment(id, data);
        await crud.refresh();
    }

    async function handleConfirmDelete(id: string) {
        await deleteAssignment(id);
        await crud.refresh();
    }

    /* ===================== RENDER ===================== */
    return (
        <section className="space-y-4">
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Assignment | Tổng: {crud.items.length}
                </h1>

                <CreateAssignmentButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            {/* ===== SEARCH ===== */}
            <SearchAssignment
                search={search}
                onSearchChange={setSearch}
            />

            {/* ===== TABLE ===== */}
            {crud.loading ? (
                <p className="text-white/60">
                    Đang tải assignment…
                </p>
            ) : filteredAssignments.length === 0 ? (
                <p className="text-white/60">
                    Chưa có assignment
                </p>
            ) : (
                <AssignmentTable
                    assignments={filteredAssignments}
                    onEdit={(a) => {
                        crud.setSelectedItem(a);
                        crud.setOpenUpdate(true);
                    }}
                    onDelete={(a) => {
                        crud.setDeleteTarget(a);
                        crud.setOpenDelete(true);
                    }}
                />
            )}

            {/* ===== MODALS ===== */}
            <CreateAssignmentModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />


            <UpdateAssignmentModal
                open={crud.openUpdate}
                assignment={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteAssignmentModal
                open={crud.openDelete}
                assignment={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
