// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminStudyDateParticipantContainer from "@/components/pages/AdminManage/AdminStudyDateParticipant/AdminStudyDateParticipantContainer";
export default function AdminStudyDateParticipantsPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminStudyDateParticipantContainer/>
        </section>

    );
}
