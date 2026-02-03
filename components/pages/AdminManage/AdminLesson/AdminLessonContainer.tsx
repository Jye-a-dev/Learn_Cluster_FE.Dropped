"use client";

import { useMemo, useState } from "react";

import {
    getLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getLessonCount,
    type LessonBE as LessonApi,
    type AddLessonPayload,
    type UpdateLessonPayload as UpdateLessonApiPayload,
} from "@/hooks/lessons/getLesson";
import { useChaptersMap } from "@/hooks/chapters/useChaptersMap";
import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreateLessonButton from "./CreateLessonButton";
import LessonTable from "./LessonTable";
import SearchLesson from "./SearchLesson";
import CreateLessonModal from "./CreateLessonModal";
import UpdateLessonModal from "./LessonUpdateModal";
import ConfirmDeleteLessonModal from "./ConfirmDeleteLessonModal";

import type {
    Lesson,
    CreateLessonPayload,
    UpdateLessonPayload,
    LessonContentType,
} from "./LessonUiTypes";

export default function AdminLessonContainer() {
    const [search, setSearch] = useState("");
    const { chaptersMap, loading: chapterLoading } = useChaptersMap();

    /* =======================
       BASE CRUD
    ======================= */
    const crud = useBaseCrudContainer<Lesson>({
        fetchList: async () => {
            if (chapterLoading) return [];

            const lessons = (await getLessons()) as LessonApi[];

            return lessons.map((l) => {
                const chapter = chaptersMap[l.chapter_id];

                return {
                    id: l.id,
                    chapter_id: l.chapter_id,
                    chapter_name: chapter?.title ?? "—",
                    title: l.title,
                    content_type: l.content_type as LessonContentType,
                    content_url: l.content_url ?? null,
                    content_text:
                        l.content_type === "text"
                            ? l.content_text ?? null
                            : null,
                    ordering: l.ordering ?? 1,
                };
            });
        },
        fetchCount: getLessonCount,
    });

    /* =======================
       CREATE
    ======================= */
    async function handleCreate(data: CreateLessonPayload) {
        const payload: AddLessonPayload = {
            chapter_id: data.chapter_id,
            title: data.title,
            content_type: data.content_type,
            ordering:
                typeof data.ordering === "number" && data.ordering >= 1
                    ? data.ordering
                    : 1,
        };

        if (data.content_type === "text") {
            payload.content_text = data.content_text ?? "";
            payload.content_url = "";
        } else {
            payload.content_url = data.content_url ?? "";
        }

        await addLesson(payload);
        crud.setOpenCreate(false);
        crud.refresh();
    }

    /* =======================
       UPDATE
    ======================= */
    function handleEdit(lesson: Lesson) {
        crud.setSelectedItem(lesson);
        crud.setOpenUpdate(true);
    }

    async function handleUpdate(
        id: string,
        data: UpdateLessonPayload
    ) {
        if (!crud.selectedItem) return;

        const current = crud.selectedItem;

        const payload: UpdateLessonApiPayload & {
            content_text?: string | null;
            content_url?: string | null;
        } = {
            // ✅ CHO ĐỔI CHAPTER
            chapter_id: data.chapter_id ?? current.chapter_id,

            title: data.title ?? current.title,
            ordering: data.ordering ?? current.ordering,
        };

        if (current.content_type === "text") {
            payload.content_text =
                data.content_text ?? current.content_text ?? "";
            payload.content_url = "";
        } else {
            payload.content_url =
                data.content_url ?? current.content_url ?? "";
            payload.content_text = null;
        }

        await updateLesson(id, payload);
        crud.setOpenUpdate(false);
        crud.setSelectedItem(null);
        crud.refresh();
    }

    /* =======================
       DELETE
    ======================= */
    function handleDelete(lesson: Lesson) {
        crud.setDeleteTarget(lesson);
        crud.setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteLesson(id);
        crud.setOpenDelete(false);
        crud.setDeleteTarget(null);
        crud.refresh();
    }

    /* =======================
       FILTER
    ======================= */
    const filteredLessons = useMemo(() => {
        const q = search.toLowerCase();
        return crud.items.filter((l) =>
            l.title.toLowerCase().includes(q)
        );
    }, [crud.items, search]);

    /* =======================
       RENDER
    ======================= */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Lesson | Tổng lesson: {crud.totalCount}
                </h1>
                <CreateLessonButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            <SearchLesson
                search={search}
                onSearchChange={setSearch}
            />

            {crud.loading ? (
                <p className="text-white/60">Đang tải lesson…</p>
            ) : (
                <LessonTable
                    lessons={filteredLessons}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreateLessonModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateLessonModal
                open={crud.openUpdate}
                lesson={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteLessonModal
                open={crud.openDelete}
                lesson={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
