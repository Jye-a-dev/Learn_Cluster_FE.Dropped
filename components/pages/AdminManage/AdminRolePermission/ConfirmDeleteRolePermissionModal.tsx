// src/components/pages/AdminManage/AdminRolePermission/ConfirmDeleteRolePermissionModal.tsx
"use client";

import type { RolePermissionUI } from "./RolePermissionUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
  open: boolean;
  item: RolePermissionUI | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteRolePermissionModal({
  open,
  item,
  onClose,
  onConfirm,
}: Props) {
  if (!item) return null;

  return (
    <BaseConfirmModal
      open={open}
      onClose={onClose}
      title="Xóa Role – Permission"
      danger
      confirmText="Xóa"
      description={
        <>
          Bạn có chắc chắn muốn xóa liên kết:
          <br />
          <span className="font-semibold text-white">
            {item.roleName ?? item.role_id}
          </span>{" "}
          –{" "}
          <span className="font-semibold text-white">
            {item.permissionName ?? item.permission_id}
          </span>
          ?
          <br />
          <span className="text-red-400">
            Hành động này không thể hoàn tác.
          </span>
        </>
      }
      onConfirm={() => onConfirm(item.id)}
    />
  );
}
