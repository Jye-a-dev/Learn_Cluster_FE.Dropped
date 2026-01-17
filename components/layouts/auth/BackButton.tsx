"use client";

import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={() => router.push("/")}
      className="inline-flex cursor-pointer border border-white items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur transition hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
    >
      ← Quay lại
    </Button>
  );
}
