/* =======================
   ENTITY
======================= */
export type StudyDate = {
	id: string;                // UUID
	course_id: string;         // UUID
	title?: string | null;
	scheduled_at?: string | null; // ISO datetime
	location?: string | null;
	created_by?: string | null;   // UUID
};

/* =======================
   PAYLOAD
======================= */
export type CreateStudyDatePayload = {
	course_id: string;
	title?: string | null;
	scheduled_at?: string | null;
	location?: string | null;
	created_by?: string | null;
};

export type UpdateStudyDatePayload = {
	course_id?: string;
	title?: string;
	scheduled_at?: string;
	location?: string;
	created_by?: string;
};
