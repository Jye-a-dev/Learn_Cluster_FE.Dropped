/* ===== UI ASSIGNMENT (READ MODEL) ===== */
export type Assignment = {
	id: string;
	course_id: string;
	title?: string | null;
	description?: string | null;
	file_url?: string | null;
	deadline?: string | null;
};

/* ===== CREATE ===== */
export type CreateAssignmentPayload = {
	course_id: string;
	title?: string;
	description?: string;
	file_url?: string;
	deadline?: string;
};

/* ===== UPDATE ===== */
export type UpdateAssignmentPayload = {
	course_id: string;
	title?: string;
	description?: string;
	file_url?: string;
	deadline?: string;
};
