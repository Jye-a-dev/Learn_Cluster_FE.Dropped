"use client";

import { useEffect, useState, useMemo } from "react";
import {
	BookOpenIcon,
	UserIcon,
	ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
	CourseInstructor,
	UpdateCourseInstructorPayload,
} from "./CourseInstructorUiTypes";

/* ===================== TYPES ===================== */

type Option = {
	id: string;
	label: string;
};

type Props = {
	open: boolean;
	instructor: CourseInstructor | null;
	courseOptions: Option[];
	userOptions: Option[];
	onClose: () => void;
	onSubmit: (
		id: string,
		data: UpdateCourseInstructorPayload
	) => Promise<void>;
};

/* ===================== COMPONENT ===================== */

export default function UpdateCourseInstructorModal({
	open,
	instructor,
	courseOptions = [],
	userOptions = [],
	onClose,
	onSubmit,
}: Props) {
	/* ===== STATE ===== */
	const [form, setForm] = useState<UpdateCourseInstructorPayload>({
		course_id: "",
		user_id: "",
		role_in_course: "Teacher",
	});

	const [submitting, setSubmitting] = useState(false);

	/* ===== EFFECT ===== */
	useEffect(() => {
		if (open && instructor) {
			setForm({
				course_id: instructor.course_id,
				user_id: instructor.user_id,
				role_in_course: instructor.role_in_course,
			});
		}
	}, [open, instructor]);

	/* ===== LABEL RESOLVE ===== */
	const courseLabel = useMemo(() => {
		if (!form.course_id) return "";
		return (
			courseOptions.find(
				(c) => c.id === form.course_id
			)?.label ?? form.course_id
		);
	}, [courseOptions, form.course_id]);

	const userLabel = useMemo(() => {
		if (!form.user_id) return "";
		return (
			userOptions.find(
				(u) => u.id === form.user_id
			)?.label ?? form.user_id
		);
	}, [userOptions, form.user_id]);

	/* ===== GUARD ===== */
	if (!open || !instructor) return null;
	const instructorId = instructor.id;

	/* ===== SUBMIT ===== */
	async function handleSubmit() {
		try {
			setSubmitting(true);
			await onSubmit(instructorId, form);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Course Instructor"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* COURSE */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<BookOpenIcon className="h-4 w-4 text-white/40" />
					Course
				</label>
				<input
					disabled
					value={courseLabel}
					className="input-admin text-white/60 cursor-not-allowed border border-white rounded-md"
				/>
			</div>

			{/* USER */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<UserIcon className="h-4 w-4 text-white/40" />
					User
				</label>
				<input
					disabled
					value={userLabel}
					className="input-admin text-white/60 cursor-not-allowed border border-white rounded-md"
				/>
			</div>

			{/* ROLE */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<ShieldCheckIcon className="h-4 w-4 text-white/40" />
					Role
				</label>
				<select
					className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md focus:border-white"
					value={form.role_in_course}
					onChange={(e) =>
						setForm({
							...form,
							role_in_course:
								e.target.value as UpdateCourseInstructorPayload["role_in_course"],
						})
					}
				>
					<option value="Teacher" className="bg-neutral-800 text-white">
						Teacher
					</option>
					<option value="TA" className="bg-neutral-800 text-white">
						TA
					</option>
					<option value="Moderator" className="bg-neutral-800 text-white">
						Moderator
					</option>
				</select>
			</div>

			<p className="pt-1 text-xs text-white/40">
				Khóa học và người dùng không thể thay đổi sau khi gán.
			</p>
		</BaseFormModal>
	);
}
