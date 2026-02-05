"use client";

import { useState } from "react";
import {
	DocumentTextIcon,
	LinkIcon,
	ClockIcon,
	BookOpenIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "@/components/pages/AdminManage/BaseModel/BaseFormModal";
import type { CreateAssignmentPayload } from "./AssignmentUiTypes";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateAssignmentPayload) => Promise<void>;
};

export default function CreateAssignmentModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const { coursesMap, loading } = useCoursesMap();

	const [form, setForm] = useState({
		course_id: "",
		title: "",
		description: "",
		file_url: "",
		deadline: "",
	});

	const [submitting, setSubmitting] = useState(false);

	async function handleSubmit() {
		if (!form.course_id) return;

		try {
			setSubmitting(true);

			await onSubmit({
				course_id: form.course_id,
				title: form.title || undefined,
				description: form.description || undefined,
				file_url: form.file_url || undefined,
				deadline: form.deadline || undefined,
			});

			onClose();
			setForm({
				course_id: "",
				title: "",
				description: "",
				file_url: "",
				deadline: "",
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Assignment"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5 text-white">
				{/* ===== COURSE ===== */}
				<div className="space-y-1">
					<label className="text-xs font-semibold uppercase tracking-wide text-white/70 flex items-center gap-1">
						<BookOpenIcon className="h-4 w-4" />
						Course
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.course_id}
						disabled={loading}
						onChange={(e) =>
							setForm({ ...form, course_id: e.target.value })
						}
					>
						<option value="" disabled>
							-- Chọn course --
						</option>
						{Object.values(coursesMap).map((course) => (
							<option key={course.id} value={course.id}>
								{course.title}
							</option>
						))}
					</select>
				</div>

				{/* ===== TITLE ===== */}
				<div className="space-y-1">
					<label className="text-xs font-semibold uppercase tracking-wide text-white/70 flex items-center gap-1">
						<DocumentTextIcon className="h-4 w-4" />
						Title
					</label>
					<input
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.title}
						onChange={(e) =>
							setForm({ ...form, title: e.target.value })
						}
						placeholder="Assignment title"
					/>
				</div>

				{/* ===== DESCRIPTION ===== */}
				<div className="space-y-1">
					<label className="text-xs font-semibold uppercase tracking-wide text-white/70">
						Description
					</label>
					<textarea
						rows={3}
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm resize-none
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.description}
						onChange={(e) =>
							setForm({
								...form,
								description: e.target.value,
							})
						}
						placeholder="Short description"
					/>
				</div>

				{/* ===== FILE URL ===== */}
				<div className="space-y-1">
					<label className="text-xs font-semibold uppercase tracking-wide text-white/70 flex items-center gap-1">
						<LinkIcon className="h-4 w-4" />
						File URL
					</label>
					<input
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.file_url}
						onChange={(e) =>
							setForm({
								...form,
								file_url: e.target.value,
							})
						}
						placeholder="https://example.com/file.pdf"
					/>
				</div>

				{/* ===== DEADLINE (HIGHLIGHT) ===== */}
				<div className="space-y-1">
					<label className="text-xs font-semibold uppercase tracking-wide text-blue-400 flex items-center gap-1">
						<ClockIcon className="h-4 w-4" />
						Deadline
					</label>
					<input
						type="datetime-local"
						className="w-full rounded-md
						bg-white/10 border-2 border-blue-500/70
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.deadline}
						onChange={(e) =>
							setForm({
								...form,
								deadline: e.target.value,
							})
						}
					/>
					<p className="text-[11px] text-white/50">
						Thời gian theo múi giờ trình duyệt
					</p>
				</div>
			</div>
		</BaseFormModal>
	);
}
