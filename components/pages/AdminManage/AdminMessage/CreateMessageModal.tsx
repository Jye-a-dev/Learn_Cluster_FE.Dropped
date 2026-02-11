"use client";

import { useState } from "react";
import {
	UserIcon,
	CalendarDaysIcon,
	ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreateMessagePayload } from "./MessageUiTypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";

export default function CreateMessageModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateMessagePayload) => Promise<void>;
}) {
	const { usersMap, loading: loadingUsers } = useUsersMap();
	const { studyDatesMap, loading: loadingStudyDates } =
		useStudyDatesMap();

	const [form, setForm] = useState<CreateMessagePayload>({
		study_date_id: "",
		sender_id: "",
		content: "",
	});

	const [submitting, setSubmitting] = useState(false);

	const isInvalid = !form.study_date_id || !form.content?.trim();

	async function handleSubmit() {
		if (isInvalid) return;

		try {
			setSubmitting(true);

			await onSubmit({
				study_date_id: form.study_date_id,
				sender_id: form.sender_id || undefined,
				content: form.content?.trim(),
			});

			onClose();

			setForm({
				study_date_id: "",
				sender_id: "",
				content: "",
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Message"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5 text-white">

				{/* ===== STUDY DATE ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<CalendarDaysIcon className="h-4 w-4 text-white/40" />
						Study Date
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.study_date_id}
						disabled={loadingStudyDates}
						onChange={(e) =>
							setForm({
								...form,
								study_date_id: e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn study date --
						</option>
						{Object.values(studyDatesMap).map((sd) => (
							<option key={sd.id} value={sd.id}>
								{sd.title ?? sd.id}
							</option>
						))}
					</select>
				</div>

				{/* ===== SENDER ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<UserIcon className="h-4 w-4 text-white/40" />
						Sender
					</label>
					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.sender_id ?? ""}
						disabled={loadingUsers}
						onChange={(e) =>
							setForm({
								...form,
								sender_id: e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn sender (tuỳ chọn) --
						</option>
						{Object.values(usersMap).map((u) => (
							<option key={u.id} value={u.id}>
								{u.username ?? u.email}
							</option>
						))}
					</select>
				</div>

				{/* ===== CONTENT ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<ChatBubbleLeftRightIcon className="h-4 w-4 text-white/40" />
						Content
					</label>
					<textarea
						rows={3}
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.content ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								content: e.target.value,
							})
						}
					/>
				</div>

				{/* ===== HINT ===== */}
				<p className="text-[11px] text-white/50">
					Message sẽ được gắn với Study Date và thời gian gửi tự động.
				</p>
			</div>
		</BaseFormModal>
	);
}
