"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  scrollBar?: boolean; // NEW
  children: React.ReactNode;
};

export default function BaseModal({
  open,
  onClose,
  title,
  scrollBar = false, // default false
  children,
}: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl">

              {title && (
                <div className="px-6 pt-6">
                  <Dialog.Title className="text-lg font-semibold text-white">
                    {title}
                  </Dialog.Title>
                </div>
              )}

              {/* Body */}
              <div
                className={`px-6 py-6 ${scrollBar
                    ? "max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                    : ""
                  }`}
                style={
                  scrollBar
                    ? {
                      scrollbarWidth: "none",   // Firefox
                      msOverflowStyle: "none",  // IE/Edge cũ
                    }
                    : undefined
                }
              >
                {children}
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}