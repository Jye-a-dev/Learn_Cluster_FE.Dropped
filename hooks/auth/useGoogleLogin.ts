import api from "../api";

export function useGoogleLogin() {
  const googleLogin = (data: {
    google_id: string;
    email: string;
    name: string;
  }) => api.post("/auth/google", data);

  return { googleLogin };
}