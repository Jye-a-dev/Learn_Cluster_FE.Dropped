// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminStudyDateLessonContainer from "@/components/pages/AdminManage/AdminStudyDateLesson/AdminStudyDateLessonContainer";
export default function AdminStudyDateLessonPage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminStudyDateLessonContainer/>
        </section>

    );
}
