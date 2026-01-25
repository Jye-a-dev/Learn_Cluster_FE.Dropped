"use client";

import type { Role } from "./RoleUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteRoleModal({
  open,
  role,
  onClose,
  onConfirm,
}: Props) {
  if (!role) return null;

  return (
    <BaseConfirmModal
      open={open}
      onClose={onClose}
      title="Xóa role"
      danger
      confirmText="Xóa"
      description={
        <>
          Bạn có chắc chắn muốn xóa{" "}
          <span className="font-semibold text-white">{role.name}</span>?
          <br />
          <span className="text-red-400">
            Hành động này không thể hoàn tác.
          </span>
        </>
      }
      onConfirm={() => onConfirm(role.id)}
    />
  );
}
