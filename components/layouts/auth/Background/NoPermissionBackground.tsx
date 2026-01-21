"use client";

import { Lock } from "lucide-react";

export default function NoPermissionBackground() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center shadow-xl backdrop-blur">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <Lock size={28} />
        </div>

        <h1 className="mb-2 text-xl font-semibold text-white">
          Không có quyền truy cập
        </h1>

        <p className="text-sm text-white/60">
          Tài khoản của bạn không được phép truy cập khu vực này.
        </p>
      </div>
    </div>
  );
}
