// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminGradeContainer from "@/components/pages/AdminManage/AdminGrade/AdminGradeContainer";
export default function AdminGradePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminGradeContainer/>
        </section>

    );
}
