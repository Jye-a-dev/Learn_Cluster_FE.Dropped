"use client";

import { useEffect } from "react";

type Props = {
	open: boolean;
	title: string;
	submitting?: boolean;
	disableSubmit?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	children: React.ReactNode;
};

export default function BaseFormModal({
	open,
	title,
	submitting = false,
	disableSubmit = false,
	onClose,
	onSubmit,
	children,
}: Props) {
	/* =========================
	   ESC CLOSE
	========================= */
	useEffect(() => {
		if (!open) return;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				onClose();
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={onClose}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			{/* Modal */}
			<div
				className="relative z-10 w-full max-w-lg rounded-xl bg-neutral-900 border border-white/10 shadow-xl p-6 space-y-6"
				onClick={(e) => e.stopPropagation()}
			>
				{/* ===== HEADER ===== */}
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-white">
						{title}
					</h2>

					<button
						onClick={onClose}
						className="text-white/50 hover:text-white transition"
					>
						✕
					</button>
				</div>

				{/* ===== BODY ===== */}
				<div>{children}</div>

				{/* ===== FOOTER ===== */}
				<div className="flex justify-end gap-3 pt-4 border-t border-white/10">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
						disabled={submitting}
					>
						Huỷ
					</button>

					<button
						onClick={onSubmit}
						disabled={submitting || disableSubmit}
						className={`px-4 py-2 rounded-md font-medium transition ${
							submitting || disableSubmit
								? "bg-blue-500/40 cursor-not-allowed text-white/70"
								: "bg-blue-600 hover:bg-blue-500 text-white"
						}`}
					>
						{submitting ? "Đang xử lý..." : "Lưu"}
					</button>
				</div>
			</div>
		</div>
	);
}