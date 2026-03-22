"use client";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

type Props = {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  open,
  loading,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <BaseTeacherModal
      open={open}
      title="Xác nhận xoá"
      width="max-w-sm"
      onClose={onClose}
    >
      <p className="text-gray-200 mb-6">
        Bạn có chắc muốn xoá buổi học này không?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg text-white"
        >
          Huỷ
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Đang xoá..." : "Xoá"}
        </button>
      </div>
    </BaseTeacherModal>
  );
}