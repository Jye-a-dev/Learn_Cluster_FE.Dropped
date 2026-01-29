// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminCourseContainer from "@/components/pages/AdminManage/AdminCourse/AdminCourseContainer";
export default function CoursePage() {

    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <AdminCourseContainer />
        </section>

    );
}
