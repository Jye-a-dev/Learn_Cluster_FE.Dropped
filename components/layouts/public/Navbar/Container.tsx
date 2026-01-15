"use client";
import React from "react";

export default function NavbarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0.5 z-50 w-full">
      <div className="max-w-6xl mx-auto px-1">
        {children}
      </div>
    </div>
  );
}
