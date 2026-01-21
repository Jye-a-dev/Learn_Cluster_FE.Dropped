"use client";

import { Button } from "@headlessui/react";
import { useState } from "react";
import { useAuthLogout } from "@/hooks/auth/useAuthLogout";

export default function LogoutButton({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const { logout } = useAuthLogout();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading || disabled) return;
    try {
      setLoading(true);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleLogout}
      disabled={disabled || loading}
      className={`w-auto rounded-xl p-2 py-2.5 font-semibold text-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 shadow-lg shadow-red-950/40 ${disabled || loading
        ? "bg-linear-to-br from-red-900/70 via-red-800/70 to-rose-900/70 cursor-not-allowed"
        : "bg-linear-to-br from-red-900 via-red-800 to-rose-900 cursor-pointer hover:bg-rose-600 hover:brightness-110 active:scale-[0.98]"
        }`}
    >

      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-100 border-t-transparent" />
          Đang đăng xuất...
        </span>
      ) : (
        "Đăng xuất"
      )}
    </Button>
  );
}
