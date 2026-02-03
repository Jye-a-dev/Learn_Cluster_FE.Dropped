import type { LessonBE } from "@/hooks/lessons/getLesson";

export type LessonContentType = "video" | "pdf" | "text";

/**
 * UI-only lesson (mở rộng BE)
 */
export type Lesson = Omit<LessonBE, "content_type"> & {
	chapter_name?: string;
	content_type: LessonContentType; // ✅ OVERRIDE
	content_text?: string | null; // UI-only
};

export interface CreateLessonPayload {
	chapter_id: string;
	title: string;
	content_type: LessonContentType;
	content_url?: string | null;
	content_text?: string | null; // UI-only
	ordering?: number;
}

export type UpdateLessonPayload = {
	chapter_id?: string; // ✅ ADD
	title?: string;
	content_url?: string;
	content_text?: string;
	ordering?: number;
};

