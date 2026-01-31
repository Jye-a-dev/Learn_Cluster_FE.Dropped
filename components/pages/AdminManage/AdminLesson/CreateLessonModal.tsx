"use client";

import { useEffect, useMemo, useState } from "react";
import {
	BookOpenIcon,
	ListBulletIcon,
	LinkIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
	CreateLessonPayload,
	LessonContentType,
} from "./LessonUiTypes";
import { getChapters } from "@/hooks/chapters/getChapters";

type ChapterOption = {
	id: string;
	title: string;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateLessonPayload) => Promise<void>;
};

export default function CreateLessonModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const [chapters, setChapters] = useState<ChapterOption[]>([]);
	const [searchChapter, setSearchChapter] = useState("");

	const [form, setForm] = useState({
		chapter_id: "",
		title: "",
		content_type: "video" as LessonContentType,
		content_url: "",
		ordering: "",
	});

	const [submitting, setSubmitting] = useState(false);

	/* =======================
	   LOAD CHAPTERS
	======================= */
	useEffect(() => {
		if (!open) return;

		getChapters().then((res) => {
			setChapters(
				res.map((c) => ({
					id: c.id,
					title: c.title,
				}))
			);
		});
	}, [open]);

	const filteredChapters = useMemo(() => {
		const q = searchChapter.toLowerCase();
		return chapters.filter((c) =>
			c.title.toLowerCase().includes(q)
		);
	}, [chapters, searchChapter]);

	/* =======================
	   SUBMIT
	======================= */
	async function handleSubmit() {
		if (!form.title.trim() || !form.chapter_id) return;

		try {
			setSubmitting(true);

			await onSubmit({
				chapter_id: form.chapter_id,
				title: form.title.trim(),
				content_type: form.content_type,
				content_url:
					form.content_url !== ""
						? form.content_url
						: null,
				ordering: form.ordering
					? Number(form.ordering)
					: undefined,
			});

			onClose();
			setForm({
				chapter_id: "",
				title: "",
				content_type: "video",
				content_url: "",
				ordering: "",
			});
			setSearchChapter("");
		} finally {
			setSubmitting(false);
		}
	}

	/* =======================
	   RENDER
	======================= */
	return (
		<BaseFormModal
			open={open}
			title="Tạo Lesson"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Chapter */}
			<div className="space-y-2">
				<label className="text-xs font-medium text-white/70">
					Chapter
				</label>

				<input
					placeholder="Tìm chapter theo tên…"
					className="input-admin text-white border border-white rounded-md"
					value={searchChapter}
					onChange={(e) => setSearchChapter(e.target.value)}
				/>

				<select
					className="input-admin text-white border border-white rounded-md bg-black"
					value={form.chapter_id}
					onChange={(e) =>
						setForm({ ...form, chapter_id: e.target.value })
					}
				>
					<option value="">-- Chọn chapter --</option>
					{filteredChapters.map((c) => (
						<option key={c.id} value={c.id}>
							{c.title}
						</option>
					))}
				</select>
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
							content_type:
								e.target.value as LessonContentType,
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
					value={form.ordering}
					onChange={(e) =>
						setForm({
							...form,
							ordering: e.target.value,
						})
					}
				/>
			</div>
		</BaseFormModal>
	);
}
