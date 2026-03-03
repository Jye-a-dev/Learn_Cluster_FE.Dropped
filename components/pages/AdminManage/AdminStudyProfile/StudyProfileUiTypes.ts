import type {
	StudyProfile,
	AvailableTime,
} from "@/hooks/study_profile/getStudyProfile";

/* =========================
   UI TYPE
========================= */

export type StudyProfileUI = StudyProfile & {
	user_name?: string;
};

/* =========================
   CREATE
========================= */

export type CreateStudyProfilePayload = {
	user_id: string;
	bio?: string | null;
	preferred_subject?: string | null;
	level?: string | null;
	learning_goal?: string | null;
	available_time?: AvailableTime | null;
	is_active?: boolean;
};

/* =========================
   UPDATE
========================= */

export type UpdateStudyProfilePayload = {
	user_id: string;
	bio: string | null;
	preferred_subject: string | null;
	level: string | null;
	learning_goal: string | null;
	available_time: AvailableTime | null;
	is_active: boolean;
};

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayKey = typeof DAYS[number];

export type AvailableTimeUI = {
  [key in DayKey]?: {
    enabled: boolean;
    from: string;
    to: string;
  };
};