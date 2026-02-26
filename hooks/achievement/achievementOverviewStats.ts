import {
  getAchievements,
  AchievementBE,
} from "@/hooks/achievement/getAchievement";

export interface AchievementOverviewStats {
  total: number;

  growth7: number;
  growth21: number;
  growth30: number;
}

/* =========================
   GROWTH (dựa trên awarded_at)
========================= */
function calculateGrowth(
  achievements: AchievementBE[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = achievements.filter((a) => {
    if (!a.awarded_at) return false;
    const date = new Date(a.awarded_at);
    return date >= currentStart;
  }).length;

  const previous = achievements.filter((a) => {
    if (!a.awarded_at) return false;
    const date = new Date(a.awarded_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

/* =========================
   MAIN
========================= */
export async function getAchievementOverviewStats(): Promise<AchievementOverviewStats> {
  const achievements = await getAchievements();

  return {
    total: achievements.length,

    growth7: calculateGrowth(achievements, 7),
    growth21: calculateGrowth(achievements, 21),
    growth30: calculateGrowth(achievements, 30),
  };
}