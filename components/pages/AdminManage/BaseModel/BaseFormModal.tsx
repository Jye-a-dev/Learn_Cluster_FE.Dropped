// src/components/ui/BaseFormModal.tsx
"use client";

import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  title: string;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
};

export default function BaseFormModal({
  open,
  title,
  submitting,
  onClose,
  onSubmit,
  children,
}: Props) {
  return (
    <BaseModal open={open} onClose={onClose} title={title}>
      <div className="space-y-5">
        {children}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 cursor-pointer text-sm text-white/70 hover:bg-red-900/50 hover:text-white"
          >
            Huỷ
          </button>

          <button
            disabled={submitting}
            onClick={onSubmit}
            className="rounded-lg bg-emerald-600 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            Lưu
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
