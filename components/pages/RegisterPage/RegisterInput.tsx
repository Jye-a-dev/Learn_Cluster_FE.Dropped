"use client";

import { Input } from "@headlessui/react";

interface Props {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

export default function RegisterInput({
  label,
  name,
  type,
  required,
}: Props) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-emerald-100 "
      >
        {label}
      </label>

      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white bg-emerald-950/60 px-3.5 py-2.5 text-emerald-50 placeholder-emerald-400/60 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />
    </div>
  );
}
