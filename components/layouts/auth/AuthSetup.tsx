"use client";

import { ReactNode } from "react";
import ClusterBackground from "./Background/ClusterBackground";
import BackButton from "./BackButton";

interface PublicSetupProps {
  children: ReactNode;
}

export default function AuthSetup({ children }: PublicSetupProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* background */}
      <ClusterBackground />

      {/* back button – top left */}
      <div className="fixed top-6 left-6 z-20">
        <BackButton />
      </div>

      {/* content */}
      <main className="flex-1 relative z-10">
        {children}
      </main>
    </div>
  );
}
