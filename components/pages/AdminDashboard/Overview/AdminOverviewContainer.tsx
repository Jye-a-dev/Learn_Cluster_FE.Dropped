"use client";

import AdminAchievementOverview from "./AdminAchievementOverview";
import AdminAssignmentOverview from "./AdminAssignmentOverview";
import AdminChapterOverview from "./AdminChapterOverview";
import AdminCourseOverview from "./AdminCourseOverview";
import AdminGradeOverview from "./AdminGradeOverview";
import AdminLessonOverview from "./AdminLessonOverview";
import AdminRoleOverview from "./AdminRoleOverview";
import AdminStudyDateLessonOverview from "./AdminStudyDateLessonOverview";
import AdminStudyDateOverview from "./AdminStudyDateOverview";
import AdminStudyDateParticipantOverview from "./AdminStudyDateParticipantOverview";
import AdminSubmissionOverview from "./AdminSubmissionOverview";
import AdminUserOverview from "./AdminUserOverview";

export default function AdminOverviewContainer() {
  return (
    <>
      {/* CORE */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-300 mb-5 uppercase tracking-wide">
          Core Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <AdminUserOverview />
          <AdminSubmissionOverview />
          <AdminCourseOverview />
          <AdminLessonOverview />
        </div>
      </section>

      {/* LEARNING */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-300 mb-5 uppercase tracking-wide">
          Learning & Activities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <AdminStudyDateOverview />
          <AdminStudyDateParticipantOverview />
          <AdminStudyDateLessonOverview />
          <AdminAssignmentOverview />
          <AdminGradeOverview />
          <AdminChapterOverview />
          <AdminAchievementOverview />
        </div>
      </section>

      {/* SYSTEM */}
      <section>
        <h2 className="text-lg font-semibold text-slate-300 mb-5 uppercase tracking-wide">
          System
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <AdminRoleOverview />
        </div>
      </section>
    </>
  );
}
