// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminStudyMatchContainer from "@/components/pages/AdminManage/AdminStudyMatch/AdminStudyMatchContainer";
export default function AdminStudySwipePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminStudyMatchContainer/>
        </section>

    );
}
