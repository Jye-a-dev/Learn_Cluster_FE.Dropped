// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminStudyDateContainer from "@/components/pages/AdminManage/AdminStudyDate/AdminStudyDateContainer";
export default function AdminStudyDatePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminStudyDateContainer/>
        </section>

    );
}
