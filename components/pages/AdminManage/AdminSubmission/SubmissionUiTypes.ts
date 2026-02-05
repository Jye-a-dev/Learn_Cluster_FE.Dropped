import type { SubmissionBE } from "@/hooks/submission/getSubmission";

export type Submission = SubmissionBE & {
	assignment_title?: string;
	student_name?: string;
};

export interface CreateSubmissionPayload {
	assignment_id: string;
	student_id: string;
	file_url?: string | null;
	text_submission?: string | null;
}

export type UpdateSubmissionPayload = {
	file_url?: string | null;
	text_submission?: string | null;
};
