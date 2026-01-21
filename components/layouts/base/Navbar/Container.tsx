"use client";
import React from "react";

interface NavbarContainerProps {
  children: React.ReactNode;
  small?: boolean;
}

export default function NavbarContainer({ children, small = false }: NavbarContainerProps) {
  return (
    <div className="sticky top-0.5 z-50 w-full">
      <div className={`${small ? "max-w-5xl" : "max-w-6xl"} mx-auto px-1`}>
        {children}
      </div>
    </div>
  );
}
