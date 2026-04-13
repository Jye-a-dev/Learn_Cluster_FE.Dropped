"use client";

import AdminAchievementGrowthGraph from "./AdminAchievementGrowthGraph";
import AdminAssignmentGrowthGraph from "./AdminAssignmentGrowthGraph";
import AdminAssignmentStatusGraph from "./AdminAssignmentStatusGraph";
import AdminChapterGrowthGraph from "./AdminChapterGrowthGraph";
import AdminCourseGrowthGraph from "./AdminCourseGrowthGraph";
import AdminCourseStatusGraph from "./AdminCourseStatusGraph";
import AdminGradeGrowthGraph from "./AdminGradeGrowthGraph";
import AdminGradeScoreGraph from "./AdminGradeScoreGraph";
import AdminGradeStatusGraph from "./AdminGradeStatusGraph";
import AdminLessonGraph from "./AdminLessonGraph";
import AdminRoleUserGraph from "./AdminRoleUserGraph";
import AdminStudyDateGraph from "./AdminStudyDateGraph";
import AdminStudyDateLessonGraph from "./AdminStudyDateLessonGraph";
import AdminStudyDateParticipantGraph from "./AdminStudyDateParticipantGraph";
import AdminSubmissionGraph from "./AdminSubmissionGraph";
import AdminUserGraph from "./AdminUserGraph";

export default function AdminGraphContainer() {
    return (
        <>
            {/* ================= CORE ================= */}
            <section className="mb-14">
                <h2 className="text-lg font-semibold text-slate-300 mb-6 uppercase tracking-wide">
                    Core Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AdminUserGraph />
                    <AdminRoleUserGraph />
                    <AdminCourseStatusGraph />
                </div>
            </section>

            {/* ================= LEARNING ================= */}
            <section className="mb-14">
                <h2 className="text-lg font-semibold text-slate-300 mb-6 uppercase tracking-wide">
                    Learning Structure Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AdminCourseGrowthGraph />
                    <AdminChapterGrowthGraph />
                    <AdminLessonGraph />
                    <AdminAssignmentStatusGraph />
                    <AdminAssignmentGrowthGraph />
                    <AdminGradeStatusGraph />
                    <AdminGradeScoreGraph />
                    <AdminGradeGrowthGraph />
                </div>
            </section>

            {/* ================= ACTIVITY ================= */}
            <section className="mb-14">
                <h2 className="text-lg font-semibold text-slate-300 mb-6 uppercase tracking-wide">
                    Learning Activity Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AdminStudyDateGraph />
                    <AdminStudyDateLessonGraph />
                    <AdminStudyDateParticipantGraph />
                    <AdminSubmissionGraph />
                </div>
            </section>

            {/* ================= SYSTEM ================= */}
            <section>
                <h2 className="text-lg font-semibold text-slate-300 mb-6 uppercase tracking-wide">
                    System Analytics
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AdminAchievementGrowthGraph />
                </div>
            </section>
        </>
    );
}
