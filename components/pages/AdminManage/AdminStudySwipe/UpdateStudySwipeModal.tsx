"use client";

import { useState, useEffect } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
	StudySwipeUI,
	UpdateStudySwipePayload,
} from "./StudySwipeUiTypes";

export default function UpdateStudySwipeModal({
	open,
	item,
	onClose,
	onSubmit,
}: {
	open: boolean;
	item: StudySwipeUI | null;
	onClose: () => void;
	onSubmit: (
		id: string,
		data: UpdateStudySwipePayload
	) => Promise<void>;
}) {
	const [form, setForm] =
		useState<UpdateStudySwipePayload>({
			swiper_id: "",
			target_id: "",
			status: "pending",
		});

	const [submitting, setSubmitting] =
		useState(false);

	useEffect(() => {
		if (!item) return;
		setForm({
			swiper_id: item.swiper_id,
			target_id: item.target_id,
			status: item.status,
		});
	}, [item]);

	if (!open || !item) return null;

    const fullItem = item;

	async function handleSubmit() {
		try {
			setSubmitting(true);
			await onSubmit(fullItem.id, form);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Study Swipe"
			onClose={onClose}
			onSubmit={handleSubmit}
			submitting={submitting}
		>
			<select
				value={form.status}
				onChange={(e) =>
					setForm({
						...form,
						status:
							e.target.value as never,
					})
				}
				className="w-full rounded-md bg-zinc-900 text-white border border-white/20 px-3 py-2 text-sm"
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