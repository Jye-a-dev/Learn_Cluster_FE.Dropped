// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminOverviewContainer from "@/components/pages/AdminDashboard/Overview/AdminOverviewContainer";
export default function AdminGradePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminOverviewContainer/>
        </section>

    );
}
