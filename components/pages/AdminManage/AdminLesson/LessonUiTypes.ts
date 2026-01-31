// LessonUiTypes.ts

// LessonUiTypes.ts
export type LessonContentType = "video" | "pdf" | "text";

export type Lesson = {
	id: string;
	chapter_id: string;
	title: string;
	content_type: LessonContentType;
	content_url: string | null;
	ordering: number;
	created_at?: string;
};

export type CreateLessonPayload = {
	chapter_id: string;
	title: string;
	content_type: LessonContentType;
	content_url: string | null;
	ordering?: number;
};

export type UpdateLessonPayload = Partial<
	Omit<CreateLessonPayload, "chapter_id">
>;
