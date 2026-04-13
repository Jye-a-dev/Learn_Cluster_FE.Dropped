"use client";

import { Button } from "@headlessui/react";

export default function RegisterButton({
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
        w-full rounded-xl py-2.5 font-semibold text-white
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-emerald-400/60
        shadow-sm shadow-emerald-600/20

        ${
          disabled || loading
            ? "bg-emerald-600/70 cursor-not-allowed hover:animate-violent-shake"
            : "bg-emerald-600 cursor-pointer hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-600/30 active:scale-[0.98]"
        }
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-100 border-t-transparent" />
          Đang đăng ký...
        </span>
      ) : (
        "Đăng ký"
      )}
    </Button>
  );
}
