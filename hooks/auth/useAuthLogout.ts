"use client";

import { useRouter } from "next/navigation";
import api from "@/hooks/api";

export function useAuthLogout() {
  const router = useRouter();

  const logout = async () => {
    await api.post("/auth.route/logout");
    router.replace("/login");
  };

  return { logout };
}
