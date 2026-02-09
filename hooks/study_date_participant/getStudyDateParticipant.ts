import api from "@/hooks/api";
import { ReactNode } from "react";

/* =======================
   TYPE
======================= */
export interface StudyDateParticipant {
	id: string; // UUID
	study_date_id: string; // UUID
	user_id: string; // UUID
	joined_at?: string;
	created_at?: string;
	updated_at?: string;

	// optional populate fields
	user_name?: ReactNode;
	study_date_name?: ReactNode;
}

/* =======================
   PAYLOAD
======================= */
export type JoinStudyDatePayload = {
	study_date_id: string; // UUID
	user_id: string; // UUID
};

export type LeaveStudyDatePayload = {
	study_date_id: string; // UUID
	user_id: string; // UUID
};

/* =======================
   QUERY
======================= */
export type StudyDateParticipantQuery = {
	study_date_id?: string;
	user_id?: string;

	page?: number;
	limit?: number;
};


/* =========================================================
 * GET /api/study_date_participant
 * ======================================================= */
export async function getStudyDateParticipants(
	query?: StudyDateParticipantQuery
): Promise<StudyDateParticipant[]> {
	const res = await api.get<StudyDateParticipant[]>(
		"/study_date_participant",
		{ params: query }
	);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/study_date_participant/study-date/:study_date_id
 * ======================================================= */
export async function getParticipantsByStudyDate(
	study_date_id: string,
	query?: StudyDateParticipantQuery
): Promise<StudyDateParticipant[]> {
	const res = await api.get<StudyDateParticipant[]>(
		`/study_date_participant/study-date/${study_date_id}`,
		{ params: query }
	);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/study_date_participant/study-date/:study_date_id/count
 * ======================================================= */
export async function getParticipantCountByStudyDate(
	study_date_id: string
): Promise<number> {
	const res = await api.get<{ total: number }>(
		`/study_date_participant/study-date/${study_date_id}/count`
	);
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/study_date_participant/user/:user_id
 * ======================================================= */
export async function getStudyDatesByUser(
	user_id: string,
	query?: StudyDateParticipantQuery
): Promise<StudyDateParticipant[]> {
	const res = await api.get<StudyDateParticipant[]>(
		`/study_date_participant/user/${user_id}`,
		{ params: query }
	);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/study_date_participant/user/:user_id/count
 * ======================================================= */
export async function getStudyDateCountByUser(
	user_id: string
): Promise<number> {
	const res = await api.get<{ total: number }>(
		`/study_date_participant/user/${user_id}/count`
	);
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/study_date_participant/study-date/:study_date_id/user/:user_id
 * ======================================================= */
export async function getStudyDateParticipant(
	study_date_id: string,
	user_id: string
): Promise<StudyDateParticipant | null> {
	const res = await api.get<StudyDateParticipant | null>(
		`/study_date_participant/study-date/${study_date_id}/user/${user_id}`
	);
	return res.data ?? null;
}

/* =========================================================
 * POST /api/study_date_participant/join
 * ======================================================= */
export async function joinStudyDate(
	payload: JoinStudyDatePayload
): Promise<StudyDateParticipant> {
	const res = await api.post<StudyDateParticipant>(
		"/study_date_participant/join",
		payload
	);
	return res.data;
}

/* =========================================================
 * POST /api/study_date_participant/leave
 * ======================================================= */
export async function leaveStudyDate(
	payload: LeaveStudyDatePayload
): Promise<void> {
	await api.post("/study_date_participant/leave", payload);
}

/* =========================================================
 * DELETE /api/study_date_participant/study-date/:study_date_id/user/:user_id
 * ======================================================= */
export async function deleteStudyDateParticipant(
	study_date_id: string,
	user_id: string
): Promise<void> {
	await api.delete(
		`/study_date_participant/study-date/${study_date_id}/user/${user_id}`
	);
}
