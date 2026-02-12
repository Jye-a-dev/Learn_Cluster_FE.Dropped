"use client";

import { useMemo, useState } from "react";
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    type NoteBE,
} from "@/hooks/notes/getNote";

import { useBaseCrudContainer } from "@/components/pages/AdminManage/BaseModel/BaseCrudContainer";

import CreateNoteButton from "./CreateNoteButton";
import NoteTable from "./NoteTable";
import SearchNote from "./SearchNote";
import CreateNoteModal from "./CreateNoteModal";
import UpdateNoteModal from "./UpdateNoteModal";
import ConfirmDeleteNoteModal from "./ConfirmDeleteNoteModal";

import type {
    Note,
    CreateNotePayload,
    UpdateNotePayload,
} from "./NoteUiTypes";

/* ===================== MAPPER ===================== */

function mapNoteBEToUI(note: NoteBE): Note {
    return {
        id: note.id,
        title: note.content ?? "", // BE không có title → derive từ content
        content: note.content,
        user_id: note.user_id,
        lesson_id: note.lesson_id,
        created_at: note.created_at,
    };
}

export default function AdminNoteContainer() {
    const [search, setSearch] = useState("");

    const {
        items: notes,
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
    } = useBaseCrudContainer<Note>({
        fetchList: async () => {
            const data = await getNotes(); // NoteBE[]
            return data.map(mapNoteBEToUI); // ✅ convert sang Note[]
        },
    });

    /* ===================== CREATE ===================== */

    async function handleCreate(data: CreateNotePayload) {
        await createNote(data);
        setOpenCreate(false);
        refresh();
    }

    /* ===================== UPDATE ===================== */

    function handleEdit(note: Note) {
        setSelectedItem(note);
        setOpenUpdate(true);
    }

    async function handleUpdate(
        id: string,
        data: UpdateNotePayload
    ) {
        // ✅ đảm bảo không truyền undefined vào API
        if (!data.user_id || !data.lesson_id) {
            throw new Error("Missing required fields");
        }

        await updateNote(id, {
            user_id: data.user_id,
            lesson_id: data.lesson_id,
            content: data.content ?? null,
        });

        setOpenUpdate(false);
        setSelectedItem(null);
        refresh();
    }

    /* ===================== DELETE ===================== */

    function handleDelete(note: Note) {
        setDeleteTarget(note);
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteNote(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    /* ===================== FILTER ===================== */

    const filteredNotes = useMemo(() => {
        const q = search.toLowerCase();

        return notes.filter((n) =>
            (n.content ?? "")
                .toLowerCase()
                .includes(q)
        );
    }, [notes, search]);

    /* ===================== RENDER ===================== */

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Note
                </h1>

                <CreateNoteButton
                    onClick={() => setOpenCreate(true)}
                />
            </div>

            <SearchNote
                search={search}
                onSearchChange={setSearch}
            />

            {loading ? (
                <p className="text-white/60">
                    Đang tải notes…
                </p>
            ) : (
                <NoteTable
                    notes={filteredNotes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreateNoteModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateNoteModal
                open={openUpdate}
                note={selectedItem}
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteNoteModal
                open={openDelete}
                note={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
