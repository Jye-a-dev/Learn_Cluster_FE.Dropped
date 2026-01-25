"use client";

import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreateUserPayload } from "./UserUiTypes";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserPayload) => Promise<void>;
};

export default function CreateUserModal({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<CreateUserPayload>({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {
    await onSubmit(form);
    onClose();
  }

  return (
    <BaseFormModal
      open={open}
      title="Tạo User"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Username */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Username
        </label>
        <div className="relative">
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            placeholder="vd: admin01"
            className="input-admin pl-9 text-white"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Email
        </label>
        <div className="relative">
          <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            placeholder="vd: admin@email.com"
            className="input-admin pl-9 text-white"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Password
        </label>
        <div className="relative">
          <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="password"
            placeholder="••••••••"
            className="input-admin pl-9 text-white"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>
      </div>

      {/* Hint */}
      <p className="pt-1 text-xs text-white/40">
        Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ và số.
      </p>
    </BaseFormModal>
  );
}
