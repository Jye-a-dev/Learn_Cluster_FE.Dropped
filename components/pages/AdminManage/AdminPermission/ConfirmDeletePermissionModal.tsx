"use client";

import type { Permission } from "./PermissionUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
    open: boolean;
    permission: Permission | null;
    onClose: () => void;
    onConfirm: (id: number) => Promise<void>;
};
    
export default function ConfirmDeletePermissionModal({
    open,
    permission,
    onClose,
    onConfirm,
}: Props) {
    if (!permission) return null;

    return (
        <BaseConfirmModal
            open={open}
            onClose={onClose}
            title="Xóa permission"
            danger
            confirmText="Xóa"
            description={
                <>
                    Bạn có chắc chắn muốn xóa{" "}
                    <span className="font-semibold text-white">
                        {permission.name}
                    </span>
                    ?
                    <br />
                    <span className="text-red-400">
                        Hành động này không thể hoàn tác.
                    </span>
                </>
            }
            onConfirm={() => onConfirm(permission.id)}
        />
    );
}
