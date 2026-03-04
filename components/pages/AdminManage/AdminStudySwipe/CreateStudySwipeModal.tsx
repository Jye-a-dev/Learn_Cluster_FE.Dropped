"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import type {
	CreateStudySwipePayload,
} from "./StudySwipeUiTypes";

export default function CreateStudySwipeModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (
		data: CreateStudySwipePayload
	) => Promise<void>;
}) {
	const { usersMap } = useUsersMap();

	const [form, setForm] =
		useState<CreateStudySwipePayload>({
			swiper_id: "",
			target_id: "",
			status: "pending",
		});

	const [submitting, setSubmitting] =
		useState(false);

	if (!open) return null;

	async function handleSubmit() {
		try {
			setSubmitting(true);
			await onSubmit(form);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	const inputStyle =
		"w-full rounded-md bg-zinc-900 text-white border border-white/20 px-3 py-2 text-sm";

	return (
		<BaseFormModal
			open={open}
			title="Tạo Study Swipe"
			onClose={onClose}
			onSubmit={handleSubmit}
			submitting={submitting}
		>
			<select
				value={form.swiper_id}
				onChange={(e) =>
					setForm({
						...form,
						swiper_id: e.target.value,
					})
				}
				className={inputStyle}
			>
				<option value="">
					Chọn Swiper
				</option>
				{Object.values(usersMap).map(
					(u) => (
						<option
							key={u.id}
							value={u.id}
						>
							{u.username}
						</option>
					)
				)}
			</select>

			<select
				value={form.target_id}
				onChange={(e) =>
					setForm({
						...form,
						target_id: e.target.value,
					})
				}
				className={inputStyle}
			>
				<option value="">
					Chọn Target
				</option>
				{Object.values(usersMap).map(
					(u) => (
						<option
							key={u.id}
							value={u.id}
						>
							{u.username}
						</option>
					)
				)}
			</select>

			<select
				value={form.status}
				onChange={(e) =>
					setForm({
						...form,
						status:
							e.target.value as never,
					})
				}
				className={inputStyle}
			>
				<option value="pending">
					pending
				</option>
				<option value="accepted">
					accepted
				</option>
				<option value="rejected">
					rejected
				</option>
			</select>
		</BaseFormModal>
	);
}