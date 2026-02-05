// app/(dashboard)/admin/assignments/page.tsx
"use client";

import AdminAssignmentContainer from "@/components/pages/AdminManage/AdminAssignment/AdminAssignmentContainer";

export default function AdminAssignmentsPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminAssignmentContainer/>
        </section>

    );
}
