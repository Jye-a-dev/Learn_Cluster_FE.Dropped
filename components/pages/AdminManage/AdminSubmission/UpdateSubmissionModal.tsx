"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
	Submission,
	UpdateSubmissionPayload,
} from "./SubmissionUiTypes";

export default function UpdateSubmissionModal({
	open,
	submission,
	onClose,
	onSubmit,
}: {
	open: boolean;
	submission: Submission | null;
	onClose: () => void;
	onSubmit: (id: string, data: UpdateSubmissionPayload) => Promise<void>;
}) {
	const [form, setForm] = useState<UpdateSubmissionPayload>({});

	if (!open || !submission) return null;

	const s = submission;

	const mergedForm: UpdateSubmissionPayload = {
		file_url: form.file_url ?? s.file_url,
		text_submission: form.text_submission ?? s.text_submission,
	};

	async function handleSubmit() {
		await onSubmit(s.id, mergedForm);
		onClose();
	}

	const inputClass =
		"w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white " +
		"placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

	const labelClass =
		"block text-sm font-medium text-slate-200";

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Submission"
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-4">
				{/* Text submission */}
				<div>
					<label className={labelClass}>
						Text submission
					</label>
					<textarea
						rows={4}
						className={inputClass}
						value={mergedForm.text_submission ?? ""}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								text_submission: e.target.value,
							}))
						}
					/>
				</div>

				{/* File URL */}
				<div>
					<label className={labelClass}>File URL</label>
					<input
						className={inputClass}
						value={mergedForm.file_url ?? ""}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								file_url: e.target.value,
							}))
						}
					/>
				</div>
			</div>
		</BaseFormModal>
	);
}
