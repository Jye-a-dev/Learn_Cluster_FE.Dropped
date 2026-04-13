"use client";

import BaseTeacherModal from "../Base/BaseTeacherModal";

type Props = {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export default function StudyDateDeleteModal({
  open,
  loading,
  onConfirm,
  onClose,
}: Props) {
  return (
    <BaseTeacherModal
      open={open}
      title="Xac nhan xoa"
      width="max-w-sm"
      onClose={onClose}
    >
      <p className="mb-6 text-gray-200">
        Ban co chac muon xoa study date nay khong?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded border px-4 py-2 text-white"
        >
          Huy
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Dang xoa..." : "Xoa"}
        </button>
      </div>
    </BaseTeacherModal>
  );
}
