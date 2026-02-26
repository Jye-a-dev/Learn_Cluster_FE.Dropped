import {
  getCourses,
  Course,
} from "@/hooks/courses/getCourse";

export interface CourseOverviewStats {
  total: number;

  draft: number;
  public: number;
  closed: number;

  growth7: number;
  growth21: number;
  growth30: number;
}

/* =========================
   GROWTH
========================= */
function calculateGrowth(
  courses: Course[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = courses.filter((c) => {
    if (!c.created_at) return false;
    const date = new Date(c.created_at);
    return date >= currentStart;
  }).length;

  const previous = courses.filter((c) => {
    if (!c.created_at) return false;
    const date = new Date(c.created_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

/* =========================
   MAIN
========================= */
export async function getCourseOverviewStats(): Promise<CourseOverviewStats> {
  const courses = await getCourses();

  const draft = courses.filter((c) => c.status === "draft").length;
  const publicCount = courses.filter((c) => c.status === "public").length;
  const closed = courses.filter((c) => c.status === "closed").length;

  return {
    total: courses.length,

    draft,
    public: publicCount,
    closed,

    growth7: calculateGrowth(courses, 7),
    growth21: calculateGrowth(courses, 21),
    growth30: calculateGrowth(courses, 30),
  };
}