// AdminUser/ConfirmDeleteUserModal.tsx
"use client";

import type { UserUI } from "./UserUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
  open: boolean;
  user: UserUI | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteUserModal({
  open,
  user,
  onClose,
  onConfirm,
}: Props) {
  if (!user) return null;

  return (
    <BaseConfirmModal
      open={open}
      onClose={onClose}
      title="Xóa người dùng"
      danger
      confirmText="Xóa"
      description={
        <>
          Bạn có chắc chắn muốn xóa{" "}
          <span className="font-semibold text-white">{user.username}</span>?
          <br />
          <span className="text-red-400">
            Hành động này không thể hoàn tác.
          </span>
        </>
      }
      onConfirm={() => onConfirm(user.id)}
    />
  );
}
