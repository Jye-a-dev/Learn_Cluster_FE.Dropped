import type {
	StudyMatch,
	AddStudyMatchPayload,
} from "@/hooks/study_matches/getStudyMatch";

/* =========================
   UI TYPE
========================= */

export type StudyMatchUI = StudyMatch & {
	user1_name?: string;
	user2_name?: string;
};

/* =========================
   CREATE
========================= */

export type CreateStudyMatchPayload =
	AddStudyMatchPayload;