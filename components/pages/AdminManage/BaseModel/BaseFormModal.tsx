"use client";

import BaseModal from "./BaseModal";
import { FormEvent } from "react";

type Props = {
  open: boolean;
  title: string;
  submitting?: boolean;
  isInvalid?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  scrollBar?: boolean; // NEW
  onClose: () => void;
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
};

export default function BaseFormModal({
  open,
  title,
  submitting = false,
  isInvalid = false,
  submitLabel = "Lưu",
  cancelLabel = "Huỷ",
  scrollBar = false, // default
  onClose,
  onSubmit,
  children,
}: Props) {

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || isInvalid) return;
    await onSubmit();
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={title}
      scrollBar={scrollBar}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset disabled={submitting} className="space-y-5">
          {children}
        </fieldset>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-white/70
              hover:bg-red-900/50 hover:text-white"
          >
            {cancelLabel}
          </button>

          <button
            type="submit"
            disabled={submitting || isInvalid}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white
              hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Đang lưu..." : submitLabel}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}