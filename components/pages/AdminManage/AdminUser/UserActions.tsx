// src/components/pages/AdminManage/AdminUser/UserActions.tsx
"use client";

import BaseAction from "../BaseModel/BaseAction";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function UserActions({ onEdit, onDelete }: Props) {
  return (
    <BaseAction
      items={[
        {
          label: "Sửa",
          onClick: onEdit,
        },
        {
          label: "Xoá",
          onClick: onDelete,
          danger: true,
        },
      ]}
    />
  );
}
