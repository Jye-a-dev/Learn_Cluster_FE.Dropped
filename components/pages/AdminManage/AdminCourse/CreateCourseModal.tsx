"use client";

import { useState } from "react";
import {
	BookOpenIcon,
	DocumentTextIcon,
	ClockIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreateCoursePayload } from "./CourseUiTypes";

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateCoursePayload) => Promise<void>;
};

export default function CreateCourseModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const [form, setForm] = useState({
		title: "",
		description: "",
		objective: "",
		duration_hours: "",
		status: "draft" as "draft" | "public" | "closed",
	});

	const [submitting, setSubmitting] = useState(false);

	async function handleSubmit() {
		if (!form.title.trim()) return;

		try {
			setSubmitting(true);

			await onSubmit({
				title: form.title.trim(),
				description: form.description || undefined,
				objective: form.objective || undefined,
				duration_hours: form.duration_hours
					? Number(form.duration_hours)
					: undefined,
				status: form.status,
			});

			onClose();
			setForm({
				title: "",
				description: "",
				objective: "",
				duration_hours: "",
				status: "draft",
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Course"
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
					placeholder="Tên khóa học"
					value={form.title}
					onChange={(e) =>
						setForm({ ...form, title: e.target.value })
					}
				/>
			</div>

			{/* Description */}
			<div className="grid grid-cols-[140px_1fr] items-start gap-3">
				<label className="flex items-center gap-2 pt-2 text-xs font-medium text-white/70">
					<DocumentTextIcon className="h-4 w-4 text-white/40" />
					Description
				</label>
				<textarea
					rows={3}
					className="input-admin text-white border border-white rounded-md"
					placeholder="Mô tả khóa học"
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
					className="input-admin text-white border border-white rounded-md"
					placeholder="Mục tiêu khóa học"
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
					className="input-admin text-white border border-white rounded-md"
					value={form.duration_hours}
					onChange={(e) =>
						setForm({
							...form,
							duration_hours: e.target.value,
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
