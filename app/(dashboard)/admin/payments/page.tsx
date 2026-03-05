// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminPaymentContainer from "@/components/pages/AdminManage/AdminPayment/AdminPaymentContainer";

export default function AdminPaymmentsPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminPaymentContainer/>
        </section>

    );
}
