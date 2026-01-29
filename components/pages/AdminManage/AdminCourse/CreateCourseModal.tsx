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
			<div className="space-y-1.5">
				<label className="text-xs font-medium text-white/70">
					Title
				</label>
				<div className="relative">
					<BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
					<input
						className="input-admin pl-9 text-white border border-white rounded-b-md"
						placeholder="Tên khóa học"
						value={form.title}
						onChange={(e) =>
							setForm({ ...form, title: e.target.value })
						}
					/>
				</div>
			</div>

			{/* Description */}
			<div className="space-y-1.5">
				<label className="text-xs font-medium text-white/70">
					Description
				</label>
				<div className="relative">
					<DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/40" />
					<textarea
						rows={3}
						className="input-admin pl-9 text-white border border-white rounded-b-md"
						placeholder="Mô tả khóa học"
						value={form.description}
						onChange={(e) =>
							setForm({ ...form, description: e.target.value })
						}
					/>
				</div>
			</div>

			{/* Objective */}
			<div className="space-y-1.5">
				<label className="text-xs font-medium text-white/70">
					Objective
				</label>
				<textarea
					rows={3}
					className="input-admin text-white border border-white rounded-b-md"
					placeholder="Mục tiêu khóa học"
					value={form.objective}
					onChange={(e) =>
						setForm({ ...form, objective: e.target.value })
					}
				/>
			</div>

			{/* Duration */}
			<div className="space-y-1.5">
				<label className="text-xs font-medium text-white/70">
					Duration (hours)
				</label>
				<div className="relative">
					<ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
					<input
						type="number"
						min={0}
						className="input-admin pl-9 text-white border border-white rounded-b-md"
						value={form.duration_hours}
						onChange={(e) =>
							setForm({ ...form, duration_hours: e.target.value })
						}
					/>
				</div>
			</div>

			{/* Status */}
			<div className="space-y-1.5">
				<label className="text-xs font-medium text-white/70">
					Status
				</label>
				<select
					className="input-admin text-white border border-white rounded-b-md"
					value={form.status}
					onChange={(e) =>
						setForm({
							...form,
							status: e.target.value as never,
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
