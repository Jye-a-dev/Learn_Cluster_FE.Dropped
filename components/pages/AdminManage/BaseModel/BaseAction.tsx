// src/components/common/BaseAction.tsx
"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export type ActionItem = {
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type Props = {
  buttonLabel?: string;
  items: ActionItem[];
};

export default function BaseAction({
  buttonLabel = "Actions",
  items,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="rounded border border-white bg-white/20 px-3 py-2 text-xs text-white cursor-pointer hover:bg-white/30">
        {buttonLabel}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-32 rounded border border-white/10 bg-zinc-900">
          {items.map((item, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={`
                    block w-full px-3 py-2 text-left text-sm cursor-pointer
                    ${item.danger ? "text-red-400 border-t border-red-300" : "text-white"}
                    ${active ? (item.danger ? "bg-red-500/50" : "bg-white/10") : ""}
                  `}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
