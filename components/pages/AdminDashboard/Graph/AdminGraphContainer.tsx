"use client";

import AdminRolePermissionGraph from "./AdminRolePermissionGraph";
import AdminRoleUserGraph from "./AdminRoleUserGraph";
import AdminStudyDateGraph from "./AdminStudyDateGraph";
import AdminStudyDateLessonGraph from "./AdminStudyDateLessonGraph";
import AdminStudyDateParticipantGraph from "./AdminStudyDateParticipantGraph";
import AdminSubmissionGraph from "./AdminSubmissionGraph";
import AdminUserGraph from "./AdminUserGraph";

export default function AdminGraphContainer() {
    return (
        <>
            {/* CORE */}
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-slate-300 mb-5 uppercase tracking-wide">
                    Core Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AdminSubmissionGraph />
                    <AdminStudyDateParticipantGraph />
                    <AdminRoleUserGraph />
                    <AdminRolePermissionGraph/>
                    <AdminUserGraph />
                </div>
            </section>

            {/* LEARNING */}
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-slate-300 mb-5 uppercase tracking-wide">
                    Learning & Activity Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AdminStudyDateGraph />
                    <AdminStudyDateLessonGraph />
                </div>
            </section>

            {/* SYSTEM */}
            <section>
                <h2 className="text-lg font-semibold text-slate-300 mb-5 uppercase tracking-wide">
                    System Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                </div>
            </section>
        </>
    );
}