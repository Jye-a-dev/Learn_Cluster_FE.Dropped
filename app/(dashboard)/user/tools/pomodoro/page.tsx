// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import PomodoroContainer from "@/components/pages/StudyTool/PorodomoTimer/PomodoroContainer";

export default function AdminChaptersPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <PomodoroContainer/>
        </section>

    );
}
