// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminOrderContainer from "@/components/pages/AdminManage/AdminOrder/AdminOrderContainer";

export default function AdminOrdersPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminOrderContainer/>
        </section>

    );
}
