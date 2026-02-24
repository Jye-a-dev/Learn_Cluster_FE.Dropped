"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Role, UpdateRolePayload } from "./RoleUiTypes";
import { RoleName } from "@/constants/role.constant";

type Props = {
  open: boolean;
  role: Role | null;
  onClose: () => void;
  onSubmit: (id: string, data: UpdateRolePayload) => Promise<void>;
};

export default function UpdateRoleModal({
  open,
  role,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState<RoleName>("Student");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ===== Sync khi mở modal ===== */
  useEffect(() => {
    if (open && role) {
      setName(role.name);
      setDescription(role.description ?? "");
    }
  }, [open, role]);

  if (!open || !role) return null;
  const roleId = role.id;

  const isInvalid = !name;

  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      const payload: UpdateRolePayload = {
        name,
        description: description.trim() || undefined,
      };

      await onSubmit(roleId, payload);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseFormModal
      open={open}
      title="Cập nhật Role"
      submitting={submitting}
      isInvalid={isInvalid}   // ✅ Đồng bộ BaseFormModal
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Role name (LOCKED) */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Role name
        </label>
        <div className="relative">
          <ShieldCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            disabled
            value={name}
            className="input-admin pl-9 text-white/60 cursor-not-allowed border border-white rounded-b-md"
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
            rows={10}
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
            placeholder="Mô tả quyền hạn của role"
          />
        </div>
      </div>

      <p className="pt-1 text-xs text-white/40">
        Thay đổi role sẽ ảnh hưởng đến tất cả user đang sử dụng role này.
      </p>
    </BaseFormModal>
  );
}