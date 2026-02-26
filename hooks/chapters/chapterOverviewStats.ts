import {
  getChapters,
  Chapter,
} from "@/hooks/chapters/getChapters";

export interface ChapterOverviewStats {
  total: number;

  growth7: number;
  growth21: number;
  growth30: number;
}

/* =========================
   GROWTH
========================= */
function calculateGrowth(
  chapters: Chapter[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = chapters.filter((c) => {
    if (!c.created_at) return false;
    const date = new Date(c.created_at);
    return date >= currentStart;
  }).length;

  const previous = chapters.filter((c) => {
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
export async function getChapterOverviewStats(): Promise<ChapterOverviewStats> {
  const chapters = await getChapters();

  return {
    total: chapters.length,

    growth7: calculateGrowth(chapters, 7),
    growth21: calculateGrowth(chapters, 21),
    growth30: calculateGrowth(chapters, 30),
  };
}