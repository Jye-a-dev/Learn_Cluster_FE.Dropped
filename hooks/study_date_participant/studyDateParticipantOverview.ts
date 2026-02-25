import {
  getStudyDateParticipants,
  StudyDateParticipant,
} from "@/hooks/study_date_participant/getStudyDateParticipant";

export interface StudyDateParticipantOverviewStats {
  total: number;
  growth7: number;
  growth21: number;
  growth30: number;
}

function calculateGrowth(
  items: StudyDateParticipant[],
  days: number
): number {
  const now = new Date();

  const currentStart = new Date();
  currentStart.setDate(now.getDate() - days);

  const previousStart = new Date();
  previousStart.setDate(now.getDate() - days * 2);

  const current = items.filter((item) => {
    if (!item.created_at) return false;
    const date = new Date(item.created_at);
    return date >= currentStart && date <= now;
  }).length;

  const previous = items.filter((item) => {
    if (!item.created_at) return false;
    const date = new Date(item.created_at);
    return date >= previousStart && date < currentStart;
  }).length;

  if (previous === 0) return current > 0 ? 100 : 0;

  return ((current - previous) / previous) * 100;
}

export async function getStudyDateParticipantOverviewStats(): Promise<StudyDateParticipantOverviewStats> {
  const participants = await getStudyDateParticipants();

  return {
    total: participants.length,
    growth7: calculateGrowth(participants, 7),
    growth21: calculateGrowth(participants, 21),
    growth30: calculateGrowth(participants, 30),
  };
}