
"use client";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="ml-4 px-4 py-2 border-2 border-blue-200 rounded-md bg-blue-500/80 hover:bg-blue-900 transition-colors duration-200 text-white font-semibold shadow-sm"
    >
      Đăng nhập
    </Link>
  );
}
