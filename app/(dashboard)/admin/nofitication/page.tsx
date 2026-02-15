// app/(dashboard)/admin/assignments/page.tsx
"use client";

import AdminNotificationContainer from "@/components/pages/AdminManage/AdminNofitication/AdminNotificationContainer";

export default function AdminNotificationsPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminNotificationContainer/>
        </section>

    );
}
