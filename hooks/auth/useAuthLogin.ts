"use client";

import api from "@/hooks/api";

export function useAuthLogin() {
  const login = (data: { email: string; password: string }) =>
    api.post("/auth.route/login", data);

  return { login };
}
