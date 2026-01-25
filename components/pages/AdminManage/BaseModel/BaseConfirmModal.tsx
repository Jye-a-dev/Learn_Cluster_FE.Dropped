// src/components/ui/BaseConfirmModal.tsx
"use client";

import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  danger?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export default function BaseConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  danger = false,
  onClose,
  onConfirm,
}: Props) {
  async function handleConfirm() {
    await onConfirm();
    onClose();
  }

  return (
    <BaseModal open={open} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="text-sm text-white/70">{description}</div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/70 hover:bg-white/5"
          >
            Huỷ
          </button>

          <button
            onClick={handleConfirm}
            className={`rounded-md px-4 py-2 text-xs font-semibold text-white ${
              danger
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
