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
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <Input
        name={name}
        type={type}
        required={required}
        className=" w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
