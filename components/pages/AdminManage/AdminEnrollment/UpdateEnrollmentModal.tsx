"use client";

import { useEffect, useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";

import type {
	Enrollment,
	UpdateEnrollmentPayload,
} from "./EnrollmentUiTypes";

type Props = {
	open: boolean;
	enrollment: Enrollment | null;
	onClose: () => void;
	onSubmit: (id: string, data: UpdateEnrollmentPayload) => void | Promise<void>;
};

export default function UpdateEnrollmentModal({
	open,
	enrollment,
	onClose,
	onSubmit,
}: Props) {
	const [userId, setUserId] = useState("");
	const [courseId, setCourseId] = useState("");
	const [submitting, setSubmitting] = useState(false);

	/* =========================
	   LOAD DATA
	========================= */
	useEffect(() => {
		if (!enrollment) return;

		setUserId(enrollment.user_id);
		setCourseId(enrollment.course_id);
	}, [enrollment]);

	/* =========================
	   SUBMIT WRAPPER
	========================= */
	async function handleSubmit() {
		if (!enrollment) return;

		try {
			setSubmitting(true);

			await onSubmit(enrollment.id, {
				user_id: userId,
				course_id: courseId,
			});

			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Enrollment"
			onClose={onClose}
			onSubmit={handleSubmit}
			submitting={submitting}
		>
			<div className="space-y-4">
				{/* USER ID */}
				<div className="space-y-1">
					<label className="text-sm text-white/70">User ID</label>

					<input
						disabled
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className="w-full rounded-md bg-neutral-800 border border-white/10 px-3 py-2 text-white"
						placeholder="Nhập user id"
					/>
				</div>

				{/* COURSE ID */}
				<div className="space-y-1">
					<label className="text-sm text-white/70">Course ID</label>

					<input
						disabled
						value={courseId}
						onChange={(e) => setCourseId(e.target.value)}
						className="w-full rounded-md bg-neutral-800 border border-white/10 px-3 py-2 text-white"
						placeholder="Nhập course id"
					/>
				</div>
			</div>
		</BaseFormModal>
	);
}