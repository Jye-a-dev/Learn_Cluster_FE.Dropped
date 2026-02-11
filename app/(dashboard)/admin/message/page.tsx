// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminMessageContainer from "@/components/pages/AdminManage/AdminMessage/AdminMessageContainer";
export default function AdminMessagePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminMessageContainer/>
        </section>

    );
}
