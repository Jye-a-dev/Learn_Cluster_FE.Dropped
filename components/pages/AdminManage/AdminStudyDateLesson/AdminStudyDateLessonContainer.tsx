// src/components/pages/AdminManage/AdminStudyDateLesson/AdminStudyDateLessonContainer.tsx
"use client";

import { useMemo, useState } from "react";

import {
    getStudyDateLessons,
    createStudyDateLesson,
    deleteStudyDateLesson,
    updateStudyDateLesson,
} from "@/hooks/study_date_lessons/getStudyDateLesson";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import StudyDateLessonTable from "./StudyDateLessonTable";
import CreateStudyDateLessonModal from "./CreateStudyDateLessonModal";
import UpdateStudyDateLessonModal from "./UpdateStudyDateLessonModal";
import ConfirmDeleteStudyDateLessonModal from "./ConfirmDeleteStudyDateLessonModal";
import SearchStudyDateLesson from "./SearchStudyDateLesson";
import CreateStudyDateLessonButton from "./CreateStudyDateLessonButton";

import type {
    StudyDateLesson,
    AddStudyDateLessonPayload,
    UpdateStudyDateLessonPayload,
} from "./StudyDateLessonUiTypes";

export default function AdminStudyDateLessonContainer() {
    /* ===================== SEARCH ===================== */
    const [search, setSearch] = useState("");

    /* ===================== CRUD ===================== */
    const crud = useBaseCrudContainer<StudyDateLesson>({
        fetchList: async () => {
            const data = await getStudyDateLessons();
            return data ?? [];
        },
    });

    /* ===================== FILTER ===================== */
    const filteredLessons = useMemo(() => {
        const q = search.toLowerCase();
        return crud.items.filter(
            (l) =>
                l.study_date_id.toLowerCase().includes(q) ||
                l.lesson_id.toLowerCase().includes(q)
        );
    }, [crud.items, search]);

    /* ===================== HANDLERS ===================== */
    async function handleCreate(data: AddStudyDateLessonPayload) {
        await createStudyDateLesson(data);
        await crud.refresh();
    }

    async function handleUpdateSubmit(
        data: UpdateStudyDateLessonPayload
    ) {
        if (!crud.selectedItem) return;

        await updateStudyDateLesson(crud.selectedItem.id, {
            study_date_id:
                data.study_date_id ?? crud.selectedItem.study_date_id,
            lesson_id:
                data.lesson_id ?? crud.selectedItem.lesson_id,
        });

        await crud.refresh();
    }

    async function handleConfirmDelete(id: string) {
        await deleteStudyDateLesson(id);
        await crud.refresh();
    }

    /* ===================== RENDER ===================== */
    return (
        <section className="space-y-4">
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Study Date Lesson | Tổng: {crud.items.length}
                </h1>

                <CreateStudyDateLessonButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            {/* ===== SEARCH ===== */}
            <SearchStudyDateLesson
                search={search}
                onSearchChange={setSearch}
            />

            {/* ===== TABLE ===== */}
            {crud.loading ? (
                <p className="text-white/60">Đang tải lesson…</p>
            ) : filteredLessons.length === 0 ? (
                <p className="text-white/60">
                    Chưa có lesson trong study date
                </p>
            ) : (
                <StudyDateLessonTable
                    lessons={filteredLessons}
                    onEdit={(l) => {
                        crud.setSelectedItem(l);
                        crud.setOpenUpdate(true);
                    }}
                    onDelete={(l) => {
                        crud.setDeleteTarget(l);
                        crud.setOpenDelete(true);
                    }}
                />
            )}

            {/* ===== MODALS ===== */}
            <CreateStudyDateLessonModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateStudyDateLessonModal
                open={crud.openUpdate}
                studyDateLesson={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdateSubmit}
            />


            <ConfirmDeleteStudyDateLessonModal
                open={crud.openDelete}
                studyDateLesson={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
