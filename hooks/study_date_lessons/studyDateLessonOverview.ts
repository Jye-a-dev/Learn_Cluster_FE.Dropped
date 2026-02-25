import {
  getStudyDateLessons,
  StudyDateLessonBE,
} from "@/hooks/study_date_lessons/getStudyDateLesson";

export interface StudyDateLessonOverviewStats {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
}

function calculateGrowth(
  items: StudyDateLessonBE[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = items.filter((item) => {
    if (!item.created_by) return false;
    const date = new Date(item.created_by);
    return date >= currentStart && date <= now;
  }).length;

  const previous = items.filter((item) => {
    if (!item.created_by) return false;
    const date = new Date(item.created_by);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getStudyDateLessonOverviewStats(): Promise<StudyDateLessonOverviewStats> {
  const lessons = await getStudyDateLessons();

  return {
    total: lessons.length,
    growth7: calculateGrowth(lessons, 7),
    growth21: calculateGrowth(lessons, 21),
    growth30: calculateGrowth(lessons, 30),
  };
}