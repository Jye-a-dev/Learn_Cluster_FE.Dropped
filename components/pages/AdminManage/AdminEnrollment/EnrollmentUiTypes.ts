export type Enrollment = {
	id: string;
	user_id: string;
	course_id: string;
	enrolled_at?: string;
};

export type AddEnrollmentPayload = {
	user_id: string;
	course_id: string;
};

export type UpdateEnrollmentPayload = {
	user_id: string;
	course_id: string;
};
