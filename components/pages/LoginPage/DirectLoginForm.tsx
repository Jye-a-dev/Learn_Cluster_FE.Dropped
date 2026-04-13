"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { AxiosError } from "axios";
import { useGoogleAuthConfig } from "@/components/layouts/auth/AuthGoogleProvider";

export default function DirectLoginForm() {
  const router = useRouter();
  const { googleLogin } = useGoogleLogin();
  const { clientId, loading: configLoading, error: configError } = useGoogleAuthConfig();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const effectiveError = error || configError;

  if (configLoading) {
    return (
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-white bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 text-center shadow-lg shadow-blue-950/40">
        <p className="text-sm text-gray-300">Đang tải cấu hình đăng nhập Google...</p>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="w-full max-w-md space-y-3 rounded-2xl border border-red-400/30 bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 shadow-lg shadow-blue-950/40">
        <p className="text-center text-sm font-medium text-red-300">
          Đăng nhập Google chưa sẵn sàng
        </p>
        <p className="text-center text-sm text-gray-300">
          {configError || "Thiếu GOOGLE_CLIENT_ID ở backend hoặc NEXT_PUBLIC_GOOGLE_CLIENT_ID ở frontend."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-white bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 shadow-lg shadow-blue-950/40">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            setLoading(true);
            setError("");

            if (!credentialResponse.credential) {
              throw new Error("Không nhận được thông tin xác thực từ Google");
            }

            await googleLogin({
              credential: credentialResponse.credential,
            });

            router.push("/redirect");
          } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            setError(error.response?.data?.message || "Đăng nhập Google thất bại");
          } finally {
            setLoading(false);
          }
        }}
        onError={() => {
          setError("Đăng nhập Google thất bại");
        }}
      />

      {loading && (
        <p className="text-center text-sm text-gray-300">
          Đang đăng nhập...
        </p>
      )}

      {effectiveError && (
        <p className="text-center text-sm text-red-400">
          {effectiveError}
        </p>
      )}
    </div>
  );
}
