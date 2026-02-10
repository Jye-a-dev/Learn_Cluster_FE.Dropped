// StudyDateLessonUiTypes.ts

/* =======================
   ENTITY
======================= */
export type StudyDateLesson = {
	id: string;
	study_date_id: string;
	lesson_id: string;
	created_at?: string | null;
};

/* =======================
   PAYLOAD
======================= */
export type AddStudyDateLessonPayload = {
	study_date_id: string;
	lesson_id: string;
};

export type RemoveStudyDateLessonPayload = {
	study_date_id: string;
	lesson_id: string;
};
// StudyDateLessonUiTypes.ts
export type UpdateStudyDateLessonPayload = {
	study_date_id?: string;
	lesson_id?: string;
};
