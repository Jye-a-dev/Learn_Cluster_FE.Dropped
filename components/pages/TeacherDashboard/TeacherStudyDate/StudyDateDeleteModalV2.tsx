"use client";

import BaseTeacherModal from "../Base/BaseTeacherModal";

type Props = {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export default function StudyDateDeleteModalV2({
  open,
  loading,
  onConfirm,
  onClose,
}: Props) {
  return (
    <BaseTeacherModal
      open={open}
      title="Xác nhận xóa"
      width="max-w-sm"
      onClose={onClose}
    >
      <p className="mb-6 text-gray-200">
        Bạn có chắc muốn xóa study date này không?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded border px-4 py-2 text-white"
        >
          Hủy
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </button>
      </div>
    </BaseTeacherModal>
  );
}
