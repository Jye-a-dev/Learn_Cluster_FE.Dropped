"use client";

import { Button } from "@headlessui/react";

export default function LoginButton({ loading }: { loading: boolean }) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className=" w-full rounded-lg bg-primary text-primary-foreground py-2 font-medium disabled:opacity-60"
    >
      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
    </Button>
  );
}
