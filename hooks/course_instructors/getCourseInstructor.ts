import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface CourseInstructor {
	id: string; // UUID
	course_id: string; // UUID
	user_id: string; // UUID
	role_in_course: "Teacher" | "TA" | "Moderator";
	created_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddCourseInstructorPayload = {
	course_id: string;
	user_id: string;
	role_in_course: "Teacher" | "TA" | "Moderator";
};

export type CountInstructorResponse = {
	course_id: string;
	total_instructors: number;
};

export type UpdateCourseInstructorPayload = {
	course_id: string;
	user_id: string;
	role_in_course: "Teacher" | "TA" | "Moderator";
};

export type PatchCourseInstructorPayload = Partial<UpdateCourseInstructorPayload>;

/* =======================
   QUERY (optional)
======================= */
export type CourseInstructorQuery = {
	course_id?: string;
	user_id?: string;
	role_in_course?: "Teacher" | "TA" | "Moderator";
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/course_instructor
 * ======================================================= */
export async function getCourseInstructors(
	query?: CourseInstructorQuery
): Promise<CourseInstructor[]> {
	const res = await api.get<CourseInstructor[]>("/course_instructor", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/course_instructor/:id
 * ======================================================= */
export async function getCourseInstructor(
	id: string
): Promise<CourseInstructor> {
	const res = await api.get<CourseInstructor>(`/course_instructor/id/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/course_instructor
 * ======================================================= */
export async function addCourseInstructor(
	payload: AddCourseInstructorPayload
): Promise<CourseInstructor> {
	const res = await api.post<CourseInstructor>(
		"/course_instructor",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/course_instructor/:id
 * ======================================================= */
export async function updateCourseInstructor(
	id: string,
	payload: UpdateCourseInstructorPayload
): Promise<CourseInstructor> {
	const res = await api.put<CourseInstructor>(
		`/course_instructor/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * PATCH /api/course_instructor/:id
 * ======================================================= */
export async function patchCourseInstructor(
	id: string,
	payload: PatchCourseInstructorPayload
): Promise<CourseInstructor> {
	const res = await api.patch<CourseInstructor>(
		`/course_instructor/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/course_instructor/:id
 * ======================================================= */
export async function deleteCourseInstructor(id: string): Promise<void> {
	await api.delete(`/course_instructor/id/${id}`);
}

/* =========================================================
 * GET /api/course_instructor/course/:course_id
 * ======================================================= */
export async function getInstructorsByCourse(
	course_id: string
): Promise<CourseInstructor[]> {
	const res = await api.get<CourseInstructor[]>(
		`/course_instructor/course/${course_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/course_instructor/user/:user_id
 * ======================================================= */
export async function getCoursesByInstructor(
	user_id: string
): Promise<CourseInstructor[]> {
	const res = await api.get<CourseInstructor[]>(
		`/course_instructor/user/${user_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/course_instructor/course/:course_id/full
 * ======================================================= */
export async function getCourseInstructorsFull(
	course_id: string
): Promise<CourseInstructor[]> {
	const res = await api.get<CourseInstructor[]>(
		`/course_instructor/course/${course_id}/full`
	);
	return res.data ?? [];
}


export async function countInstructorsByCourse(
	course_id: string
): Promise<number> {
	const res = await api.get<CountInstructorResponse>(
		`/course_instructor/count/${course_id}`
	);

	return res.data?.total_instructors ?? 0;
}

/* =========================================================
 * DELETE /api/course_instructor/course/:course_id
 * ======================================================= */
export async function deleteCourseInstructorsByCourse(
	course_id: string
): Promise<void> {
	await api.delete(`/course_instructor/course/${course_id}`);
}
