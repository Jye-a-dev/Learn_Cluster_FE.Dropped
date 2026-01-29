/* ===== UI COURSE (READ MODEL) ===== */
export type Course = {
	id: string;
	title: string;
	description?: string | null;
	objective?: string | null;
	duration_hours?: number | null;
	status: "draft" | "public" | "closed";
	created_at: string;
	updated_at: string;
};


/* ===== CREATE ===== */
export type CreateCoursePayload = {
	title: string;
	description?: string;
	objective?: string;
	duration_hours?: number;
	status?: "draft" | "public" | "closed";
};

/* ===== UPDATE ===== */
export type UpdateCoursePayload = {
	title: string;
	description?: string;
	objective?: string;
	duration_hours?: number;
	status?: "draft" | "public" | "closed";
};
