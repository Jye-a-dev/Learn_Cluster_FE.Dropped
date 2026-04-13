"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthRegister } from "@/hooks/auth/useAuthRegister";
import RegisterInput from "./RegisterInput";
import RegisterButton from "./RegisterButton";
import { fields } from "./Data";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuthRegister();

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
      await register({
        username: form.get("username") as string,
        email: form.get("email") as string,
        password: form.get("password") as string,
      });

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
      onInput={(e) =>
        setIsFormValid((e.currentTarget as HTMLFormElement).checkValidity())
      }
      className="w-full max-w-md space-y-6 rounded-2xl border border-white bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-6 shadow-lg shadow-emerald-950/40"
    >
      <h1 className="text-center text-2xl font-semibold text-emerald-50">
        Đăng ký tài khoản
      </h1>

      {fields.map((field) => (
        <RegisterInput
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          required
        />
      ))}

      <p className="text-center text-sm text-emerald-200/80">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-medium cursor-pointer text-emerald-300 hover:text-emerald-200 hover:underline"
        >
          Đăng nhập
        </button>
      </p>

      {error && (
        <p className="text-center text-sm text-red-400">{error}</p>
      )}

      <RegisterButton loading={loading} disabled={!isFormValid} />
    </form>
  );
}
