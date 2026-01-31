"use client";

import { useEffect, useState } from "react";
import {
	BookOpenIcon,
	ListBulletIcon,
	LinkIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
	Lesson,
	LessonContentType,
	UpdateLessonPayload,
} from "./LessonUiTypes";

type Props = {
	open: boolean;
	lesson: Lesson | null;
	onClose: () => void;
	onSubmit: (id: string, data: UpdateLessonPayload) => Promise<void>;
};

export default function UpdateLessonModal({
	open,
	lesson,
	onClose,
	onSubmit,
}: Props) {
	const [form, setForm] = useState({
		title: "",
		content_type: "video" as LessonContentType,
		content_url: "",
		order: "",
	});

	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (open && lesson) {
			setForm({
				title: lesson.title,
				content_type: lesson.content_type,
				content_url: lesson.content_url ?? "",
				order: String(lesson.ordering),
			});
		}
	}, [open, lesson]);

	if (!open || !lesson) return null;
	const lessonId = lesson.id;

	async function handleSubmit() {
		try {
			setSubmitting(true);
			await onSubmit(lessonId, {
				title: form.title,
				content_type: form.content_type,
				content_url:
					form.content_url !== ""
						? form.content_url
						: null,
				ordering:
					form.order !== ""
						? Number(form.order)
						: undefined,
			});
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Lesson"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Chapter ID */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Chapter ID
				</label>
				<input
					className="input-admin text-white border border-white rounded-md"
					value={lesson.chapter_id}
					disabled
				/>
			</div>

			{/* Title */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<BookOpenIcon className="h-4 w-4 text-white/40" />
					Title
				</label>
				<input
					className="input-admin text-white border border-white rounded-md"
					value={form.title}
					onChange={(e) =>
						setForm({ ...form, title: e.target.value })
					}
				/>
			</div>

			{/* Content Type */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Content Type
				</label>
				<select
					className="input-admin text-white border border-white rounded-md bg-black"
					value={form.content_type}
					onChange={(e) =>
						setForm({
							...form,
							content_type: e.target.value as LessonContentType,
						})
					}
				>
					<option value="video">Video</option>
					<option value="pdf">PDF</option>
					<option value="text">Text</option>
				</select>
			</div>

			{/* Content URL */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<LinkIcon className="h-4 w-4 text-white/40" />
					Content URL
				</label>
				<input
					className="input-admin text-white border border-white rounded-md"
					placeholder={
						form.content_type === "text"
							? "Không cần URL cho text"
							: "https://..."
					}
					value={form.content_url}
					onChange={(e) =>
						setForm({
							...form,
							content_url: e.target.value,
						})
					}
					disabled={form.content_type === "text"}
				/>
			</div>

			{/* Ordering */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<ListBulletIcon className="h-4 w-4 text-white/40" />
					Ordering
				</label>
				<input
					type="number"
					className="input-admin text-white border border-white rounded-md"
					value={form.order}
					onChange={(e) =>
						setForm({ ...form, order: e.target.value })
					}
				/>
			</div>
		</BaseFormModal>
	);
}
