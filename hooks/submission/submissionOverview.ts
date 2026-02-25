import {
  getSubmissions,
  SubmissionBE,
} from "@/hooks/submission/getSubmission";

export interface SubmissionOverviewStats {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
}

function calculateGrowth(
  submissions: SubmissionBE[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = submissions.filter((s) => {
    if (!s.submitted_at) return false;
    const date = new Date(s.submitted_at);
    return date >= currentStart;
  }).length;

  const previous = submissions.filter((s) => {
    if (!s.submitted_at) return false;
    const date = new Date(s.submitted_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getSubmissionOverviewStats(): Promise<SubmissionOverviewStats> {
  const submissions = await getSubmissions();

  return {
    total: submissions.length,
    growth7: calculateGrowth(submissions, 7),
    growth21: calculateGrowth(submissions, 21),
    growth30: calculateGrowth(submissions, 30),
  };
}