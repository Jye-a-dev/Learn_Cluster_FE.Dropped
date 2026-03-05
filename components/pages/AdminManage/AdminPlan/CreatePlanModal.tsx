"use client";

import { useState } from "react";
import {
	TagIcon,
	CurrencyDollarIcon,
	CalendarDaysIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreatePlanPayload } from "./PlanUiTypes";

export default function CreatePlanModal({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreatePlanPayload) => Promise<void>;
}) {
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		duration_days: "",
		is_active: true,
	});

	const [submitting, setSubmitting] = useState(false);

	const isInvalid =
		!form.name.trim() ||
		!form.price ||
		Number(form.price) < 0;

	async function handleSubmit() {
		if (isInvalid) return;

		try {
			setSubmitting(true);

			await onSubmit({
				name: form.name.trim(),
				description:
					form.description.trim() || null,
				price: Number(form.price),
				duration_days: form.duration_days
					? Number(form.duration_days)
					: null,
				is_active: form.is_active,
			});

			onClose();
			setForm({
				name: "",
				description: "",
				price: "",
				duration_days: "",
				is_active: true,
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<BaseFormModal
			open={open}
			title="Tạo Plan"
			submitting={submitting}
			isInvalid={isInvalid}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Name */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<TagIcon className="h-4 w-4 text-white/40" />
					Name
				</label>
				<input
					className="input-admin text-white border border-white/40 rounded-md"
					placeholder="Ví dụ: Premium 30 ngày"
					value={form.name}
					onChange={(e) =>
						setForm({
							...form,
							name: e.target.value,
						})
					}
				/>
			</div>

			{/* Description */}
			<div className="grid grid-cols-[140px_1fr] items-start gap-3">
				<label className="flex items-center gap-2 pt-2 text-xs font-medium text-white/70">
					<DocumentTextIcon className="h-4 w-4 text-white/40" />
					Description
				</label>
				<textarea
					rows={3}
					className="input-admin text-white border border-white/40 rounded-md"
					placeholder="Mô tả quyền lợi của gói"
					value={form.description}
					onChange={(e) =>
						setForm({
							...form,
							description: e.target.value,
						})
					}
				/>
			</div>

			{/* Price */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<CurrencyDollarIcon className="h-4 w-4 text-white/40" />
					Price (VND)
				</label>
				<input
					type="number"
					min={0}
					step="1000"
					className="input-admin text-white border border-white/40 rounded-md"
					placeholder="Ví dụ: 199000"
					value={form.price}
					onChange={(e) =>
						setForm({
							...form,
							price: e.target.value,
						})
					}
				/>
			</div>

			{/* Duration */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<CalendarDaysIcon className="h-4 w-4 text-white/40" />
					Duration (days)
				</label>
				<input
					type="number"
					min={0}
					className="input-admin text-white border border-white/40 rounded-md"
					placeholder="Để trống nếu vĩnh viễn"
					value={form.duration_days}
					onChange={(e) =>
						setForm({
							...form,
							duration_days:
								e.target.value,
						})
					}
				/>
			</div>

			{/* Active Switch */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Status
				</label>

				<button
					type="button"
					onClick={() =>
						setForm({
							...form,
							is_active:
								!form.is_active,
						})
					}
					className={`w-14 h-7 rounded-full transition relative ${
						form.is_active
							? "bg-emerald-500"
							: "bg-neutral-600"
					}`}
				>
					<span
						className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition ${
							form.is_active
								? "translate-x-7"
								: ""
						}`}
					/>
				</button>
			</div>
		</BaseFormModal>
	);
}