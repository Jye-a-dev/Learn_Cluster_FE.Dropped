"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";

import { getAssignments, type AssignmentBE } from "@/hooks/assignment/getAssignment";
import { getCoursesByInstructor } from "@/hooks/course_instructors/getCourseInstructor";
import { getStudentsByCourse } from "@/hooks/enrollment/getEnrollment";
import { getSubmissionsByAssignment } from "@/hooks/submission/getSubmission";
import { getStudyDates, type StudyDateBE } from "@/hooks/study_dates/getStudyDates";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { getCourses, type Course } from "@/hooks/courses/getCourse";

type DashboardState = {
  loading: boolean;
  courses: Course[];
  studyDates: StudyDateBE[];
  assignments: AssignmentBE[];
  studentCount: number;
  submissionCount: number;
};

type StatCard = {
  label: string;
  value: string | number;
  tone: "emerald" | "cyan" | "amber" | "rose";
  hint: string;
};

type WorkflowStep = {
  step: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

const initialState: DashboardState = {
  loading: true,
  courses: [],
  studyDates: [],
  assignments: [],
  studentCount: 0,
  submissionCount: 0,
};

function getTimeValue(value?: string | null) {
  const time = value ? new Date(value).getTime() : Number.NaN;
  return Number.isNaN(time) ? 0 : time;
}

function formatSchedule(value?: string | null) {
  if (!value) return "No schedule yet";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid schedule";

  return date.toLocaleString();
}

function toneClass(tone: StatCard["tone"]) {
  switch (tone) {
    case "cyan":
      return "border-cyan-400/30 bg-cyan-400/10 text-cyan-100";
    case "amber":
      return "border-amber-400/30 bg-amber-400/10 text-amber-100";
    case "rose":
      return "border-rose-400/30 bg-rose-400/10 text-rose-100";
    default:
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
  }
}

export default function TeacherWorkflowDashboard() {
  const { user, loading: userLoading } = useCurrentUser();
  const [state, setState] = useState<DashboardState>(initialState);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      if (!user?.id) return;

      try {
        setState((current) => ({ ...current, loading: true }));
        setCurrentTime(new Date().getTime());

        const [instructorRows, allCourses] = await Promise.all([
          getCoursesByInstructor(user.id),
          getCourses({ limit: 200 }),
        ]);

        const courseIds = instructorRows.map((row) => row.course_id);
        const myCourses = allCourses.filter((course) => courseIds.includes(course.id));

        const [studyDatesByCourse, assignmentsByCourse, studentCounts] =
          await Promise.all([
            Promise.all(courseIds.map((courseId) => getStudyDates({ course_id: courseId, limit: 100 }))),
            Promise.all(courseIds.map((courseId) => getAssignments({ course_id: courseId, limit: 100 }))),
            Promise.all(courseIds.map((courseId) => getStudentsByCourse(courseId))),
          ]);

        const studyDates = studyDatesByCourse.flat();
        const assignments = assignmentsByCourse.flat();

        const submissionGroups = await Promise.all(
          assignments.map((assignment) =>
            getSubmissionsByAssignment(assignment.id, { limit: 100 })
          )
        );

        if (!active) return;

        setState({
          loading: false,
          courses: myCourses,
          studyDates: studyDates.sort(
            (left, right) =>
              getTimeValue(left.scheduled_at) - getTimeValue(right.scheduled_at)
          ),
          assignments,
          studentCount: studentCounts.reduce(
            (total, enrollments) => total + enrollments.length,
            0
          ),
          submissionCount: submissionGroups.reduce(
            (total, submissions) => total + submissions.length,
            0
          ),
        });
      } catch (error) {
        console.error("Teacher dashboard load failed:", error);

        if (!active) return;

        setState((current) => ({
          ...current,
          loading: false,
        }));
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [user?.id]);

  const stats = useMemo<StatCard[]>(() => {
    const upcomingStudyDates = state.studyDates.filter(
      (item) => getTimeValue(item.scheduled_at) >= currentTime
    );
    const myCreatedSessions = state.studyDates.filter(
      (item) => item.created_by === user?.id
    );
    const publicCourses = state.courses.filter(
      (course) => course.status === "public"
    );

    return [
      {
        label: "Teaching courses",
        value: state.courses.length,
        tone: "emerald",
        hint: `${publicCourses.length} public course(s) currently visible to learners`,
      },
      {
        label: "Upcoming study dates",
        value: upcomingStudyDates.length,
        tone: "cyan",
        hint: `${myCreatedSessions.length} session(s) created by you`,
      },
      {
        label: "Assignments",
        value: state.assignments.length,
        tone: "amber",
        hint: "Current course-first workflow uses assignments as the main evaluation unit",
      },
      {
        label: "Submission records",
        value: state.submissionCount,
        tone: "rose",
        hint: `${state.studentCount} learner enrollment(s) across your courses`,
      },
    ];
  }, [
    currentTime,
    state.assignments.length,
    state.courses,
    state.studentCount,
    state.studyDates,
    state.submissionCount,
    user?.id,
  ]);

  const nextStudyDates = useMemo(() => {
    return state.studyDates
      .filter((item) => getTimeValue(item.scheduled_at) >= currentTime)
      .slice(0, 4);
  }, [currentTime, state.studyDates]);

  const activeCourses = useMemo(() => state.courses.slice(0, 4), [state.courses]);
  const primaryCourseHref = state.courses[0]
    ? `/teacher/courses/my/${state.courses[0].id}`
    : "/teacher/courses/my";
  const primaryAssignmentHref = state.assignments[0]
    ? `/teacher/assignment/${state.assignments[0].id}`
    : primaryCourseHref;

  const workflowSteps = useMemo<WorkflowStep[]>(
    () => [
      {
        step: "01",
        title: "Attach yourself to a live course",
        description:
          "Teacher flow starts from existing public courses. Pick one, register as instructor, and bring it into your teaching scope.",
        href: "/teacher/courses",
        cta: "Discover courses",
      },
      {
        step: "02",
        title: "Run the course workspace",
        description:
          "Manage chapters, lessons, assignments, students, and instructor membership from the course detail that already exists today.",
        href: primaryCourseHref,
        cta: state.courses[0] ? "Open my first course" : "Open my courses",
      },
      {
        step: "03",
        title: "Review assignment work and grading",
        description:
          "Submission review lives under assignment detail. From there, teachers can inspect learner work and open the grading screen.",
        href: primaryAssignmentHref,
        cta: state.assignments[0]
          ? "Open latest assignment"
          : "Start from course assignments",
      },
      {
        step: "04",
        title: "Operate study dates for teaching scope",
        description:
          "Use study dates to schedule live sessions, manage participation, and keep course-linked teaching activity moving.",
        href: "/teacher/study_dates",
        cta: "Manage study dates",
      },
    ],
    [primaryAssignmentHref, primaryCourseHref, state.assignments, state.courses]
  );

  const quickActions = [
    {
      title: "Course workspace",
      description:
        "Jump into your teaching courses to manage content, assignments, students, and instructor membership.",
      href: "/teacher/courses/my",
    },
    {
      title: "Review and grading",
      description:
        "Open the current assignment review path where submission inspection and grading already work today.",
      href: primaryAssignmentHref,
    },
    {
      title: "Study date operations",
      description:
        "Track all study dates inside your teaching scope and monitor the next sessions that need attention.",
      href: "/teacher/study_dates",
    },
    {
      title: "Course intake",
      description:
        "Browse public courses and attach yourself as instructor before doing any teacher-side work.",
      href: "/teacher/courses",
    },
  ];

  return (
    <BaseTeacherContainer
      title="Teacher Dashboard"
      description="Teacher operations mapped to the current backend flow: course intake, content management, grading, and study dates."
    >
      <div className="space-y-8">
        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-emerald-700 bg-emerald-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Current backend flow
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Teacher work currently runs through the course workspace
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-100/85">
              The backend that exists today is course-first. Teachers attach
              themselves to a public course, manage chapters and lessons inside
              that course, review assignments and submissions there, then use
              study dates as the live-session layer around the same teaching scope.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {workflowSteps.map((item) => (
                <Link
                  key={item.step}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
                    Step {item.step}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                    {item.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-cyan-200">{item.cta}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl border p-5 ${toneClass(item.tone)}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] opacity-75">
                  {item.label}
                </p>
                <p className="mt-4 text-4xl font-semibold text-white">
                  {state.loading || userLoading ? "--" : item.value}
                </p>
                <p className="mt-3 text-sm leading-6 opacity-90">{item.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Operations
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Jump into the surfaces that already work
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <p className="text-lg font-semibold text-white">{action.title}</p>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Upcoming sessions
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Next study dates in your teaching scope
            </h2>

            <div className="mt-5 grid gap-4">
              {!state.loading && nextStudyDates.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-emerald-700 p-5 text-sm text-emerald-100/75">
                  No upcoming study date yet. Open the study-date area to schedule a new session.
                </div>
              ) : null}

              {(state.loading || userLoading
                ? Array.from({ length: 3 }, (_, index) => (
                    <div
                      key={`session-skeleton-${index}`}
                      className="h-28 rounded-2xl bg-emerald-900 animate-pulse"
                    />
                  ))
                : nextStudyDates.map((item) => (
                    <Link
                      key={item.id}
                      href={
                        item.created_by === user?.id
                          ? `/teacher/my/study_dates/${item.id}`
                          : `/teacher/study_dates/${item.id}`
                      }
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                    >
                      <p className="text-lg font-semibold text-white">
                        {item.title || "Untitled study date"}
                      </p>
                      <p className="mt-2 text-sm text-emerald-100/80">
                        {formatSchedule(item.scheduled_at)}
                      </p>
                      <p className="mt-1 text-sm text-emerald-100/65">
                        {item.location || "Location pending"}
                      </p>
                    </Link>
                  )))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Active courses
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Courses are the main teacher workspace
            </h2>
            </div>
            <Link
              href="/teacher/courses/my"
              className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-200 transition hover:bg-cyan-600 hover:text-white"
            >
              View all my courses
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {!state.loading && activeCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-emerald-700 p-5 text-sm text-emerald-100/75 xl:col-span-4">
                You are not attached to any course yet. Use Discover Courses to register as a teacher first.
              </div>
            ) : null}

            {(state.loading || userLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={`course-skeleton-${index}`}
                    className="h-48 rounded-2xl bg-emerald-900 animate-pulse"
                  />
                ))
              : activeCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/teacher/courses/my/${course.id}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-white">{course.title}</p>
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
                        {course.status}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-emerald-100/75">
                      {course.description || "No course description yet."}
                    </p>
                  </Link>
                )))}
          </div>
        </section>
      </div>
    </BaseTeacherContainer>
  );
}
