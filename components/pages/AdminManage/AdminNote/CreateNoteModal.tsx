"use client";

import { useState } from "react";
import {
	UserIcon,
	BookOpenIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreateNotePayload } from "./NoteUiTypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateNotePayload) => Promise<void>;
};

export default function CreateNoteModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const { usersMap, loading: loadingUsers } =
		useUsersMap();

	const {
		lessonsMap,
		loading: loadingLessons,
	} = useLessonsMap();

	const [form, setForm] = useState<CreateNotePayload>({
		user_id: "",
		lesson_id: "",
		content: "",
	});

	const [submitting, setSubmitting] = useState(false);

	const isInvalid =
		!form.user_id || !form.lesson_id;

	async function handleSubmit() {
		if (isInvalid) return;

		try {
			setSubmitting(true);

			await onSubmit({
				user_id: form.user_id,
				lesson_id: form.lesson_id,
				content: form.content || null,
			});

			onClose();
			setForm({
				user_id: "",
				lesson_id: "",
				content: "",
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Note"
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
							setForm({
								...form,
								user_id: e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn user --
						</option>

						{Object.values(usersMap).map((u) => (
							<option
								key={u.id}
								value={u.id}
							>
								{u.username ??
									u.email}
							</option>
						))}
					</select>
				</div>

				{/* ===== LESSON ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<BookOpenIcon className="h-4 w-4 text-white/40" />
						Lesson
					</label>

					<select
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						value={form.lesson_id}
						disabled={loadingLessons}
						onChange={(e) =>
							setForm({
								...form,
								lesson_id:
									e.target.value,
							})
						}
					>
						<option value="">
							-- Chọn lesson --
						</option>

						{Object.values(
							lessonsMap
						).map((lesson) => (
							<option
								key={lesson.id}
								value={lesson.id}
							>
								{lesson.title}
							</option>
						))}
					</select>
				</div>

				{/* ===== CONTENT ===== */}
				<div className="space-y-1">
					<label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
						<DocumentTextIcon className="h-4 w-4 text-white/40" />
						Content
					</label>

					<textarea
						rows={3}
						className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
						placeholder="Nội dung ghi chú"
						value={form.content ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								content:
									e.target.value,
							})
						}
					/>
				</div>

				<p className="text-[11px] text-white/50">
					Note lưu nội dung ghi chú của người dùng theo từng bài học.
				</p>
			</div>
		</BaseFormModal>
	);
}
