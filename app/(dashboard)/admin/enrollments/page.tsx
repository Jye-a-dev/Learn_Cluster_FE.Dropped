// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminEnrollmentContainer from "@/components/pages/AdminManage/AdminEnrollment/AdminEnrollmentContainer";
export default function AdminEnrollmentPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminEnrollmentContainer/>
        </section>

    );
}
