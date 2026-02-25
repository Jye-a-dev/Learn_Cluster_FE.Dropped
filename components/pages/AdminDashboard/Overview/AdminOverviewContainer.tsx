"use client";

import AdminStudyDateLessonOverview from "./AdminStudyDateLessonOverview";
import AdminStudyDateOverview from "./AdminStudyDateOverview";
import AdminStudyDateParticipantOverview from "./AdminStudyDateParticipantOverview";
import AdminSubmissionOverview from "./AdminSubmissionOverview";
import AdminUserOverview from "./AdminUserOverview";

export default function AdminOverviewContainer() {
  return (
    <div className="min-h-screen p-8">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Admin Overview
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Đành giá tình hình
        </p>
        <div className="mt-4 h-0.5 w-16 bg-indigo-500 rounded-full" />
      </div>

      {/* KPI Section */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <AdminUserOverview />
          <AdminSubmissionOverview/>
          <AdminStudyDateOverview/>
          <AdminStudyDateParticipantOverview/>
          <AdminStudyDateLessonOverview/>
        </div>
      </div>

    </div>
  );
}