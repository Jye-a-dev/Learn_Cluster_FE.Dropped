import {
  getAssignments,
  AssignmentBE,
} from "@/hooks/assignment/getAssignment";

export interface AssignmentOverviewStats {
  total: number;

  upcoming: number;     // chưa tới deadline
  overdue: number;      // đã quá deadline

  growth7: number;
  growth21: number;
  growth30: number;
}

/* =========================
   GROWTH (theo deadline)
========================= */
function calculateGrowth(
  assignments: AssignmentBE[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = assignments.filter((a) => {
    if (!a.deadline) return false;
    const date = new Date(a.deadline);
    return date >= currentStart;
  }).length;

  const previous = assignments.filter((a) => {
    if (!a.deadline) return false;
    const date = new Date(a.deadline);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

/* =========================
   MAIN
========================= */
export async function getAssignmentOverviewStats(): Promise<AssignmentOverviewStats> {
  const assignments = await getAssignments();

  const now = new Date();

  const upcoming = assignments.filter((a) => {
    if (!a.deadline) return false;
    return new Date(a.deadline) >= now;
  }).length;

  const overdue = assignments.filter((a) => {
    if (!a.deadline) return false;
    return new Date(a.deadline) < now;
  }).length;

  return {
    total: assignments.length,

    upcoming,
    overdue,

    growth7: calculateGrowth(assignments, 7),
    growth21: calculateGrowth(assignments, 21),
    growth30: calculateGrowth(assignments, 30),
  };
}