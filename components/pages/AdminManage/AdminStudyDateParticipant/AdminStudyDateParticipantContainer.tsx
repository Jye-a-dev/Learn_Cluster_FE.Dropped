"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
    getStudyDateParticipants,
    joinStudyDate,
    leaveStudyDate,
} from "@/hooks/study_date_participant/getStudyDateParticipant";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import StudyDateParticipantTable from "./StudyDateParticipantTable";
import JoinParticipantModal from "./CreateStudyDateParticipantModal";
import ConfirmLeaveParticipantModal from "./ConfirmDeleteParticipantModal";
import SearchStudyDateParticipant from "./SearchStudyDateParticipant";
import CreateParticipantButton from "./CreateParticipantButton";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";

import type {
    StudyDateParticipant,
    JoinStudyDateParticipantPayload,
} from "./StudyDateParticipantUiTypes";

type Props = {
    studyDateId?: string;
};

export default function AdminStudyDateParticipantContainer(
    props: Props
) {
    const params = useParams<{ id?: string }>();
    const studyDateId = props.studyDateId ?? params?.id ?? "";
    const { usersMap } = useUsersMap();
    const { studyDatesMap } = useStudyDatesMap();


    const [search, setSearch] = useState("");

    const crud = useBaseCrudContainer<StudyDateParticipant>({
        fetchList: async () => {
            const data = await getStudyDateParticipants();
            return data;
        },
    });

    useEffect(() => {
        if (studyDateId) {
            crud.refresh();
        }
    }, [crud, studyDateId]);


    const filteredParticipants = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return crud.items;

        return crud.items.filter((p) => {
            const user = usersMap[p.user_id];
            const studyDate = studyDatesMap[p.study_date_id];

            return (
                p.user_id.toLowerCase().includes(q) ||
                p.study_date_id.toLowerCase().includes(q) ||
                user?.username?.toLowerCase().includes(q) ||
                studyDate?.title?.toLowerCase().includes(q)
            );
        });
    }, [crud.items, search, usersMap, studyDatesMap]);


    async function handleJoin(
        payload: JoinStudyDateParticipantPayload
    ) {
        await joinStudyDate(payload);
        await crud.refresh();
    }

    async function handleLeave(payload: {
        study_date_id: string;
        user_id: string;
    }) {
        await leaveStudyDate(payload);
        await crud.refresh();
    }


    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Danh sách participant | Tổng:{" "}
                    {crud.items.length}
                </h1>

                <CreateParticipantButton
                    onClick={() => crud.setOpenCreate(true)}
                />
            </div>

            <SearchStudyDateParticipant
                search={search}
                onSearchChange={setSearch}
            />

            {crud.loading && (
                <p className="text-white/60">
                    Đang tải participant…
                </p>
            )}

            <StudyDateParticipantTable
                participants={filteredParticipants}
                onDelete={(p) => {
                    console.log("🗑 delete clicked =", p);
                    crud.setDeleteTarget(p);
                    crud.setOpenDelete(true);
                }}
            />


            <JoinParticipantModal
                open={crud.openCreate}
                studyDateId={studyDateId}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleJoin}
            />

            <ConfirmLeaveParticipantModal
                open={crud.openDelete}
                participant={crud.deleteTarget}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleLeave}
            />
        </section>
    );
}
