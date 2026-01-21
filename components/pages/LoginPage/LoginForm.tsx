"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthLogin } from "@/hooks/auth/useAuthLogin";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { fields } from "./Data";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthLogin();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      await login({
        email: form.get("email") as string,
        password: form.get("password") as string,
      });

      router.push("/redirect");
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
      onInput={(e) =>
        setIsFormValid((e.currentTarget as HTMLFormElement).checkValidity())
      }
      className="w-full max-w-md space-y-6 rounded-2xl border border-white bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 p-6 shadow-lg shadow-blue-950/40"
    >
      <h1 className="text-center text-2xl font-semibold text-blue-50">
        Đăng nhập
      </h1>

      {fields.map((field) => (
        <LoginInput
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          required
        />
      ))}

      <p className="text-center text-sm text-blue-200/80">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="font-medium cursor-pointer text-blue-300 hover:text-blue-200 hover:underline"
        >
          Đăng ký
        </button>
      </p>

      {error && (
        <p className="text-center text-sm text-red-400">{error}</p>
      )}

      <LoginButton loading={loading} disabled={!isFormValid} />
    </form>
  );
}
