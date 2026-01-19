"use client";

import React from "react";

export default function FooterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl mt-12 ">
      <div className="max-w-6xl  w-full mx-auto px-1 py-1 rounded-2xl">
        {children}
      </div>
    </div>
  );
}
