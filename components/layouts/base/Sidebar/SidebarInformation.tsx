"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";

export default function SidebarInformation() {
  const { user, loading: userLoading } = useCurrentUser();
  const { roleName, loading: roleLoading } = useCurrentRoleName();

  if (userLoading || roleLoading) {
    return (
      <div className="px-4 py-3 animate-pulse">
        <div className="h-4 w-24 rounded bg-white/30 mb-2" />
        <div className="h-3 w-16 rounded bg-white/20" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-emerald-900/40 px-3 py-2 text-emerald-50 transition hover:bg-emerald-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
        <UserCircleIcon className="h-9 w-9 shrink-0 text-emerald-200" />

        <div className="flex-1 text-left leading-tight">
          <div className="text-sm font-semibold truncate">
            {user.username ?? "User"}
          </div>
          <div className="text-xs text-emerald-200 truncate">
            {roleName ?? "Unknown role"}
          </div>
        </div>

        <ChevronDownIcon className="h-4 w-4 text-emerald-200" />
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
        <Menu.Items className="absolute left-0 right-0 mt-2 origin-top rounded-xl border border-emerald-700/40 bg-emerald-900 text-emerald-50 shadow-xl focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div className={`px-4 py-2 text-sm ${active ? "bg-emerald-800/70" : ""}`}>
                {user.email ?? ""}
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
