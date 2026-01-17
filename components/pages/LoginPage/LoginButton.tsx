"use client";

import { Button } from "@headlessui/react";

export default function LoginButton({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) {
  return (
    <Button
      type="submit"
      aria-disabled={disabled || loading}
      className={`
        w-full rounded-xl py-2.5 font-semibold text-blue-50
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500/40
        shadow-lg shadow-blue-950/40

        ${
          disabled || loading
            ? "bg-linear-to-br from-blue-900/70 via-blue-800/70 to-indigo-900/70 cursor-not-allowed hover:animate-violent-shake"
            : "bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 cursor-pointer hover:brightness-110 active:scale-[0.98]"
        }
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-100 border-t-transparent" />
          Đang đăng nhập...
        </span>
      ) : (
        "Đăng nhập"
      )}
    </Button>
  );
}
