// src/components/pages/AdminManage/AdminPermission/PermissionActions.tsx
"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Permission } from "./PermissionUiTypes";

type Props = {
    permission: Permission;
    onEdit: (permission: Permission) => void;
    onDelete: (permission: Permission) => void;
};

export default function PermissionActions({
    permission,
    onEdit,
    onDelete,
}: Props) {
    return (
        <BaseAction
            items={[
                {
                    label: "Sửa",
                    onClick: () => onEdit(permission),
                },
                {
                    label: "Xoá",
                    onClick: () => onDelete(permission),
                    danger: true,
                },
            ]}
        />
    );
}
