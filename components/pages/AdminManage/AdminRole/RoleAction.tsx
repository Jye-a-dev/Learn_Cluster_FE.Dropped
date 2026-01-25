// src/components/pages/AdminManage/AdminRole/RoleActions.tsx
"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Role } from "./RoleUiTypes";

type Props = {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
};

export default function RoleActions({ role, onEdit, onDelete }: Props) {
  return (
    <BaseAction
      items={[
        {
          label: "Sửa",
          onClick: () => onEdit(role),   // ✅ wrap lại
        },
        {
          label: "Xoá",
          onClick: () => onDelete(role), // ✅ wrap lại
          danger: true,
        },
      ]}
    />
  );
}
