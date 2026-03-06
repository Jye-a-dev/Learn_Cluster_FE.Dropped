// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import TimeTrackerContainer from "@/components/pages/StudyTool/TimeTracker/TimeTrackerContainer";

export default function UserTimeTracckerPage() {
    return (
        <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
            <TimeTrackerContainer/>
        </section>

    );
}
