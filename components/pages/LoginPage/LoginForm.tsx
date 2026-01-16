"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthLogin } from "@/hooks/auth/useAuthLogin";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthLogin();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      await login({
        email: form.get("email") as string,
        password: form.get("password") as string,
      });

      router.push("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-xl border p-6 space-y-5 bg-card"
    >
      <h1 className="text-2xl font-semibold text-center">
        Đăng nhập
      </h1>

      <LoginInput
        label="Email"
        name="email"
        type="email"
        required
      />

      <LoginInput
        label="Mật khẩu"
        name="password"
        type="password"
        required
      />

      {/* switch line */}
      <p className="text-sm text-center text-muted-foreground">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-primary hover:underline"
        >
          Đăng ký
        </button>
      </p>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <LoginButton loading={loading} />
    </form>
  );
}
