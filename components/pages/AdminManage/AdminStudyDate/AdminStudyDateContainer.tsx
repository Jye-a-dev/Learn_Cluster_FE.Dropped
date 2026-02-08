// src/components/pages/AdminManage/AdminStudyDate/AdminStudyDateContainer.tsx
"use client";

import { useMemo, useState } from "react";

import {
    getStudyDates,
    createStudyDate,
    updateStudyDate,
    deleteStudyDate,
} from "@/hooks/study_dates/getStudyDates";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import StudyDateTable from "./StudyDateTable";
import CreateStudyDateModal from "./CreateStudyDateModal";
import UpdateStudyDateModal from "./UpdateStudyDateModal";
import ConfirmDeleteStudyDateModal from "./ConfirmDeleteStudyDateModal";
import SearchStudyDate from "./SearchStudyDate";
import CreateStudyDateButton from "./CreateStudyDateButton";

import type {
    StudyDate,
    CreateStudyDatePayload,
    UpdateStudyDatePayload,
} from "./StudyDateUiTypes";

export default function AdminStudyDateContainer() {
    /* ===================== SEARCH ===================== */
    const [search, setSearch] = useState("");

    /* ===================== CRUD ===================== */
    const crud = useBaseCrudContainer<StudyDate>({
        fetchList: async () => {
            const data = await getStudyDates();
            return data ?? [];
        },
    });

    /* ===================== FILTER ===================== */
    const filteredStudyDates = useMemo(() => {
        const q = search.toLowerCase();
        return crud.items.filter((s) =>
            (s.title ?? "").toLowerCase().includes(q)
        );
    }, [crud.items, search]);

    /* ===================== HANDLERS ===================== */
    async function handleCreate(data: CreateStudyDatePayload) {
        await createStudyDate(data);
        await crud.refresh();
    }

    async function handleUpdateSubmit(
        data: UpdateStudyDatePayload
    ) {
        if (!crud.selectedItem) return;

        await updateStudyDate(crud.selectedItem.id, {
            course_id:
                data.course_id ?? crud.selectedItem.course_id,
            title: data.title,
            scheduled_at: data.scheduled_at,
            location: data.location,
            created_by: data.created_by,
        });

        await crud.refresh();
    }

    async function handleConfirmDelete(id: string) {
        await deleteStudyDate(id);
        await crud.refresh();
    }

    /* ===================== RENDER ===================== */
    return (
        <section className="space-y-4">
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Study Date | Tổng: {crud.items.length}
                </h1>

                <CreateStudyDateButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            {/* ===== SEARCH ===== */}
            <SearchStudyDate
                search={search}
                onSearchChange={setSearch}
            />

            {/* ===== TABLE ===== */}
            {crud.loading ? (
                <p className="text-white/60">
                    Đang tải study date…
                </p>
            ) : filteredStudyDates.length === 0 ? (
                <p className="text-white/60">
                    Chưa có study date
                </p>
            ) : (
                <StudyDateTable
                    studyDates={filteredStudyDates}
                    onEdit={(s) => {
                        crud.setSelectedItem(s);
                        crud.setOpenUpdate(true);
                    }}
                    onDelete={(s) => {
                        crud.setDeleteTarget(s);
                        crud.setOpenDelete(true);
                    }}
                />
            )}

            {/* ===== MODALS ===== */}
            <CreateStudyDateModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate} courseId={""} />

            <UpdateStudyDateModal
                open={crud.openUpdate}
                studyDate={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdateSubmit}
            />

            <ConfirmDeleteStudyDateModal
                open={crud.openDelete}
                studyDate={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
