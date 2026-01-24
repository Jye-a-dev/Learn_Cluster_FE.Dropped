// CreateUserButton.tsx
"use client";

type Props = {
  onClick: () => void;
};

export default function CreateUserButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-4 cursor-pointer py-2 rounded-lg bg-green-500 hover:bg-green-800 text-white text-sm"
    >
      + Create User
    </button>
  );
}
