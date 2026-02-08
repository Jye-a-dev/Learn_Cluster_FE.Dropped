"use client";

import { useState } from "react";
import {
	UserIcon,
	DocumentTextIcon,
	StarIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { AddGradePayload } from "./GradeUITypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useSubmissionsMap } from "@/hooks/submission/useSubmissionsMap";

export default function CreateGradeModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: AddGradePayload) => Promise<void>;
}) {
	const { usersMap, loading: loadingUsers } = useUsersMap();
	const { submissionsMap, loading: loadingSubmissions } =
		useSubmissionsMap();

	const [form, setForm] = useState<AddGradePayload>({
		submission_id: "",
		grader_id: "",
		score: null,
		feedback: "",
	});

	const [submitting, setSubmitting] = useState(false);

	const isInvalid = !form.submission_id;

	async function handleSubmit() {
		if (isInvalid) return;

		try {
			setSubmitting(true);
			await onSubmit({
				...form,
				grader_id: form.grader_id || null,
				feedback: form.feedback || null,
			});
			onClose();
			setForm({
				submission_id: "",
				grader_id: "",
				score: null,
				feedback: "",
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Grade"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5 text-white">
				{/* ===== SUBMISSION ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<DocumentTextIcon className="h-4 w-4 text-white/40" />
						Submission
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.submission_id}
						disabled={loadingSubmissions}
						onChange={(e) =>
							setForm({
								...form,
								submission_id: e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn submission --
						</option>
						{Object.values(submissionsMap).map((s) => (
							<option key={s.id} value={s.id}>
								{s.text_submission
									? s.text_submission.slice(0, 60)
									: "[No text submission]"}
							</option>
						))}

					</select>
				</div>

				{/* ===== GRADER ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<UserIcon className="h-4 w-4 text-white/40" />
						Grader
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.grader_id ?? ""}
						disabled={loadingUsers}
						onChange={(e) =>
							setForm({
								...form,
								grader_id: e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn grader (tuỳ chọn) --
						</option>
						{Object.values(usersMap).map((u) => (
							<option key={u.id} value={u.id}>
								{u.username ?? u.email}
							</option>
						))}
					</select>
				</div>

				{/* ===== SCORE ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<StarIcon className="h-4 w-4 text-white/40" />
						Score
					</label>
					<input
						type="number"
						step="0.01"
						min={0}
						max={10}
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.score ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								score: e.target.value
									? Number(e.target.value)
									: null,
							})
						}
					/>
				</div>

				{/* ===== FEEDBACK ===== */}
				<div className="space-y-1">
					<label className="text-xs font-semibold uppercase tracking-wide text-white/70">
						Feedback
					</label>
					<textarea
						rows={3}
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.feedback ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								feedback: e.target.value,
							})
						}
					/>
				</div>

				{/* ===== HINT ===== */}
				<p className="text-[11px] text-white/50">
					Mỗi submission chỉ có một grade.
				</p>
			</div>
		</BaseFormModal>
	);
}
