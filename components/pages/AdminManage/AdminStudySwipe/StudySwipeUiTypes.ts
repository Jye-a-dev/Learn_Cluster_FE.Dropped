import type {
	StudySwipe,
	StudySwipeStatus,
} from "@/hooks/study_swipe/getStudySwipe";

/* =========================
   UI TYPE
========================= */

export type StudySwipeUI = StudySwipe & {
	swiper_name?: string;
	target_name?: string;
};

/* =========================
   CREATE
========================= */

export type CreateStudySwipePayload = {
	swiper_id: string;
	target_id: string;
	status?: StudySwipeStatus;
};

/* =========================
   UPDATE
========================= */

export type UpdateStudySwipePayload = {
	swiper_id: string;
	target_id: string;
	status: StudySwipeStatus;
};