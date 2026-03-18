"use client";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

type Props = {
  open: boolean;
  title?: string; // tiêu đề cảnh báo
  message?: string; // nội dung cảnh báo
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function DeleteModal({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <BaseTeacherModal open={open} title={title} width="max-w-md" onClose={onClose}>
      <div className="space-y-5 text-emerald-200">
        <p>{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </BaseTeacherModal>
  );
}