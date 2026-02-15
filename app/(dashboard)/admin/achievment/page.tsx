// app/(dashboard)/admin/assignments/page.tsx
"use client";

import AdminAchievementContainer from "@/components/pages/AdminManage/AdminAchievment/AdminAchievementContainer";

export default function AdminAchievmentPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminAchievementContainer/>
        </section>

    );
}
