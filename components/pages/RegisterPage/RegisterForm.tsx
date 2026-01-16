"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthRegister } from "@/hooks/auth/useAuthRegister";
import RegisterInput from "./RegisterInput";
import RegisterButton from "./RegisterButton";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuthRegister();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      await register({
        username: form.get("username") as string,
        email: form.get("email") as string,
        password: form.get("password") as string,
      });

      // 👉 switch sang login
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message || "Đăng ký thất bại");
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
        Đăng ký tài khoản
      </h1>

      <RegisterInput
        label="Tên người dùng"
        name="username"
        type="text"
        required
      />

      <RegisterInput
        label="Email"
        name="email"
        type="email"
        required
      />

      <RegisterInput
        label="Mật khẩu"
        name="password"
        type="password"
        required
      />

      {/* switch line */}
      <p className="text-sm text-center text-muted-foreground">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-primary hover:underline"
        >
          Đăng nhập
        </button>
      </p>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <RegisterButton loading={loading} />
    </form>
  );
}
