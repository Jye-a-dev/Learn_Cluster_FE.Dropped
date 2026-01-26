"use client";

import { useEffect, useState } from "react";
import {
    ShieldCheckIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
    Permission,
    UpdatePermissionPayload,
} from "./PermissionUiTypes";

type Props = {
    open: boolean;
    permission: Permission | null;
    onClose: () => void;
    onSubmit: (id: number, data: UpdatePermissionPayload) => Promise<void>;
};

export default function UpdatePermissionModal({
    open,
    permission,
    onClose,
    onSubmit,
}: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    /* ===== sync khi mở modal ===== */
    useEffect(() => {
        if (open && permission) {
            setName(permission.name);
            setDescription(permission.description ?? "");
        }
    }, [open, permission]);

    if (!open || !permission) return null;
    const permissionId = permission.id;

    async function handleSubmit() {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        try {
            setSubmitting(true);

            await onSubmit(permissionId, {
                name: trimmedName,
                description: description || undefined,
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Permission"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            {/* Permission name */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Permission name
                </label>
                <div className="relative">
                    <ShieldCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-admin pl-9 text-white border border-white rounded-b-md"
                        placeholder="vd: user.update"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Description
                </label>
                <div className="relative">
                    <DocumentTextIcon className="pointer-events-none absolute left-3 top-1 h-4 w-4 text-white/40" />
                    <textarea
                        rows={3}
                        className="input-admin pl-9 pr-2 text-white resize-none overflow-hidden min-h-10 border border-white rounded-b-md w-full max-w-[50vw]"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            e.currentTarget.style.height = "auto";
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        }}
                        onInput={(e) => {
                            const el = e.currentTarget;
                            el.style.height = "auto";
                            el.style.height = `${el.scrollHeight}px`;
                        }}
                        placeholder="Mô tả chức năng permission"
                    />
                </div>
            </div>

            <p className="pt-1 text-xs text-white/40">
                Thay đổi permission sẽ ảnh hưởng đến quyền truy cập chức năng trong hệ thống.
            </p>
        </BaseFormModal>
    );
}
