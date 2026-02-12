/* ===================== BASE TYPES ===================== */

import { ReactNode } from "react";

export interface Note {
	title: ReactNode;
	id: string; // UUID
	user_id: string; // UUID
	lesson_id: string; // UUID
	content: string | null;
	created_at: string; // ISO date string
}

/* ===================== FORM PAYLOAD ===================== */

export interface CreateNotePayload {
	user_id: string;
	lesson_id: string;
	content?: string | null;
}

export interface UpdateNotePayload {
	user_id?: string;
	lesson_id?: string;
	content?: string | null;
}
