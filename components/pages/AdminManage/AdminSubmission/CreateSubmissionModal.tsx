"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useAssignmentsMap } from "@/hooks/assignment/useAssignmentsMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import type { CreateSubmissionPayload } from "./SubmissionUiTypes";

export default function CreateSubmissionModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateSubmissionPayload) => Promise<void>;
}) {
	const { assignmentsMap } = useAssignmentsMap();
	const { usersMap } = useUsersMap();

	const [form, setForm] = useState<CreateSubmissionPayload>({
		assignment_id: "",
		student_id: "",
		file_url: "",
		text_submission: "",
	});

	if (!open) return null;

	async function handleSubmit() {
		await onSubmit(form);
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
			title="Tạo Submission"
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-4">
				{/* Assignment */}
				<div>
					<label className={labelClass}>Assignment</label>
					<select
						className={inputClass}
						value={form.assignment_id}
						onChange={(e) =>
							setForm({
								...form,
								assignment_id: e.target.value,
							})
						}
					>
						<option value="">-- Chọn assignment --</option>
						{Object.values(assignmentsMap).map((a) => (
							<option key={a.id} value={a.id}>
								{a.title}
							</option>
						))}
					</select>
				</div>

				{/* Student */}
				<div>
					<label className={labelClass}>Student</label>
					<select
						className={inputClass}
						value={form.student_id}
						onChange={(e) =>
							setForm({
								...form,
								student_id: e.target.value,
							})
						}
					>
						<option value="">-- Chọn student --</option>
						{Object.values(usersMap).map((u) => (
							<option key={u.id} value={u.id}>
								{u.username}
							</option>
						))}
					</select>
				</div>

				{/* Text submission */}
				<div>
					<label className={labelClass}>Text submission</label>
					<textarea
						rows={4}
						className={inputClass}
						value={form.text_submission ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								text_submission: e.target.value,
							})
						}
					/>
				</div>

				{/* File URL */}
				<div>
					<label className={labelClass}>File URL</label>
					<input
						className={inputClass}
						value={form.file_url ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								file_url: e.target.value,
							})
						}
					/>
				</div>
			</div>
		</BaseFormModal>
	);
}
