// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminStudyProfileContainer from "@/components/pages/AdminManage/AdminStudyProfile/AdminStudyProfileContainer";
export default function AdminStudyProfilePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminStudyProfileContainer/>
        </section>

    );
}
