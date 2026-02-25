import {
  getStudyDates,
  StudyDateBE,
} from "@/hooks/study_dates/getStudyDates";

export interface StudyDateOverviewStats {
  total: number;
  upcoming: number;
  growth7: number;
  growth21: number;
  growth30: number;
}

function calculateGrowth(
  items: StudyDateBE[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = items.filter((s) => {
    if (!s.scheduled_at) return false;
    const date = new Date(s.scheduled_at);
    return date >= currentStart && date <= now;
  }).length;

  const previous = items.filter((s) => {
    if (!s.scheduled_at) return false;
    const date = new Date(s.scheduled_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getStudyDateOverviewStats(): Promise<StudyDateOverviewStats> {
  const studyDates = await getStudyDates();

  const now = new Date();

  const upcoming = studyDates.filter((s) => {
    if (!s.scheduled_at) return false;
    return new Date(s.scheduled_at) > now;
  }).length;

  return {
    total: studyDates.length,
    upcoming,
    growth7: calculateGrowth(studyDates, 7),
    growth21: calculateGrowth(studyDates, 21),
    growth30: calculateGrowth(studyDates, 30),
  };
}