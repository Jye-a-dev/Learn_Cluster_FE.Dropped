"use client";

import { useMemo, useState } from "react";

import {
    getSubmissions,
    createSubmission,
    updateSubmission,
    deleteSubmission,
    countSubmissions,
    type SubmissionBE,
} from "@/hooks/submission/getSubmission";

import { useAssignmentsMap } from "@/hooks/assignment/useAssignmentsMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import SubmissionTable from "./SubmissionTable";
import CreateSubmissionModal from "./CreateSubmissionModal";
import UpdateSubmissionModal from "./UpdateSubmissionModal";
import ConfirmDeleteSubmissionModal from "./ConfirmDeleteSubmissionModal";
import SearchSubmission from "./SearchSubmission";
import CreateSubmissionButton from "./CreateSubmissionButton";

import type {
    Submission,
    CreateSubmissionPayload,
    UpdateSubmissionPayload,
} from "./SubmissionUiTypes";

export default function AdminSubmissionContainer() {
    const [search, setSearch] = useState("");

    const { assignmentsMap } = useAssignmentsMap();
    const { usersMap } = useUsersMap();

    const crud = useBaseCrudContainer<Submission>({
        fetchList: async () => {
            const submissions = (await getSubmissions()) as SubmissionBE[];

            return submissions.map((s) => ({
                ...s,
                assignment_title:
                    assignmentsMap[s.assignment_id]?.title ?? "—",
                student_name:
                    usersMap[s.student_id]?.username ?? "—",
            }));
        },
        fetchCount: countSubmissions,
    });

    /* ================= CREATE ================= */
    async function handleCreate(data: CreateSubmissionPayload) {
        await createSubmission(data);
        crud.setOpenCreate(false);
        crud.refresh();
    }

    /* ================= UPDATE ================= */
    function handleEdit(sub: Submission) {
        crud.setSelectedItem(sub);
        crud.setOpenUpdate(true);
    }

    async function handleUpdate(
        id: string,
        data: UpdateSubmissionPayload
    ) {
        await updateSubmission(id, data);
        crud.setOpenUpdate(false);
        crud.setSelectedItem(null);
        crud.refresh();
    }

    /* ================= DELETE ================= */
    function handleDelete(sub: Submission) {
        crud.setDeleteTarget(sub);
        crud.setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteSubmission(id);
        crud.setOpenDelete(false);
        crud.setDeleteTarget(null);
        crud.refresh();
    }

    /* ================= FILTER ================= */
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return crud.items.filter(
            (s) =>
                s.assignment_title?.toLowerCase().includes(q) ||
                s.student_name?.toLowerCase().includes(q)
        );
    }, [crud.items, search]);

    /* ================= RENDER ================= */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Submission | Tổng: {crud.totalCount}
                </h1>

                <CreateSubmissionButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            <SearchSubmission
                search={search}
                onSearchChange={setSearch}
            />

            <SubmissionTable
                submissions={filtered}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CreateSubmissionModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateSubmissionModal
                open={crud.openUpdate}
                submission={crud.selectedItem}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteSubmissionModal
                open={crud.openDelete}
                submission={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
