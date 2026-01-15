"use client";

import api from "@/hooks/api";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role_id?: number;
}

export function useAuthRegister() {
  const register = (data: RegisterPayload) =>
    api.post("/auth.route/register", data);

  return { register };
}
