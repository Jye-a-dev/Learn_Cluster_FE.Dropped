"use client";

import { useEffect, useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Plan, UpdatePlanPayload } from "./PlanUiTypes";

type Props = {
	open: boolean;
	plan: Plan | null;
	onClose: () => void;
	onSubmit: (id: string, data: UpdatePlanPayload) => Promise<void>;
};

type FormState = {
	name: string;
	description: string;
	price: number;
	duration_days: number | null;
	is_active: boolean;
};

type ErrorState = {
	name?: string;
	description?: string;
	price?: string;
};

export default function UpdatePlanModal({
	open,
	plan,
	onClose,
	onSubmit,
}: Props) {
	const [form, setForm] = useState<FormState>({
		name: "",
		description: "",
		price: 0,
		duration_days: null,
		is_active: true,
	});

	const [errors, setErrors] = useState<ErrorState>({});
	const [submitting, setSubmitting] = useState(false);

	/* ===================== INIT FORM ===================== */
	useEffect(() => {
		if (!open || !plan) return;

		setForm({
			name: plan.name,
			description: plan.description ?? "",
			price: plan.price,
			duration_days: plan.duration_days,
			is_active: plan.is_active,
		});

		setErrors({});
	}, [open, plan]);

	if (!open || !plan) return null;
	const planId = plan.id;

	/* ===================== VALIDATION ===================== */
	function validate(): boolean {
		const newErrors: ErrorState = {};

		if (!form.name.trim()) {
			newErrors.name = "Name không được để trống";
		}

		if (!form.description.trim()) {
			newErrors.description = "Description không được để trống";
		}

		if (form.price < 0) {
			newErrors.price = "Price phải lớn hơn hoặc bằng 0";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	const isInvalid =
		!form.name.trim() ||
		!form.description.trim() ||
		form.price < 0;

	/* ===================== SUBMIT ===================== */
	async function handleSubmit() {
		if (!validate()) return;

		try {
			setSubmitting(true);

			const payload: UpdatePlanPayload = {
				name: form.name.trim(),
				description: form.description.trim(),
				price: Number(form.price),
				duration_days:
					form.duration_days !== null &&
					!Number.isNaN(form.duration_days)
						? form.duration_days
						: null,
				is_active: Boolean(form.is_active),
			};

			await onSubmit(planId, payload);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	/* ===================== RENDER ===================== */
	return (
		<BaseFormModal
			open={open}
			title="Cập nhật Plan"
			submitting={submitting}
			isInvalid={isInvalid}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Name */}
			<div className="grid grid-cols-[140px_1fr] gap-3">
				<label className="text-xs font-medium text-white/70">
					Name *
				</label>
				<div>
					<input
						className="input-admin w-full text-white border border-white/40 rounded-md"
						value={form.name}
						onChange={(e) =>
							setForm({ ...form, name: e.target.value })
						}
					/>
					{errors.name && (
						<p className="text-xs text-red-400 mt-1">
							{errors.name}
						</p>
					)}
				</div>
			</div>

			{/* Description */}
			<div className="grid grid-cols-[140px_1fr] gap-3">
				<label className="text-xs font-medium text-white/70 pt-2">
					Description *
				</label>
				<div>
					<textarea
						rows={3}
						className="input-admin w-full text-white border border-white/40 rounded-md"
						value={form.description}
						onChange={(e) =>
							setForm({
								...form,
								description: e.target.value,
							})
						}
					/>
					{errors.description && (
						<p className="text-xs text-red-400 mt-1">
							{errors.description}
						</p>
					)}
				</div>
			</div>

			{/* Price */}
			<div className="grid grid-cols-[140px_1fr] gap-3">
				<label className="text-xs font-medium text-white/70">
					Price
				</label>
				<div>
					<input
						type="number"
						min={0}
						step="0.01"
						className="input-admin w-full text-white border border-white/40 rounded-md"
						value={form.price}
						onChange={(e) =>
							setForm({
								...form,
								price: Number(e.target.value),
							})
						}
					/>
					{errors.price && (
						<p className="text-xs text-red-400 mt-1">
							{errors.price}
						</p>
					)}
				</div>
			</div>

			{/* Duration */}
			<div className="grid grid-cols-[140px_1fr] gap-3">
				<label className="text-xs font-medium text-white/70">
					Duration (days)
				</label>
				<div>
					<input
						type="number"
						min={0}
						className="input-admin w-full text-white border border-white/40 rounded-md"
						value={form.duration_days ?? ""}
						onChange={(e) =>
							setForm({
								...form,
								duration_days: e.target.value
									? Number(e.target.value)
									: null,
							})
						}
					/>
					<p className="text-xs text-white/40 mt-1">
						Để trống nếu là plan vĩnh viễn
					</p>
				</div>
			</div>

			{/* Active */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="text-xs font-medium text-white/70">
					Active
				</label>
				<input
					type="checkbox"
					checked={form.is_active}
					onChange={(e) =>
						setForm({
							...form,
							is_active: e.target.checked,
						})
					}
				/>
			</div>
		</BaseFormModal>
	);
}