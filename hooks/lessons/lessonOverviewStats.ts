import {
  getLessons,
  LessonBE,
} from "@/hooks/lessons/getLesson";

export interface LessonOverviewStats {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
}

function calculateGrowth(
  lessons: LessonBE[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = lessons.filter((l) => {
    if (!l.created_at) return false;
    const date = new Date(l.created_at);
    return date >= currentStart;
  }).length;

  const previous = lessons.filter((l) => {
    if (!l.created_at) return false;
    const date = new Date(l.created_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getLessonOverviewStats(): Promise<LessonOverviewStats> {
  const lessons = await getLessons();

  return {
    total: lessons.length,
    growth7: calculateGrowth(lessons, 7),
    growth21: calculateGrowth(lessons, 21),
    growth30: calculateGrowth(lessons, 30),
  };
}