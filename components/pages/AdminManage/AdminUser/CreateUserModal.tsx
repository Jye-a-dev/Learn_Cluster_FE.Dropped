"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import type { CreateUserPayload } from "./UserUiTypes";

export type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserPayload) => Promise<void>;
};

const CreateUserModal = ({
  open,
  onClose,
  onSubmit,
}: CreateUserModalProps) => {
  const [form, setForm] = useState<CreateUserPayload>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-zinc-900 border border-white/10 p-6 space-y-5 shadow-2xl">
          <Dialog.Title className="text-xl font-semibold text-white">
            Create User
          </Dialog.Title>

          {/* Username */}
          <input
            className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          {/* Email */}
          <input
            className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => onSubmit(form)}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
            >
              Create
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateUserModal;
