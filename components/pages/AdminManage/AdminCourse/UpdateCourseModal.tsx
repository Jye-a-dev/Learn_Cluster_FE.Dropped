"use client";

import { useEffect, useState } from "react";
import { BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Course, UpdateCoursePayload } from "./CourseUiTypes";

type Props = {
	open: boolean;
	course: Course | null;
	onClose: () => void;
	onSubmit: (id: string, data: UpdateCoursePayload) => Promise<void>;
};

type FormState = {
	title: string;
	description: string;
	objective: string;
	duration_hours?: number;
	status: "draft" | "public" | "closed";
};

export default function UpdateCourseModal({
	open,
	course,
	onClose,
	onSubmit,
}: Props) {
	const [form, setForm] = useState<FormState>({
		title: "",
		description: "",
		objective: "",
		duration_hours: undefined,
		status: "draft",
	});

	const [submitting, setSubmitting] = useState(false);

	/* =======================
	   INIT FORM
	======================= */
	useEffect(() => {
		if (!open || !course) return;

		setForm({
			title: course.title,
			description: course.description ?? "",
			objective: course.objective ?? "",
			duration_hours: course.duration_hours ?? undefined,
			status: course.status,
		});
	}, [open, course]);

	if (!open || !course) return null;
	const courseId = course.id;

	/* =======================
	   VALIDATION
	======================= */
	const isInvalid = !form.title.trim();

	/* =======================
	   SUBMIT
	======================= */
	async function handleSubmit() {
		try {
			setSubmitting(true);

			const payload: UpdateCoursePayload = {
				title: form.title.trim(),
				description: form.description.trim() || undefined,
				objective: form.objective.trim() || undefined,
				duration_hours: form.duration_hours,
				status: form.status,
			};

			await onSubmit(courseId, payload);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	/* =======================
	   RENDER
	======================= */
	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Course"
			submitting={submitting}
			isInvalid={isInvalid}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Title */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<BookOpenIcon className="h-4 w-4 text-white/40" />
					Title
				</label>
				<input
					className="input-admin text-white border border-white/40 rounded-md"
					value={form.title}
					onChange={(e) =>
						setForm({ ...form, title: e.target.value })
					}
				/>
			</div>

			{/* Description */}
			<div className="grid grid-cols-[140px_1fr] items-start gap-3">
				<label className="pt-2 text-xs font-medium text-white/70">
					Description
				</label>
				<textarea
					rows={3}
					className="input-admin text-white border border-white/40 rounded-md"
					value={form.description}
					onChange={(e) =>
						setForm({ ...form, description: e.target.value })
					}
				/>
			</div>

			{/* Objective */}
			<div className="grid grid-cols-[140px_1fr] items-start gap-3">
				<label className="pt-2 text-xs font-medium text-white/70">
					Objective
				</label>
				<textarea
					rows={3}
					className="input-admin text-white border border-white/40 rounded-md"
					value={form.objective}
					onChange={(e) =>
						setForm({ ...form, objective: e.target.value })
					}
				/>
			</div>

			{/* Duration */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<ClockIcon className="h-4 w-4 text-white/40" />
					Duration (hours)
				</label>
				<input
					type="number"
					min={0}
					className="input-admin text-white border border-white/40 rounded-md"
					value={form.duration_hours ?? ""}
					onChange={(e) =>
						setForm({
							...form,
							duration_hours: e.target.value
								? Number(e.target.value)
								: undefined,
						})
					}
				/>
			</div>

			{/* Status */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Status
				</label>
				<select
					className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
					value={form.status}
					onChange={(e) =>
						setForm({
							...form,
							status:
								e.target.value as FormState["status"],
						})
					}
				>
					<option value="draft">Draft</option>
					<option value="public">Public</option>
					<option value="closed">Closed</option>
				</select>
			</div>
		</BaseFormModal>
	);
}