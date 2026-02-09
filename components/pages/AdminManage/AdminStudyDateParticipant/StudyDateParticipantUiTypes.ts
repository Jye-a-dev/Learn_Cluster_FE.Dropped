/* =======================
   ENTITY
======================= */
export type StudyDateParticipant = {
	id: string;               // UUID
	study_date_id: string;    // UUID
	user_id: string;          // UUID
	joined_at?: string | null; // ISO datetime
	created_at?: string | null;
};

/* =======================
   PAYLOAD
======================= */
export type JoinStudyDateParticipantPayload = {
	study_date_id: string; // UUID
	user_id: string;       // UUID
};

export type LeaveStudyDateParticipantPayload = {
	study_date_id: string; // UUID
	user_id: string;       // UUID
};
