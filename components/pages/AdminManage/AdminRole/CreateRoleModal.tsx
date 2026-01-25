"use client";

import { useState } from "react";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreateRolePayload } from "./RoleUiTypes";
import type { RoleName } from "@/constants/role.constant";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRolePayload) => Promise<void>;
};

/* ===== util: chuẩn hóa RoleName ===== */
function normalizeRoleName(input: string): RoleName {
  const v =
    input.trim().charAt(0).toUpperCase() +
    input.trim().slice(1).toLowerCase();

  return v as RoleName;
}

export default function CreateRoleModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  /* ===== form state (UI only) ===== */
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const name = form.name.trim();
    if (!name) return;

    try {
      setSubmitting(true);

      await onSubmit({
        name: normalizeRoleName(name), // ✅ cast + normalize tại boundary
        code: form.code || undefined,
        description: form.description || undefined,
      });

      onClose();
      setForm({ name: "", code: "", description: "" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseFormModal
      open={open}
      title="Tạo Role"
      submitting={submitting}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* ===== Role name ===== */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Role name
        </label>

        <div className="relative">
          <ShieldCheckIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

          <input
            placeholder="vd: Admin, Teacher"
            className="input-admin pl-9 text-white border rounded-b-md border-white p-1"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>
      </div>

    

      {/* ===== Description ===== */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Description
        </label>

        <div className="relative">
          <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/40" />

          <textarea
            rows={3}
            className="input-admin pl-9 text-white rounded-b-md border-white border p-1"
            placeholder="Mô tả quyền hạn của role"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>
      </div>

      <p className="pt-1 text-xs text-white/40">
        Role dùng để phân quyền cho user trong hệ thống.
      </p>
    </BaseFormModal>
  );
}
