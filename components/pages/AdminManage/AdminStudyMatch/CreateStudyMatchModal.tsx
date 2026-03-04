"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import type {
	CreateStudyMatchPayload,
} from "./StudyMatchUiTypes";

export default function CreateStudyMatchModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (
		data: CreateStudyMatchPayload
	) => Promise<void>;
}) {
	const { usersMap } = useUsersMap();

	const [form, setForm] =
		useState<CreateStudyMatchPayload>({
			user1_id: "",
			user2_id: "",
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
			title="Tạo Study Match"
			onClose={onClose}
			onSubmit={handleSubmit}
			submitting={submitting}
		>
			<select
				value={form.user1_id}
				onChange={(e) =>
					setForm({
						...form,
						user1_id:
							e.target.value,
					})
				}
				className={inputStyle}
			>
				<option value="">
					Chọn User 1
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
				value={form.user2_id}
				onChange={(e) =>
					setForm({
						...form,
						user2_id:
							e.target.value,
					})
				}
				className={inputStyle}
			>
				<option value="">
					Chọn User 2
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
		</BaseFormModal>
	);
}