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

export default function UpdateCourseModal({
	open,
	course,
	onClose,
	onSubmit,
}: Props) {
	const [form, setForm] = useState<UpdateCoursePayload>({
		title: "",
		description: "",
		objective: "",
		duration_hours: undefined,
		status: "draft",
	});

	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (open && course) {
			setForm({
				title: course.title,
				description: course.description ?? "",
				objective: course.objective ?? "",
				duration_hours: course.duration_hours ?? undefined,
				status: course.status,
			});
		}
	}, [open, course]);

	if (!open || !course) return null;
	const courseId = course.id;

	async function handleSubmit() {
		try {
			setSubmitting(true);
			await onSubmit(courseId, {
				...form,
				description: form.description || undefined,
				objective: form.objective || undefined,
			});
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Course"
			submitting={submitting}
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
					className="input-admin text-white border border-white rounded-md"
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
					className="input-admin text-white border border-white rounded-md"
					value={form.description ?? ""}
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
					className="input-admin text-white border border-white rounded-md"
					value={form.objective ?? ""}
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
					className="input-admin text-white border border-white rounded-md"
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
					className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md focus:border-white"
					value={form.status}
					onChange={(e) =>
						setForm({
							...form,
							status: e.target.value as never,
						})
					}
				>
					<option value="draft" className="bg-neutral-800 text-white">Draft</option>
					<option value="public" className="bg-neutral-800 text-white">Public</option>
					<option value="closed" className="bg-neutral-800 text-white">Closed</option>
				</select>
			</div>
		</BaseFormModal>
	);
}
