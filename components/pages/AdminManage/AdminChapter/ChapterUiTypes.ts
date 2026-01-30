// ChapterUiTypes.ts

export type Chapter = {
	id: string;
	course_id: string;
	title: string;
	description: string | null;
	ordering: number;
};

export type CreateChapterPayload = {
	course_id: string;
	title: string;
	description?: string;
	ordering?: number;
};

export type UpdateChapterPayload = {
	title?: string;
	description?: string;
	ordering?: number;
};
