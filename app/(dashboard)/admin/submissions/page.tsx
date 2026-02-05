// app/(dashboard)/admin/assignments/page.tsx
"use client";

import AdminSubmissionContainer from "@/components/pages/AdminManage/AdminSubmission/AdminSubmissionContainer";

export default function AdminSubmissionPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminSubmissionContainer/>
        </section>

    );
}
