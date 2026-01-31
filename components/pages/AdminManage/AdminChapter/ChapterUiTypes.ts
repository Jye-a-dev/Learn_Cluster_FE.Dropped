// ChapterUiTypes.ts

export type Chapter = {
    order: undefined;
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
    course_id: string | number | readonly string[] | undefined;
    order: string;
	title?: string;
	description?: string;
	ordering?: number;
};
