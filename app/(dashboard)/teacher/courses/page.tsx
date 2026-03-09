// app/(dashboard)/admin/assignments/page.tsx
"use client";

import TeacherCourseContainer from "@/components/pages/TeacherDashboard/TeacherCourses/TeacherCourseContainer";

export default function TeacherAssignmentsPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <TeacherCourseContainer />
        </section>

    );
}
