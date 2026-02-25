import { getUsers, User } from "@/hooks/users/getUsers";

export interface UserGrowthStats {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
}

function calculateGrowth(
  users: User[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = users.filter((u) => {
    if (!u.created_at) return false;
    const date = new Date(u.created_at);
    return date >= currentStart;
  }).length;

  const previous = users.filter((u) => {
    if (!u.created_at) return false;
    const date = new Date(u.created_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getUserOverviewStats(): Promise<UserGrowthStats> {
  const users = await getUsers();

  return {
    total: users.length,
    growth7: calculateGrowth(users, 7),
    growth21: calculateGrowth(users, 21),
    growth30: calculateGrowth(users, 30),
  };
}