/* =======================
   TYPE
======================= */
export type Grade = {
	id: string;            // UUID
	submission_id: string; // UUID
	grader_id: string | null; // UUID | null
	score?: number | null;
	feedback?: string | null;
	graded_at?: string;
};

/* =======================
   PAYLOAD
======================= */
export type AddGradePayload = {
	submission_id: string;
	grader_id?: string | null;
	score?: number | null;
	feedback?: string | null;
};

export type UpdateGradePayload = {
	submission_id: string;
	grader_id?: string | null;
	score?: number | null;
	feedback?: string | null;
};
