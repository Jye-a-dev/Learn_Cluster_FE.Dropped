// CourseInstructorUiTypes.ts

export type RoleInCourse = "Teacher" | "TA" | "Moderator";

export type CourseInstructor = {
	id: string;
	course_id: string;
	user_id: string;
	role_in_course: RoleInCourse;
	created_at?: string;
};

/* ========= Payloads ========= */

export type CreateCourseInstructorPayload = {
	course_id: string;
	user_id: string;
	role_in_course: RoleInCourse;
};

export type UpdateCourseInstructorPayload = CreateCourseInstructorPayload;

/* ========= Lookup types (dùng cho Table / Modal) ========= */

export type CourseLookup = {
	id: string;
	title: string;
};

export type UserLookup = {
	id: string;
	full_name: string;
};
