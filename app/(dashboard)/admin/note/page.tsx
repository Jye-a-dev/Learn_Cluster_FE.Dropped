// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminNoteContainer from "@/components/pages/AdminManage/AdminNote/AdminNoteContainer";

export default function AdminNotePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminNoteContainer/>
        </section>

    );
}
