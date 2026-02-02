"use client";

import { useState, useMemo } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import type { CreateCourseInstructorPayload } from "./CourseInstructorUiTypes";

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateCourseInstructorPayload) => Promise<void>;
};

export default function CreateCourseInstructorModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const { coursesMap, loading: coursesLoading } = useCoursesMap();
	const { usersMap, loading: usersLoading } = useUsersMap();

	const courses = useMemo(
		() => Object.values(coursesMap),
		[coursesMap]
	);
	const users = useMemo(() => Object.values(usersMap), [usersMap]);

	const [form, setForm] = useState<CreateCourseInstructorPayload>({
		course_id: "",
		user_id: "",
		role_in_course: "Teacher",
	});

	const isInvalid =
		!form.course_id ||
		!form.user_id ||
		coursesLoading ||
		usersLoading;

	async function handleSubmit() {
		if (isInvalid) return;
		await onSubmit(form);
		setForm({
			course_id: "",
			user_id: "",
			role_in_course: "Teacher",
		});
		onClose();
	}

	return (
		<BaseFormModal
			open={open}
			title="Thêm Instructor vào Course"
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* COURSE */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Course
				</label>
				<select
					value={form.course_id}
					onChange={(e) =>
						setForm({ ...form, course_id: e.target.value })
					}
					className="input-admin bg-neutral-900 text-white border border-white/40"
				>
					<option value="">-- Chọn course --</option>
					{courses.map((c) => (
						<option key={c.id} value={c.id}>
							{c.title}
						</option>
					))}
				</select>
			</div>

			{/* USER */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					User
				</label>
				<select
					value={form.user_id}
					onChange={(e) =>
						setForm({ ...form, user_id: e.target.value })
					}
					className="input-admin bg-neutral-900 text-white border border-white/40"
				>
					<option value="">-- Chọn user --</option>
					{users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.email}
						</option>
					))}
				</select>
			</div>

			{/* ROLE */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Vai trò
				</label>
				<select
					value={form.role_in_course}
					onChange={(e) =>
						setForm({
							...form,
							role_in_course:
								e.target.value as CreateCourseInstructorPayload["role_in_course"],
						})
					}
					className="input-admin bg-neutral-900 text-white border border-white/40"
				>
					<option value="Teacher">Teacher</option>
					<option value="TA">TA</option>
					<option value="Moderator">Moderator</option>
				</select>
			</div>
		</BaseFormModal>
	);
}
