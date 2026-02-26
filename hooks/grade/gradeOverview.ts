import {
  getGrades,
  getTopGrades,
  Grade,
} from "@/hooks/grade/getGrade";

export interface GradeOverviewStats {
  total: number;

  graded: number;          // đã chấm (có score)
  ungraded: number;        // chưa chấm (score null)

  avgScore: number;        // điểm trung bình
  highestScore: number;    // điểm cao nhất
  lowestScore: number;     // điểm thấp nhất

  growth7: number;
  growth21: number;
  growth30: number;

  topGrades: Grade[];      // top N
}

/* =========================
   GROWTH CALCULATION
========================= */
function calculateGrowth(
  grades: Grade[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = grades.filter((g) => {
    if (!g.graded_at) return false;
    const date = new Date(g.graded_at);
    return date >= currentStart;
  }).length;

  const previous = grades.filter((g) => {
    if (!g.graded_at) return false;
    const date = new Date(g.graded_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

/* =========================
   MAIN OVERVIEW
========================= */
export async function getGradeOverviewStats(): Promise<GradeOverviewStats> {
  const grades = await getGrades();

  const graded = grades.filter((g) => g.score !== null).length;
  const ungraded = grades.filter((g) => g.score === null).length;

  const scoredGrades = grades.filter(
    (g) => g.score !== null
  );

  const scores = scoredGrades.map((g) => g.score as number);

  const avgScore =
    scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;

  const highestScore =
    scores.length > 0 ? Math.max(...scores) : 0;

  const lowestScore =
    scores.length > 0 ? Math.min(...scores) : 0;

  const topGrades = await getTopGrades(5);

  return {
    total: grades.length,

    graded,
    ungraded,

    avgScore: Number(avgScore.toFixed(2)),
    highestScore,
    lowestScore,

    growth7: calculateGrowth(grades, 7),
    growth21: calculateGrowth(grades, 21),
    growth30: calculateGrowth(grades, 30),

    topGrades,
  };
}