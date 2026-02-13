// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminBookmarkContainer from "@/components/pages/AdminManage/AdminBookmark/AdminBookmarkContainer";
export default function AdminBookmarkPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminBookmarkContainer/>
        </section>

    );
}
