"use client";

import { useState } from "react";
import {
	UserIcon,
	AcademicCapIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { AddEnrollmentPayload } from "./EnrollmentUiTypes";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

export default function CreateEnrollmentModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: AddEnrollmentPayload) => Promise<void>;
}) {
	const { coursesMap, loading: loadingCourses } = useCoursesMap();
	const { usersMap, loading: loadingUsers } = useUsersMap();

	const [form, setForm] = useState({
		user_id: "",
		course_id: "",
	});

	const [submitting, setSubmitting] = useState(false);

	const isInvalid = !form.user_id || !form.course_id;

	async function handleSubmit() {
		if (isInvalid) return;

		try {
			setSubmitting(true);
			await onSubmit(form);
			onClose();
			setForm({ user_id: "", course_id: "" });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Enrollment"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5 text-white">
				{/* ===== USER ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<UserIcon className="h-4 w-4 text-white/40" />
						User
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.user_id}
						disabled={loadingUsers}
						onChange={(e) =>
							setForm({ ...form, user_id: e.target.value })
						}
					>
						<option value="">
							-- Chọn user --
						</option>
						{Object.values(usersMap).map((u) => (
							<option key={u.id} value={u.id}>
								{u.username ?? u.email}
							</option>
						))}
					</select>
				</div>

				{/* ===== COURSE ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<AcademicCapIcon className="h-4 w-4 text-white/40" />
						Course
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.course_id}
						disabled={loadingCourses}
						onChange={(e) =>
							setForm({
								...form,
								course_id: e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn course --
						</option>
						{Object.values(coursesMap).map((c) => (
							<option key={c.id} value={c.id}>
								{c.title}
							</option>
						))}
					</select>
				</div>

				{/* ===== HINT ===== */}
				<p className="text-[11px] text-white/50">
					Mỗi user chỉ được enroll một lần cho mỗi course.
				</p>
			</div>
		</BaseFormModal>
	);
}
