// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminOrderItemContainer from "@/components/pages/AdminManage/AdminOrderItem/AdminOrderItemContainer";

export default function AdminOrderItemsPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminOrderItemContainer/>
        </section>

    );
}
