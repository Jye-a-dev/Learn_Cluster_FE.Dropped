"use client";

import { useEffect, useMemo, useState } from "react";

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
    const [rawLessons, setRawLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Lesson | null>(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        refresh();
    }, []);

    /* =======================
       FETCH
    ======================= */
    async function refresh() {
        setLoading(true);
        try {
            const [lessons, count] = await Promise.all([
                getLessons(),
                getLessonCount(),
            ]);

            const normalized: Lesson[] = (lessons as LessonApi[]).map((l) => ({
                id: l.id,
                chapter_id: l.chapter_id,
                title: l.title,

                // ✅ FIX TS2322
                content_type: (l.content_type ?? "text") as LessonContentType,
                content_url: l.content_url ?? null,

                ordering: l.ordering ?? 0,
            }));

            setRawLessons(normalized);
            setTotalCount(count);
        } finally {
            setLoading(false);
        }
    }

    /* =======================
       CREATE
    ======================= */
async function handleCreate(data: CreateLessonPayload) {
    const payload: AddLessonPayload = {
        chapter_id: data.chapter_id,
        title: data.title,

        content_type: data.content_type ?? "text",
        content_url: data.content_url ?? null,

        // ✅ BE yêu cầu min(1)
        ordering: data.ordering && data.ordering >= 1 ? data.ordering : 1,
    };

    await addLesson(payload);
    setOpenCreate(false);
    refresh();
}


    /* =======================
       UPDATE
    ======================= */
    function handleEdit(lesson: Lesson) {
        setSelectedLesson(lesson);
        setOpenUpdate(true);
    }

    async function handleUpdate(id: string, data: UpdateLessonPayload) {
        if (!selectedLesson) return;

        const payload: UpdateLessonApiPayload = {
            chapter_id: selectedLesson.chapter_id,
            title: data.title ?? selectedLesson.title,
            ordering: data.ordering ?? selectedLesson.ordering,
        };

        await updateLesson(id, payload);
        setOpenUpdate(false);
        setSelectedLesson(null);
        refresh();
    }


    /* =======================
       DELETE
    ======================= */
    function handleDelete(lesson: Lesson) {
        setDeleteTarget(lesson);
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteLesson(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    /* =======================
       FILTER
    ======================= */
    const filteredLessons = useMemo(() => {
        const q = search.toLowerCase();
        return rawLessons.filter((l) =>
            l.title.toLowerCase().includes(q)
        );
    }, [rawLessons, search]);

    /* =======================
       RENDER
    ======================= */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Lesson | Tổng lesson: {totalCount}
                </h1>
                <CreateLessonButton onClick={() => setOpenCreate(true)} />
            </div>

            <SearchLesson
                search={search}
                onSearchChange={setSearch}
            />

            {loading ? (
                <p className="text-white/60">Đang tải lesson…</p>
            ) : (
                <LessonTable
                    lessons={filteredLessons}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreateLessonModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateLessonModal
                open={openUpdate}
                lesson={selectedLesson}
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedLesson(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteLessonModal
                open={openDelete}
                lesson={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
