// src/components/pages/AdminManage/AdminUser/UserActions.tsx
"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function UserActions({ onEdit, onDelete }: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">
        Actions
      </Menu.Button>

      <Transition as={Fragment}>
        <Menu.Items className="absolute right-0 z-20 mt-2 w-32 rounded bg-zinc-900 border border-white/10">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onEdit}
                className={`block w-full px-3 py-2 text-left ${
                  active && "bg-white/10"
                }`}
              >
                Edit
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onDelete}
                className={`block w-full px-3 py-2 text-left text-red-400 ${
                  active && "bg-red-500/20"
                }`}
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
