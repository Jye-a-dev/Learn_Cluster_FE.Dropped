// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminDashboardContainer from "@/components/pages/AdminDashboard/AdminDashboardContainer";

export default function AdminGradePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminDashboardContainer/>
        </section>

    );
}
