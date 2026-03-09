"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { AxiosError } from "axios";

export default function DirectLoginForm() {
  const router = useRouter();
  const { googleLogin } = useGoogleLogin();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-white bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 shadow-lg shadow-blue-950/40">

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            setLoading(true);
            setError("");

            if (!credentialResponse.credential) {
              throw new Error("No credential returned from Google");
            }

            await googleLogin({
              credential: credentialResponse.credential,
            });

            router.push("/redirect");

          } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            setError(error.response?.data?.message || "Google login failed");
          } finally {
            setLoading(false);
          }
        }}
        onError={() => {
          setError("Google login failed");
        }}
      />

      {loading && (
        <p className="text-center text-sm text-gray-300">
          Đang đăng nhập...
        </p>
      )}

      {error && (
        <p className="text-center text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}