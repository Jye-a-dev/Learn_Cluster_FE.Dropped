// src/components/pages/AdminManage/AdminStudyDateLesson/UpdateStudyDateLessonModal.tsx
"use client";

import { useEffect, useState } from "react";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

import type {
	StudyDateLesson,
	UpdateStudyDateLessonPayload,
} from "./StudyDateLessonUiTypes";

type Props = {
	open: boolean;
	studyDateLesson: StudyDateLesson | null;
	onClose: () => void;
	onSubmit: (data: UpdateStudyDateLessonPayload) => Promise<void>;
};

export default function UpdateStudyDateLessonModal({
	open,
	studyDateLesson,
	onClose,
	onSubmit,
}: Props) {
	const { studyDatesMap } = useStudyDatesMap();
	const { lessonsMap } = useLessonsMap();

	const [form, setForm] = useState<UpdateStudyDateLessonPayload>({
		study_date_id: undefined,
		lesson_id: undefined,
	});

	const [submitting, setSubmitting] = useState(false);

	/* ===== Sync khi mở modal ===== */
	useEffect(() => {
		if (!open || !studyDateLesson) return;

		setForm({
			study_date_id: studyDateLesson.study_date_id,
			lesson_id: studyDateLesson.lesson_id,
		});
	}, [open, studyDateLesson]);

	if (!open || !studyDateLesson) return null;

	/* ===== Validation ===== */
	const isInvalid =
		!form.study_date_id?.trim() ||
		!form.lesson_id?.trim();

	/* ===== Submit ===== */
	async function handleSubmit() {
		if (isInvalid) return;

		try {
			setSubmitting(true);
			await onSubmit(form);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	/* ===== styles ===== */
	const inputBase =
		"w-full rounded-md bg-slate-900 text-slate-100 border border-slate-600 px-3 py-2 text-sm " +
		"focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

	const selectBase = inputBase;
	const labelBase = "text-xs font-semibold text-slate-300";

	return (
		<BaseFormModal
			open={open}
			title="Sửa Lesson trong Study Date"
			submitting={submitting}
			isInvalid={isInvalid}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5">
				{/* ===== Study Date ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Study Date</label>
					<select
						className={selectBase}
						value={form.study_date_id ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								study_date_id: e.target.value || undefined,
							})
						}
					>
						<option value="" disabled>
							Chọn study date
						</option>
						{Object.values(studyDatesMap).map((sd) => (
							<option key={sd.id} value={sd.id}>
								{sd.title ?? sd.id}
							</option>
						))}
					</select>
				</div>

				{/* ===== Lesson ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Lesson</label>
					<div className="relative">
						<BookmarkSquareIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<select
							className={`${selectBase} pl-9`}
							value={form.lesson_id ?? ""}
							onChange={(e) =>
								setForm({
									...form,
									lesson_id: e.target.value || undefined,
								})
							}
						>
							<option value="">Chọn lesson</option>
							{Object.values(lessonsMap).map((l) => (
								<option key={l.id} value={l.id}>
									{l.title}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</BaseFormModal>
	);
}